export const setCurrentMission = (missions, missionToSetID) => {
  return missions.map((mission) => {
    return mission.id === String(missionToSetID)
      ? { ...mission, current: true }
      : { ...mission, current: false }
  })
}

export const togglePlanned = (missions, missionToSetID) => {
  return missions.map((mission) => {
    return mission.id === missionToSetID
      ? { ...mission, planned: !mission.planned, complete: !mission.complete }
      : mission
  })
}

export const toggleComplete = (missions, missionToSetID) => {
  return missions.map((mission) => {
    return mission.id === missionToSetID
      ? { ...mission, complete: !mission.complete, planned: !mission.planned }
      : mission
  })
}
