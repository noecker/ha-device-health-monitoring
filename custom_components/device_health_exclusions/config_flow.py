"""Config flow for Device Health Exclusions Manager."""
from __future__ import annotations

import logging
from typing import Any

import voluptuous as vol

from homeassistant import config_entries
from homeassistant.core import HomeAssistant, callback
from homeassistant.helpers import selector
from homeassistant.helpers.entity_registry import async_get as async_get_entity_registry

_LOGGER = logging.getLogger(__name__)

DOMAIN = "device_health_exclusions"


def get_problem_devices(hass: HomeAssistant, battery_threshold: int = 20) -> dict[str, str]:
    """Get all devices that have low battery or are unavailable."""
    problem_devices = {}

    # Get low battery devices
    for state in hass.states.async_all("sensor"):
        if (
            state.attributes.get("device_class") == "battery"
            and state.state not in ["unavailable", "unknown"]
        ):
            try:
                battery_level = float(state.state)
                if battery_level < battery_threshold:
                    problem_devices[state.entity_id] = (
                        f"{state.name} ({state.state}% battery)"
                    )
            except (ValueError, TypeError):
                pass

    # Get unavailable devices (excluding certain domains)
    excluded_domains = ["group", "automation", "script", "scene", "update"]
    for state in hass.states.async_all():
        if (
            state.state in ["unavailable", "unknown"]
            and state.domain not in excluded_domains
            and state.entity_id not in problem_devices
        ):
            problem_devices[state.entity_id] = f"{state.name} ({state.state})"

    return problem_devices


class DeviceHealthExclusionsConfigFlow(config_entries.ConfigFlow, domain=DOMAIN):
    """Handle a config flow for Device Health Exclusions Manager."""

    VERSION = 1

    def __init__(self) -> None:
        """Initialize the config flow."""
        self._battery_threshold = 20
        self._excluded_entities: list[str] = []

    async def async_step_user(
        self, user_input: dict[str, Any] | None = None
    ) -> config_entries.FlowResult:
        """Handle the initial step - set battery threshold."""
        errors = {}

        if user_input is not None:
            self._battery_threshold = user_input["battery_threshold"]
            return await self.async_step_select_devices()

        return self.async_show_form(
            step_id="user",
            data_schema=vol.Schema(
                {
                    vol.Required("battery_threshold", default=20): vol.All(
                        vol.Coerce(int), vol.Range(min=5, max=50)
                    ),
                }
            ),
            errors=errors,
        )

    async def async_step_select_devices(
        self, user_input: dict[str, Any] | None = None
    ) -> config_entries.FlowResult:
        """Handle device selection step."""
        errors = {}

        # Get problem devices based on threshold
        problem_devices = await self.hass.async_add_executor_job(
            get_problem_devices, self.hass, self._battery_threshold
        )

        if not problem_devices:
            return self.async_abort(reason="no_problem_devices")

        if user_input is not None:
            self._excluded_entities = user_input.get("excluded_entities", [])

            # Create the config entry
            return self.async_create_entry(
                title="Device Health Exclusions",
                data={
                    "battery_threshold": self._battery_threshold,
                    "excluded_entities": self._excluded_entities,
                },
            )

        # Create options for multi-select
        device_options = [
            selector.SelectOptionDict(value=entity_id, label=label)
            for entity_id, label in sorted(
                problem_devices.items(), key=lambda x: x[1]
            )
        ]

        return self.async_show_form(
            step_id="select_devices",
            data_schema=vol.Schema(
                {
                    vol.Optional("excluded_entities", default=[]): selector.SelectSelector(
                        selector.SelectSelectorConfig(
                            options=device_options,
                            multiple=True,
                            mode=selector.SelectSelectorMode.LIST,
                        )
                    ),
                }
            ),
            errors=errors,
            description_placeholders={
                "device_count": str(len(problem_devices)),
            },
        )

    @staticmethod
    @callback
    def async_get_options_flow(
        config_entry: config_entries.ConfigEntry,
    ) -> DeviceHealthExclusionsOptionsFlow:
        """Get the options flow for this handler."""
        return DeviceHealthExclusionsOptionsFlow(config_entry)


class DeviceHealthExclusionsOptionsFlow(config_entries.OptionsFlow):
    """Handle options flow for Device Health Exclusions Manager."""

    def __init__(self, config_entry: config_entries.ConfigEntry) -> None:
        """Initialize options flow."""
        self.config_entry = config_entry
        self._battery_threshold = config_entry.data.get("battery_threshold", 20)

    async def async_step_init(
        self, user_input: dict[str, Any] | None = None
    ) -> config_entries.FlowResult:
        """Manage the options - set battery threshold."""
        errors = {}

        if user_input is not None:
            self._battery_threshold = user_input["battery_threshold"]
            return await self.async_step_select_devices()

        return self.async_show_form(
            step_id="init",
            data_schema=vol.Schema(
                {
                    vol.Required(
                        "battery_threshold",
                        default=self.config_entry.data.get("battery_threshold", 20),
                    ): vol.All(vol.Coerce(int), vol.Range(min=5, max=50)),
                }
            ),
            errors=errors,
        )

    async def async_step_select_devices(
        self, user_input: dict[str, Any] | None = None
    ) -> config_entries.FlowResult:
        """Handle device selection in options flow."""
        errors = {}

        # Get problem devices based on threshold
        problem_devices = await self.hass.async_add_executor_job(
            get_problem_devices, self.hass, self._battery_threshold
        )

        if user_input is not None:
            # Update the config entry
            self.hass.config_entries.async_update_entry(
                self.config_entry,
                data={
                    "battery_threshold": self._battery_threshold,
                    "excluded_entities": user_input.get("excluded_entities", []),
                },
            )
            return self.async_create_entry(title="", data={})

        # Create options for multi-select
        device_options = [
            selector.SelectOptionDict(value=entity_id, label=label)
            for entity_id, label in sorted(
                problem_devices.items(), key=lambda x: x[1]
            )
        ]

        current_exclusions = self.config_entry.data.get("excluded_entities", [])

        return self.async_show_form(
            step_id="select_devices",
            data_schema=vol.Schema(
                {
                    vol.Optional(
                        "excluded_entities", default=current_exclusions
                    ): selector.SelectSelector(
                        selector.SelectSelectorConfig(
                            options=device_options,
                            multiple=True,
                            mode=selector.SelectSelectorMode.LIST,
                        )
                    ),
                }
            ),
            errors=errors,
            description_placeholders={
                "device_count": str(len(problem_devices)),
            },
        )
