import { InteractableType } from '../../models/sheet';

export const getInteractableType = (type: InteractableType): string => {
  switch (type) {
    case InteractableType.players:
      return 'Player';
    case InteractableType.npcs:
      return 'Npc';
    case InteractableType.creatures:
      return 'Creature';
    default:
      return 'Interactable';
  }
};
