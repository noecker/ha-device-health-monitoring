import { LitElement, html } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { panelStyles } from './styles/panel-styles';
import { ProblemDevice, FilterMode, HomeAssistant, ExclusionSettings } from './types';
import {
  fetchProblemDevices,
  fetchExclusions,
  toggleExclusion,
  toggleDeviceExclusion,
  updateExclusions,
} from './data/websocket';

import './components/filter-toolbar';
import './components/exclusions-table';

@customElement('device-health-panel')
export class DeviceHealthPanel extends LitElement {
  @property({ attribute: false }) public hass!: HomeAssistant;
  @property({ type: Boolean, reflect: true }) public narrow = false;

  @state() private _devices: ProblemDevice[] = [];
  @state() private _settings: ExclusionSettings = {
    excluded_entities: [],
    excluded_devices: [],
    battery_threshold: 20,
  };
  @state() private _filterMode: FilterMode = 'all';
  @state() private _searchQuery = '';
  @state() private _hideUnknown = false;
  @state() private _loading = true;

  static styles = panelStyles;

  connectedCallback() {
    super.connectedCallback();
    this._loadData();
  }

  render() {
    if (this._loading) {
      return html`
        <div class="app-toolbar">
          <button class="menu-button" @click=${this._toggleMenu} title="Menu">
            <svg viewBox="0 0 24 24" width="24" height="24">
              <path fill="currentColor" d="M3,6H21V8H3V6M3,11H21V13H3V11M3,16H21V18H3V16Z" />
            </svg>
          </button>
          <div class="app-title">Device Health</div>
        </div>
        <div class="loading">
          <div>Loading devices...</div>
        </div>
      `;
    }

    const stats = this._calculateStats();

    return html`
      <div class="app-toolbar">
        <button class="menu-button" @click=${this._toggleMenu} title="Menu">
          <svg viewBox="0 0 24 24" width="24" height="24">
            <path fill="currentColor" d="M3,6H21V8H3V6M3,11H21V13H3V11M3,16H21V18H3V16Z" />
          </svg>
        </button>
        <div class="app-title">Device Health</div>
      </div>

      <div class="content">
        <div class="stats">
        <div class="stat-card">
          <div class="stat-value">${stats.total}</div>
          <div class="stat-label">Problem Devices</div>
        </div>
        <div class="stat-card">
          <div class="stat-value">${stats.excluded}</div>
          <div class="stat-label">Excluded</div>
        </div>
        <div class="stat-card">
          <div class="stat-value">${stats.reported}</div>
          <div class="stat-label">Will Be Reported</div>
        </div>
      </div>

        <filter-toolbar
          .filterMode=${this._filterMode}
          .searchQuery=${this._searchQuery}
          .batteryThreshold=${this._settings.battery_threshold}
          .hideUnknown=${this._hideUnknown}
          @filter-changed=${this._handleFilterChanged}
          @search-changed=${this._handleSearchChanged}
          @threshold-changed=${this._handleThresholdChanged}
          @hide-unknown-changed=${this._handleHideUnknownChanged}
        ></filter-toolbar>

        <exclusions-table
          .devices=${this._devices}
          .filterMode=${this._filterMode}
          .searchQuery=${this._searchQuery}
          .hideUnknown=${this._hideUnknown}
          @toggle-exclusion=${this._handleToggleExclusion}
          @toggle-device-exclusion=${this._handleToggleDeviceExclusion}
        ></exclusions-table>
      </div>
    `;
  }

  private _toggleMenu() {
    this.dispatchEvent(
      new CustomEvent('hass-toggle-menu', {
        bubbles: true,
        composed: true,
      })
    );
  }

  private async _loadData() {
    try {
      this._loading = true;
      const [settings, devices] = await Promise.all([
        fetchExclusions(this.hass),
        fetchProblemDevices(this.hass, this._settings.battery_threshold),
      ]);
      this._settings = settings;
      this._devices = devices;
    } catch (err) {
      console.error('Failed to load data:', err);
    } finally {
      this._loading = false;
    }
  }

  private async _handleToggleExclusion(e: CustomEvent) {
    const { entityId } = e.detail;
    try {
      const result = await toggleExclusion(this.hass, entityId);
      // Update local state immediately for responsiveness
      this._devices = this._devices.map((d) =>
        d.entity_id === entityId
          ? { ...d, is_excluded: result.is_excluded, is_entity_excluded: result.is_excluded }
          : d
      );
      // Also update the settings to keep stats in sync
      if (result.is_excluded) {
        this._settings = {
          ...this._settings,
          excluded_entities: [...this._settings.excluded_entities, entityId]
        };
      } else {
        this._settings = {
          ...this._settings,
          excluded_entities: this._settings.excluded_entities.filter(id => id !== entityId)
        };
      }
    } catch (err) {
      console.error('Failed to toggle exclusion:', err);
    }
  }

  private async _handleToggleDeviceExclusion(e: CustomEvent) {
    const { deviceId } = e.detail;
    try {
      const result = await toggleDeviceExclusion(this.hass, deviceId);
      // Update local state immediately for responsiveness
      // Mark all entities belonging to this device as excluded/not excluded
      this._devices = this._devices.map((d) =>
        d.device_id === deviceId
          ? {
              ...d,
              is_device_excluded: result.is_excluded,
              is_excluded: result.is_excluded || d.is_entity_excluded,
            }
          : d
      );
      // Also update the settings to keep stats in sync
      if (result.is_excluded) {
        this._settings = {
          ...this._settings,
          excluded_devices: [...this._settings.excluded_devices, deviceId]
        };
      } else {
        this._settings = {
          ...this._settings,
          excluded_devices: this._settings.excluded_devices.filter(id => id !== deviceId)
        };
      }
    } catch (err) {
      console.error('Failed to toggle device exclusion:', err);
    }
  }

  private _handleFilterChanged(e: CustomEvent) {
    this._filterMode = e.detail.filterMode;
  }

  private _handleSearchChanged(e: CustomEvent) {
    this._searchQuery = e.detail.searchQuery;
  }

  private _handleHideUnknownChanged(e: CustomEvent) {
    this._hideUnknown = e.detail.hideUnknown;
  }

  private async _handleThresholdChanged(e: CustomEvent) {
    const newThreshold = e.detail.batteryThreshold;
    try {
      await updateExclusions(
        this.hass,
        this._settings.excluded_entities,
        newThreshold
      );
      this._settings = { ...this._settings, battery_threshold: newThreshold };
      await this._loadData();
    } catch (err) {
      console.error('Failed to update threshold:', err);
    }
  }

  private _calculateStats() {
    const total = this._devices.length;
    const excluded = this._devices.filter((d) => d.is_excluded).length;
    const reported = total - excluded;
    return { total, excluded, reported };
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'device-health-panel': DeviceHealthPanel;
  }
}
