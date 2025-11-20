# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

## [2.0.0] - 2025-11-20

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

### Changed
- **Config flow still available** for initial setup
- **Panel is now primary interface** for managing exclusions
- **Version bumped to 2.0.0** in manifest
- **Added frontend dependencies** to manifest (frontend, http)

### Technical
- Lit 3.1.0 web components
- TypeScript with ES2020 target
- Rollup bundler with terser minification
- WebSocket-based real-time updates
- Static asset serving via Home Assistant HTTP component
- Source maps included for debugging

### Migration Notes
- See [MIGRATION_V2.md](MIGRATION_V2.md) for upgrade instructions
- Existing v1.0.0 installations will preserve settings
- No breaking changes to blueprint or sensor

## [1.0.0] - 2024-11-20

### Added
- Initial release of Device Health Monitoring system
- Custom integration: Device Health Exclusions Manager
  - Config flow UI with multi-select device picker
  - Visual interface showing only problem devices
  - Sensor entity exposing excluded device list
  - Options flow for updating settings
  - Real-time updates without restart
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
- Comprehensive documentation
  - Installation guides
  - Quick start guide
  - Distribution documentation
  - Maintainer guide
- GitHub Actions workflow for automated releases
- Package creator tool for distribution

### Features
- Smart device filtering (shows only devices with issues)
- Multi-select checkbox interface for exclusions
- Configurable battery threshold (5-50%)
- Excludes irrelevant domains (groups, automations, etc.)
- Styled HTML email reports
- Comma-separated list fallback for exclusions

### Technical
- Home Assistant 2023.1.0+ compatibility
- Local push integration (no external dependencies)
- Helper integration type
- Config entry based setup
- Proper async/await implementation
- Full translation support

[Unreleased]: https://github.com/noecker/ha-device-health-monitoring/compare/v1.0.0...HEAD
[1.0.0]: https://github.com/noecker/ha-device-health-monitoring/releases/tag/v1.0.0
