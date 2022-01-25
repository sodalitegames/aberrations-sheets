import { store } from '../redux/store';

import { updateSheetStart, updateSheetResourceStart } from '../redux/sheet/sheet.actions';
import { setModal, setNestedModal } from '../redux/app/app.actions';

import ModalTypes from './ModalTypes';

const equipBelonging = ({ sheetType, sheet, belongingType, belonging, equippedList, nested }) => {
  if (sheetType !== 'characters') return;

  if (belonging.unequippable) return alert('This belonging is unequippable');

  // If unequipping belonging
  if (belonging.equipped === true) {
    if (belongingType === 'wearables') {
      // Calculate stat mods and health changes
      const { fortitude: FOR, agility: AGL, persona: PER, aptitude: APT } = belonging.statMods;

      if (FOR || AGL || PER || APT) {
        // Update the character sheet in the database
        store.dispatch(
          updateSheetStart('characters', sheet._id, {
            fortitude: { ...sheet.fortitude, modifier: correctStatMod(sheet.fortitude.modifier - correctStatMod(FOR)) },
            agility: { ...sheet.agility, modifier: correctStatMod(sheet.agility.modifier - correctStatMod(AGL)) },
            persona: { ...sheet.persona, modifier: correctStatMod(sheet.persona.modifier - correctStatMod(PER)) },
            aptitude: { ...sheet.aptitude, modifier: correctStatMod(sheet.aptitude.modifier - correctStatMod(APT)) },
            currentHp: FOR < 0 ? sheet.currentHp + correctStatMod(Math.abs(FOR)) * 5 : sheet.currentHp - correctStatMod(FOR),
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
        // Update the character sheet in the database
        store.dispatch(
          updateSheetStart('characters', sheet._id, {
            fortitude: { ...sheet.fortitude, modifier: correctStatMod(sheet.fortitude.modifier + FOR) },
            agility: { ...sheet.agility, modifier: correctStatMod(sheet.agility.modifier + AGL) },
            persona: { ...sheet.persona, modifier: correctStatMod(sheet.persona.modifier + PER) },
            aptitude: { ...sheet.aptitude, modifier: correctStatMod(sheet.aptitude.modifier + APT) },
            currentHp: sheet.currentHp + correctStatMod(FOR) * 5,
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

  store.dispatch(updateSheetResourceStart(sheetType, sheet._id, belongingType, belonging._id, { equipped: true }));
};

export default equipBelonging;

const correctStatMod = mod => {
  // Maximum modifier amount is five
  if (mod > 5) return 5;

  // Minimum modifier amount if negative five
  if (mod < -5) return -5;

  return mod;
};
