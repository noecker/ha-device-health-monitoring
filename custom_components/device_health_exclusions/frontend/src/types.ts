export interface ProblemDevice {
  entity_id: string;
  name: string;
  label: string;
  state: string;
  battery_level: number | null;
  is_excluded: boolean;
  domain: string;
  device_class: string | null;
}

export interface ExclusionSettings {
  excluded_entities: string[];
  battery_threshold: number;
}

export type FilterMode = 'all' | 'not_excluded' | 'excluded';

export interface HomeAssistant {
  callWS<T>(msg: any): Promise<T>;
  language: string;
  themes: any;
}
