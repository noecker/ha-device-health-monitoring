# Device Health Exclusions Manager

A Home Assistant custom integration that provides a user-friendly config flow interface for managing device exclusions in health reports.

## Features

- **Smart Device Discovery**: Automatically finds devices with low battery or unavailable status
- **Visual Multi-Select**: Check boxes to select which devices to exclude
- **Real-time Updates**: Changes take effect immediately via sensor entity
- **Configurable Threshold**: Set your own battery percentage threshold
- **Options Flow**: Easily update exclusions anytime through the UI

## How It Works

1. **Config Flow**: When you add the integration, it scans your Home Assistant instance
2. **Problem Detection**: Identifies devices that match your criteria (low battery or unavailable)
3. **Selection UI**: Presents these devices in a multi-select list
4. **Sensor Creation**: Creates a sensor entity with your excluded device list
5. **Blueprint Integration**: The Device Health Report blueprint reads from this sensor

## Installation

Copy this directory to `/config/custom_components/device_health_exclusions/` and restart Home Assistant.

See the main INSTALLATION.md for detailed setup instructions.

## Technical Details

### Sensor Entity

Creates: `sensor.device_health_exclusions_excluded_entities`

**State**: Comma-separated list of excluded entity IDs

**Attributes**:
- `excluded_entities`: List of excluded entity IDs
- `excluded_count`: Number of excluded entities
- `battery_threshold`: Current battery threshold setting

### Config Flow Steps

1. **User Step**: Set battery threshold (5-50%)
2. **Select Devices Step**: Multi-select from problem devices

### Options Flow

Allows updating the configuration after initial setup:
1. Update battery threshold
2. Update device selections

## Requirements

- Home Assistant 2023.1 or later
- No external dependencies

## License

MIT License
