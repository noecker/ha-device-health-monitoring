import { HomeAssistant, ProblemDevice, ExclusionSettings } from '../types';

export async function fetchProblemDevices(
  hass: HomeAssistant,
  batteryThreshold: number
): Promise<ProblemDevice[]> {
  const response = await hass.callWS<{ devices: ProblemDevice[] }>({
    type: 'device_health_exclusions/get_problem_devices',
    battery_threshold: batteryThreshold,
  });
  return response.devices;
}

export async function fetchExclusions(
  hass: HomeAssistant
): Promise<ExclusionSettings> {
  return await hass.callWS<ExclusionSettings>({
    type: 'device_health_exclusions/get_exclusions',
  });
}

export async function updateExclusions(
  hass: HomeAssistant,
  excludedEntities: string[],
  batteryThreshold?: number
): Promise<void> {
  await hass.callWS({
    type: 'device_health_exclusions/update_exclusions',
    excluded_entities: excludedEntities,
    ...(batteryThreshold && { battery_threshold: batteryThreshold }),
  });
}

export async function toggleExclusion(
  hass: HomeAssistant,
  entityId: string
): Promise<{ success: boolean; is_excluded: boolean }> {
  return await hass.callWS({
    type: 'device_health_exclusions/toggle_exclusion',
    entity_id: entityId,
  });
}
