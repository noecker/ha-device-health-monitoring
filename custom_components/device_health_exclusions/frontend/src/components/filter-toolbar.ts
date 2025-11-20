import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { FilterMode } from '../types';

@customElement('filter-toolbar')
export class FilterToolbar extends LitElement {
  @property({ type: String }) filterMode: FilterMode = 'all';
  @property({ type: String }) searchQuery = '';
  @property({ type: Number }) batteryThreshold = 20;

  static styles = css`
    :host {
      display: block;
    }

    .toolbar {
      display: flex;
      gap: 16px;
      align-items: center;
      padding: 12px;
      background: var(--card-background-color);
      border-radius: 8px;
    }

    .filter-buttons {
      display: flex;
      gap: 8px;
    }

    .filter-button {
      padding: 8px 16px;
      border: 1px solid var(--divider-color);
      background: var(--card-background-color);
      color: var(--primary-text-color);
      border-radius: 4px;
      cursor: pointer;
      transition: all 0.2s;
      font-size: 14px;
    }

    .filter-button:hover {
      background: var(--secondary-background-color);
    }

    .filter-button.active {
      background: var(--primary-color);
      color: var(--text-primary-color);
      border-color: var(--primary-color);
    }

    .search-box {
      flex: 1;
      padding: 8px 12px;
      border: 1px solid var(--divider-color);
      border-radius: 4px;
      background: var(--card-background-color);
      color: var(--primary-text-color);
      font-size: 14px;
    }

    .threshold-input {
      display: flex;
      align-items: center;
      gap: 8px;
    }

    .threshold-input label {
      font-size: 14px;
      color: var(--secondary-text-color);
    }

    .threshold-input input {
      width: 60px;
      padding: 8px;
      border: 1px solid var(--divider-color);
      border-radius: 4px;
      background: var(--card-background-color);
      color: var(--primary-text-color);
      font-size: 14px;
    }
  `;

  render() {
    return html`
      <div class="toolbar">
        <div class="filter-buttons">
          <button
            class="filter-button ${this.filterMode === 'all' ? 'active' : ''}"
            @click=${() => this._setFilter('all')}
          >
            All Devices
          </button>
          <button
            class="filter-button ${this.filterMode === 'not_excluded' ? 'active' : ''}"
            @click=${() => this._setFilter('not_excluded')}
          >
            Not Excluded
          </button>
          <button
            class="filter-button ${this.filterMode === 'excluded' ? 'active' : ''}"
            @click=${() => this._setFilter('excluded')}
          >
            Excluded
          </button>
        </div>

        <input
          type="text"
          class="search-box"
          placeholder="Search devices..."
          .value=${this.searchQuery}
          @input=${this._handleSearch}
        />

        <div class="threshold-input">
          <label>Battery %:</label>
          <input
            type="number"
            min="5"
            max="50"
            .value=${this.batteryThreshold.toString()}
            @change=${this._handleThresholdChange}
          />
        </div>
      </div>
    `;
  }

  private _setFilter(mode: FilterMode) {
    this.filterMode = mode;
    this.dispatchEvent(
      new CustomEvent('filter-changed', {
        detail: { filterMode: mode },
      })
    );
  }

  private _handleSearch(e: Event) {
    const input = e.target as HTMLInputElement;
    this.searchQuery = input.value;
    this.dispatchEvent(
      new CustomEvent('search-changed', {
        detail: { searchQuery: this.searchQuery },
      })
    );
  }

  private _handleThresholdChange(e: Event) {
    const input = e.target as HTMLInputElement;
    const value = parseInt(input.value, 10);
    if (value >= 5 && value <= 50) {
      this.batteryThreshold = value;
      this.dispatchEvent(
        new CustomEvent('threshold-changed', {
          detail: { batteryThreshold: value },
        })
      );
    }
  }
}
