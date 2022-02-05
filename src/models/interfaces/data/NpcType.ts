interface NpcTableLevel {
  id: string;
  level: number;
  fortitude: number;
  agility: number;
  persona: number;
  aptitude: number;
  power: number;
  powerAdded: number;
  totalPower: number;
}

interface NpcTable {
  id: string;
  npcType: string;
  level: NpcTableLevel[];
}

export interface NpcType {
  npcTable: NpcTable[];
}
