// this takes the stat values from the three sources: stats, equipped wearables
// stats, and the race stats, and combines them all into one data source that
// i can use to display on the app
export const calculateActualStatValuesAndTransform = (stats, equippedWearables, raceStats) => {
  // deep copy the three passed args to remove ALL references to the original in memory
  let copiedStats = JSON.parse(JSON.stringify(stats))
  let copiedEquippedWearables = JSON.parse(JSON.stringify(equippedWearables))
  let copiedRaceStats = JSON.parse(JSON.stringify(raceStats))

  copiedStats.forEach((statObj) => transformStatValuesObjects(statObj))

  // strip down the array of equipped wearables to be just an array of their stat arrays
  const equippedWearablesStats = copiedEquippedWearables.map((wearable) => wearable.statModifiers)

  equippedWearablesStats.forEach((statsArray) => {
    statsArray.forEach((statObj) => transformOtherStatObjects(statObj, "A"))
  })

  copiedRaceStats.forEach((statObj) => {
    transformOtherStatObjects(statObj, "R")
  })

  // loop through the array to send each nested
  // array to be added to the main array
  equippedWearablesStats.forEach((statsArray) => {
    addStatsToMainArray(copiedStats, statsArray)
  })

  addStatsToMainArray(copiedStats, copiedRaceStats, true)

  return copiedStats
}

// the stat object proficiency values are stored as numbers
// so this takes those objects, and adds a new array to them
// the new array has the same number of items as the number
// value of the proficiency, and those items are all the
// bool, false, to know they came from the main stats array
const transformStatValuesObjects = (statObject) => {
  let newArray = []
  statObject.newProficiencyPoints = statObject.proficiencyPoints

  while (statObject.newProficiencyPoints > 0) {
    newArray.push(false)
    statObject.newProficiencyPoints -= 1
  }

  statObject.newProficiencyPoints = newArray
}

// the stat object proficiency values are stored as numbers
// so this takes those objects, and adds a new array to them.
// the new array has the same number of items as the number
// value of the proficiency (except an X for a negative number--
// which will be resolved later)
// and those items are all given a letter value, to be used in
// the UI to let the user know where they came from
const transformOtherStatObjects = (statObject, letterToPush) => {
  let newArray = []
  statObject.newValue = statObject.value

  // check for subtracted stat modifications
  // if there are, then push X onto the array
  if (statObject.newValue < 0) {
    while (statObject.newValue < 0) {
      newArray.push("X")
      statObject.newValue += 1
    }
  }

  while (statObject.newValue > 0) {
    newArray.push(letterToPush)
    statObject.newValue -= 1
  }

  statObject.newValue = newArray
}

// this takes the wearableStats array of arrays and loops through it,
// then loops through each of its nested arrays, then finds the
// associated object from the main stats array, and adds the
// extra stats to that array
const addStatsToMainArray = (stats, statsToAdd, addToBeginning) => {
  statsToAdd.forEach((statsToAddObj) => {
    const objToAddTo = stats.find(
      (obj) => obj.name.toUpperCase() === statsToAddObj.modifier.toUpperCase()
    )

    // if there were any subtracted stat modifications
    // and X was push onto the array, then
    // REMOVE the last element of the main array
    // then POP the X off the array and PUSH it
    // on to the end -- basically, the X is replacing
    // the last element of the main array if there is an
    // X at all
    if (statsToAddObj.newValue.includes("X")) {
      objToAddTo.newProficiencyPoints.pop()
      objToAddTo.newProficiencyPoints.push(statsToAddObj.newValue.pop())
    }

    // if add to beginning is true, add the new array
    // to the beginning instead of the end
    if (addToBeginning) {
      objToAddTo.newProficiencyPoints = [
        ...statsToAddObj.newValue,
        ...objToAddTo.newProficiencyPoints,
      ]
    } else {
      objToAddTo.newProficiencyPoints = [
        ...objToAddTo.newProficiencyPoints,
        ...statsToAddObj.newValue,
      ]
    }

    // add the actual numbers together for later use
    objToAddTo.proficiencyPoints += statsToAddObj.value
  })
}

// this loops through the equipped wearables and takes out just their armour
// value, then reduces that down and returns the value
export const calculateArmourValueFromEquippedWearables = (equippedWearables) => {
  if (equippedWearables.length) {
    return equippedWearables
      .map((wearable) => wearable.armourValue)
      .reduce((total, wearableArmourValue) => total + wearableArmourValue)
  } else {
    return 0
  }
}

// this calulates the max hp for the character
export const calculateMaxHPValue = (level, constitutionStat) => {
  const maxHP = constitutionStat * level + 5
  return maxHP
}

// this maps the race size to a number, then calculates the dodge value
export const calculateDodgeValue = (reflexStat, raceSize) => {
  const mapRaceSizeToValue = {
    tiny: 10,
    small: 5,
    medium: 0,
    large: -5,
    huge: -10,
  }

  const dodgeValue = reflexStat * 2 + mapRaceSizeToValue[raceSize.toLowerCase()]

  return dodgeValue
}

// this lets me easily get a proficiency value from the stats
// without having to go digging around in the stats object on
// any particular page
export const findStatProficiencyValue = (calculatedStats, statName) => {
  const requestedStat = calculatedStats.find(
    (statObj) => statObj.name.toUpperCase() === statName.toUpperCase()
  )

  const proficiencyValue = requestedStat.proficiencyPoints

  return proficiencyValue
}

// this filters through whatever inventory item array it is given
// and returns just the items that have an equipped value of true
export const findEquippedInventoryItems = (inventoryItemArray) => {
  return inventoryItemArray.filter((inventoryItem) => inventoryItem.equipped)
}
