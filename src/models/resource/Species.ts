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

type Health = {
  starting: number;
  increment: number;
};

export interface Species {
  id: string;
  name: string;
  appearance: string;
  stats: Stats;
  health: Health;
  abilities: Abilities;
}
