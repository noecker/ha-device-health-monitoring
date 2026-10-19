# Device Health Exclusions Manager

Easily manage which devices to exclude from your health monitoring reports with a beautiful UI!

## Features

✨ **Visual Multi-Select Interface** - Check boxes to exclude devices
🎯 **Smart Filtering** - Shows ONLY problem devices
🔋 **Battery Monitoring** - Configurable threshold
❌ **Unavailable Detection** - Finds offline devices
🔄 **Real-time Updates** - No restart needed
📊 **Sensor Integration** - Exposes data for automations

## What This Does

When you add this integration, it:
1. Scans your Home Assistant for devices with low battery or unavailable status
2. Shows you a filtered list of ONLY these problem devices
3. Lets you multi-select which ones to exclude from reports
4. Creates a sensor with your exclusion list
5. Works seamlessly with the Device Health Report blueprint

## Quick Install

### Via HACS (Recommended)
1. Add this repository to HACS as a custom repository
2. Search for "Device Health Exclusions Manager"
3. Click Install
4. Restart Home Assistant
5. Add the integration via Settings → Devices & Services

### Manual Install
1. Copy `custom_components/device_health_exclusions` to your `/config/custom_components/`
2. Restart Home Assistant
3. Add via Settings → Devices & Services

## Usage

1. **Add Integration**: Settings → Devices & Services → Add Integration
2. **Set Threshold**: Choose your battery percentage threshold
3. **Select Devices**: Check boxes next to devices to exclude
4. **Done!**: A sensor is created at `sensor.device_health_exclusions_excluded_entities`

## Works With

This integration is designed to work with the **Device Health Report** blueprint, but you can use the sensor data in any automation!

## Sensor Data

The exclusions sensor exposes:
- **State**: Comma-separated list of excluded entities
- **Attributes**:
  - `excluded_entities`: List format
  - `excluded_count`: Number of excluded devices
  - `battery_threshold`: Your configured threshold

The **Problem Count** sensor exposes:
- **State**: Number of problem entities after all exclusions
- **Attributes**: `low_battery`, `unavailable`, `unknown`, `battery_threshold`

Feed the counts to a [Majordomo](https://github.com/noecker/majordomo) queue with the
`device_health_majordomo.yaml` blueprint; see MAJORDOMO.md in the repository.

## Updating Exclusions

Need to update your exclusions? Easy!
1. Go to Settings → Devices & Services
2. Find "Device Health Exclusions Manager"
3. Click "Configure"
4. Update your selections
5. Submit - changes apply immediately!

## Support

- [Full Documentation](https://github.com/noecker/ha-device-health-monitoring)
- [Report Issues](https://github.com/noecker/ha-device-health-monitoring/issues)
- [Quick Start Guide](https://github.com/noecker/ha-device-health-monitoring/blob/main/QUICKSTART.md)
