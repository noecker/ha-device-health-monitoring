# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

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

[Unreleased]: https://github.com/YOUR_USERNAME/ha-customizations/compare/v1.0.0...HEAD
[1.0.0]: https://github.com/YOUR_USERNAME/ha-customizations/releases/tag/v1.0.0
