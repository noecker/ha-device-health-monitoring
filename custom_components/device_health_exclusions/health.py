"""Problem-device classification shared by the panel, the sensors and tests.

This module deliberately imports nothing from Home Assistant so the rules can be
unit-tested with plain objects. Callers pass state-like objects (anything with
``entity_id``, ``domain``, ``state`` and ``attributes``) and a lookup from entity
ID to device ID.
"""
from __future__ import annotations

from collections.abc import Callable, Collection, Iterable
from dataclasses import dataclass
from typing import Any, Protocol

STATE_UNAVAILABLE = "unavailable"
STATE_UNKNOWN = "unknown"

# Domains whose unavailable/unknown state is not a device problem.
EXCLUDED_DOMAINS: frozenset[str] = frozenset(
    {"group", "automation", "script", "scene", "update"}
)

DEFAULT_BATTERY_THRESHOLD = 20


class StateLike(Protocol):
    """The subset of ``homeassistant.core.State`` the classifier reads."""

    entity_id: str
    domain: str
    state: str
    attributes: dict[str, Any]


@dataclass(frozen=True)
class ProblemCounts:
    """Problem entities by class, after exclusions."""

    low_battery: int = 0
    unavailable: int = 0
    unknown: int = 0

    @property
    def total(self) -> int:
        """Every problem entity, all classes."""
        return self.low_battery + self.unavailable + self.unknown

    def as_dict(self) -> dict[str, int]:
        """Counts keyed by class name, as exposed on the sensor."""
        return {
            "low_battery": self.low_battery,
            "unavailable": self.unavailable,
            "unknown": self.unknown,
        }


def battery_level(state: StateLike) -> float | None:
    """Return the battery percentage of a battery sensor, or None."""
    if state.domain != "sensor":
        return None
    if state.attributes.get("device_class") != "battery":
        return None
    if state.state in (STATE_UNAVAILABLE, STATE_UNKNOWN):
        return None
    try:
        return float(state.state)
    except (TypeError, ValueError):
        return None


def is_excluded(
    entity_id: str,
    excluded_entities: Collection[str],
    excluded_devices: Collection[str],
    device_id_for: Callable[[str], str | None],
) -> bool:
    """Whether an entity is excluded directly or through its device."""
    if entity_id in excluded_entities:
        return True
    if not excluded_devices:
        return False
    device_id = device_id_for(entity_id)
    return device_id is not None and device_id in excluded_devices


def classify_problems(
    states: Iterable[StateLike],
    battery_threshold: int = DEFAULT_BATTERY_THRESHOLD,
    excluded_entities: Collection[str] = (),
    excluded_devices: Collection[str] = (),
    device_id_for: Callable[[str], str | None] = lambda _entity_id: None,
) -> ProblemCounts:
    """Count problem entities per class, honoring entity and device exclusions.

    The rules match ``config_flow.get_problem_devices``: a ``sensor`` with
    ``device_class: battery`` and a numeric state below the threshold is a low
    battery; any entity outside ``EXCLUDED_DOMAINS`` whose state is
    ``unavailable`` or ``unknown`` counts in that class. An entity lands in at
    most one class.
    """
    low_battery = unavailable = unknown = 0
    excluded_entities = set(excluded_entities)
    excluded_devices = set(excluded_devices)

    for state in states:
        if state.state == STATE_UNAVAILABLE or state.state == STATE_UNKNOWN:
            if state.domain in EXCLUDED_DOMAINS:
                continue
            if is_excluded(
                state.entity_id, excluded_entities, excluded_devices, device_id_for
            ):
                continue
            if state.state == STATE_UNAVAILABLE:
                unavailable += 1
            else:
                unknown += 1
            continue

        level = battery_level(state)
        if level is None or level >= battery_threshold:
            continue
        if is_excluded(
            state.entity_id, excluded_entities, excluded_devices, device_id_for
        ):
            continue
        low_battery += 1

    return ProblemCounts(
        low_battery=low_battery, unavailable=unavailable, unknown=unknown
    )
