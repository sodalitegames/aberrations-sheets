import { createSelector } from 'reselect';

const selectCampaign = state => state.campaign;

export const selectCurrentCampaign = createSelector([selectCampaign], campaign => campaign.current);

// export const selectCurrentCampSheet = createSelector(
//   [selectCampSheet],
//   (campSheet) => campSheet.currentCampSheet
// )

// export const selectDoesExist = createSelector(
//   [selectCampSheet],
//   (campSheet) => campSheet.doesCampaignSheetExist
// )

// export const selectHasPermission = createSelector(
//   [selectCampSheet],
//   (campSheet) => campSheet.doesUserHavePermission
// )

// export const selectIsCurrentCampSheetLoaded = createSelector(
//   [selectCampSheet],
//   (campSheet) => !!campSheet.currentCampSheet
// )

// // selectors for individual pages of the campaign sheet
// export const selectNotes = createSelector(
//   [selectCurrentCampSheet],
//   (currentCampSheet) => currentCampSheet.notes
// )

// export const selectEnvironment = createSelector(
//   [selectCurrentCampSheet],
//   (currentCampSheet) => currentCampSheet.environments
// )

// export const selectInventoryItems = createSelector(
//   [selectCurrentCampSheet],
//   (currentCampSheet) => currentCampSheet.inventoryItems
// )

// export const selectNPCS = createSelector(
//   [selectCurrentCampSheet],
//   (currentCampSheet) => currentCampSheet.npcs
// )

// export const selectMissions = createSelector(
//   [selectCurrentCampSheet],
//   (currentCampSheet) => currentCampSheet.missions
// )

// export const selectCurrentMission = createSelector([selectMissions], (missions) =>
//   missions.find((mission) => mission.current)
// )

// export const selectPersonalLog = createSelector(
//   [selectCurrentCampSheet],
//   (currentCampSheet) => currentCampSheet.personalLog
// )

// export const selectCaptainsLog = createSelector(
//   [selectCurrentCampSheet],
//   (currentCampSheet) => currentCampSheet.captainsLog
// )

// export const selectBackground = createSelector(
//   [selectCurrentCampSheet],
//   (currentCampSheet) => currentCampSheet.background
// )

// export const selectCampaignID = createSelector(
//   [selectCurrentCampSheet],
//   (currentCampSheet) => currentCampSheet._id
// )

// export const selectPlayersNames = createSelector(
//   [selectCurrentCampSheet],
//   (currentCampSheet) => currentCampSheet.playersNames
// )

// export const selectCharactersNames = createSelector(
//   [selectCurrentCampSheet],
//   (currentCampSheet) => currentCampSheet.charactersNames
// )

// export const selectCampaignName = createSelector(
//   [selectCurrentCampSheet],
//   (currentCampSheet) => currentCampSheet.campaignName
// )

// export const selectPlayers = createSelector(
//   [selectCurrentCampSheet],
//   (currentCampSheet) => currentCampSheet.players
// )

// export const selectPlayersCharacterSheets = createSelector(
//   [selectCurrentCampSheet],
//   (currentCampSheet) => currentCampSheet.playersCharacterSheets
// )
