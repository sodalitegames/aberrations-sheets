import { Npc } from '../../models/sheet/resources';

export const getNpcName = (npcId: string, npcs: Npc[]): string => {
  const npc = npcs.find(npc => npc._id === npcId);
  if (!npc) return '[deleted]';
  return `${npc.name} (${npc.speciesName})`;
};
