import { store } from '../../redux/store';

import { updateSheetResourceStart } from '../../redux/sheet/sheet.actions';
import { setModal, setNestedModal } from '../../redux/app/app.actions';

import ModalTypes from '../ModalTypes';

import { CharacterSheet, Belonging, BelongingType, SheetResourceType, SheetType } from '../../models/sheet';
import { Usable, Weapon, Wearable, Player } from '../../models/sheet/resources';

import { capitalize } from '../helpers/strings';
import { ResourceType, getResourceLabel } from '../helpers/resources';

interface Data {
  sheetType: 'characters' | 'players';
  sheet: CharacterSheet | Player;
  belongingType: BelongingType;
  belonging: Belonging;
  equippedList: Belonging[];
  nested?: boolean;
  forPlayer?: boolean;
}

const equipBelonging = ({ sheetType, sheet, belongingType, belonging, equippedList, nested }: Data, config?: Object): void => {
  if (belongingType === 'usables' && !(belonging as Usable).equippable) return alert('This belonging is unequippable');

  // If unequipping belonging
  if (belonging.equipped === true) {
    store.dispatch(
      updateSheetResourceStart(
        SheetType.characters,
        sheet._id,
        SheetResourceType[belongingType],
        belonging._id,
        { equipped: false },
        {
          forPlayer: sheetType === 'players' ? true : false,
          notification: {
            status: 'success',
            heading: `${capitalize(getResourceLabel(ResourceType[belongingType]))} Unequipped`,
            message: `You have successfully unequipped ${(belonging as Weapon).nickname || belonging.name}.`,
          },
        }
      )
    );
    return;
  }

  // If equipping belonging
  switch (belongingType) {
    case 'weapons':
      if (equippedList.length >= 2) {
        if (nested) {
          store.dispatch(setNestedModal({ type: ModalTypes.errorEquippingBelonging, data: { belongingType, belonging, sheetType, sheetId: sheet._id } }));
          return;
        }

        store.dispatch(setModal({ type: ModalTypes.errorEquippingBelonging, data: { belongingType, belonging, sheetType, sheetId: sheet._id } }));
        return;
      }

      break;

    case 'wearables':
      if ((equippedList as Wearable[]).find(wear => wear.bodyArea === (belonging as Wearable).bodyArea)) {
        if (nested) {
          store.dispatch(setNestedModal({ type: ModalTypes.errorEquippingBelonging, data: { belongingType, belonging, sheetType, sheetId: sheet._id } }));
          return;
        }

        store.dispatch(setModal({ type: ModalTypes.errorEquippingBelonging, data: { belongingType, belonging, sheetType, sheetId: sheet._id } }));
        return;
      }

      break;

    case 'consumables':
    case 'usables':
      if (equippedList.length >= 3) {
        if (nested) {
          store.dispatch(setNestedModal({ type: ModalTypes.errorEquippingBelonging, data: { belongingType, belonging, sheetType, sheetId: sheet._id } }));
          return;
        }

        store.dispatch(setModal({ type: ModalTypes.errorEquippingBelonging, data: { belongingType, belonging, sheetType, sheetId: sheet._id } }));
        return;
      }
      break;

    default:
      return;
  }

  store.dispatch(
    updateSheetResourceStart(
      SheetType.characters,
      sheet._id,
      SheetResourceType[belongingType],
      belonging._id,
      { equipped: true },
      {
        ...config,
        forPlayer: sheetType === 'players' ? true : false,
        notification: {
          status: 'success',
          heading: `${capitalize(getResourceLabel(ResourceType[belongingType]))} Equipped`,
          message: `You have successfully equipped ${(belonging as Weapon).nickname || belonging.name}.`,
        },
      }
    )
  );
};

export default equipBelonging;
