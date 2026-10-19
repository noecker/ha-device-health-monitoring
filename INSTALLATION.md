# Installation Guide

Complete installation guide for the Device Health Monitoring system.

## Features

- **Full-page panel** accessible from Home Assistant sidebar (Settings → Device Health)
- **Hierarchical grouping** by integration and device
- **Device-level exclusions** - exclude entire devices with one click
- **Real-time device management** with instant updates
- **Table view** with filtering, search, and statistics
- **WebSocket API** for seamless communication

## What This Does

The Device Health Exclusions Manager provides a user-friendly interface to:
1. **View only problem devices** - See a filtered list of devices with low battery or unavailable status
2. **Manage exclusions via custom panel** - Full-page interface with table view, filtering, and search
3. **One-click exclusion toggling** - Real-time updates without page reload
4. **Visual statistics** - Dashboard showing problem/excluded/reported counts
5. **Seamless integration** - Works with the Device Health Report blueprint automatically

---

## Choose Your Installation Method

| Method | Difficulty | Time | Best For |
|--------|-----------|------|----------|
| [HACS](#method-1-hacs-recommended) | ⭐ Easy | 2 min | Most users |
| [Auto Install Script](#method-2-automated-script) | ⭐⭐ Medium | 5 min | CLI users |
| [Manual Install](#method-3-manual-installation) | ⭐⭐⭐ Advanced | 10 min | Advanced users |

---

## Method 1: HACS (Recommended)

**Home Assistant Community Store** - The easiest way!

### Prerequisites
- HACS installed on your Home Assistant
- Access to Home Assistant settings

### Steps

1. **Add Custom Repository**
   - Open HACS in Home Assistant
   - Click on "Integrations"
   - Click the three dots (⋮) in the top right
   - Select "Custom repositories"
   - Add this repository URL: `https://github.com/noecker/ha-device-health-monitoring`
   - Category: Integration
   - Click "Add"

2. **Install via HACS**
   - Search for "Device Health Exclusions Manager"
   - Click "Download"
   - Restart Home Assistant

3. **Install Blueprint**
   - The blueprint is included in the repository
   - Go to Settings → Automations & Scenes
   - Click "Blueprints" tab
   - Import from: `https://github.com/noecker/ha-device-health-monitoring/blob/main/device_health_report.yaml`

4. **Configure Integration**
   - Settings → Devices & Services → Add Integration
   - Search "Device Health Exclusions Manager"
   - Follow setup wizard

✅ **Done!** Continue to [Configuration](#configuration)

---

## Method 2: Automated Script

**Bash or Python script** - Automated installation for CLI users.

### Prerequisites
- SSH or Terminal Access to Home Assistant
- Basic command line knowledge

### Option A: Bash Script (Linux/macOS)

```bash
# Clone or download the repository
git clone https://github.com/noecker/ha-device-health-monitoring.git
cd ha-device-health-monitoring

# Run the installer
./install.sh
```

### Option B: Python Script (Cross-platform)

```bash
# Clone or download the repository
git clone https://github.com/noecker/ha-device-health-monitoring.git
cd ha-device-health-monitoring

# Run Python installer
python3 install.py
```

### What the scripts do:
- ✓ Copy custom integration to `/config/custom_components/`
- ✓ Copy blueprint to `/config/blueprints/automation/`
- ✓ Copy documentation files
- ✓ Create necessary directories
- ✓ Verify installation

### After running script:
1. Restart Home Assistant
2. Add integration via UI (Settings → Devices & Services)
3. Create automation from blueprint

✅ **Done!** Continue to [Configuration](#configuration)

---

## Method 3: Manual Installation

**Step-by-step manual setup** - Full control over installation.

### Part A: Install Custom Integration

1. **Download the repository**
   ```bash
   wget https://github.com/noecker/ha-device-health-monitoring/archive/refs/heads/main.zip
   unzip main.zip
   ```

2. **Copy integration files**

   Copy the entire `custom_components/device_health_exclusions/` folder to:
   ```
   /config/custom_components/device_health_exclusions/
   ```

   Your structure should be:
   ```
   /config/
   └── custom_components/
       └── device_health_exclusions/
           ├── __init__.py
           ├── config_flow.py
           ├── sensor.py
           ├── manifest.json
           ├── strings.json
           ├── README.md
           └── translations/
               └── en.json
   ```

3. **Verify file permissions**
   ```bash
   chmod 644 /config/custom_components/device_health_exclusions/*.py
   chmod 644 /config/custom_components/device_health_exclusions/*.json
   ```

4. **Restart Home Assistant**

### Part B: Install Blueprint

1. **Copy blueprint file**

   Copy `device_health_report.yaml` to:
   ```
   /config/blueprints/automation/device_health_report.yaml
   ```

2. **Or import via UI**
   - Settings → Automations & Scenes → Blueprints
   - Click "Import Blueprint"
   - Paste: `https://github.com/noecker/ha-device-health-monitoring/blob/main/device_health_report.yaml`

3. **Optional: the Majordomo blueprint**

   If you run a [Majordomo](https://github.com/noecker/majordomo) queue, install
   `device_health_majordomo.yaml` the same way (copy to
   `/config/blueprints/automation/`, or import
   `https://github.com/noecker/ha-device-health-monitoring/blob/main/device_health_majordomo.yaml`).
   Its configuration is a separate flow; see [End-to-end setup with Majordomo](#end-to-end-setup-with-majordomo).

✅ **Done!** Continue to [Configuration](#configuration)

---

## Configuration

### Step 1: Add the Integration

1. Go to **Settings** → **Devices & Services**
2. Click **+ Add Integration** (bottom right)
3. Search for "Device Health Exclusions Manager"
4. Click to start setup

### Step 2: Configure Exclusions (Initial Setup)

1. **Set Battery Threshold**
   - Enter desired battery percentage (default: 20%)
   - This determines what's considered "low battery"

2. **Select Devices to Exclude**
   - You'll see a filtered list of problem devices
   - Check boxes next to devices you want to exclude
   - These devices won't appear in reports

3. **Submit**
   - A sensor is created: `sensor.device_health_exclusions_excluded_entities`

### Step 2b: Using the Custom Panel

**After initial setup, use the custom panel for managing exclusions:**

1. **Access the Panel**
   - Navigate to **Settings** → **Device Health** (heart icon in sidebar)
   - Or visit: `/device-health-exclusions` directly

2. **Panel Features**
   - **Statistics Dashboard**: View problem/excluded/reported counts
   - **Filter Toolbar**: Filter by All/Not Excluded/Excluded
   - **Search**: Find devices by name or entity ID
   - **Battery Threshold**: Adjust threshold (updates immediately)
   - **Table View**: See all problem devices with their status

3. **Managing Exclusions**
   - **Toggle Checkboxes**: Click checkbox to exclude/include devices
   - **Real-time Updates**: Changes save immediately (no reload needed)
   - **Visual Feedback**: Statistics update instantly

The custom panel provides a much better experience than the config flow options menu!

### Step 3: Create Automation

1. Go to **Settings** → **Automations & Scenes**
2. Click **+ Create Automation** → **Use Blueprint**
3. Select "Device Health Report"

4. **Configure Blueprint**:
   - **Report Time**: When to send (e.g., 09:00:00)
   - **Battery Threshold**: Alert threshold % (e.g., 20)
   - **Notification Service**: Your email service (e.g., `notify.smtp`)
   - **Send Only If Issues**: ✅ Recommended
   - **Exclusion Mode**: "Use Exclusions Manager Integration"
   - **Exclusion Sensor**: Select `sensor.device_health_exclusions_excluded_entities`

5. **Save** and **Test**!

---

## Verification

### Check Integration
```bash
# Verify files exist
ls -la /config/custom_components/device_health_exclusions/

# Check Home Assistant logs for errors
tail -f /config/home-assistant.log | grep device_health
```

### Check Sensor
- Go to Developer Tools → States
- Search for: `sensor.device_health_exclusions_excluded_entities`
- Should show your excluded entities
- A second sensor, **Problem Count**, shows the number of problem entities after
  exclusions with `low_battery`, `unavailable` and `unknown` attributes

### Test Automation
1. Go to your automation
2. Click **︙** → **Run**
3. Check your email!

---

## End-to-end setup with Majordomo

Optional. This wires the integration into a self-hosted
[Majordomo](https://github.com/noecker/majordomo) operations queue so the queue shows
"3 devices with low battery" as one row linking back to the Device Health panel. The
device list itself never leaves Home Assistant. [MAJORDOMO.md](MAJORDOMO.md) explains the
design and the item shape; this is the order of operations across the two systems.

### On the Majordomo side

1. **Deploy Majordomo.** Out of scope here; its [README](https://github.com/noecker/majordomo#readme)
   describes the image and the `web` container. The only requirement for this feed is
   that Home Assistant can reach the `web` container over HTTPS.
2. **Add a producer token** to the file named by `INTAKE_TOKENS_PATH` on the `web`
   container, then restart it:
   ```yaml
   tokens:
     - name: home-assistant
       token: <at least 16 random characters>
   ```
   It must not be `read_only`. The name shows up as the producer on every item.
3. **Push (optional).** The unavailable item is posted at `high` by default, which pushes
   to your phone over ntfy only if `NTFY_URL` is set on `web`. Unset means silent.

### On the Home Assistant side

4. **Install the integration** (any method above) and add it under Settings → Devices &
   Services. The Problem Count sensor is created with it; nothing to configure.
5. **Add the `rest_command`** to `configuration.yaml`, with the URL and the
   `Bearer <token>` string in `secrets.yaml`. The exact block is in
   [MAJORDOMO.md § 3](MAJORDOMO.md#3-the-rest_command). Reload YAML configuration
   (Developer Tools → YAML → REST commands) or restart.
6. **Import the Majordomo blueprint** (Part B above) and create an automation from it:
   - **Problem count sensor:** the integration's Problem Count sensor
   - **Sync service:** `rest_command.majordomo_sync`
   - **Panel URL:** the absolute URL of the Device Health panel on your instance, e.g.
     `https://ha.example.net/device-health-exclusions`
   - Leave the severities, settle delay (15 min) and daily re-assert (08:00) at their
     defaults unless you have a reason
7. **Optional, the other direction:** a `rest` sensor on Majordomo's
   `GET /api/v1/summary` drives a wall-panel badge or an amber light. Needs a second,
   `read_only` token. The sensor YAML is in Majordomo's
   [docs/integrations/home-assistant.md](https://github.com/noecker/majordomo/blob/main/docs/integrations/home-assistant.md).

### Verify the feed

8. **Force a run:** on the new automation click **︙** → **Run**. Nothing is posted while
   the Problem Count sensor is unavailable, so check Developer Tools → States first if
   the run seems to do nothing.
9. **Home Assistant side:** Settings → System → Logs. A 400 from the `rest_command`
   means Majordomo rejected the body (usually a non-slug `source` or a relative panel
   URL); a 401 means the token is wrong; a connection error means the URL or network.
10. **Majordomo side:** the queue at `/?source=home-assistant` shows up to three rows,
    and the Settings page lists `home-assistant` under producers with its accepted and
    rejected counts for the last 24 hours. The item pane shows `meta.count` and the
    occurrence timeline; a second forced run adds an occurrence without a new push.
11. **Close the loop:** exclude one of the devices in the Device Health panel. Within
    five minutes the sensor updates; after the settle delay the automation posts again
    and the row's title drops by one. When a class reaches zero its row closes with
    `closed_by = sync`.

---

## Troubleshooting

### Integration doesn't appear
- **Restart required**: Always restart after copying files
- **Check paths**: Verify files are in correct directories
- **Check logs**: Settings → System → Logs

### Blueprint import fails
- Use the direct import URL
- Or manually copy the YAML file
- Ensure file has correct permissions

### Sensor not created
- Check integration was added successfully
- Look for errors in logs
- Try removing and re-adding integration

### Exclusions not working
- Verify you selected "Integration Mode" in blueprint
- Check you selected the correct sensor
- Reload automation after changes

### Permission errors
```bash
# Fix permissions
chown -R homeassistant:homeassistant /config/custom_components/device_health_exclusions/
chmod -R 755 /config/custom_components/device_health_exclusions/
```

---

## Updating

### Via HACS
1. HACS → Integrations
2. Find "Device Health Exclusions Manager"
3. Click "Update"
4. Restart Home Assistant

### Via Script
```bash
cd ha-device-health-monitoring
git pull
./install.sh  # or python3 install.py
```

### Manual
1. Download new version
2. Replace files in `/config/custom_components/device_health_exclusions/`
3. Replace blueprint if updated
4. Restart Home Assistant

---

## Uninstallation

### Remove Integration
1. Settings → Devices & Services
2. Find "Device Health Exclusions Manager"
3. Click **︙** → **Delete**

### Remove Files
```bash
rm -rf /config/custom_components/device_health_exclusions/
rm /config/blueprints/automation/device_health_report.yaml
```

### Remove Automation
1. Settings → Automations & Scenes
2. Find your health report automation
3. Delete it

---

## Need Help?

- 📖 [Quick Start Guide](QUICKSTART.md)
- 📚 [Maintainer Guide](GETTING_STARTED_AS_MAINTAINER.md)
- 🐛 [Report Issues](https://github.com/noecker/ha-device-health-monitoring/issues)

---

## Next Steps

✅ Integration installed
✅ Blueprint configured
✅ Automation created

Now:
- **Access the custom panel**: Settings → Device Health
- **Manage exclusions** using the full-page interface
- Test your automation
- Update exclusions via the panel (real-time updates!)
- Customize the email template if desired
- **Feed a Majordomo queue**: see [End-to-end setup with Majordomo](#end-to-end-setup-with-majordomo)

### Using the Custom Panel
- Access via: **Settings → Device Health** (sidebar)
- Direct URL: `/device-health-exclusions`
- Features: Hierarchical grouping, device-level exclusions, filtering, search, statistics
- Real-time: No reload needed for changes
