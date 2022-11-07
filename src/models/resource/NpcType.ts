interface NpcTableLevel {
  id: string;
  level: number;
  strength: number;
  agility: number;
  persona: number;
  aptitude: number;
  milestone: number;
  experience: number;
}

interface NpcTable {
  id: string;
  npcType: string;
  level: NpcTableLevel[];
}

export interface NpcType {
  npcTable: NpcTable[];
}
