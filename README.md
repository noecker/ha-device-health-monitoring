# Home Assistant Device Health Monitoring

A complete solution for monitoring device health in Home Assistant with email reports and advanced exclusion management.

## Features

- **Full-page custom panel** accessible from the Home Assistant sidebar
- **Hierarchical grouping** by integration and device
- **Device-level exclusions** - exclude entire devices with one click
- **Real-time device management** with instant updates
- **Table view** with filtering, search, and statistics
- **One-click exclusion toggling** (no page reload needed)
- **Visual dashboard** showing problem/excluded/reported counts
- **Problem Count sensor** with per-class counts for automations and dashboards
- **Majordomo feed** - post the counts to a self-hosted operations queue ([MAJORDOMO.md](MAJORDOMO.md))

Access via: **Settings → Device Health** (heart icon in sidebar)

## What's Included

### 1. Device Health Report Blueprint
An automation blueprint that sends daily email reports of:
- Devices with low battery
- Unavailable/offline devices
- Beautiful HTML-formatted emails

### 2. Device Health Exclusions Manager (Custom Integration)
A custom integration with both **custom panel** and **config flow** interfaces:
- **Full-page panel** for day-to-day exclusion management
- **Hierarchical view** grouped by integration and device
- **Device-level exclusions** - exclude all entities from a device at once
- **Advanced filtering** (All/Not Excluded/Excluded)
- **Search** by device name, entity ID, or integration
- **Statistics dashboard** with visual indicators
- **Battery threshold adjustment** in UI
- **Config flow** still available for initial setup
- **Two sensors**: the exclusion list, and a **Problem Count** whose attributes carry
  the low-battery / unavailable / unknown counts after all exclusions

### 3. Device Health → Majordomo Blueprint
An automation blueprint that posts the problem counts to a
[Majordomo](https://github.com/noecker/majordomo) operations queue as up to three
condition items, each linking back to the panel. The device list stays in Home
Assistant. See [MAJORDOMO.md](MAJORDOMO.md).

## Quick Start

### Basic Setup (Manual Exclusions)
1. Install the `device_health_report.yaml` blueprint
2. Create an automation from the blueprint
3. Configure notification service and settings
4. Add exclusions as comma-separated entity IDs

### Advanced Setup (Integration with Custom Panel)
1. Install the custom integration (see [INSTALLATION.md](INSTALLATION.md))
2. Add "Device Health Exclusions Manager" integration via config flow
3. Access the panel: **Settings → Device Health**
4. Manage exclusions using the full-page interface
5. Update blueprint to use "Integration Mode"

## Feature Details

### Device Health Report
- HTML email reports with styling
- Battery level monitoring with configurable threshold
- Unavailable device detection
- Scheduled daily reports
- Optional: only send if issues found

### Exclusions Manager
- **Full-page custom panel** in sidebar
- **Hierarchical grouping** by integration, then device, then entities
- **Device-level exclusions** - one checkbox excludes all entities from a device
- **Statistics dashboard** with problem/excluded/reported counts
- **Advanced filtering** (All/Not Excluded/Excluded)
- **Search functionality** by name, entity ID, or integration
- **Table view** with checkbox interface
- **Real-time toggling** (instant updates, no reload)
- Shows ONLY problem devices
- Battery threshold adjustment in UI
- Sensor entity with exclusion data
- Problem Count sensor (total after exclusions; attributes per class)
- Config flow for initial setup

### Majordomo Feed
- Counts only: three condition items at most, never a device list
- Posted with `/api/v1/sync`, so a class that reaches zero closes itself
- Settle delay against flapping devices, daily re-assert for freshness
- Severity per class; `high` pushes once when a count leaves zero

## Documentation

- [Installation Guide](INSTALLATION.md) - Detailed setup instructions
- [Majordomo Feed](MAJORDOMO.md) - Posting the counts to a Majordomo queue
- [Custom Frontend Spec](CUSTOM_FRONTEND_SPEC.md) - Technical implementation details
- [Integration README](custom_components/device_health_exclusions/README.md) - Technical details
- [Changelog](CHANGELOG.md) - Version history

## Files

```
├── device_health_report.yaml          # Blueprint: daily email report
├── device_health_majordomo.yaml       # Blueprint: counts into Majordomo
├── custom_components/
│   └── device_health_exclusions/      # Custom integration
│       ├── __init__.py                # Integration setup
│       ├── api.py                     # WebSocket API handlers
│       ├── view.py                    # Panel registration
│       ├── frontend.py                # Static asset serving
│       ├── config_flow.py             # Config/options flow
│       ├── health.py                  # Detection rules (no HA imports)
│       ├── sensor.py                  # Sensor entities
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
├── tests/                             # Unit tests for health.py
├── INSTALLATION.md                    # Setup guide
├── MAJORDOMO.md                       # Feeding a Majordomo queue
├── CHANGELOG.md                       # Version history
└── README.md                          # This file
```

## Requirements

- Home Assistant 2023.1+
- Email notification service configured (e.g., SMTP) for the report blueprint
- A Majordomo instance and intake token for the Majordomo blueprint (optional)
- Python 3.11+ (for custom integration)

## License

MIT
