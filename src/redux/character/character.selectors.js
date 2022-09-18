import { createSelector } from 'reselect';

const selectCharacter = state => state.character;

export const selectCurrentCharacter = createSelector([selectCharacter], character => character.current);

export const selectCharacterError = createSelector([selectCharacter], character => character.error);
export const selectLoading = createSelector([selectCharacter], character => character.loading);
export const selectPermissions = createSelector([selectCharacter], character => character.permissions);
export const selectReload = createSelector([selectCharacter], character => character.reload);

export const selectWeapons = createSelector([selectCurrentCharacter], current => (current ? current.weapons.filter(weapon => !weapon.archived) : []));
export const selectWearables = createSelector([selectCurrentCharacter], current => (current ? current.wearables.filter(wearable => !wearable.archived) : []));
export const selectConsumables = createSelector([selectCurrentCharacter], current => (current ? current.consumables.filter(consumable => !consumable.archived) : []));
export const selectUsables = createSelector([selectCurrentCharacter], current => (current ? current.usables.filter(usable => !usable.archived) : []));

export const selectArchivedWeapons = createSelector([selectCurrentCharacter], current => (current ? current.weapons.filter(weapon => weapon.archived) : []));
export const selectArchivedWearables = createSelector([selectCurrentCharacter], current => (current ? current.wearables.filter(wearable => wearable.archived) : []));
export const selectArchivedConsumables = createSelector([selectCurrentCharacter], current => (current ? current.consumables.filter(consumable => consumable.archived) : []));
export const selectArchivedUsables = createSelector([selectCurrentCharacter], current => (current ? current.usables.filter(usable => usable.archived) : []));

export const selectEquippedWeapons = createSelector([selectCurrentCharacter], current => (current ? current.weapons.filter(weapon => weapon.equipped && !weapon.archived) : []));
export const selectEquippedWearables = createSelector([selectCurrentCharacter], current => (current ? current.wearables.filter(wearable => wearable.equipped && !wearable.archived) : []));
export const selectEquippedConsumables = createSelector([selectCurrentCharacter], current => (current ? current.consumables.filter(consumable => consumable.equipped && !consumable.archived) : []));
export const selectEquippedUsables = createSelector([selectCurrentCharacter], current => (current ? current.usables.filter(usable => usable.equipped && !usable.archived) : []));

export const selectShieldValue = createSelector([selectEquippedWearables], equippedWearables =>
  equippedWearables.length ? equippedWearables.reduce((shieldValue, wearable) => wearable.shieldValue || 0 + shieldValue, 0) : 0
);
export const selectSpeedAdjustment = createSelector([selectEquippedWearables], equippedWearables =>
  equippedWearables.length ? equippedWearables.reduce((speedAdjustment, wearable) => wearable.speedAdjustment || 0 + speedAdjustment, 0) : 0
);

export const selectPendingTransactions = createSelector([selectCurrentCharacter], current =>
  current
    ? { sent: current.transactions.sent.filter(transac => transac.status === 'Pending'), received: current.transactions.received.filter(transac => transac.status === 'Pending') }
    : { sent: [], received: [] }
);

export const selectResolvedTransactions = createSelector([selectCurrentCharacter], current =>
  current
    ? { sent: current.transactions.sent.filter(transac => transac.status !== 'Pending'), received: current.transactions.received.filter(transac => transac.status !== 'Pending') }
    : { sent: [], received: [] }
);
