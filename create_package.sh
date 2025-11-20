#!/bin/bash

# Package Creator for Device Health Monitoring
# Creates distribution packages for releases

set -e

VERSION=${1:-"dev"}
DIST_DIR="dist"

echo "════════════════════════════════════════════════════════════"
echo "  Device Health Monitoring - Package Creator"
echo "  Version: ${VERSION}"
echo "════════════════════════════════════════════════════════════"
echo ""

# Clean and create dist directory
rm -rf "${DIST_DIR}"
mkdir -p "${DIST_DIR}"

# Update version in manifest if not dev
if [ "${VERSION}" != "dev" ]; then
    echo "Updating version in manifest.json to ${VERSION}..."
    sed -i.bak "s/\"version\": \".*\"/\"version\": \"${VERSION}\"/" \
        custom_components/device_health_exclusions/manifest.json
    rm -f custom_components/device_health_exclusions/manifest.json.bak
fi

# Package 1: Integration Only
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "Creating Integration Package..."
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
cd custom_components
zip -r "../${DIST_DIR}/device_health_exclusions-${VERSION}.zip" device_health_exclusions/ -x "*.pyc" "*.pyo" "*__pycache__*"
cd ..
echo "✓ Created: device_health_exclusions-${VERSION}.zip"
echo ""

# Package 2: Complete Package
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "Creating Complete Package..."
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"

# Create temporary directory
TEMP_DIR="${DIST_DIR}/temp_complete"
mkdir -p "${TEMP_DIR}"

# Copy files
cp -r custom_components "${TEMP_DIR}/"
cp device_health_report.yaml "${TEMP_DIR}/"
cp README.md "${TEMP_DIR}/"
cp INSTALLATION.md "${TEMP_DIR}/"
cp INSTALLATION.md "${TEMP_DIR}/"
cp QUICKSTART.md "${TEMP_DIR}/"
cp install.sh "${TEMP_DIR}/"
cp install.py "${TEMP_DIR}/"

# Create README for package
cat > "${TEMP_DIR}/README_PACKAGE.txt" << 'EOF'
Device Health Monitoring - Complete Package
============================================

This package contains:
- Custom Integration (custom_components/device_health_exclusions/)
- Blueprint (device_health_report.yaml)
- Installation Scripts (install.sh, install.py)
- Documentation (*.md files)

Quick Install:
--------------
1. Run: ./install.sh (or python3 install.py)
2. Restart Home Assistant
3. Add integration via UI
4. Create automation from blueprint

Manual Install:
---------------
See INSTALLATION.md for detailed instructions.

Documentation:
--------------
- QUICKSTART.md - Get started in 5 minutes
- INSTALLATION.md - All installation methods
- INSTALLATION.md - Detailed setup guide
- README.md - Overview and features

Support:
--------
GitHub: https://github.com/YOUR_USERNAME/ha-customizations
EOF

# Create package
cd "${DIST_DIR}"
zip -r "device_health_monitoring-complete-${VERSION}.zip" temp_complete/ -x "*.pyc" "*.pyo" "*__pycache__*"
rm -rf temp_complete
cd ..

echo "✓ Created: device_health_monitoring-complete-${VERSION}.zip"
echo ""

# Package 3: Integration with Docs
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "Creating Integration + Docs Package..."
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"

TEMP_DIR="${DIST_DIR}/temp_integration"
mkdir -p "${TEMP_DIR}"

cp -r custom_components "${TEMP_DIR}/"
cp README.md "${TEMP_DIR}/"
cp INSTALLATION.md "${TEMP_DIR}/"

cd "${DIST_DIR}"
zip -r "device_health_exclusions-with-docs-${VERSION}.zip" temp_integration/ -x "*.pyc" "*.pyo" "*__pycache__*"
rm -rf temp_integration
cd ..

echo "✓ Created: device_health_exclusions-with-docs-${VERSION}.zip"
echo ""

# Create checksums
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "Generating Checksums..."
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
cd "${DIST_DIR}"
shasum -a 256 *.zip > checksums.txt
cd ..
echo "✓ Created: checksums.txt"
echo ""

# Summary
echo "════════════════════════════════════════════════════════════"
echo "  Package Creation Complete!"
echo "════════════════════════════════════════════════════════════"
echo ""
echo "Packages created in ${DIST_DIR}/:"
ls -lh "${DIST_DIR}"/*.zip
echo ""
echo "Checksums:"
cat "${DIST_DIR}/checksums.txt"
echo ""
echo "Next steps:"
echo "1. Test installation from packages"
echo "2. Create GitHub release with tag v${VERSION}"
echo "3. Upload packages to GitHub release"
echo "4. Update HACS if applicable"
echo ""
echo "════════════════════════════════════════════════════════════"
