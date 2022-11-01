import { createSelector } from 'reselect';

import { RootState } from '../root-reducer';

const selectCharacter = (state: RootState) => state.character;

export const selectCurrentCharacter = createSelector([selectCharacter], character => character.current);

export const selectCharacterError = createSelector([selectCharacter], character => character.error);
export const selectLoading = createSelector([selectCharacter], character => character.loading);
export const selectPermissions = createSelector([selectCharacter], character => character.permissions);
export const selectReload = createSelector([selectCharacter], character => character.reload);

export const selectWeapons = createSelector([selectCurrentCharacter], current => (current ? current.weapons.filter((weapon: any) => !weapon.archived) : []));
export const selectWearables = createSelector([selectCurrentCharacter], current => (current ? current.wearables.filter((wearable: any) => !wearable.archived) : []));
export const selectConsumables = createSelector([selectCurrentCharacter], current => (current ? current.consumables.filter((consumable: any) => !consumable.archived) : []));
export const selectUsables = createSelector([selectCurrentCharacter], current => (current ? current.usables.filter((usable: any) => !usable.archived) : []));

export const selectArchivedWeapons = createSelector([selectCurrentCharacter], current => (current ? current.weapons.filter((weapon: any) => weapon.archived) : []));
export const selectArchivedWearables = createSelector([selectCurrentCharacter], current => (current ? current.wearables.filter((wearable: any) => wearable.archived) : []));
export const selectArchivedConsumables = createSelector([selectCurrentCharacter], current => (current ? current.consumables.filter((consumable: any) => consumable.archived) : []));
export const selectArchivedUsables = createSelector([selectCurrentCharacter], current => (current ? current.usables.filter((usable: any) => usable.archived) : []));

export const selectEquippedWeapons = createSelector([selectCurrentCharacter], current => (current ? current.weapons.filter((weapon: any) => weapon.equipped && !weapon.archived) : []));
export const selectEquippedWearables = createSelector([selectCurrentCharacter], current => (current ? current.wearables.filter((wearable: any) => wearable.equipped && !wearable.archived) : []));
export const selectEquippedConsumables = createSelector([selectCurrentCharacter], current =>
  current ? current.consumables.filter((consumable: any) => consumable.equipped && !consumable.archived) : []
);
export const selectEquippedUsables = createSelector([selectCurrentCharacter], current => (current ? current.usables.filter((usable: any) => usable.equipped && !usable.archived) : []));

export const selectShieldValue = createSelector([selectEquippedWearables], equippedWearables =>
  equippedWearables.length ? equippedWearables.reduce((shieldValue: number, wearable: any) => wearable.shieldValue || 0 + shieldValue, 0) : 0
);
export const selectSpeedAdjustment = createSelector([selectEquippedWearables], equippedWearables =>
  equippedWearables.length ? equippedWearables.reduce((speedAdjustment: number, wearable: any) => wearable.speedAdjustment || 0 + speedAdjustment, 0) : 0
);
export const selectModifiers = createSelector([selectCurrentCharacter, selectEquippedWearables], (current, equippedWearables) => {
  const characterModifiers = current.modifiers || [];
  const wearableModifiers = equippedWearables.map((wearable: any) => wearable.modifiers || []).flat();

  const modifiers = [...characterModifiers, ...wearableModifiers];

  // TODO: Check if any modifers are the same and combine them if so

  return modifiers;
});

export const selectPendingTransactions = createSelector([selectCurrentCharacter], current =>
  current
    ? { sent: current.transactions.sent.filter((transac: any) => transac.status === 'Pending'), received: current.transactions.received.filter((transac: any) => transac.status === 'Pending') }
    : { sent: [], received: [] }
);

export const selectResolvedTransactions = createSelector([selectCurrentCharacter], current =>
  current
    ? { sent: current.transactions.sent.filter((transac: any) => transac.status !== 'Pending'), received: current.transactions.received.filter((transac: any) => transac.status !== 'Pending') }
    : { sent: [], received: [] }
);
