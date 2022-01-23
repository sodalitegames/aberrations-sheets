import { createSelector } from 'reselect';

const selectCharacter = state => state.character;

export const selectCurrentCharacter = createSelector([selectCharacter], character => character.current);

export const selectCharacterError = createSelector([selectCharacter], character => character.error);

export const selectLoading = createSelector([selectCharacter], character => character.loading);

export const selectPermissions = createSelector([selectCharacter], character => character.permissions);

export const selectReload = createSelector([selectCharacter], character => character.reload);

export const selectEquippedWeapons = createSelector([selectCurrentCharacter], current => current.weapons.filter(weapon => weapon.equipped));

export const selectEquippedWearables = createSelector([selectCurrentCharacter], current => current.wearables.filter(wearable => wearable.equipped));

export const selectEquippedConsumables = createSelector([selectCurrentCharacter], current => current.consumables.filter(consumable => consumable.equipped));

export const selectEquippedUsables = createSelector([selectCurrentCharacter], current => current.usables.filter(usable => usable.equipped));
