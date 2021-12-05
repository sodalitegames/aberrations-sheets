import CampPageActionTypes from "./pages.types"

export const setCurrentMission = (missionID) => ({
  type: CampPageActionTypes.SET_CURRENT_MISSION,
  payload: missionID,
})

export const toggleComplete = (missionID) => ({
  type: CampPageActionTypes.TOGGLE_MISSION_COMPLETE,
  payload: missionID,
})

export const togglePlanned = (missionID) => ({
  type: CampPageActionTypes.TOGGLE_MISSION_PLANNED,
  payload: missionID,
})

export const setAsFriend = (npcID) => ({
  type: CampPageActionTypes.SET_AS_FRIEND,
  payload: npcID,
})

export const setAsEnemy = (npcID) => ({
  type: CampPageActionTypes.SET_AS_ENEMY,
  payload: npcID,
})

export const toggleActive = (interactableIDAndType) => ({
  type: CampPageActionTypes.TOGGLE_ACTIVE,
  payload: interactableIDAndType,
})
