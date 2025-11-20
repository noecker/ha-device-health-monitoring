import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { ProblemDevice, FilterMode } from '../types';

@customElement('exclusions-table')
export class ExclusionsTable extends LitElement {
  @property({ type: Array }) devices: ProblemDevice[] = [];
  @property({ type: String }) filterMode: FilterMode = 'all';
  @property({ type: String }) searchQuery = '';

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

    table {
      width: 100%;
      border-collapse: collapse;
    }

    thead {
      background: var(--secondary-background-color);
    }

    th {
      padding: 12px 16px;
      text-align: left;
      font-weight: 500;
      font-size: 14px;
      color: var(--secondary-text-color);
      border-bottom: 2px solid var(--divider-color);
    }

    td {
      padding: 12px 16px;
      border-bottom: 1px solid var(--divider-color);
    }

    tbody tr:hover {
      background: var(--secondary-background-color);
    }

    .checkbox-cell {
      width: 40px;
    }

    input[type="checkbox"] {
      width: 18px;
      height: 18px;
      cursor: pointer;
    }

    .entity-cell {
      max-width: 300px;
    }

    .entity-name {
      font-weight: 500;
      display: block;
    }

    .entity-id {
      font-size: 12px;
      color: var(--secondary-text-color);
      display: block;
      margin-top: 2px;
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
      color: var(--warning-color);
    }

    .status-unavailable {
      background: rgba(244, 67, 54, 0.2);
      color: var(--error-color);
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
  `;

  render() {
    const filteredDevices = this._getFilteredDevices();

    if (filteredDevices.length === 0) {
      return html`
        <div class="empty-state">
          <div class="empty-state-icon">🎉</div>
          <div>No devices found matching your filters</div>
        </div>
      `;
    }

    return html`
      <div class="table-container">
        <table>
          <thead>
            <tr>
              <th class="checkbox-cell">Exclude</th>
              <th>Device</th>
              <th>Status</th>
              <th>Battery</th>
              <th>Domain</th>
            </tr>
          </thead>
          <tbody>
            ${filteredDevices.map(
              (device) => html`
                <tr>
                  <td class="checkbox-cell">
                    <input
                      type="checkbox"
                      .checked=${device.is_excluded}
                      @change=${() => this._toggleDevice(device.entity_id)}
                    />
                  </td>
                  <td class="entity-cell">
                    <span class="entity-name">${device.name}</span>
                    <span class="entity-id">${device.entity_id}</span>
                  </td>
                  <td>
                    ${this._renderStatusBadge(device)}
                  </td>
                  <td>
                    ${device.battery_level !== null
                      ? `${device.battery_level}%`
                      : '-'}
                  </td>
                  <td>${device.domain}</td>
                </tr>
              `
            )}
          </tbody>
        </table>
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
          Low Battery
        </span>
      `;
    }
    return html`<span>-</span>`;
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
          d.entity_id.toLowerCase().includes(query)
      );
    }

    return filtered;
  }

  private _toggleDevice(entityId: string) {
    this.dispatchEvent(
      new CustomEvent('toggle-exclusion', {
        detail: { entityId },
        bubbles: true,
        composed: true,
      })
    );
  }
}
