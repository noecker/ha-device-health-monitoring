"""Sensor platform for Device Health Exclusions Manager."""
from __future__ import annotations

from datetime import timedelta
import logging

from homeassistant.components.sensor import SensorEntity, SensorStateClass
from homeassistant.config_entries import ConfigEntry
from homeassistant.core import HomeAssistant
from homeassistant.helpers.entity_platform import AddEntitiesCallback
from homeassistant.helpers.entity_registry import async_get as async_get_entity_registry

from .health import DEFAULT_BATTERY_THRESHOLD, ProblemCounts, classify_problems

_LOGGER = logging.getLogger(__name__)

DOMAIN = "device_health_exclusions"

# How often the problem count is recomputed. The count sensor walks every state in
# the state machine, which is cheap, but nothing downstream needs it faster than
# this: the Majordomo blueprint waits out a settle delay before posting anyway.
SCAN_INTERVAL = timedelta(minutes=5)


async def async_setup_entry(
    hass: HomeAssistant,
    config_entry: ConfigEntry,
    async_add_entities: AddEntitiesCallback,
) -> None:
    """Set up the sensor platform."""
    async_add_entities(
        [
            DeviceHealthExclusionsSensor(config_entry),
            DeviceHealthProblemCountSensor(hass, config_entry),
        ],
        True,
    )


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


class DeviceHealthProblemCountSensor(SensorEntity):
    """Number of problem entities after exclusions, with per-class attributes.

    State is the total; ``low_battery``, ``unavailable`` and ``unknown`` carry the
    counts per class so a single automation can fan them out to an external
    consumer (see the Majordomo blueprint) without re-deriving the detection
    rules in templates. Because the config entry reloads on every exclusion
    change, the sensor also refreshes immediately when exclusions are edited.
    """

    _attr_has_entity_name = True
    _attr_icon = "mdi:heart-pulse"
    _attr_state_class = SensorStateClass.MEASUREMENT

    def __init__(self, hass: HomeAssistant, config_entry: ConfigEntry) -> None:
        """Initialize the sensor."""
        self._hass = hass
        self._config_entry = config_entry
        self._attr_unique_id = f"{config_entry.entry_id}_problem_count"
        self._attr_name = "Problem Count"
        self._counts = ProblemCounts()

    @property
    def native_value(self) -> int:
        """Return the total number of problem entities."""
        return self._counts.total

    @property
    def extra_state_attributes(self) -> dict[str, int]:
        """Return the per-class counts and the threshold they were computed with."""
        return {
            **self._counts.as_dict(),
            "battery_threshold": self._battery_threshold,
        }

    @property
    def _battery_threshold(self) -> int:
        return self._config_entry.data.get(
            "battery_threshold", DEFAULT_BATTERY_THRESHOLD
        )

    async def async_update(self) -> None:
        """Recompute the counts from the state machine."""
        entity_registry = async_get_entity_registry(self._hass)

        def device_id_for(entity_id: str) -> str | None:
            entry = entity_registry.async_get(entity_id)
            return entry.device_id if entry else None

        self._counts = classify_problems(
            self._hass.states.async_all(),
            battery_threshold=self._battery_threshold,
            excluded_entities=self._config_entry.data.get("excluded_entities", []),
            excluded_devices=self._config_entry.data.get("excluded_devices", []),
            device_id_for=device_id_for,
        )
