export const setNPCAsEnemy = (npcs, npcID) => {
  return npcs.map((npc) => {
    return npc.id === npcID ? { ...npc, enemy: true } : npc
  })
}

export const setNPCAsFriend = (npcs, npcID) => {
  return npcs.map((npc) => {
    return npc.id === npcID ? { ...npc, enemy: false } : npc
  })
}

export const toggleActive = (currentCampSheet, interactableIDAndType) => {
  const { id, type } = interactableIDAndType

  const {
    inventoryItems: { weapons, wearables, items },
    npcs,
    environment,
  } = currentCampSheet

  if (type === "WEAPON") {
    const newWeapons = weapons.map((weapon) => {
      return weapon.id === id ? { ...weapon, active: !weapon.active } : weapon
    })
    return {
      ...currentCampSheet,
      inventoryItems: { ...currentCampSheet.inventoryItems, weapons: newWeapons },
    }
  } else if (type === "WEARABLE") {
    const newWearables = wearables.map((wearable) => {
      return wearable.id === id ? { ...wearable, active: !wearable.active } : wearable
    })
    return {
      ...currentCampSheet,
      inventoryItems: { ...currentCampSheet.inventoryItems, wearables: newWearables },
    }
  } else if (type === "ITEM") {
    const newItems = items.map((item) => {
      return item.id === id ? { ...item, active: !item.active } : item
    })
    return {
      ...currentCampSheet,
      inventoryItems: { ...currentCampSheet.inventoryItems, items: newItems },
    }
  } else if (type === "NPC") {
    const newNPCS = npcs.map((npc) => {
      return npc.id === id ? { ...npc, active: !npc.active } : npc
    })
    return { ...currentCampSheet, npcs: newNPCS }
  } else if (type === "ENVIRONMENT") {
    const newEnvironment = environment.map((envir) => {
      return envir.id === id ? { ...envir, active: !envir.active } : envir
    })
    return { ...currentCampSheet, environment: newEnvironment }
  }
}
