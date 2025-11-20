# Quick Start Guide

Get up and running with Device Health Monitoring in 5 minutes!

## Step 1: Copy Files to Home Assistant

### For Integration Mode (Recommended):

1. Copy the `custom_components/device_health_exclusions` folder to your Home Assistant:
   ```bash
   # If using SSH or File Editor
   /config/custom_components/device_health_exclusions/
   ```

2. Copy `device_health_report.yaml` to your blueprints folder:
   ```bash
   /config/blueprints/automation/device_health_report.yaml
   ```

3. Restart Home Assistant

### For Manual Mode (Simple):

1. Just copy `device_health_report.yaml` to:
   ```bash
   /config/blueprints/automation/device_health_report.yaml
   ```

## Step 2: Set Up Exclusions (Integration Mode Only)

1. Go to **Settings** → **Devices & Services**
2. Click **+ Add Integration**
3. Search for "Device Health Exclusions Manager"
4. Set battery threshold (default: 20%)
5. Select devices to exclude from the list
6. Click **Submit**

✅ A sensor `sensor.device_health_exclusions_excluded_entities` is created

## Step 3: Create the Automation

1. Go to **Settings** → **Automations & Scenes**
2. Click **+ Create Automation** → **Use Blueprint**
3. Select "Device Health Report"
4. Configure:
   - **Report Time**: When to send (e.g., 09:00:00)
   - **Battery Threshold**: % threshold for alerts (e.g., 20)
   - **Notification Service**: Your email service (e.g., `notify.smtp`)
   - **Send Only If Issues**: ✅ (recommended)
   - **Exclusion Mode**:
     - Integration Mode: Select "Use Exclusions Manager Integration"
     - Manual Mode: Select "Manual (comma-separated list)"
   - **Exclusion Sensor** (Integration Mode): Select the sensor created in Step 2
   - **Excluded Entities** (Manual Mode): Enter comma-separated entity IDs

5. Click **Save**

## Step 4: Test It

### Test the Automation:
1. Go to your new automation
2. Click the **︙** menu → **Run**
3. Check your email!

### Update Exclusions (Integration Mode):
1. Go to **Settings** → **Devices & Services**
2. Find "Device Health Exclusions Manager"
3. Click **Configure**
4. Update your selections
5. Changes apply immediately!

## Troubleshooting

### No email received?
- Check "send only if issues" is disabled for testing
- Verify your notification service works (test with a simple automation)
- Check Home Assistant logs for errors

### HTML not rendering?
- Should be fixed in the latest version
- Verify you're using the updated blueprint with `data: html:` structure

### Integration not found?
- Did you restart Home Assistant after copying files?
- Check files are in `/config/custom_components/device_health_exclusions/`
- Look for errors in Settings → System → Logs

### Exclusions not working?
- Integration Mode: Verify you selected the correct sensor
- Manual Mode: Check entity IDs are correct (no typos)
- Reload the automation after changes

## What's Next?

- See [INSTALLATION.md](INSTALLATION.md) for detailed documentation
- Customize the HTML template in the blueprint
- Create multiple reports with different thresholds
- Set up different exclusion lists for different reports

## Example Notification Services

### SMTP (Gmail):
```yaml
notify:
  - name: gmail
    platform: smtp
    server: smtp.gmail.com
    port: 587
    timeout: 15
    sender: your-email@gmail.com
    encryption: starttls
    username: your-email@gmail.com
    password: your-app-password
    recipient: recipient@example.com
    sender_name: Home Assistant
```

Use: `notify.gmail`

### MailGun, SendGrid, etc.:
Configure according to your provider's documentation, then use the service name in the blueprint.

## Support

Questions? Issues?
- Check the logs first
- Review the full [INSTALLATION.md](INSTALLATION.md)
- File an issue on GitHub
