import { store } from '../../redux/store';

import { updateSheetResourceStart } from '../../redux/sheet/sheet.actions';
import { setModal, setNestedModal } from '../../redux/app/app.actions';

import ModalTypes from '../ModalTypes';
import { getBelongingTypeCapitalized } from '../helpers/belongings';
import { BelongingType, SheetType } from '../../models/enums';
import { SheetResourceType } from '../../models/sheet-actions';

interface Data {
  sheetType: SheetType;
  sheet: any;
  belongingType: BelongingType;
  belonging: any;
  equippedList: any[];
  nested?: boolean;
  forPlayer?: boolean;
}

export const correctStatMod = (mod: number) => {
  // Maximum modifier amount is five
  if (mod > 5) return 5;

  // Minimum modifier amount if negative five
  if (mod < -5) return -5;

  return mod;
};

const equipBelonging = ({ sheetType, sheet, belongingType, belonging, equippedList, nested, forPlayer }: Data, config?: Object): void => {
  if (sheetType !== 'characters') return;

  if (belonging.unequippable) return alert('This belonging is unequippable');

  // If unequipping belonging
  if (belonging.equipped === true) {
    store.dispatch(
      updateSheetResourceStart(
        sheetType,
        sheet._id,
        belongingType as unknown as SheetResourceType,
        belonging._id,
        { equipped: false },
        {
          forPlayer,
          notification: {
            status: 'success',
            heading: `${getBelongingTypeCapitalized(belongingType)} Unequipped`,
            message: `You have successfully unequipped ${belonging.nickname || belonging.name}.`,
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

  store.dispatch(
    updateSheetResourceStart(
      sheetType,
      sheet._id,
      belongingType as unknown as SheetResourceType,
      belonging._id,
      { equipped: true },
      {
        ...config,
        forPlayer,
        notification: {
          status: 'success',
          heading: `${getBelongingTypeCapitalized(belongingType)} Equipped`,
          message: `You have successfully equipped ${belonging.nickname || belonging.name}.`,
        },
      }
    )
  );
};

export default equipBelonging;
