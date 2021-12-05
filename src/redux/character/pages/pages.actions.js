import CharPageActionTypes from "./pages.types"

export const makeACheck = (typeAndSuccess) => ({
  type: CharPageActionTypes.MAKE_A_CHECK,
  payload: typeAndSuccess,
})

export const equipWeapon = (weaponID) => ({
  type: CharPageActionTypes.EQUIP_WEAPON,
  payload: weaponID,
})

export const equipItem = (itemID) => ({
  type: CharPageActionTypes.EQUIP_ITEM,
  payload: itemID,
})

export const equipWearable = (wearableID) => ({
  type: CharPageActionTypes.EQUIP_WEARABLE,
  payload: wearableID,
})

export const unequipWeapon = (weaponID) => ({
  type: CharPageActionTypes.UNEQUIP_WEAPON,
  payload: weaponID,
})

export const unequipItem = (itemID) => ({
  type: CharPageActionTypes.UNEQUIP_ITEM,
  payload: itemID,
})

export const unequipWearable = (wearableID) => ({
  type: CharPageActionTypes.UNEQUIP_WEARABLE,
  payload: wearableID,
})

export const payOrRecieveMoney = (amount) => ({
  type: CharPageActionTypes.PAY_OR_RECIEVE_MONEY,
  payload: amount,
})

export const takeOrHealDamage = (amount) => ({
  type: CharPageActionTypes.TAKE_OR_HEAL_DAMAGE,
  payload: amount,
})

export const createCharacterLog = (log) => ({
  type: CharPageActionTypes.CREATE_CHARACTER_LOG,
  payload: log,
})

export const editCharacterLog = (logAndID) => ({
  type: CharPageActionTypes.EDIT_CHARACTER_LOG,
  payload: logAndID,
})

export const levelUp = (abilityToUnlockIDAndType) => ({
  type: CharPageActionTypes.LEVEL_UP,
  payload: abilityToUnlockIDAndType,
})

export const addNewOrEditWeapon = (weapon) => ({
  type: CharPageActionTypes.ADD_NEW_OR_EDIT_WEAPON,
  payload: weapon,
})

export const addNewOrEditItem = (item) => ({
  type: CharPageActionTypes.ADD_NEW_OR_EDIT_ITEM,
  payload: item,
})

export const addNewOrEditWearable = (wearable) => ({
  type: CharPageActionTypes.ADD_NEW_OR_EDIT_WEARABLE,
  payload: wearable,
})

export const sellInventoryItem = (valueTypeAndID) => ({
  type: CharPageActionTypes.SELL_INVENTORY_ITEM,
  payload: valueTypeAndID,
})

export const takeARest = (typeAndAbilitiesArray) => ({
  type: CharPageActionTypes.TAKE_A_REST,
  payload: typeAndAbilitiesArray,
})

export const attack = () => ({
  type: CharPageActionTypes.ATTACK,
})
