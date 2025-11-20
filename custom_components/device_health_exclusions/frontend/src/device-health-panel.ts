import { LitElement, html } from 'lit';
import { customElement, state } from 'lit/decorators.js';
import { panelStyles } from './styles/panel-styles';
import { ProblemDevice, FilterMode, HomeAssistant, ExclusionSettings } from './types';
import {
  fetchProblemDevices,
  fetchExclusions,
  toggleExclusion,
  updateExclusions,
} from './data/websocket';

import './components/filter-toolbar';
import './components/exclusions-table';

@customElement('device-health-panel')
export class DeviceHealthPanel extends LitElement {
  @state() private _devices: ProblemDevice[] = [];
  @state() private _settings: ExclusionSettings = {
    excluded_entities: [],
    battery_threshold: 20,
  };
  @state() private _filterMode: FilterMode = 'all';
  @state() private _searchQuery = '';
  @state() private _loading = true;

  public hass!: HomeAssistant;

  static styles = panelStyles;

  connectedCallback() {
    super.connectedCallback();
    this._loadData();
  }

  render() {
    if (this._loading) {
      return html`
        <div class="loading">
          <div>Loading devices...</div>
        </div>
      `;
    }

    const stats = this._calculateStats();

    return html`
      <div class="header">
        <h1>Device Health Exclusions Manager</h1>
      </div>

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
        @filter-changed=${this._handleFilterChanged}
        @search-changed=${this._handleSearchChanged}
        @threshold-changed=${this._handleThresholdChanged}
      ></filter-toolbar>

      <exclusions-table
        .devices=${this._devices}
        .filterMode=${this._filterMode}
        .searchQuery=${this._searchQuery}
        @toggle-exclusion=${this._handleToggleExclusion}
      ></exclusions-table>
    `;
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
      await toggleExclusion(this.hass, entityId);
      // Update local state immediately for responsiveness
      this._devices = this._devices.map((d) =>
        d.entity_id === entityId ? { ...d, is_excluded: !d.is_excluded } : d
      );
      // Reload to get fresh data
      await this._loadData();
    } catch (err) {
      console.error('Failed to toggle exclusion:', err);
    }
  }

  private _handleFilterChanged(e: CustomEvent) {
    this._filterMode = e.detail.filterMode;
  }

  private _handleSearchChanged(e: CustomEvent) {
    this._searchQuery = e.detail.searchQuery;
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
