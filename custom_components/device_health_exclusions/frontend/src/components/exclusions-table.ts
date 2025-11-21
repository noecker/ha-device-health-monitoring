import { LitElement, html, css } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { repeat } from 'lit/directives/repeat.js';
import { ProblemDevice, FilterMode, IntegrationGroup, DeviceGroup } from '../types';

@customElement('exclusions-table')
export class ExclusionsTable extends LitElement {
  @property({ type: Array }) devices: ProblemDevice[] = [];
  @property({ type: String }) filterMode: FilterMode = 'all';
  @property({ type: String }) searchQuery = '';

  @state() private _expandedIntegrations: Set<string> = new Set();
  @state() private _expandedDevices: Set<string> = new Set();
  private _initialExpansionDone = false;

  static styles = css`
    :host {
      display: block;
    }

    .table-container {
      background: var(--card-background-color);
      border-radius: 8px;
      overflow: hidden;
      box-shadow: var(--ha-card-box-shadow, 0 2px 4px rgba(0,0,0,0.1));
    }

    /* Integration group header */
    .integration-header {
      display: flex;
      align-items: center;
      padding: 12px 16px;
      background: var(--primary-color);
      color: var(--text-primary-color);
      cursor: pointer;
      user-select: none;
      font-weight: 500;
      font-size: 14px;
    }

    .integration-header:hover {
      background: var(--primary-color);
      filter: brightness(1.1);
    }

    .integration-header .expand-icon {
      margin-right: 8px;
      transition: transform 0.2s;
    }

    .integration-header .expand-icon.expanded {
      transform: rotate(90deg);
    }

    .integration-header .stats {
      margin-left: auto;
      font-size: 12px;
      opacity: 0.9;
    }

    /* Device group header */
    .device-header {
      display: flex;
      align-items: center;
      padding: 10px 16px 10px 32px;
      background: var(--secondary-background-color);
      cursor: pointer;
      user-select: none;
      border-bottom: 1px solid var(--divider-color);
    }

    .device-header:hover {
      background: var(--primary-background-color);
    }

    .device-header .expand-icon {
      margin-right: 8px;
      transition: transform 0.2s;
      font-size: 12px;
    }

    .device-header .expand-icon.expanded {
      transform: rotate(90deg);
    }

    .device-header .device-info {
      flex: 1;
      min-width: 0;
    }

    .device-header .device-name {
      font-weight: 500;
      display: block;
    }

    .device-header .device-meta {
      font-size: 12px;
      color: var(--secondary-text-color);
    }

    .device-header .device-checkbox {
      margin-right: 12px;
    }

    .device-header .entity-count {
      font-size: 12px;
      color: var(--secondary-text-color);
      margin-left: 8px;
    }

    /* Entity rows */
    .entity-row {
      display: flex;
      align-items: center;
      padding: 10px 16px 10px 64px;
      border-bottom: 1px solid var(--divider-color);
    }

    .entity-row:hover {
      background: var(--secondary-background-color);
    }

    .entity-row .entity-checkbox {
      margin-right: 12px;
    }

    .entity-row .entity-info {
      flex: 1;
      min-width: 0;
    }

    .entity-row .entity-name {
      font-weight: 400;
      display: block;
    }

    .entity-row .entity-id {
      font-size: 12px;
      color: var(--secondary-text-color);
    }

    .entity-row .entity-status {
      margin-left: 12px;
    }

    input[type="checkbox"] {
      width: 18px;
      height: 18px;
      cursor: pointer;
      accent-color: var(--primary-color);
    }

    .status-badge {
      display: inline-block;
      padding: 4px 8px;
      border-radius: 12px;
      font-size: 12px;
      font-weight: 500;
    }

    .status-battery {
      background: rgba(255, 152, 0, 0.2);
      color: var(--warning-color, #ff9800);
    }

    .status-unavailable {
      background: rgba(244, 67, 54, 0.2);
      color: var(--error-color, #f44336);
    }

    .empty-state {
      text-align: center;
      padding: 48px;
      color: var(--secondary-text-color);
    }

    .empty-state-icon {
      font-size: 64px;
      margin-bottom: 16px;
      opacity: 0.3;
    }

    /* Standalone entities (no device) */
    .standalone-section {
      border-top: 2px solid var(--divider-color);
    }

    .standalone-header {
      display: flex;
      align-items: center;
      padding: 12px 16px;
      background: var(--secondary-background-color);
      font-weight: 500;
      font-size: 14px;
      color: var(--secondary-text-color);
      cursor: pointer;
    }

    .standalone-header .expand-icon {
      margin-right: 8px;
      transition: transform 0.2s;
    }

    .standalone-header .expand-icon.expanded {
      transform: rotate(90deg);
    }

    .excluded-indicator {
      display: inline-block;
      width: 8px;
      height: 8px;
      border-radius: 50%;
      background: var(--primary-color);
      margin-left: 8px;
    }

    .device-excluded-note {
      font-size: 11px;
      color: var(--secondary-text-color);
      font-style: italic;
      margin-left: 4px;
    }
  `;

  connectedCallback() {
    super.connectedCallback();
    this._initialExpansionDone = false;
  }

  updated(changedProperties: Map<string, unknown>) {
    // Only expand all groups on initial load, not on every device update
    if (changedProperties.has('devices') && !this._initialExpansionDone && this.devices.length > 0) {
      this._expandAllGroups();
      this._initialExpansionDone = true;
    }
  }

  private _expandAllGroups() {
    const groups = this._getGroupedDevices();
    this._expandedIntegrations = new Set(groups.map(g => g.integration));
    this._expandedDevices = new Set(
      groups.flatMap(g => g.devices.map(d => d.device_id || `standalone-${g.integration}`))
    );
  }

  render() {
    const groups = this._getGroupedDevices();

    if (groups.length === 0) {
      return html`
        <div class="empty-state">
          <div class="empty-state-icon">🎉</div>
          <div>No devices found matching your filters</div>
        </div>
      `;
    }

    return html`
      <div class="table-container">
        ${repeat(
          groups,
          (group) => group.integration,
          (group) => this._renderIntegrationGroup(group)
        )}
      </div>
    `;
  }

  private _renderIntegrationGroup(group: IntegrationGroup) {
    const isExpanded = this._expandedIntegrations.has(group.integration);
    const excludedCount = group.excluded_entity_count;
    const totalCount = group.total_entities;

    return html`
      <div class="integration-group">
        <div
          class="integration-header"
          @click=${() => this._toggleIntegration(group.integration)}
        >
          <span class="expand-icon ${isExpanded ? 'expanded' : ''}">▶</span>
          <span>${this._formatIntegrationName(group.integration)}</span>
          <span class="stats">
            ${group.devices.length} device${group.devices.length !== 1 ? 's' : ''},
            ${excludedCount}/${totalCount} excluded
          </span>
        </div>
        ${isExpanded ? html`
          <div class="integration-content">
            ${repeat(
              group.devices,
              (device) => device.device_id || `standalone-${group.integration}`,
              (device) => this._renderDeviceGroup(device, group.integration)
            )}
          </div>
        ` : ''}
      </div>
    `;
  }

  private _renderDeviceGroup(device: DeviceGroup, integration: string) {
    const deviceKey = device.device_id || `standalone-${integration}`;
    const isExpanded = this._expandedDevices.has(deviceKey);
    const entityCount = device.entities.length;
    const excludedCount = device.excluded_entity_count;

    return html`
      <div class="device-group">
        <div
          class="device-header"
          @click=${(e: Event) => {
            // Don't toggle if clicking checkbox
            if ((e.target as HTMLElement).tagName !== 'INPUT') {
              this._toggleDevice(deviceKey);
            }
          }}
        >
          ${device.device_id ? html`
            <input
              type="checkbox"
              class="device-checkbox"
              .checked=${device.is_excluded}
              @change=${(e: Event) => {
                e.stopPropagation();
                this._toggleDeviceExclusion(device.device_id!);
              }}
              title="Exclude entire device"
            />
          ` : ''}
          <span class="expand-icon ${isExpanded ? 'expanded' : ''}">▶</span>
          <div class="device-info">
            <span class="device-name">
              ${device.device_name}
              ${device.is_excluded ? html`<span class="excluded-indicator" title="Device excluded"></span>` : ''}
            </span>
            <span class="device-meta">
              ${[device.manufacturer, device.model].filter(Boolean).join(' · ') || 'Unknown device'}
            </span>
          </div>
          <span class="entity-count">
            ${excludedCount}/${entityCount} entities excluded
          </span>
        </div>
        ${isExpanded ? html`
          <div class="device-content">
            ${repeat(
              device.entities,
              (entity) => entity.entity_id,
              (entity) => this._renderEntityRow(entity, device.is_excluded)
            )}
          </div>
        ` : ''}
      </div>
    `;
  }

  private _renderEntityRow(entity: ProblemDevice, deviceExcluded: boolean) {
    return html`
      <div class="entity-row">
        <input
          type="checkbox"
          class="entity-checkbox"
          .checked=${entity.is_excluded}
          .disabled=${deviceExcluded && !entity.is_entity_excluded}
          @change=${() => this._toggleEntity(entity.entity_id)}
          title=${deviceExcluded && !entity.is_entity_excluded
            ? "Excluded via device"
            : "Toggle entity exclusion"}
        />
        <div class="entity-info">
          <span class="entity-name">${entity.name}</span>
          <span class="entity-id">
            ${entity.entity_id}
            ${entity.is_device_excluded && !entity.is_entity_excluded
              ? html`<span class="device-excluded-note">(via device)</span>`
              : ''}
          </span>
        </div>
        <div class="entity-status">
          ${this._renderStatusBadge(entity)}
        </div>
      </div>
    `;
  }

  private _renderStatusBadge(device: ProblemDevice) {
    if (device.state === 'unavailable' || device.state === 'unknown') {
      return html`
        <span class="status-badge status-unavailable">
          ${device.state}
        </span>
      `;
    }
    if (device.battery_level !== null) {
      return html`
        <span class="status-badge status-battery">
          ${device.battery_level}% battery
        </span>
      `;
    }
    return html`<span>-</span>`;
  }

  private _getGroupedDevices(): IntegrationGroup[] {
    let filtered = this._getFilteredDevices();

    // Group by integration
    const integrationMap = new Map<string, Map<string | null, ProblemDevice[]>>();

    for (const entity of filtered) {
      const integration = entity.integration || 'Other';
      const deviceId = entity.device_id;

      if (!integrationMap.has(integration)) {
        integrationMap.set(integration, new Map());
      }

      const deviceMap = integrationMap.get(integration)!;
      if (!deviceMap.has(deviceId)) {
        deviceMap.set(deviceId, []);
      }
      deviceMap.get(deviceId)!.push(entity);
    }

    // Convert to IntegrationGroup array
    const groups: IntegrationGroup[] = [];

    for (const [integration, deviceMap] of integrationMap) {
      const devices: DeviceGroup[] = [];
      let totalEntities = 0;
      let excludedEntities = 0;

      for (const [deviceId, entities] of deviceMap) {
        const firstEntity = entities[0];
        const isDeviceExcluded = entities.some(e => e.is_device_excluded);
        const excludedCount = entities.filter(e => e.is_excluded).length;

        devices.push({
          device_id: deviceId,
          device_name: firstEntity.device_name || firstEntity.name || 'Unknown Device',
          integration,
          manufacturer: firstEntity.manufacturer,
          model: firstEntity.model,
          entities,
          is_excluded: isDeviceExcluded,
          excluded_entity_count: excludedCount,
        });

        totalEntities += entities.length;
        excludedEntities += excludedCount;
      }

      // Sort devices: excluded last, then by name
      devices.sort((a, b) => {
        if (a.is_excluded !== b.is_excluded) {
          return a.is_excluded ? 1 : -1;
        }
        return a.device_name.localeCompare(b.device_name);
      });

      groups.push({
        integration,
        devices,
        total_entities: totalEntities,
        excluded_entity_count: excludedEntities,
      });
    }

    // Sort integrations alphabetically, with "Other" last
    groups.sort((a, b) => {
      if (a.integration === 'Other') return 1;
      if (b.integration === 'Other') return -1;
      return a.integration.localeCompare(b.integration);
    });

    return groups;
  }

  private _getFilteredDevices(): ProblemDevice[] {
    let filtered = this.devices;

    // Apply filter mode
    if (this.filterMode === 'excluded') {
      filtered = filtered.filter((d) => d.is_excluded);
    } else if (this.filterMode === 'not_excluded') {
      filtered = filtered.filter((d) => !d.is_excluded);
    }

    // Apply search query
    if (this.searchQuery) {
      const query = this.searchQuery.toLowerCase();
      filtered = filtered.filter(
        (d) =>
          d.name.toLowerCase().includes(query) ||
          d.entity_id.toLowerCase().includes(query) ||
          (d.device_name && d.device_name.toLowerCase().includes(query)) ||
          (d.integration && d.integration.toLowerCase().includes(query))
      );
    }

    return filtered;
  }

  private _formatIntegrationName(integration: string): string {
    // Convert snake_case to Title Case
    return integration
      .split('_')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  }

  private _toggleIntegration(integration: string) {
    const newSet = new Set(this._expandedIntegrations);
    if (newSet.has(integration)) {
      newSet.delete(integration);
    } else {
      newSet.add(integration);
    }
    this._expandedIntegrations = newSet;
  }

  private _toggleDevice(deviceKey: string) {
    const newSet = new Set(this._expandedDevices);
    if (newSet.has(deviceKey)) {
      newSet.delete(deviceKey);
    } else {
      newSet.add(deviceKey);
    }
    this._expandedDevices = newSet;
  }

  private _toggleEntity(entityId: string) {
    this.dispatchEvent(
      new CustomEvent('toggle-exclusion', {
        detail: { entityId },
        bubbles: true,
        composed: true,
      })
    );
  }

  private _toggleDeviceExclusion(deviceId: string) {
    this.dispatchEvent(
      new CustomEvent('toggle-device-exclusion', {
        detail: { deviceId },
        bubbles: true,
        composed: true,
      })
    );
  }
}
