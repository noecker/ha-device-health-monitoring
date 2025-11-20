# Migration Guide: v1.0.0 to v2.0.0

This guide helps you migrate from Device Health Exclusions Manager v1.0.0 to v2.0.0.

## What's New in v2.0.0

Version 2.0.0 introduces a **full-page custom panel** for managing device exclusions, replacing the modal-based config flow as the primary interface.

### Key Changes

- **New Custom Panel**: Full-page interface accessible from the Home Assistant sidebar
- **Real-time Updates**: Toggle exclusions without page reloads
- **Enhanced UI**: Table view with filtering, search, and statistics
- **WebSocket API**: Backend support for real-time device management
- **Config Flow Preserved**: Initial setup still uses config flow (unchanged)

## Migration Steps

### For New Installations

1. Install v2.0.0 as normal
2. Complete the config flow setup (unchanged from v1.0.0)
3. Access the new panel via **Settings → Device Health** in the sidebar

### For Existing v1.0.0 Installations

Version 2.0.0 is **fully backwards compatible**. Your existing settings will be preserved.

#### Automatic Migration

1. Update to v2.0.0 (via HACS or manual installation)
2. Restart Home Assistant
3. Your existing exclusions and settings are automatically migrated
4. Access the new panel via **Settings → Device Health** in the sidebar

#### What Gets Migrated

✅ **Preserved:**
- Excluded entity list
- Battery threshold setting
- Config entry data
- Sensor entity (`sensor.device_health_exclusions`)
- Blueprint automation (no changes needed)

❌ **Not Changed:**
- Config flow (still available for initial setup)
- Options flow (still works for reconfiguration)

## Using the New Panel

### Accessing the Panel

1. Open Home Assistant
2. Navigate to **Settings** (or use the sidebar)
3. Click **Device Health** (new menu item with heart icon)
4. You'll see the full-page panel interface

### Panel Features

#### Statistics Dashboard
- **Problem Devices**: Total devices with issues
- **Excluded**: Number of excluded devices
- **Will Be Reported**: Devices that will appear in reports

#### Filter Toolbar
- **All Devices**: Show all problem devices
- **Not Excluded**: Show only devices that will be reported
- **Excluded**: Show only excluded devices
- **Search**: Filter by device name or entity ID
- **Battery %**: Adjust battery threshold (5-50%)

#### Device Table
- **Exclude Checkbox**: Toggle exclusion with one click
- **Device Name**: Friendly name and entity ID
- **Status**: Low Battery or Unavailable badge
- **Battery**: Current battery percentage
- **Domain**: Entity domain (sensor, binary_sensor, etc.)

### Real-time Updates

Changes made in the panel are **immediately saved** and reflected in:
- The sensor entity (`sensor.device_health_exclusions`)
- The blueprint automation (next run will use updated exclusions)
- The panel statistics (updates instantly)

## Comparison: v1.0.0 vs v2.0.0

### v1.0.0 (Modal Interface)
- ✅ Multi-select dropdown for exclusions
- ❌ Modal-based (limited space)
- ❌ Form-based submit (slower)
- ❌ No filtering or search
- ❌ No visual statistics

### v2.0.0 (Full Panel)
- ✅ Table view with checkboxes
- ✅ Full-page interface (more space)
- ✅ Real-time save (instant)
- ✅ Advanced filtering and search
- ✅ Statistics dashboard
- ✅ Better mobile experience

## Troubleshooting

### Panel Not Appearing

1. Verify you're running v2.0.0:
   ```bash
   # Check manifest.json
   cat custom_components/device_health_exclusions/manifest.json
   ```
   Should show `"version": "2.0.0"`

2. Ensure Home Assistant was restarted after upgrade
3. Check Home Assistant logs for errors:
   ```
   Settings → System → Logs
   ```

### Frontend Not Loading

1. Verify frontend assets exist:
   ```bash
   ls custom_components/device_health_exclusions/www/
   ```
   Should contain `device-health-panel.js`

2. Clear browser cache:
   - Chrome/Edge: Ctrl+Shift+Delete
   - Firefox: Ctrl+Shift+Del
   - Safari: Cmd+Option+E

3. Try accessing the panel in an incognito/private window

### WebSocket Errors

If you see WebSocket errors in the browser console:

1. Ensure Home Assistant frontend dependencies are loaded
2. Restart Home Assistant
3. Check that manifest.json includes:
   ```json
   "dependencies": ["frontend"],
   "after_dependencies": ["http"]
   ```

## Reverting to v1.0.0

If you need to revert:

1. Uninstall v2.0.0
2. Install v1.0.0
3. Restart Home Assistant
4. Your settings will still be preserved (config entry unchanged)

Note: You'll lose access to the custom panel, but config/options flows will work as before.

## Blueprint Compatibility

The device health report blueprint is **100% compatible** with v2.0.0. No changes needed.

The blueprint will continue to:
- Read exclusions from the sensor entity
- Work with both panel and config flow updates
- Function exactly as it did in v1.0.0

## Need Help?

- **Documentation**: [README.md](README.md), [INSTALLATION.md](INSTALLATION.md)
- **Issues**: [GitHub Issues](https://github.com/noecker/ha-device-health-monitoring/issues)
- **Spec**: [CUSTOM_FRONTEND_SPEC.md](CUSTOM_FRONTEND_SPEC.md) (technical details)

## Summary

✅ **Safe to upgrade**: No breaking changes
✅ **Automatic migration**: Settings preserved
✅ **Better UX**: Full-page panel with real-time updates
✅ **Backwards compatible**: Config flow still works

Enjoy the enhanced Device Health Exclusions Manager v2.0.0!
