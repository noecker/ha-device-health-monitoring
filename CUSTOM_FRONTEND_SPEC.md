# Custom Frontend Panel Implementation Specification

## Overview

This document provides a complete technical specification for transforming the Device Health Exclusions Manager from a modal-based config flow to a full-page custom frontend panel with table view, real-time saving, and filtering capabilities.

**Estimated Effort:** 40-60 hours
**Difficulty:** Advanced
**Prerequisites:** JavaScript/TypeScript, Lit web components, Home Assistant frontend architecture

---

## Current Architecture

### What We Have Now
- **Backend:** Python custom integration with config flow
- **UI:** Modal-based forms using Home Assistant's built-in selectors
- **Data Storage:** Config entry stored in `.storage/core.config_entries`
- **User Flow:** Settings → Devices & Services → Configure (modal)

### Limitations
- No table view (only list/dropdown selectors)
- No real-time save (form-based submit)
- No dynamic filtering
- No custom styling/layout
- Modal UI constrains space

---

## Proposed Architecture

### What We'll Build
- **Backend:** Enhanced Python integration with WebSocket API
- **Frontend:** Custom Lit-based panel with full-page UI
- **UI Components:** Data table, checkboxes, filters, search
- **User Flow:** Settings → Device Health → Exclusions (full page)

### New Components Required

#### 1. Frontend Panel (`frontend/`)
```
frontend/
├── src/
│   ├── device-health-panel.ts          # Main panel component
│   ├── components/
│   │   ├── exclusions-table.ts         # Table component
│   │   ├── filter-toolbar.ts           # Filter controls
│   │   └── device-row.ts               # Table row component
│   ├── data/
│   │   └── websocket.ts                # WebSocket API client
│   ├── styles/
│   │   └── panel-styles.ts             # Shared styles
│   └── types.ts                        # TypeScript types
├── package.json
├── rollup.config.js                     # Build configuration
├── tsconfig.json
└── README.md
```

#### 2. Backend Enhancements (`custom_components/device_health_exclusions/`)
```python
# New files:
- api.py              # WebSocket API endpoints
- view.py             # Panel registration
- frontend.py         # Frontend asset serving

# Modified files:
- __init__.py         # Register panel and API
- manifest.json       # Add frontend dependencies
```

---

## Detailed Implementation Plan

## Phase 1: Backend WebSocket API (8-10 hours)

### Step 1.1: Create WebSocket API Handler

**File:** `custom_components/device_health_exclusions/api.py`

```python
"""WebSocket API for Device Health Exclusions Manager."""
from __future__ import annotations

import logging
from typing import Any

import voluptuous as vol

from homeassistant.components import websocket_api
from homeassistant.core import HomeAssistant, callback
from homeassistant.helpers import config_validation as cv

_LOGGER = logging.getLogger(__name__)

DOMAIN = "device_health_exclusions"


@callback
def async_register_websocket_handlers(hass: HomeAssistant) -> None:
    """Register WebSocket API handlers."""
    websocket_api.async_register_command(hass, handle_get_problem_devices)
    websocket_api.async_register_command(hass, handle_get_exclusions)
    websocket_api.async_register_command(hass, handle_update_exclusions)
    websocket_api.async_register_command(hass, handle_toggle_exclusion)


@websocket_api.websocket_command(
    {
        vol.Required("type"): "device_health_exclusions/get_problem_devices",
        vol.Required("battery_threshold"): vol.All(
            vol.Coerce(int), vol.Range(min=5, max=50)
        ),
    }
)
@websocket_api.async_response
async def handle_get_problem_devices(
    hass: HomeAssistant,
    connection: websocket_api.ActiveConnection,
    msg: dict[str, Any],
) -> None:
    """Get all problem devices with their current state."""
    from .config_flow import get_problem_devices

    battery_threshold = msg["battery_threshold"]

    # Get problem devices
    problem_devices = await hass.async_add_executor_job(
        get_problem_devices, hass, battery_threshold
    )

    # Get current exclusions
    config_entries = hass.config_entries.async_entries(DOMAIN)
    excluded = []
    if config_entries:
        excluded = config_entries[0].data.get("excluded_entities", [])

    # Build response with additional metadata
    devices = []
    for entity_id, label in problem_devices.items():
        state = hass.states.get(entity_id)
        devices.append({
            "entity_id": entity_id,
            "name": state.name if state else "Unknown",
            "label": label,
            "state": state.state if state else "unknown",
            "battery_level": _get_battery_level(state),
            "is_excluded": entity_id in excluded,
            "domain": entity_id.split(".")[0],
            "device_class": state.attributes.get("device_class") if state else None,
        })

    connection.send_result(msg["id"], {"devices": devices})


@websocket_api.websocket_command(
    {
        vol.Required("type"): "device_health_exclusions/get_exclusions",
    }
)
@websocket_api.async_response
async def handle_get_exclusions(
    hass: HomeAssistant,
    connection: websocket_api.ActiveConnection,
    msg: dict[str, Any],
) -> None:
    """Get current exclusion settings."""
    config_entries = hass.config_entries.async_entries(DOMAIN)

    if not config_entries:
        connection.send_result(msg["id"], {
            "excluded_entities": [],
            "battery_threshold": 20,
        })
        return

    config_entry = config_entries[0]
    connection.send_result(msg["id"], {
        "excluded_entities": config_entry.data.get("excluded_entities", []),
        "battery_threshold": config_entry.data.get("battery_threshold", 20),
    })


@websocket_api.websocket_command(
    {
        vol.Required("type"): "device_health_exclusions/update_exclusions",
        vol.Required("excluded_entities"): [cv.string],
        vol.Optional("battery_threshold"): vol.All(
            vol.Coerce(int), vol.Range(min=5, max=50)
        ),
    }
)
@websocket_api.async_response
async def handle_update_exclusions(
    hass: HomeAssistant,
    connection: websocket_api.ActiveConnection,
    msg: dict[str, Any],
) -> None:
    """Update exclusion list."""
    config_entries = hass.config_entries.async_entries(DOMAIN)

    if not config_entries:
        connection.send_error(msg["id"], "not_found", "No config entry found")
        return

    config_entry = config_entries[0]
    new_data = {
        "excluded_entities": msg["excluded_entities"],
        "battery_threshold": msg.get(
            "battery_threshold",
            config_entry.data.get("battery_threshold", 20)
        ),
    }

    hass.config_entries.async_update_entry(config_entry, data=new_data)
    connection.send_result(msg["id"], {"success": True})


@websocket_api.websocket_command(
    {
        vol.Required("type"): "device_health_exclusions/toggle_exclusion",
        vol.Required("entity_id"): cv.string,
    }
)
@websocket_api.async_response
async def handle_toggle_exclusion(
    hass: HomeAssistant,
    connection: websocket_api.ActiveConnection,
    msg: dict[str, Any],
) -> None:
    """Toggle a single entity's exclusion status."""
    config_entries = hass.config_entries.async_entries(DOMAIN)

    if not config_entries:
        connection.send_error(msg["id"], "not_found", "No config entry found")
        return

    config_entry = config_entries[0]
    excluded_entities = list(config_entry.data.get("excluded_entities", []))
    entity_id = msg["entity_id"]

    if entity_id in excluded_entities:
        excluded_entities.remove(entity_id)
        is_excluded = False
    else:
        excluded_entities.append(entity_id)
        is_excluded = True

    new_data = {
        **config_entry.data,
        "excluded_entities": excluded_entities,
    }

    hass.config_entries.async_update_entry(config_entry, data=new_data)
    connection.send_result(msg["id"], {
        "success": True,
        "is_excluded": is_excluded,
    })


def _get_battery_level(state) -> int | None:
    """Extract battery level from state."""
    if not state or state.state in ["unavailable", "unknown"]:
        return None
    try:
        return int(float(state.state))
    except (ValueError, TypeError):
        return None
```

### Step 1.2: Register Panel View

**File:** `custom_components/device_health_exclusions/view.py`

```python
"""Panel view registration for Device Health Exclusions Manager."""
from __future__ import annotations

from homeassistant.components import panel_custom
from homeassistant.core import HomeAssistant

DOMAIN = "device_health_exclusions"


async def async_register_panel(hass: HomeAssistant) -> None:
    """Register the custom panel."""
    await panel_custom.async_register_panel(
        hass,
        webcomponent_name="device-health-panel",
        frontend_url_path="device-health-exclusions",
        sidebar_title="Device Health",
        sidebar_icon="mdi:heart-pulse",
        module_url="/api/device_health_exclusions/device-health-panel.js",
        require_admin=True,
        config_panel_domain=DOMAIN,
    )
```

### Step 1.3: Update Main Integration File

**File:** `custom_components/device_health_exclusions/__init__.py`

Add to `async_setup_entry`:

```python
from .api import async_register_websocket_handlers
from .view import async_register_panel

async def async_setup(hass: HomeAssistant, config: dict) -> bool:
    """Set up the Device Health Exclusions Manager component."""
    # Register WebSocket API
    async_register_websocket_handlers(hass)
    return True


async def async_setup_entry(hass: HomeAssistant, entry: ConfigEntry) -> bool:
    """Set up Device Health Exclusions from a config entry."""
    hass.data.setdefault(DOMAIN, {})
    hass.data[DOMAIN][entry.entry_id] = entry.data

    # Register panel
    await async_register_panel(hass)

    # Forward to platforms
    await hass.config_entries.async_forward_entry_setups(entry, PLATFORMS)
    entry.async_on_unload(entry.add_update_listener(async_reload_entry))

    return True
```

### Step 1.4: Update Manifest

**File:** `custom_components/device_health_exclusions/manifest.json`

```json
{
  "domain": "device_health_exclusions",
  "name": "Device Health Exclusions Manager",
  "codeowners": [],
  "config_flow": true,
  "documentation": "https://github.com/noecker/ha-device-health-monitoring",
  "integration_type": "helper",
  "iot_class": "local_push",
  "requirements": [],
  "version": "1.1.0",
  "dependencies": ["frontend"],
  "after_dependencies": ["http"]
}
```

---

## Phase 2: Frontend Setup (4-6 hours)

### Step 2.1: Initialize Frontend Project

```bash
cd custom_components/device_health_exclusions
mkdir -p frontend/src/{components,data,styles}
cd frontend
```

**File:** `frontend/package.json`

```json
{
  "name": "device-health-exclusions-frontend",
  "version": "1.1.0",
  "description": "Frontend for Device Health Exclusions Manager",
  "scripts": {
    "build": "rollup -c",
    "watch": "rollup -c -w",
    "lint": "eslint src --ext .ts"
  },
  "devDependencies": {
    "@rollup/plugin-node-resolve": "^15.2.3",
    "@rollup/plugin-typescript": "^11.1.5",
    "@typescript-eslint/eslint-plugin": "^6.13.1",
    "@typescript-eslint/parser": "^6.13.1",
    "eslint": "^8.54.0",
    "rollup": "^4.6.1",
    "rollup-plugin-terser": "^7.0.2",
    "tslib": "^2.6.2",
    "typescript": "^5.3.2"
  },
  "dependencies": {
    "lit": "^3.1.0"
  }
}
```

**File:** `frontend/tsconfig.json`

```json
{
  "compilerOptions": {
    "target": "ES2020",
    "module": "ESNext",
    "lib": ["ES2020", "DOM", "DOM.Iterable"],
    "declaration": true,
    "declarationMap": true,
    "sourceMap": true,
    "outDir": "./dist",
    "rootDir": "./src",
    "strict": true,
    "moduleResolution": "node",
    "esModuleInterop": true,
    "skipLibCheck": true,
    "forceConsistentCasingInFileNames": true,
    "resolveJsonModule": true,
    "experimentalDecorators": true
  },
  "include": ["src/**/*"],
  "exclude": ["node_modules", "dist"]
}
```

**File:** `frontend/rollup.config.js`

```javascript
import resolve from '@rollup/plugin-node-resolve';
import typescript from '@rollup/plugin-typescript';
import { terser } from 'rollup-plugin-terser';

export default {
  input: 'src/device-health-panel.ts',
  output: {
    file: '../www/device-health-panel.js',
    format: 'es',
    sourcemap: true,
  },
  plugins: [
    resolve(),
    typescript(),
    terser({
      ecma: 2020,
      module: true,
      warnings: true,
    }),
  ],
};
```

### Step 2.2: Create TypeScript Type Definitions

**File:** `frontend/src/types.ts`

```typescript
export interface ProblemDevice {
  entity_id: string;
  name: string;
  label: string;
  state: string;
  battery_level: number | null;
  is_excluded: boolean;
  domain: string;
  device_class: string | null;
}

export interface ExclusionSettings {
  excluded_entities: string[];
  battery_threshold: number;
}

export type FilterMode = 'all' | 'not_excluded' | 'excluded';

export interface HomeAssistant {
  callWS<T>(msg: any): Promise<T>;
  language: string;
  themes: any;
}
```

---

## Phase 3: Frontend Components (16-20 hours)

### Step 3.1: WebSocket Client

**File:** `frontend/src/data/websocket.ts`

```typescript
import { HomeAssistant, ProblemDevice, ExclusionSettings } from '../types';

export async function fetchProblemDevices(
  hass: HomeAssistant,
  batteryThreshold: number
): Promise<ProblemDevice[]> {
  const response = await hass.callWS<{ devices: ProblemDevice[] }>({
    type: 'device_health_exclusions/get_problem_devices',
    battery_threshold: batteryThreshold,
  });
  return response.devices;
}

export async function fetchExclusions(
  hass: HomeAssistant
): Promise<ExclusionSettings> {
  return await hass.callWS<ExclusionSettings>({
    type: 'device_health_exclusions/get_exclusions',
  });
}

export async function updateExclusions(
  hass: HomeAssistant,
  excludedEntities: string[],
  batteryThreshold?: number
): Promise<void> {
  await hass.callWS({
    type: 'device_health_exclusions/update_exclusions',
    excluded_entities: excludedEntities,
    ...(batteryThreshold && { battery_threshold: batteryThreshold }),
  });
}

export async function toggleExclusion(
  hass: HomeAssistant,
  entityId: string
): Promise<{ success: boolean; is_excluded: boolean }> {
  return await hass.callWS({
    type: 'device_health_exclusions/toggle_exclusion',
    entity_id: entityId,
  });
}
```

### Step 3.2: Shared Styles

**File:** `frontend/src/styles/panel-styles.ts`

```typescript
import { css } from 'lit';

export const panelStyles = css`
  :host {
    display: block;
    padding: 16px;
    background-color: var(--primary-background-color);
    color: var(--primary-text-color);
    font-family: var(--paper-font-body1_-_font-family);
  }

  .header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 24px;
  }

  .header h1 {
    margin: 0;
    font-size: 24px;
    font-weight: 400;
  }

  .toolbar {
    display: flex;
    gap: 16px;
    align-items: center;
    margin-bottom: 16px;
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

  .entity-name {
    font-weight: 500;
  }

  .entity-id {
    font-size: 12px;
    color: var(--secondary-text-color);
  }

  .status-badge {
    display: inline-block;
    padding: 4px 8px;
    border-radius: 12px;
    font-size: 12px;
    font-weight: 500;
  }

  .status-battery {
    background: var(--warning-color);
    color: white;
  }

  .status-unavailable {
    background: var(--error-color);
    color: white;
  }

  .status-excluded {
    background: var(--success-color);
    color: white;
  }

  .stats {
    display: flex;
    gap: 24px;
    margin-bottom: 16px;
  }

  .stat-card {
    flex: 1;
    padding: 16px;
    background: var(--card-background-color);
    border-radius: 8px;
    box-shadow: var(--ha-card-box-shadow);
  }

  .stat-value {
    font-size: 32px;
    font-weight: 300;
    color: var(--primary-color);
  }

  .stat-label {
    font-size: 14px;
    color: var(--secondary-text-color);
    margin-top: 4px;
  }

  .loading {
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 48px;
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
```

### Step 3.3: Filter Toolbar Component

**File:** `frontend/src/components/filter-toolbar.ts`

```typescript
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
```

### Step 3.4: Exclusions Table Component

**File:** `frontend/src/components/exclusions-table.ts`

```typescript
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
```

### Step 3.5: Main Panel Component

**File:** `frontend/src/device-health-panel.ts`

```typescript
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
```

---

## Phase 4: Build and Deployment (4-6 hours)

### Step 4.1: Build Frontend

```bash
cd frontend
npm install
npm run build
```

This creates `custom_components/device_health_exclusions/www/device-health-panel.js`

### Step 4.2: Serve Frontend Assets

**File:** `custom_components/device_health_exclusions/frontend.py`

```python
"""Frontend asset serving for Device Health Exclusions Manager."""
from __future__ import annotations

import logging
from pathlib import Path

from homeassistant.components.http import StaticPathConfig
from homeassistant.core import HomeAssistant

_LOGGER = logging.getLogger(__name__)

DOMAIN = "device_health_exclusions"


async def async_register_static_paths(hass: HomeAssistant) -> None:
    """Register static paths for frontend assets."""
    integration_dir = Path(__file__).parent
    www_dir = integration_dir / "www"

    if not www_dir.exists():
        _LOGGER.error("Frontend www directory not found: %s", www_dir)
        return

    await hass.http.async_register_static_paths(
        [
            StaticPathConfig(
                f"/api/{DOMAIN}",
                str(www_dir),
                cache_headers=False,
            )
        ]
    )
```

Update `__init__.py`:

```python
from .frontend import async_register_static_paths

async def async_setup(hass: HomeAssistant, config: dict) -> bool:
    """Set up the Device Health Exclusions Manager component."""
    async_register_websocket_handlers(hass)
    await async_register_static_paths(hass)
    return True
```

### Step 4.3: Create www Directory Structure

```
custom_components/device_health_exclusions/
├── www/
│   └── device-health-panel.js    # Built from frontend/
```

### Step 4.4: Testing

1. Copy integration to Home Assistant
2. Restart Home Assistant
3. Navigate to `/device-health-exclusions`
4. Test all features:
   - Table display
   - Checkbox toggling (real-time save)
   - Filter buttons (All/Not Excluded/Excluded)
   - Search functionality
   - Battery threshold adjustment

---

## Phase 5: Documentation and Polish (4-6 hours)

### Step 5.1: Update Documentation

**Update:** `README.md`, `INSTALLATION.md`, `QUICKSTART.md`

Add sections about:
- New panel interface
- How to access the full-page UI
- Difference between panel and config flow

### Step 5.2: Update CHANGELOG

Update the CHANGELOG.md with the new version's changes, following Keep a Changelog format.

---

## Testing Checklist

### Backend Testing
- [ ] WebSocket API handlers register correctly
- [ ] `get_problem_devices` returns correct device list
- [ ] `get_exclusions` returns current settings
- [ ] `update_exclusions` persists changes
- [ ] `toggle_exclusion` works for single devices
- [ ] Panel registration works
- [ ] Static assets served correctly

### Frontend Testing
- [ ] Panel loads without errors
- [ ] Table displays all problem devices
- [ ] Checkboxes reflect current exclusion state
- [ ] Clicking checkbox toggles exclusion (real-time)
- [ ] Filter "All" shows all devices
- [ ] Filter "Not Excluded" shows only non-excluded
- [ ] Filter "Excluded" shows only excluded
- [ ] Search filters by name and entity_id
- [ ] Battery threshold adjustment reloads data
- [ ] Statistics cards show correct counts
- [ ] UI theme respects Home Assistant theme
- [ ] Responsive design works on mobile

### Integration Testing
- [ ] Sensor still updates with exclusion changes
- [ ] Blueprint still works with panel-managed exclusions
- [ ] Config flow still works for initial setup
- [ ] Options flow is deprecated/removed (or kept)
- [ ] Update from v1.0.0 preserves existing exclusions

---

## Dependencies and Requirements

### Development Environment
- Node.js 18+ and npm
- Python 3.11+
- Home Assistant 2023.1.0+
- TypeScript knowledge
- Lit framework knowledge

### NPM Packages
- `lit`: ^3.1.0
- `@rollup/plugin-node-resolve`: ^15.2.3
- `@rollup/plugin-typescript`: ^11.1.5
- `rollup`: ^4.6.1
- `typescript`: ^5.3.2

### Home Assistant Components
- `frontend`
- `http`
- `websocket_api`
- `panel_custom`

---

## Potential Challenges

### 1. Home Assistant Frontend API Changes
**Risk:** HA frontend APIs may change between versions
**Mitigation:** Pin minimum HA version, test across versions

### 2. Browser Compatibility
**Risk:** Older browsers may not support ES2020
**Mitigation:** Target ES2020, document browser requirements

### 3. Build Pipeline Integration
**Risk:** Users may have trouble rebuilding frontend
**Mitigation:** Pre-build assets, include in releases

### 4. WebSocket Connection Handling
**Risk:** WS disconnects during long sessions
**Mitigation:** Add reconnection logic, error handling

### 5. State Synchronization
**Risk:** UI and backend state may drift
**Mitigation:** Reload data after mutations, optimistic updates

---

## Maintenance Plan

### Regular Updates
- Monitor Home Assistant frontend API changes
- Update TypeScript/Lit dependencies quarterly
- Test with each major HA release

### Build Automation
- Add frontend build to GitHub Actions
- Include built assets in releases
- Version frontend alongside integration

### User Support
- Document how to rebuild frontend if needed
- Provide troubleshooting guide
- Create GitHub issues template

---

## Alternative: Simpler Approach

If 40-60 hours is too much, consider this **hybrid approach** (10-15 hours):

1. Keep config flow for setup
2. Add a simple Lovelace card instead of full panel
3. Use custom card with basic table view
4. Still requires some frontend work but much simpler
5. Users add card to dashboard manually

This would give you:
- ✅ Table view
- ✅ Real-time updates
- ✅ Better UX than modal
- ❌ Not a full panel
- ❌ Requires manual dashboard setup

---

## Conclusion

Building a custom frontend panel is a **significant undertaking** but provides the best UX. The architecture outlined here uses modern Home Assistant patterns and should be maintainable long-term.

**Key Decision Points:**
1. Full panel (40-60 hours) vs. Custom card (10-15 hours)
2. Keep config flow or remove it
3. Pre-build assets or require users to build
4. Support old browsers or require modern browsers

**Recommended Path:**
- Implement full panel for best UX
- Keep config flow for initial setup
- Pre-build and include assets in releases
- Target modern browsers (ES2020)

This gives users the best experience while maintaining backwards compatibility.
