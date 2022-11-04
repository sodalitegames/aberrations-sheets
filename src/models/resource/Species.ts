type Lore = {
  worldTitle: string;
  history: string;
  current: string;
};

type Abilities = {
  activated: string;
  passive: string;
  detraction: string;
};

type Stats = {
  strength: number;
  agility: number;
  persona: number;
  aptitude: number;
};

export interface Species {
  id: string;
  name: string;
  ability: string;
  abilities: Abilities;
  basicInfo: string;
  appearance: string;
  stats: Stats;
  health: number;
  lore: Lore;
}
