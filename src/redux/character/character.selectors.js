import { createSelector } from 'reselect';

const selectCharacter = state => state.character;

export const selectCurrentCharacter = createSelector([selectCharacter], character => character.current);

export const selectCharacterError = createSelector([selectCharacter], character => character.error);

export const selectLoading = createSelector([selectCharacter], character => character.loading);

export const selectPermissions = createSelector([selectCharacter], character => character.permissions);

export const selectReload = createSelector([selectCharacter], character => character.reload);

export const selectEquippedWeapons = createSelector([selectCurrentCharacter], current => (current ? current.weapons.filter(weapon => weapon.equipped) : []));

export const selectEquippedWearables = createSelector([selectCurrentCharacter], current => (current ? current.wearables.filter(wearable => wearable.equipped) : []));

export const selectEquippedConsumables = createSelector([selectCurrentCharacter], current => (current ? current.consumables.filter(consumable => consumable.equipped) : []));

export const selectEquippedUsables = createSelector([selectCurrentCharacter], current => (current ? current.usables.filter(usable => usable.equipped) : []));

export const selectEquipmentMods = createSelector([selectEquippedWearables], equippedWearables =>
  equippedWearables
    ? equippedWearables.reduce(
        (mods, wearable) => ({
          fortitude: mods.fortitude + wearable.statMods.fortitude,
          agility: mods.agility + wearable.statMods.agility,
          persona: mods.persona + wearable.statMods.persona,
          aptitude: mods.aptitude + wearable.statMods.aptitude,
        }),
        { fortitude: 0, agility: 0, persona: 0, aptitude: 0 }
      )
    : { fortitude: 0, agility: 0, persona: 0, aptitude: 0 }
);
