# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

## [1.1.0] - 2025-11-21

### Added
- **Hierarchical device grouping** - Entities are now grouped by integration, then by device
- **Device-level exclusions** - Exclude entire devices with one checkbox instead of individual entities
- **Integration display** - See which integration each device belongs to
- **Device metadata** - Shows manufacturer and model information for devices
- **Enhanced search** - Search now includes device name and integration name
- **New WebSocket command** `toggle_device_exclusion` for device-level toggling
- **Sensor attributes** for excluded devices (`excluded_devices`, `excluded_device_count`)

### Changed
- **Table view redesigned** with collapsible integration and device sections
- **Entity rows** now show when excluded via device vs directly excluded
- **Statistics** show per-integration and per-device exclusion counts

### Technical
- Added device registry and entity registry lookups in API
- Extended `ProblemDevice` interface with device/integration fields
- Added `DeviceGroup` and `IntegrationGroup` types for hierarchical display

## [1.0.2] - 2025-11-20

### Fixed
- **Checkbox state alignment** when filtering devices
  - Use Lit's `repeat` directive with unique keys (entity_id) for list rendering
  - Prevents checkboxes from getting misaligned when devices are filtered out
  - Fixes issue where next device's checkbox would appear checked after excluding a device

## [1.0.1] - 2025-11-20

### Fixed
- **Scroll position maintained** when toggling device exclusions in custom panel
  - Removed unnecessary data reload that caused scroll-to-top behavior
  - Panel now keeps scroll position when checking/unchecking devices
  - Statistics update immediately without full page refresh

## [1.0.0] - 2025-11-20

### Added
- **Full-page custom panel interface** for Device Health Exclusions Manager
- **WebSocket API** for real-time device management
  - `get_problem_devices`: Fetch devices with issues
  - `get_exclusions`: Retrieve current exclusion settings
  - `update_exclusions`: Update exclusion list
  - `toggle_exclusion`: Toggle single device exclusion
- **Modern Lit-based frontend** with TypeScript
  - Table view for device management
  - Real-time exclusion toggling (no page reload needed)
  - Advanced filtering (All/Not Excluded/Excluded)
  - Search by device name or entity ID
  - Visual statistics dashboard
  - Battery threshold adjustment in UI
- **Panel registration** in Home Assistant sidebar
  - Direct access via Settings → Device Health
  - Full-page experience (not modal-based)
  - Persistent navigation item
- Custom integration with config flow
- Multi-select device picker
- Sensor entity exposing excluded device list
- Options flow for updating settings
- Device Health Report blueprint
  - HTML-formatted email reports
  - Battery level monitoring with configurable threshold
  - Unavailable device detection
  - Dual exclusion modes (integration or manual)
  - Scheduled daily reports
  - Optional "send only if issues" mode
- Multiple installation methods
  - HACS compatibility
  - Automated install scripts (Bash and Python)
  - Manual installation support

### Technical
- Lit 3.1.0 web components
- TypeScript with ES2020 target
- Rollup bundler with terser minification
- WebSocket-based real-time updates
- Static asset serving via Home Assistant HTTP component
- Source maps included for debugging
- Home Assistant 2023.1.0+ compatibility
- Local push integration (no external dependencies)
- Helper integration type
- Config entry based setup

[Unreleased]: https://github.com/noecker/ha-device-health-monitoring/compare/v1.1.0...HEAD
[1.1.0]: https://github.com/noecker/ha-device-health-monitoring/compare/v1.0.2...v1.1.0
[1.0.2]: https://github.com/noecker/ha-device-health-monitoring/compare/v1.0.1...v1.0.2
[1.0.1]: https://github.com/noecker/ha-device-health-monitoring/compare/v1.0.0...v1.0.1
[1.0.0]: https://github.com/noecker/ha-device-health-monitoring/releases/tag/v1.0.0
