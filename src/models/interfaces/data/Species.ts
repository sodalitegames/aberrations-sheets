import { StatsObject } from './Stats';

interface SpeciesLore {
  worldTitle: string;
  history: string;
  current: string;
}

export interface Species {
  id: string;
  name: string;
  ability: string;
  basicInfo: string;
  appearance: string;
  stats: StatsObject;
  lore: SpeciesLore;
}
