export const makeACheck = (stats, { type, success, critFail, critSuccess }) => {
  return stats.map((stat) => {
    if (stat.name.toUpperCase() === type) {
      if (!success) {
        if (critFail) return { ...stat, energyPoints: stat.energyPoints - 2 }
        return { ...stat, energyPoints: stat.energyPoints - 1 }
      }
      if (critSuccess)
        return {
          ...stat,
          energyPoints: stat.energyPoints - 1,
          successPoints: stat.successPoints + 2,
        }
      return { ...stat, energyPoints: stat.energyPoints - 1, successPoints: stat.successPoints + 1 }
    }
    return stat
  })
}

export const levelUp = (abilities, { id, type }) => {
  const typeToUnlock = type

  const correctAbility = abilities.find((ability) => ability.id === id)

  const correctedTypesArray = correctAbility.types.map((type) => {
    return type.type === typeToUnlock ? { ...type, unlocked: true } : type
  })

  console.log(correctedTypesArray)

  return abilities.map((ability) => {
    return ability.id === id ? { ...ability, types: [...correctedTypesArray] } : ability
  })
}

export const loadAbilitiesFromLoadout = (abilities, loadout) => {
  console.log(abilities)
  console.log(loadout)

  const correctAbility1 = abilities.find((ability) => ability.id === loadout.ability1.id)
  const correctAbility2 = abilities.find((ability) => ability.id === loadout.ability2.id)
  const correctAbility3 = abilities.find((ability) => ability.id === loadout.ability3.id)
  const correctAbility4 = abilities.find((ability) => ability.id === loadout.ability4.id)
  const correctAbility5 = abilities.find((ability) => ability.id === loadout.ability5.id)

  const correctedTypesArray1 = correctAbility1.types.map((type) => {
    return type.type === loadout.ability1.type
      ? { ...type, equipped: true }
      : { ...type, equipped: false }
  })
  const correctedTypesArray2 = correctAbility2.types.map((type) => {
    return type.type === loadout.ability2.type
      ? { ...type, equipped: true }
      : { ...type, equipped: false }
  })
  const correctedTypesArray3 = correctAbility3.types.map((type) => {
    return type.type === loadout.ability3.type
      ? { ...type, equipped: true }
      : { ...type, equipped: false }
  })
  const correctedTypesArray4 = correctAbility4.types.map((type) => {
    return type.type === loadout.ability4.type
      ? { ...type, equipped: true }
      : { ...type, equipped: false }
  })
  const correctedTypesArray5 = correctAbility5.types.map((type) => {
    return type.type === loadout.ability5.type
      ? { ...type, equipped: true }
      : { ...type, equipped: false }
  })

  console.log(correctedTypesArray1)
  console.log(correctedTypesArray2)
  console.log(correctedTypesArray3)
  console.log(correctedTypesArray4)
  console.log(correctedTypesArray5)

  return abilities.map((ability, index) => {
    return index === 0
      ? { ...ability, types: [...correctedTypesArray1] }
      : index === 1
      ? { ...ability, types: [...correctedTypesArray2] }
      : index === 2
      ? { ...ability, types: [...correctedTypesArray3] }
      : index === 3
      ? { ...ability, types: [...correctedTypesArray4] }
      : { ...ability, types: [...correctedTypesArray5] }
  })
}

export const takeARest = (stats, type) => {
  console.log(stats)
  console.log(type)

  if (type === "QUICK NAP") {
    return stats.map((stat) => {
      return stat.successPoints >= stat.proficiencyPoints
        ? {
            ...stat,
            successPoints: 0,
            proficiencyPoints: stat.proficiencyPoints + 1,
            energyPoints: stat.energyPoints + stat.proficiencyPoints + 1,
          }
        : { ...stat, successPoints: 0, energyPoints: stat.energyPoints + stat.proficiencyPoints }
    })
  }

  if (type === "LONG SLUMBER") {
    return stats.map((stat) => {
      return stat.successPoints >= stat.proficiencyPoints
        ? {
            ...stat,
            successPoints: 0,
            proficiencyPoints: stat.proficiencyPoints + 1,
            energyPoints: stat.proficiencyPoints + 1,
          }
        : { ...stat, successPoints: 0, energyPoints: stat.proficiencyPoints }
    })
  }
}
