type Level = {
  id: string;
  milestone: number;
  strength: number;
  agility: number;
  persona: number;
  aptitude: number;
};

export interface NpcType {
  id: string;
  name: string;
  levels: Level[];
}
