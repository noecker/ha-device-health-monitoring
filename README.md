# Home Assistant Device Health Monitoring

A complete solution for monitoring device health in Home Assistant with email reports and advanced exclusion management.

## ✨ New in v2.0.0: Full-Page Custom Panel

Version 2.0.0 introduces a **modern full-page panel interface** accessible directly from the Home Assistant sidebar!

- **Real-time device management** with instant updates
- **Table view** with filtering, search, and statistics
- **One-click exclusion toggling** (no page reload needed)
- **Visual dashboard** showing problem/excluded/reported counts

Access via: **Settings → Device Health** (heart icon in sidebar)

## What's Included

### 1. Device Health Report Blueprint
An automation blueprint that sends daily email reports of:
- Devices with low battery
- Unavailable/offline devices
- Beautiful HTML-formatted emails

### 2. Device Health Exclusions Manager (Custom Integration) - v2.0.0
A custom integration with both **custom panel** and **config flow** interfaces:
- **Full-page panel** for day-to-day exclusion management
- **Table view** with real-time updates
- **Advanced filtering** (All/Not Excluded/Excluded)
- **Search** by device name or entity ID
- **Statistics dashboard** with visual indicators
- **Battery threshold adjustment** in UI
- **Config flow** still available for initial setup

## Quick Start

### Basic Setup (Manual Exclusions)
1. Install the `device_health_report.yaml` blueprint
2. Create an automation from the blueprint
3. Configure notification service and settings
4. Add exclusions as comma-separated entity IDs

### Advanced Setup (Integration with Custom Panel) - v2.0.0
1. Install the custom integration (see [INSTALLATION.md](INSTALLATION.md))
2. Add "Device Health Exclusions Manager" integration via config flow
3. Access the panel: **Settings → Device Health**
4. Manage exclusions using the full-page interface
5. Update blueprint to use "Integration Mode"

## Features

### Device Health Report
- 📧 HTML email reports with styling
- 🔋 Battery level monitoring with configurable threshold
- ❌ Unavailable device detection
- 📅 Scheduled daily reports
- ⚙️ Optional: only send if issues found

### Exclusions Manager - v2.0.0
- 🖥️ **Full-page custom panel** in sidebar
- 📊 **Statistics dashboard** with problem/excluded/reported counts
- 🔍 **Advanced filtering** (All/Not Excluded/Excluded)
- 🔎 **Search functionality** by name or entity ID
- ☑️ **Table view** with checkbox interface
- ⚡ **Real-time toggling** (instant updates, no reload)
- 🎯 Shows ONLY problem devices
- 📈 Battery threshold adjustment in UI
- 📊 Sensor entity with exclusion data
- 🔄 Config flow for initial setup

## Documentation

- [Installation Guide](INSTALLATION.md) - Detailed setup instructions
- [Migration Guide v2.0.0](MIGRATION_V2.md) - Upgrade from v1.0.0
- [Custom Frontend Spec](CUSTOM_FRONTEND_SPEC.md) - Technical implementation details
- [Integration README](custom_components/device_health_exclusions/README.md) - Technical details
- [Changelog](CHANGELOG.md) - Version history

## Files

```
├── device_health_report.yaml          # Blueprint for automation
├── custom_components/
│   └── device_health_exclusions/      # Custom integration v2.0.0
│       ├── __init__.py                # Integration setup
│       ├── api.py                     # WebSocket API handlers
│       ├── view.py                    # Panel registration
│       ├── frontend.py                # Static asset serving
│       ├── config_flow.py             # Config/options flow
│       ├── sensor.py                  # Sensor entity
│       ├── manifest.json              # Integration metadata
│       ├── frontend/                  # Frontend source (TypeScript)
│       │   ├── src/
│       │   │   ├── device-health-panel.ts
│       │   │   ├── components/
│       │   │   ├── data/
│       │   │   ├── styles/
│       │   │   └── types.ts
│       │   ├── package.json
│       │   ├── tsconfig.json
│       │   └── rollup.config.js
│       └── www/                       # Built frontend assets
│           └── device-health-panel.js
├── INSTALLATION.md                    # Setup guide
├── MIGRATION_V2.md                    # v1.0.0 → v2.0.0 upgrade guide
├── CHANGELOG.md                       # Version history
└── README.md                          # This file
```

## Requirements

- Home Assistant 2023.1+
- Email notification service configured (e.g., SMTP)
- Python 3.11+ (for custom integration)

## License

MIT
