export interface ProblemDevice {
  entity_id: string;
  name: string;
  label: string;
  state: string;
  battery_level: number | null;
  is_excluded: boolean;
  is_entity_excluded: boolean;
  is_device_excluded: boolean;
  domain: string;
  device_class: string | null;
  device_id: string | null;
  device_name: string | null;
  integration: string | null;
  manufacturer: string | null;
  model: string | null;
  area_id: string | null;
}

export interface ExclusionSettings {
  excluded_entities: string[];
  excluded_devices: string[];
  battery_threshold: number;
}

// Grouped structure for hierarchical display
export interface DeviceGroup {
  device_id: string | null;
  device_name: string;
  integration: string;
  manufacturer: string | null;
  model: string | null;
  entities: ProblemDevice[];
  is_excluded: boolean;
  excluded_entity_count: number;
}

export interface IntegrationGroup {
  integration: string;
  devices: DeviceGroup[];
  total_entities: number;
  excluded_entity_count: number;
}

export type FilterMode = 'all' | 'not_excluded' | 'excluded';

export interface HomeAssistant {
  callWS<T>(msg: any): Promise<T>;
  language: string;
  themes: any;
}
