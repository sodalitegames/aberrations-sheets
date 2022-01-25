import { store } from '../redux/store';

import { updateSheetStart, updateSheetResourceStart } from '../redux/sheet/sheet.actions';
import { setModal, setNestedModal } from '../redux/app/app.actions';

import ModalTypes from './ModalTypes';
import { calculateNewCurrentHp } from './updateHealth';

export const correctStatMod = mod => {
  // Maximum modifier amount is five
  if (mod > 5) return 5;

  // Minimum modifier amount if negative five
  if (mod < -5) return -5;

  return mod;
};

const equipBelonging = ({ sheetType, sheet, belongingType, belonging, equippedList, nested, equipmentMods }, config) => {
  if (sheetType !== 'characters') return;

  if (belonging.unequippable) return alert('This belonging is unequippable');

  // If unequipping belonging
  if (belonging.equipped === true) {
    if (belongingType === 'wearables') {
      // Calculate stat mods and health changes
      const { fortitude: FOR, agility: AGL, persona: PER, aptitude: APT } = belonging.statMods;

      if (FOR || AGL || PER || APT) {
        // Get the new maxHp
        const newMaxHp = (correctStatMod(equipmentMods.fortitude - FOR) + sheet.fortitude.points) * 5;

        // Update the character sheet in the database
        store.dispatch(
          updateSheetStart('characters', sheet._id, {
            fortitude: { ...sheet.fortitude, modifier: correctStatMod(equipmentMods.fortitude - FOR) },
            agility: { ...sheet.agility, modifier: correctStatMod(equipmentMods.agility - AGL) },
            persona: { ...sheet.persona, modifier: correctStatMod(equipmentMods.persona - PER) },
            aptitude: { ...sheet.aptitude, modifier: correctStatMod(equipmentMods.aptitude - APT) },
            currentHp: calculateNewCurrentHp(sheet.currentHp, sheet.maxHp, newMaxHp),
          })
        );
      }
    }

    store.dispatch(updateSheetResourceStart(sheetType, sheet._id, belongingType, belonging._id, { equipped: false }));
    return;
  }

  // If equipping belonging
  switch (belongingType) {
    case 'weapons':
      if (equippedList.length >= 2) {
        if (nested) {
          store.dispatch(setNestedModal({ type: ModalTypes.errorEquippingBelonging, data: { belongingType, belonging } }));
          return;
        }

        store.dispatch(setModal({ type: ModalTypes.errorEquippingBelonging, data: { belongingType, belonging } }));
        return;
      }

      break;

    case 'wearables':
      if (equippedList.find(wear => wear.bodyArea === belonging.bodyArea)) {
        if (nested) {
          store.dispatch(setNestedModal({ type: ModalTypes.errorEquippingBelonging, data: { belongingType, belonging } }));
          return;
        }

        store.dispatch(setModal({ type: ModalTypes.errorEquippingBelonging, data: { belongingType, belonging } }));
        return;
      }

      // Calculate stat mods and health changes
      const { fortitude: FOR, agility: AGL, persona: PER, aptitude: APT } = belonging.statMods;

      if (FOR || AGL || PER || APT) {
        // Get the new maxHp
        const newMaxHp = (correctStatMod(equipmentMods.fortitude + FOR) + sheet.fortitude.points) * 5;

        // Update the character sheet in the database
        store.dispatch(
          updateSheetStart('characters', sheet._id, {
            fortitude: { ...sheet.fortitude, modifier: correctStatMod(equipmentMods.fortitude + FOR) },
            agility: { ...sheet.agility, modifier: correctStatMod(equipmentMods.agility + AGL) },
            persona: { ...sheet.persona, modifier: correctStatMod(equipmentMods.persona + PER) },
            aptitude: { ...sheet.aptitude, modifier: correctStatMod(equipmentMods.aptitude + APT) },
            currentHp: calculateNewCurrentHp(sheet.currentHp, sheet.maxHp, newMaxHp),
          })
        );
      }

      break;

    case 'consumables':
    case 'usables':
      if (equippedList.length >= 3) {
        if (nested) {
          store.dispatch(setNestedModal({ type: ModalTypes.errorEquippingBelonging, data: { belongingType, belonging } }));
          return;
        }

        store.dispatch(setModal({ type: ModalTypes.errorEquippingBelonging, data: { belongingType, belonging } }));
        return;
      }
      break;

    default:
      return;
  }

  store.dispatch(updateSheetResourceStart(sheetType, sheet._id, belongingType, belonging._id, { equipped: true }, config));
};

export default equipBelonging;
