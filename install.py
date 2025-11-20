#!/usr/bin/env python3
"""
Device Health Monitoring Installation Script
Installs both the custom integration and blueprint to Home Assistant
"""

import os
import shutil
import sys
from pathlib import Path


def print_header(text):
    """Print a formatted header."""
    print("\n" + "=" * 60)
    print(f"  {text}")
    print("=" * 60 + "\n")


def print_step(text, success=True):
    """Print a step with status."""
    icon = "✓" if success else "→"
    print(f"{icon} {text}")


def find_config_dir():
    """Find Home Assistant config directory."""
    # Common paths
    common_paths = [
        Path("/config"),
        Path.home() / ".homeassistant",
        Path("/usr/share/hassio/homeassistant"),
    ]

    for path in common_paths:
        if path.exists() and path.is_dir():
            return path

    # Ask user
    print("Could not automatically find Home Assistant config directory.")
    config_path = input("Please enter the path to your Home Assistant config directory: ")
    return Path(config_path)


def create_directory(path):
    """Create directory if it doesn't exist."""
    if not path.exists():
        path.mkdir(parents=True, exist_ok=True)
        print_step(f"Created directory: {path}")
    else:
        print_step(f"Directory exists: {path}", success=False)


def copy_integration(source_dir, config_dir):
    """Copy custom integration files."""
    print_header("Installing Custom Integration")

    integration_name = "device_health_exclusions"
    source_path = source_dir / "custom_components" / integration_name
    dest_path = config_dir / "custom_components" / integration_name

    # Create destination directory
    create_directory(dest_path)
    create_directory(dest_path / "translations")

    # Copy files
    files_to_copy = [
        "__init__.py",
        "config_flow.py",
        "sensor.py",
        "manifest.json",
        "strings.json",
    ]

    for file in files_to_copy:
        src = source_path / file
        dst = dest_path / file
        if src.exists():
            shutil.copy2(src, dst)
            print_step(f"Copied: {file}")
        else:
            print(f"Warning: {file} not found")

    # Copy translations
    trans_src = source_path / "translations" / "en.json"
    trans_dst = dest_path / "translations" / "en.json"
    if trans_src.exists():
        shutil.copy2(trans_src, trans_dst)
        print_step("Copied: translations/en.json")

    print_step("Custom integration installed!")


def copy_blueprint(source_dir, config_dir):
    """Copy blueprint file."""
    print_header("Installing Blueprint")

    blueprint_dir = config_dir / "blueprints" / "automation"
    create_directory(blueprint_dir)

    source_file = source_dir / "device_health_report.yaml"
    dest_file = blueprint_dir / "device_health_report.yaml"

    if source_file.exists():
        shutil.copy2(source_file, dest_file)
        print_step("Blueprint installed!")
    else:
        print("Error: Blueprint file not found")


def copy_documentation(source_dir, config_dir):
    """Copy documentation files."""
    print_header("Installing Documentation")

    doc_dir = config_dir / "custom_components" / "device_health_exclusions" / "docs"
    create_directory(doc_dir)

    docs = ["README.md", "INSTALLATION.md", "QUICKSTART.md"]
    for doc in docs:
        src = source_dir / doc
        if src.exists():
            shutil.copy2(src, doc_dir / doc)
            print_step(f"Copied: {doc}")


def main():
    """Main installation function."""
    print_header("Device Health Monitoring Installation")

    # Get directories
    source_dir = Path(__file__).parent.absolute()
    print(f"Source directory: {source_dir}")

    config_dir = find_config_dir()
    print(f"Config directory: {config_dir}\n")

    if not config_dir.exists():
        print("Error: Config directory does not exist!")
        sys.exit(1)

    # Confirm
    response = input("Proceed with installation? (y/n): ")
    if response.lower() != 'y':
        print("Installation cancelled.")
        sys.exit(0)

    # Install components
    try:
        copy_integration(source_dir, config_dir)
        copy_blueprint(source_dir, config_dir)
        copy_documentation(source_dir, config_dir)

        print_header("Installation Complete!")
        print("\nNext Steps:")
        print("1. Restart Home Assistant")
        print("2. Go to Settings → Devices & Services → Add Integration")
        print("3. Search for 'Device Health Exclusions Manager'")
        print("4. Follow the setup wizard")
        print("5. Create an automation using the 'Device Health Report' blueprint")
        print(f"\nDocumentation: {config_dir}/custom_components/device_health_exclusions/docs/")
        print("\n" + "=" * 60 + "\n")

    except Exception as e:
        print(f"\nError during installation: {e}")
        sys.exit(1)


if __name__ == "__main__":
    main()
