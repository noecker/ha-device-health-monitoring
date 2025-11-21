import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { FilterMode } from '../types';

@customElement('filter-toolbar')
export class FilterToolbar extends LitElement {
  @property({ type: String }) filterMode: FilterMode = 'all';
  @property({ type: String }) searchQuery = '';
  @property({ type: Number }) batteryThreshold = 20;
  @property({ type: Boolean }) hideUnknown = false;

  static styles = css`
    :host {
      display: block;
    }

    .toolbar {
      display: flex;
      flex-wrap: wrap;
      gap: 12px 16px;
      align-items: center;
      padding: 12px;
      background: var(--card-background-color);
      border-radius: 8px;
    }

    .filter-buttons {
      display: flex;
      flex-wrap: wrap;
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
      min-width: 150px;
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
      white-space: nowrap;
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

    .hide-unknown-toggle {
      display: flex;
      align-items: center;
      gap: 8px;
      cursor: pointer;
      font-size: 14px;
      color: var(--secondary-text-color);
      white-space: nowrap;
    }

    .hide-unknown-toggle input {
      width: 16px;
      height: 16px;
      cursor: pointer;
      accent-color: var(--primary-color);
    }

    @media (max-width: 600px) {
      .toolbar {
        flex-direction: column;
        align-items: stretch;
      }

      .filter-buttons {
        order: 1;
        justify-content: flex-start;
      }

      .search-box {
        order: 2;
        width: 100%;
        min-width: unset;
      }

      .threshold-input {
        order: 3;
        justify-content: space-between;
      }

      .hide-unknown-toggle {
        order: 4;
        justify-content: flex-start;
      }
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

        <label class="hide-unknown-toggle">
          <input
            type="checkbox"
            .checked=${this.hideUnknown}
            @change=${this._handleHideUnknownChange}
          />
          Hide unknown
        </label>
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

  private _handleHideUnknownChange(e: Event) {
    const input = e.target as HTMLInputElement;
    this.hideUnknown = input.checked;
    this.dispatchEvent(
      new CustomEvent('hide-unknown-changed', {
        detail: { hideUnknown: this.hideUnknown },
      })
    );
  }
}
