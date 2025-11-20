#!/bin/bash

# Device Health Monitoring Installation Script
# This script installs both the custom integration and blueprint

set -e

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

echo "════════════════════════════════════════════════════════════"
echo "  Device Health Monitoring Installation Script"
echo "════════════════════════════════════════════════════════════"
echo ""

# Check if running in Home Assistant environment
if [ ! -d "/config" ]; then
    echo -e "${YELLOW}Warning: /config directory not found${NC}"
    echo "Are you running this on your Home Assistant server?"
    read -p "Continue anyway? (y/n) " -n 1 -r
    echo
    if [[ ! $REPLY =~ ^[Yy]$ ]]; then
        exit 1
    fi
    echo "Please enter your Home Assistant config directory path:"
    read CONFIG_DIR
else
    CONFIG_DIR="/config"
fi

echo -e "${GREEN}Using config directory: ${CONFIG_DIR}${NC}"
echo ""

# Function to create directory if it doesn't exist
create_dir() {
    if [ ! -d "$1" ]; then
        mkdir -p "$1"
        echo -e "${GREEN}✓${NC} Created directory: $1"
    else
        echo -e "${YELLOW}→${NC} Directory exists: $1"
    fi
}

# Install Custom Integration
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "Installing Custom Integration..."
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"

INTEGRATION_DIR="${CONFIG_DIR}/custom_components/device_health_exclusions"
create_dir "${CONFIG_DIR}/custom_components"
create_dir "${INTEGRATION_DIR}"
create_dir "${INTEGRATION_DIR}/translations"

# Copy integration files
echo "Copying integration files..."
cp -r custom_components/device_health_exclusions/* "${INTEGRATION_DIR}/"
echo -e "${GREEN}✓${NC} Custom integration installed"
echo ""

# Install Blueprint
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "Installing Blueprint..."
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"

BLUEPRINT_DIR="${CONFIG_DIR}/blueprints/automation"
create_dir "${BLUEPRINT_DIR}"

# Copy blueprint
cp device_health_report.yaml "${BLUEPRINT_DIR}/"
echo -e "${GREEN}✓${NC} Blueprint installed"
echo ""

# Copy documentation
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "Installing Documentation..."
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"

DOC_DIR="${CONFIG_DIR}/custom_components/device_health_exclusions/docs"
create_dir "${DOC_DIR}"

cp README.md "${DOC_DIR}/" 2>/dev/null || echo -e "${YELLOW}→${NC} README.md not found"
cp INSTALLATION.md "${DOC_DIR}/" 2>/dev/null || echo -e "${YELLOW}→${NC} INSTALLATION.md not found"
cp QUICKSTART.md "${DOC_DIR}/" 2>/dev/null || echo -e "${YELLOW}→${NC} QUICKSTART.md not found"
echo -e "${GREEN}✓${NC} Documentation copied"
echo ""

# Summary
echo "════════════════════════════════════════════════════════════"
echo -e "${GREEN}Installation Complete!${NC}"
echo "════════════════════════════════════════════════════════════"
echo ""
echo "Next Steps:"
echo "1. Restart Home Assistant"
echo "2. Go to Settings → Devices & Services → Add Integration"
echo "3. Search for 'Device Health Exclusions Manager'"
echo "4. Follow the setup wizard"
echo "5. Create an automation using the 'Device Health Report' blueprint"
echo ""
echo "Documentation installed at:"
echo "  ${DOC_DIR}/"
echo ""
echo "Need help? Check the QUICKSTART guide!"
echo "════════════════════════════════════════════════════════════"
