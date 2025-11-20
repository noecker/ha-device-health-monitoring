"""Panel view registration for Device Health Exclusions Manager."""
from __future__ import annotations

from homeassistant.components import panel_custom
from homeassistant.core import HomeAssistant

DOMAIN = "device_health_exclusions"


async def async_register_panel(hass: HomeAssistant) -> None:
    """Register the custom panel."""
    await panel_custom.async_register_panel(
        hass,
        webcomponent_name="device-health-panel",
        frontend_url_path="device-health-exclusions",
        sidebar_title="Device Health",
        sidebar_icon="mdi:heart-pulse",
        module_url="/api/device_health_exclusions/device-health-panel.js",
        require_admin=True,
        config_panel_domain=DOMAIN,
    )
