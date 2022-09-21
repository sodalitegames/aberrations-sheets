export const getInteractableType = intType => {
  switch (intType) {
    case 'players':
      return 'Player';
    case 'npcs':
      return 'Npc';
    case 'creatures':
      return 'Creature';
    default:
      return 'Interactable';
  }
};
