# Home Assistant Device Health Monitoring

A complete solution for monitoring device health in Home Assistant with email reports and advanced exclusion management.

## What's Included

### 1. Device Health Report Blueprint
An automation blueprint that sends daily email reports of:
- Devices with low battery
- Unavailable/offline devices
- Beautiful HTML-formatted emails

### 2. Device Health Exclusions Manager (Custom Integration)
A custom integration providing a UI to:
- View ONLY devices that would appear in reports
- Multi-select devices to exclude
- Update exclusions anytime through the UI

## Quick Start

### Basic Setup (Manual Exclusions)
1. Install the `device_health_report.yaml` blueprint
2. Create an automation from the blueprint
3. Configure notification service and settings
4. Add exclusions as comma-separated entity IDs

### Advanced Setup (Integration with UI)
1. Install the custom integration (see [INSTALLATION.md](INSTALLATION.md))
2. Add "Device Health Exclusions Manager" integration
3. Select devices to exclude from the UI
4. Update blueprint to use "Integration Mode"

## Features

### Device Health Report
- 📧 HTML email reports with styling
- 🔋 Battery level monitoring with configurable threshold
- ❌ Unavailable device detection
- 📅 Scheduled daily reports
- ⚙️ Optional: only send if issues found

### Exclusions Manager
- 🎯 Shows ONLY problem devices
- ☑️ Multi-select checkbox interface
- 🔄 Real-time updates
- 📊 Sensor entity with exclusion data
- ⚡ No restart needed for changes

## Documentation

- [Installation Guide](INSTALLATION.md) - Detailed setup instructions
- [Integration README](custom_components/device_health_exclusions/README.md) - Technical details

## Files

```
├── device_health_report.yaml          # Blueprint for automation
├── custom_components/
│   └── device_health_exclusions/      # Custom integration
│       ├── __init__.py
│       ├── config_flow.py
│       ├── sensor.py
│       ├── manifest.json
│       └── ...
├── INSTALLATION.md                    # Setup guide
└── README.md                          # This file
```

## Requirements

- Home Assistant 2023.1+
- Email notification service configured (e.g., SMTP)
- Python 3.11+ (for custom integration)

## License

MIT
