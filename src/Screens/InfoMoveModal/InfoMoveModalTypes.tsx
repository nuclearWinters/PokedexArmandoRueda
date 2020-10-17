export interface ContestEffect {
  url: string;
}

export interface ContestType {
  name: string;
  url: string;
}

export interface DamageClass {
  name: string;
  url: string;
}

export interface Language {
  name: string;
  url: string;
}

export interface EffectEntry {
  effect: string;
  language: Language;
  short_effect: string;
}

export interface Language2 {
  name: string;
  url: string;
}

export interface VersionGroup {
  name: string;
  url: string;
}

export interface FlavorTextEntry {
  flavor_text: string;
  language: Language2;
  version_group: VersionGroup;
}

export interface Generation {
  name: string;
  url: string;
}

export interface Machine2 {
  url: string;
}

export interface VersionGroup2 {
  name: string;
  url: string;
}

export interface Machine {
  machine: Machine2;
  version_group: VersionGroup2;
}

export interface Ailment {
  name: string;
  url: string;
}

export interface Category {
  name: string;
  url: string;
}

export interface Meta {
  ailment: Ailment;
  ailment_chance: number;
  category: Category;
  crit_rate: number;
  drain: number;
  flinch_chance: number;
  healing: number;
  max_hits?: any;
  max_turns?: any;
  min_hits?: any;
  min_turns?: any;
  stat_chance: number;
}

export interface Language3 {
  name: string;
  url: string;
}

export interface Name {
  language: Language3;
  name: string;
}

export interface VersionGroup3 {
  name: string;
  url: string;
}

export interface PastValue {
  accuracy: number;
  effect_chance?: any;
  effect_entries: any[];
  power?: any;
  pp?: any;
  type?: any;
  version_group: VersionGroup3;
}

export interface SuperContestEffect {
  url: string;
}

export interface Target {
  name: string;
  url: string;
}

export interface Type {
  name: string;
  url: string;
}

export interface Info {
  accuracy: number;
  contest_combos?: any;
  contest_effect: ContestEffect;
  contest_type: ContestType;
  damage_class: DamageClass;
  effect_chance?: any;
  effect_changes: any[];
  effect_entries: EffectEntry[];
  flavor_text_entries: FlavorTextEntry[];
  generation: Generation;
  id: number;
  machines: Machine[];
  meta: Meta;
  name: string;
  names: Name[];
  past_values: PastValue[];
  power: number;
  pp: number;
  priority: number;
  stat_changes: any[];
  super_contest_effect: SuperContestEffect;
  target: Target;
  type: Type;
}
