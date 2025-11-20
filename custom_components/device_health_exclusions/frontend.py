"""Frontend asset serving for Device Health Exclusions Manager."""
from __future__ import annotations

import logging
from pathlib import Path

from homeassistant.components.http import StaticPathConfig
from homeassistant.core import HomeAssistant

_LOGGER = logging.getLogger(__name__)

DOMAIN = "device_health_exclusions"


async def async_register_static_paths(hass: HomeAssistant) -> None:
    """Register static paths for frontend assets."""
    integration_dir = Path(__file__).parent
    www_dir = integration_dir / "www"

    if not www_dir.exists():
        _LOGGER.error("Frontend www directory not found: %s", www_dir)
        return

    await hass.http.async_register_static_paths(
        [
            StaticPathConfig(
                f"/api/{DOMAIN}",
                str(www_dir),
                cache_headers=False,
            )
        ]
    )
