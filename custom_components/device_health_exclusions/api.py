"""WebSocket API for Device Health Exclusions Manager."""
from __future__ import annotations

import logging
from typing import Any

import voluptuous as vol

from homeassistant.components import websocket_api
from homeassistant.core import HomeAssistant, callback
from homeassistant.helpers import config_validation as cv
from homeassistant.helpers.device_registry import async_get as async_get_device_registry
from homeassistant.helpers.entity_registry import async_get as async_get_entity_registry

_LOGGER = logging.getLogger(__name__)

DOMAIN = "device_health_exclusions"


@callback
def async_register_websocket_handlers(hass: HomeAssistant) -> None:
    """Register WebSocket API handlers."""
    websocket_api.async_register_command(hass, handle_get_problem_devices)
    websocket_api.async_register_command(hass, handle_get_exclusions)
    websocket_api.async_register_command(hass, handle_update_exclusions)
    websocket_api.async_register_command(hass, handle_toggle_exclusion)
    websocket_api.async_register_command(hass, handle_toggle_device_exclusion)


@websocket_api.websocket_command(
    {
        vol.Required("type"): "device_health_exclusions/get_problem_devices",
        vol.Required("battery_threshold"): vol.All(
            vol.Coerce(int), vol.Range(min=5, max=50)
        ),
    }
)
@websocket_api.async_response
async def handle_get_problem_devices(
    hass: HomeAssistant,
    connection: websocket_api.ActiveConnection,
    msg: dict[str, Any],
) -> None:
    """Get all problem devices with their current state."""
    from .config_flow import get_problem_devices

    battery_threshold = msg["battery_threshold"]

    # Get problem devices
    problem_devices = await hass.async_add_executor_job(
        get_problem_devices, hass, battery_threshold
    )

    # Get current exclusions
    config_entries = hass.config_entries.async_entries(DOMAIN)
    excluded_entities = []
    excluded_devices = []
    if config_entries:
        excluded_entities = config_entries[0].data.get("excluded_entities", [])
        excluded_devices = config_entries[0].data.get("excluded_devices", [])

    # Get registries for device/integration lookup
    entity_registry = async_get_entity_registry(hass)
    device_registry = async_get_device_registry(hass)

    # Build response with additional metadata including device/integration info
    devices = []
    for entity_id, label in problem_devices.items():
        state = hass.states.get(entity_id)

        # Look up device and integration info
        device_id = None
        device_name = None
        integration = None
        manufacturer = None
        model = None
        area_id = None

        entity_entry = entity_registry.async_get(entity_id)
        if entity_entry and entity_entry.device_id:
            device_id = entity_entry.device_id
            device_entry = device_registry.async_get(device_id)
            if device_entry:
                device_name = device_entry.name or device_entry.name_by_user
                area_id = device_entry.area_id
                manufacturer = device_entry.manufacturer
                model = device_entry.model
                # Get integration from identifiers (first one)
                if device_entry.identifiers:
                    # identifiers is a set of tuples like {("integration_name", "device_id")}
                    for identifier in device_entry.identifiers:
                        if len(identifier) >= 1:
                            integration = identifier[0]
                            break
                # Fallback to config_entry domain if no identifiers
                if not integration and device_entry.config_entries:
                    for entry_id in device_entry.config_entries:
                        entry = hass.config_entries.async_get_entry(entry_id)
                        if entry:
                            integration = entry.domain
                            break

        # Determine if excluded (either directly or via device)
        is_entity_excluded = entity_id in excluded_entities
        is_device_excluded = device_id in excluded_devices if device_id else False

        devices.append({
            "entity_id": entity_id,
            "name": state.name if state else "Unknown",
            "label": label,
            "state": state.state if state else "unknown",
            "battery_level": _get_battery_level(state),
            "is_excluded": is_entity_excluded or is_device_excluded,
            "is_entity_excluded": is_entity_excluded,
            "is_device_excluded": is_device_excluded,
            "domain": entity_id.split(".")[0],
            "device_class": state.attributes.get("device_class") if state else None,
            "device_id": device_id,
            "device_name": device_name,
            "integration": integration,
            "manufacturer": manufacturer,
            "model": model,
            "area_id": area_id,
        })

    connection.send_result(msg["id"], {"devices": devices})


@websocket_api.websocket_command(
    {
        vol.Required("type"): "device_health_exclusions/get_exclusions",
    }
)
@websocket_api.async_response
async def handle_get_exclusions(
    hass: HomeAssistant,
    connection: websocket_api.ActiveConnection,
    msg: dict[str, Any],
) -> None:
    """Get current exclusion settings."""
    config_entries = hass.config_entries.async_entries(DOMAIN)

    if not config_entries:
        connection.send_result(msg["id"], {
            "excluded_entities": [],
            "excluded_devices": [],
            "battery_threshold": 20,
        })
        return

    config_entry = config_entries[0]
    connection.send_result(msg["id"], {
        "excluded_entities": config_entry.data.get("excluded_entities", []),
        "excluded_devices": config_entry.data.get("excluded_devices", []),
        "battery_threshold": config_entry.data.get("battery_threshold", 20),
    })


@websocket_api.websocket_command(
    {
        vol.Required("type"): "device_health_exclusions/update_exclusions",
        vol.Required("excluded_entities"): [cv.string],
        vol.Optional("excluded_devices"): [cv.string],
        vol.Optional("battery_threshold"): vol.All(
            vol.Coerce(int), vol.Range(min=5, max=50)
        ),
    }
)
@websocket_api.async_response
async def handle_update_exclusions(
    hass: HomeAssistant,
    connection: websocket_api.ActiveConnection,
    msg: dict[str, Any],
) -> None:
    """Update exclusion list."""
    config_entries = hass.config_entries.async_entries(DOMAIN)

    if not config_entries:
        connection.send_error(msg["id"], "not_found", "No config entry found")
        return

    config_entry = config_entries[0]
    new_data = {
        "excluded_entities": msg["excluded_entities"],
        "excluded_devices": msg.get(
            "excluded_devices",
            config_entry.data.get("excluded_devices", [])
        ),
        "battery_threshold": msg.get(
            "battery_threshold",
            config_entry.data.get("battery_threshold", 20)
        ),
    }

    hass.config_entries.async_update_entry(config_entry, data=new_data)
    connection.send_result(msg["id"], {"success": True})


@websocket_api.websocket_command(
    {
        vol.Required("type"): "device_health_exclusions/toggle_exclusion",
        vol.Required("entity_id"): cv.string,
    }
)
@websocket_api.async_response
async def handle_toggle_exclusion(
    hass: HomeAssistant,
    connection: websocket_api.ActiveConnection,
    msg: dict[str, Any],
) -> None:
    """Toggle a single entity's exclusion status."""
    config_entries = hass.config_entries.async_entries(DOMAIN)

    if not config_entries:
        connection.send_error(msg["id"], "not_found", "No config entry found")
        return

    config_entry = config_entries[0]
    excluded_entities = list(config_entry.data.get("excluded_entities", []))
    entity_id = msg["entity_id"]

    if entity_id in excluded_entities:
        excluded_entities.remove(entity_id)
        is_excluded = False
    else:
        excluded_entities.append(entity_id)
        is_excluded = True

    new_data = {
        **config_entry.data,
        "excluded_entities": excluded_entities,
    }

    hass.config_entries.async_update_entry(config_entry, data=new_data)
    connection.send_result(msg["id"], {
        "success": True,
        "is_excluded": is_excluded,
    })


@websocket_api.websocket_command(
    {
        vol.Required("type"): "device_health_exclusions/toggle_device_exclusion",
        vol.Required("device_id"): cv.string,
    }
)
@websocket_api.async_response
async def handle_toggle_device_exclusion(
    hass: HomeAssistant,
    connection: websocket_api.ActiveConnection,
    msg: dict[str, Any],
) -> None:
    """Toggle a device's exclusion status (excludes all entities for this device)."""
    config_entries = hass.config_entries.async_entries(DOMAIN)

    if not config_entries:
        connection.send_error(msg["id"], "not_found", "No config entry found")
        return

    config_entry = config_entries[0]
    excluded_devices = list(config_entry.data.get("excluded_devices", []))
    device_id = msg["device_id"]

    if device_id in excluded_devices:
        excluded_devices.remove(device_id)
        is_excluded = False
    else:
        excluded_devices.append(device_id)
        is_excluded = True

    new_data = {
        **config_entry.data,
        "excluded_devices": excluded_devices,
    }

    hass.config_entries.async_update_entry(config_entry, data=new_data)
    connection.send_result(msg["id"], {
        "success": True,
        "is_excluded": is_excluded,
    })


def _get_battery_level(state) -> int | None:
    """Extract battery level from state."""
    if not state or state.state in ["unavailable", "unknown"]:
        return None
    try:
        return int(float(state.state))
    except (ValueError, TypeError):
        return None
