export const equipWeapon = (weapons, weaponID) => {
  return weapons.map((weapon) => {
    return weapon.id === weaponID ? { ...weapon, equipped: true } : weapon
  })
}

export const unequipWeapon = (weapons, weaponID) => {
  return weapons.map((weapon) => {
    return weapon.id === weaponID ? { ...weapon, equipped: false } : weapon
  })
}

export const equipItem = (items, itemID) => {
  return items.map((item) => {
    return item.id === itemID ? { ...item, equipped: true } : item
  })
}

export const unequipItem = (items, itemID) => {
  return items.map((item) => {
    return item.id === itemID ? { ...item, equipped: false } : item
  })
}

export const equipWearable = (wearables, wearableID) => {
  return wearables.map((wearable) => {
    return wearable.id === wearableID ? { ...wearable, equipped: true } : wearable
  })
}

export const unequipWearable = (wearables, wearableID) => {
  return wearables.map((wearable) => {
    return wearable.id === wearableID ? { ...wearable, equipped: false } : wearable
  })
}

export const addNewOrEditWeapon = (weapons, newWeapon) => {
  let doesExist = false

  weapons.forEach((weapon) => {
    if (weapon.id === newWeapon.id) {
      doesExist = true
    }
  })

  if (doesExist) {
    return weapons.map((weapon) => {
      return weapon.id === newWeapon.id ? { ...newWeapon } : weapon
    })
  } else {
    return [...weapons, { ...newWeapon }]
  }
}

export const addNewOrEditItem = (items, newItem) => {
  console.log(items, newItem)

  let doesExist = false

  items.forEach((item) => {
    if (item.id === newItem.id) {
      doesExist = true
    }
  })

  if (doesExist) {
    return items.map((item) => {
      return item.id === newItem.id ? { ...newItem } : item
    })
  } else {
    return [...items, { ...newItem }]
  }
}

export const addNewOrEditWearable = (wearables, newWearable) => {
  let doesExist = false

  wearables.forEach((wearable) => {
    if (wearable.id === newWearable.id) {
      doesExist = true
    }
  })

  if (doesExist) {
    return wearables.map((wearable) => {
      return wearable.id === newWearable.id ? { ...newWearable } : wearable
    })
  } else {
    return [...wearables, { ...newWearable }]
  }
}
