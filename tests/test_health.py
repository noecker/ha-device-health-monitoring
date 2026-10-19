"""Unit tests for the problem classifier. Runs without Home Assistant installed.

    python3 -m unittest discover -s tests
"""
from __future__ import annotations

from dataclasses import dataclass, field
import sys
import unittest
from pathlib import Path

# Import the module directly so the package __init__ (which needs Home Assistant)
# is never executed.
ROOT = Path(__file__).resolve().parent.parent
sys.path.insert(0, str(ROOT / "custom_components" / "device_health_exclusions"))

import health  # noqa: E402  pylint: disable=wrong-import-position


@dataclass
class FakeState:
    entity_id: str
    state: str
    attributes: dict = field(default_factory=dict)

    @property
    def domain(self) -> str:
        return self.entity_id.split(".", 1)[0]


def battery(entity_id: str, level: str) -> FakeState:
    return FakeState(entity_id, level, {"device_class": "battery"})


class ClassifyProblemsTest(unittest.TestCase):
    def test_empty(self) -> None:
        counts = health.classify_problems([])
        self.assertEqual(counts, health.ProblemCounts())
        self.assertEqual(counts.total, 0)

    def test_low_battery_below_threshold_only(self) -> None:
        states = [
            battery("sensor.door_battery", "15"),
            battery("sensor.window_battery", "20"),  # equal to threshold: fine
            battery("sensor.lock_battery", "85"),
            FakeState("sensor.temperature", "12", {"device_class": "temperature"}),
            FakeState("binary_sensor.motion_battery", "on", {"device_class": "battery"}),
        ]
        counts = health.classify_problems(states, battery_threshold=20)
        self.assertEqual(counts.low_battery, 1)
        self.assertEqual(counts.total, 1)

    def test_non_numeric_battery_is_ignored(self) -> None:
        counts = health.classify_problems([battery("sensor.odd_battery", "low")])
        self.assertEqual(counts.total, 0)

    def test_unavailable_and_unknown_split_by_state(self) -> None:
        states = [
            FakeState("light.hall", "unavailable"),
            FakeState("switch.pump", "unavailable"),
            FakeState("sensor.rain", "unknown"),
        ]
        counts = health.classify_problems(states)
        self.assertEqual(counts.unavailable, 2)
        self.assertEqual(counts.unknown, 1)

    def test_excluded_domains_are_skipped(self) -> None:
        states = [
            FakeState(f"{domain}.thing", "unavailable")
            for domain in sorted(health.EXCLUDED_DOMAINS)
        ]
        self.assertEqual(health.classify_problems(states).total, 0)

    def test_unavailable_battery_sensor_counts_once_as_unavailable(self) -> None:
        counts = health.classify_problems([battery("sensor.dead_battery", "unavailable")])
        self.assertEqual(counts.unavailable, 1)
        self.assertEqual(counts.low_battery, 0)

    def test_entity_exclusions(self) -> None:
        states = [battery("sensor.a_battery", "5"), FakeState("light.b", "unavailable")]
        counts = health.classify_problems(
            states, excluded_entities=["sensor.a_battery", "light.b"]
        )
        self.assertEqual(counts.total, 0)

    def test_device_exclusions_use_lookup(self) -> None:
        devices = {"sensor.a_battery": "dev-1", "light.b": "dev-2"}
        states = [
            battery("sensor.a_battery", "5"),
            FakeState("light.b", "unavailable"),
            FakeState("light.c", "unknown"),  # no device
        ]
        counts = health.classify_problems(
            states, excluded_devices=["dev-1"], device_id_for=devices.get
        )
        self.assertEqual(counts.as_dict(), {"low_battery": 0, "unavailable": 1, "unknown": 1})

    def test_lookup_not_called_without_device_exclusions(self) -> None:
        def boom(_entity_id: str) -> str | None:
            raise AssertionError("device lookup should be skipped")

        counts = health.classify_problems(
            [battery("sensor.a_battery", "5")], device_id_for=boom
        )
        self.assertEqual(counts.low_battery, 1)


if __name__ == "__main__":
    unittest.main()
