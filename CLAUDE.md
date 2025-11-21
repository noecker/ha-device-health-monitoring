# Repository Context: Home Assistant Device Health Monitoring

## Project Overview

**Name:** Device Health Exclusions Manager for Home Assistant
**Version:** 1.1.0
**Type:** Home Assistant Custom Integration + Blueprint
**License:** MIT
**Repository:** https://github.com/noecker/ha-device-health-monitoring

### Purpose
A complete solution for monitoring device health in Home Assistant with email reports and advanced exclusion management. Provides automated daily email reports of devices with low batteries or unavailable status, along with a custom panel interface for managing which devices to exclude from reports.

---

## Architecture

### Components

#### 1. Custom Integration (`custom_components/device_health_exclusions/`)
A Home Assistant custom integration that provides:
- **Custom Panel Interface** - Full-page UI in HA sidebar for exclusion management
- **WebSocket API** - Real-time communication with frontend
- **Sensor Entity** - Exposes excluded device list for blueprint consumption
- **Config Flow** - Initial setup and configuration interface

**Key Files:**
- [__init__.py](custom_components/device_health_exclusions/__init__.py) - Integration setup, registers WebSocket handlers, static paths, and panel
- [api.py](custom_components/device_health_exclusions/api.py) - WebSocket API handlers for device management
- [view.py](custom_components/device_health_exclusions/view.py) - Panel registration (sidebar item)
- [frontend.py](custom_components/device_health_exclusions/frontend.py) - Static asset serving
- [sensor.py](custom_components/device_health_exclusions/sensor.py) - Sensor entity exposing exclusion list
- [config_flow.py](custom_components/device_health_exclusions/config_flow.py) - Initial setup flow and options flow
- [manifest.json](custom_components/device_health_exclusions/manifest.json) - Integration metadata

#### 2. Frontend Application (`custom_components/device_health_exclusions/frontend/`)
Modern Lit-based TypeScript frontend providing:
- Table view for device management
- Real-time exclusion toggling (no page reload)
- Advanced filtering (All/Not Excluded/Excluded)
- Search by device name or entity ID
- Visual statistics dashboard
- Battery threshold adjustment

**Tech Stack:**
- Lit 3.1.0 (web components)
- TypeScript (ES2020 target)
- Rollup bundler with terser minification
- Source maps for debugging

**Build Output:** `www/device-health-panel.js`

**Source Files:**
- `src/device-health-panel.ts` - Main panel component
- `src/types.ts` - TypeScript type definitions
- `src/components/exclusions-table.ts` - Table component
- `src/components/filter-toolbar.ts` - Filter toolbar component
- `src/data/websocket.ts` - WebSocket communication layer
- `src/styles/panel-styles.ts` - Styling

#### 3. Automation Blueprint (`device_health_report.yaml`)
Home Assistant automation blueprint that:
- Sends daily HTML-formatted email reports
- Monitors battery levels below threshold
- Detects unavailable/offline devices
- Supports two exclusion modes:
  - **Integration Mode**: Reads from sensor entity
  - **Manual Mode**: Comma-separated list in blueprint config
- Optional "send only if issues found" mode

---

## Data Flow

```
┌─────────────────────────────────────────────────────────┐
│ User Interaction (Custom Panel)                         │
└─────────────────┬───────────────────────────────────────┘
                  │
                  ▼
┌─────────────────────────────────────────────────────────┐
│ WebSocket API (api.py)                                  │
│ - get_problem_devices                                   │
│ - get_exclusions                                        │
│ - update_exclusions                                     │
│ - toggle_exclusion                                      │
└─────────────────┬───────────────────────────────────────┘
                  │
                  ▼
┌─────────────────────────────────────────────────────────┐
│ Config Entry (HA Core)                                  │
│ - battery_threshold: int (5-50)                         │
│ - excluded_entities: list[str]                          │
└─────────────────┬───────────────────────────────────────┘
                  │
                  ▼
┌─────────────────────────────────────────────────────────┐
│ Sensor Entity                                           │
│ sensor.device_health_exclusions_excluded_entities       │
│ - State: comma-separated list                           │
│ - Attributes:                                           │
│   - excluded_entities: list                             │
│   - excluded_count: int                                 │
│   - battery_threshold: int                              │
└─────────────────┬───────────────────────────────────────┘
                  │
                  ▼
┌─────────────────────────────────────────────────────────┐
│ Blueprint Automation                                    │
│ - Reads exclusions from sensor                          │
│ - Filters problem devices                               │
│ - Sends email report                                    │
└─────────────────────────────────────────────────────────┘
```

---

## Key Features

### Custom Panel
- **Access:** Settings → Device Health (sidebar) or `/device-health-exclusions`
- **Real-time Updates:** WebSocket-based, no page reload needed
- **Smart Filtering:** Only shows devices with problems (low battery or unavailable)
- **Statistics Dashboard:** Visual counts of problem/excluded/reported devices
- **Table Interface:** Sortable, searchable device list with checkboxes
- **Battery Threshold:** Adjustable in UI (5-50%)

### Device Detection
**Problem devices are identified as:**
1. **Low Battery:** Sensor entities with `device_class: battery` and state < threshold
2. **Unavailable:** Any entity (except excluded domains) with state `unavailable` or `unknown`

**Excluded Domains:** group, automation, script, scene, update

### Integration Points
- **Home Assistant Core:** Config entries, entity registry
- **Frontend:** Panel custom component, HTTP static paths
- **WebSocket:** Component websocket_api for real-time communication
- **Blueprints:** Automation blueprint system

---

## File Structure

```
.
├── custom_components/
│   └── device_health_exclusions/      # Custom integration
│       ├── __init__.py                # Integration setup
│       ├── api.py                     # WebSocket API
│       ├── view.py                    # Panel registration
│       ├── frontend.py                # Static asset serving
│       ├── config_flow.py             # Setup flows
│       ├── sensor.py                  # Sensor entity
│       ├── manifest.json              # Integration metadata
│       ├── strings.json               # UI strings
│       ├── translations/              # i18n
│       ├── frontend/                  # Frontend source
│       │   ├── src/
│       │   │   ├── device-health-panel.ts
│       │   │   ├── components/
│       │   │   ├── data/
│       │   │   ├── styles/
│       │   │   └── types.ts
│       │   ├── package.json
│       │   ├── tsconfig.json
│       │   └── rollup.config.js
│       └── www/                       # Built assets
│           └── device-health-panel.js
├── device_health_report.yaml          # Blueprint
├── README.md                          # Main documentation
├── INSTALLATION.md                    # Install guide
├── CHANGELOG.md                       # Version history
├── CUSTOM_FRONTEND_SPEC.md            # Technical frontend docs
├── GETTING_STARTED_AS_MAINTAINER.md   # Maintainer guide
├── QUICKSTART.md                      # Quick start
├── info.md                            # HACS info
├── hacs.json                          # HACS config
├── install.sh                         # Bash installer
├── install.py                         # Python installer
└── create_package.sh                  # Package creator
```

---

## WebSocket API

### Commands

#### 1. `device_health_exclusions/get_problem_devices`
**Parameters:**
- `battery_threshold`: int (5-50)

**Returns:**
```json
{
  "devices": [
    {
      "entity_id": "sensor.bedroom_battery",
      "name": "Bedroom Sensor",
      "label": "Bedroom Sensor - sensor.bedroom_battery (15% battery)",
      "state": "15",
      "battery_level": 15,
      "is_excluded": false,
      "domain": "sensor",
      "device_class": "battery"
    }
  ]
}
```

#### 2. `device_health_exclusions/get_exclusions`
**Returns:**
```json
{
  "excluded_entities": ["sensor.bedroom_battery"],
  "battery_threshold": 20
}
```

#### 3. `device_health_exclusions/update_exclusions`
**Parameters:**
- `excluded_entities`: string[]
- `battery_threshold`: int (optional, 5-50)

**Returns:**
```json
{
  "success": true
}
```

#### 4. `device_health_exclusions/toggle_exclusion`
**Parameters:**
- `entity_id`: string

**Returns:**
```json
{
  "success": true,
  "is_excluded": true
}
```

---

## Configuration

### Config Entry Data Schema
```python
{
    "battery_threshold": int,      # 5-50, default 20
    "excluded_entities": list[str] # List of entity IDs
}
```

### Sensor Entity
**Entity ID:** `sensor.device_health_exclusions_excluded_entities`

**State:** Comma-separated string of excluded entity IDs

**Attributes:**
- `excluded_entities`: list[str]
- `excluded_count`: int
- `battery_threshold`: int

---

## Version History

### v1.1.0 (2025-11-21) - Current
**New Features:**
- Hierarchical device grouping by integration and device
- Device-level exclusions - exclude entire devices at once
- Enhanced search including integration and device name

### v1.0.0 (2025-11-20) - Initial Release
- Full-page custom panel interface
- WebSocket API for real-time updates
- Modern Lit-based TypeScript frontend
- Table view with filtering and search
- Statistics dashboard
- In-panel battery threshold adjustment
- Custom integration with config flow
- Sensor entity
- Device Health Report blueprint
- HTML email reports
- HACS compatibility

---

## Installation Methods

1. **HACS** (Recommended) - Add custom repository
2. **Automated Script** - Bash or Python installers
3. **Manual** - Copy files to custom_components/

See [INSTALLATION.md](INSTALLATION.md) for detailed instructions.

---

## Dependencies

### Runtime
- Home Assistant 2023.1.0+
- Python 3.11+
- Email notification service (for blueprint)

### Integration Dependencies (manifest.json)
- `frontend` - For panel custom component
- `http` - For static asset serving

### Frontend Build
- Lit 3.1.0
- TypeScript 5.3.2
- Rollup 4.6.1
- Node.js (for building)

---

## Development

### Frontend Build
```bash
cd custom_components/device_health_exclusions/frontend
npm install
npm run build    # Production build
npm run watch    # Development watch mode
```

### Testing Integration
1. Copy to HA instance
2. Restart Home Assistant
3. Add via Settings → Devices & Services
4. Access panel at `/device-health-exclusions`

### File Permissions
```bash
chmod 644 custom_components/device_health_exclusions/*.py
chmod 644 custom_components/device_health_exclusions/*.json
```

---

## Important Notes

### Design Decisions
- **Show Only Problem Devices:** UI only displays devices with actual issues (low battery or unavailable)
- **Real-time Updates:** WebSocket API enables instant updates without page reload
- **Dual Mode Support:** Blueprint supports both integration mode (sensor) and manual mode (comma-separated list)
- **Admin Only:** Panel requires admin privileges for security

### Excluded Domains
The following domains are automatically excluded from unavailable device detection:
- group
- automation
- script
- scene
- update

### Battery Detection
Only entities with `device_class: battery` are considered for battery monitoring. State must be numeric and parseable as float.

---

## Common Tasks

### Update Exclusions
**Via Panel (Preferred):**
1. Navigate to Settings → Device Health
2. Toggle checkboxes in table
3. Changes save automatically

**Via Options Flow:**
1. Settings → Devices & Services
2. Find "Device Health Exclusions Manager"
3. Click "Configure"
4. Update settings

### Change Battery Threshold
**Via Panel:**
- Adjust slider/input in panel UI
- Updates immediately via WebSocket

**Via Options Flow:**
- Configure → Update threshold → Select devices

### Blueprint Configuration
```yaml
exclusion_mode: "integration"  # or "manual"
exclusion_sensor: sensor.device_health_exclusions_excluded_entities
battery_threshold: 20
send_only_if_issues: true
```

---

## Troubleshooting

### Panel Not Appearing
- Verify `www/device-health-panel.js` exists
- Check browser console for errors
- Restart Home Assistant
- Clear browser cache

### WebSocket Errors
- Check Home Assistant logs
- Verify integration is loaded
- Ensure config entry exists

### Sensor Not Updating
- Changes to config entry should auto-update
- Check for errors in logs
- Reload integration if needed

### Frontend Build Issues
```bash
cd frontend
rm -rf node_modules package-lock.json
npm install
npm run build
```

---

## Git Information

**Current Branch:** main

**Status:** Clean working directory

---

## Contact & Support

- **Repository:** https://github.com/noecker/ha-device-health-monitoring
- **Issues:** https://github.com/noecker/ha-device-health-monitoring/issues
- **Documentation:** https://github.com/noecker/ha-device-health-monitoring

---

*Context file generated: 2025-11-21*
*Project Version: 1.1.0*
