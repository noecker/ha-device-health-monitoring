"""Sensor platform for Device Health Exclusions Manager."""
from __future__ import annotations

import logging

from homeassistant.components.sensor import SensorEntity
from homeassistant.config_entries import ConfigEntry
from homeassistant.core import HomeAssistant
from homeassistant.helpers.entity_platform import AddEntitiesCallback

_LOGGER = logging.getLogger(__name__)

DOMAIN = "device_health_exclusions"


async def async_setup_entry(
    hass: HomeAssistant,
    config_entry: ConfigEntry,
    async_add_entities: AddEntitiesCallback,
) -> None:
    """Set up the sensor platform."""
    async_add_entities([DeviceHealthExclusionsSensor(config_entry)], True)


class DeviceHealthExclusionsSensor(SensorEntity):
    """Representation of a Device Health Exclusions sensor."""

    _attr_has_entity_name = True
    _attr_icon = "mdi:filter-variant"

    def __init__(self, config_entry: ConfigEntry) -> None:
        """Initialize the sensor."""
        self._config_entry = config_entry
        self._attr_unique_id = f"{config_entry.entry_id}_exclusions"
        self._attr_name = "Excluded Entities"
        self._attr_native_value = None

    @property
    def native_value(self) -> str:
        """Return the state of the sensor (comma-separated list)."""
        excluded = self._config_entry.data.get("excluded_entities", [])
        return ",".join(excluded) if excluded else ""

    @property
    def extra_state_attributes(self) -> dict[str, any]:
        """Return the state attributes."""
        excluded_entities = self._config_entry.data.get("excluded_entities", [])
        excluded_devices = self._config_entry.data.get("excluded_devices", [])
        battery_threshold = self._config_entry.data.get("battery_threshold", 20)

        return {
            "excluded_entities": excluded_entities,
            "excluded_devices": excluded_devices,
            "excluded_count": len(excluded_entities),
            "excluded_device_count": len(excluded_devices),
            "battery_threshold": battery_threshold,
        }

    async def async_update(self) -> None:
        """Update the sensor."""
        # The sensor automatically updates when config entry changes
        pass
