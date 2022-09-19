export const getNpcName = (npcId, npcs) => {
  const npc = npcs.find(npc => npc._id === npcId);
  return `${npc.name} (${npc.speciesName})`;
};
