import { createSelector } from 'reselect';

const selectCharacter = state => state.character;

export const selectCurrentCharacter = createSelector([selectCharacter], character => character.current);

export const selectEquippedWeapons = createSelector([selectCurrentCharacter], current => current.weapons.filter(weapon => weapon.equipped));

export const selectEquippedWearables = createSelector([selectCurrentCharacter], current => current.wearables.filter(wearable => wearable.equipped));

export const selectEquippedConsumables = createSelector([selectCurrentCharacter], current => current.consumables.filter(consumable => consumable.equipped));

export const selectEquippedUsables = createSelector([selectCurrentCharacter], current => current.usables.filter(usable => usable.equipped));

// export const selectCurrentCharSheet = createSelector(
//   [selectCharSheet],
//   (charSheet) => charSheet.currentCharSheet
// )

// export const selectDoesExist = createSelector(
//   [selectCharSheet],
//   (charSheet) => charSheet.doesCharacterSheetExist
// )

// export const selectHasPermission = createSelector(
//   [selectCharSheet],
//   (charSheet) => charSheet.doesUserHavePermission
// )

// export const selectIsCurrentCharSheetLoaded = createSelector(
//   [selectCharSheet],
//   (charSheet) => !!charSheet.currentCharSheet
// )

// // selectors for individual pages of the character sheet
// export const selectNotes = createSelector(
//   [selectCurrentCharSheet],
//   (currentCharSheet) => currentCharSheet.notes
// )

// export const selectCharacterBackground = createSelector(
//   [selectCurrentCharSheet],
//   (currentCharSheet) => currentCharSheet.characterBackground
// )

// export const selectCharacterDescription = createSelector(
//   [selectCurrentCharSheet],
//   (currentCharSheet) => currentCharSheet.characterDescription
// )

// export const selectCharacterLog = createSelector(
//   [selectCurrentCharSheet],
//   (currentCharSheet) => currentCharSheet.characterLog
// )

// export const selectCharacterName = createSelector(
//   [selectCurrentCharSheet],
//   (currentCharSheet) => currentCharSheet.characterName
// )

// export const selectAbilities = createSelector(
//   [selectCurrentCharSheet],
//   (currentCharSheet) => currentCharSheet.abilities
// )

// export const selectWeapons = createSelector(
//   [selectCurrentCharSheet],
//   (currentCharSheet) => currentCharSheet.weapons
// )

// export const selectEquippedWeapons = createSelector([selectWeapons], (weapons) =>
//   findEquippedInventoryItems(weapons)
// )

// export const selectWearables = createSelector(
//   [selectCurrentCharSheet],
//   (currentCharSheet) => currentCharSheet.wearables
// )

// export const selectEquippedWearables = createSelector([selectWearables], (wearables) =>
//   findEquippedInventoryItems(wearables)
// )

// export const selectItems = createSelector(
//   [selectCurrentCharSheet],
//   (currentCharSheet) => currentCharSheet.items
// )

// export const selectEquippedItems = createSelector([selectItems], (items) =>
//   findEquippedInventoryItems(items)
// )

// export const selectLevel = createSelector(
//   [selectCurrentCharSheet],
//   (currentCharSheet) => currentCharSheet.level
// )

// export const selectStats = createSelector(
//   [selectCurrentCharSheet],
//   (currentCharSheet) => currentCharSheet.stats
// )

// export const selectLifeCredits = createSelector(
//   [selectCurrentCharSheet],
//   (currentCharSheet) => currentCharSheet.lifeCredits
// )

// export const selectCurrentHP = createSelector(
//   [selectCurrentCharSheet],
//   (currentCharSheet) => currentCharSheet.currentHP
// )

// // select character sheet additional resources
// export const selectRaceInfo = createSelector(
//   [selectCurrentCharSheet],
//   (currentCharSheet) => currentCharSheet.raceInfo
// )

// export const selectClassInfo = createSelector(
//   [selectCurrentCharSheet],
//   (currentCharSheet) => currentCharSheet.classInfo
// )

// export const selectCampaignInfo = createSelector(
//   [selectCurrentCharSheet],
//   (currentCharSheet) => currentCharSheet.campaignInfo
// )

// export const selectCaptainsLog = createSelector(
//   [selectCampaignInfo],
//   (currentCampaignInfo) => currentCampaignInfo.captainsLog
// )

// // calculate some stats
// export const selectCalculatedTransformedStats = createSelector(
//   [selectCurrentCharSheet, selectEquippedWearables],
//   (currentCharSheet, equippedWearables) =>
//     calculateActualStatValuesAndTransform(
//       currentCharSheet.stats,
//       equippedWearables,
//       currentCharSheet.raceInfo.stats
//     )
// )

// export const selectMaxHP = createSelector(
//   [selectLevel, selectCalculatedTransformedStats],
//   (level, calculatedTransformedStats) =>
//     calculateMaxHPValue(level, findStatProficiencyValue(calculatedTransformedStats, "constitution"))
// )

// export const selectDodgeValue = createSelector(
//   [selectRaceInfo, selectCalculatedTransformedStats],
//   (raceInfo, calculatedTransformedStats) =>
//     calculateDodgeValue(
//       findStatProficiencyValue(calculatedTransformedStats, "reflex"),
//       raceInfo.size
//     )
// )

// export const selectArmourValue = createSelector([selectEquippedWearables], (equippedWearables) =>
//   calculateArmourValueFromEquippedWearables(equippedWearables)
// )
