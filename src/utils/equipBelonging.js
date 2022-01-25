import { store } from '../redux/store';

import { updateSheetResourceStart } from '../redux/sheet/sheet.actions';

const equipBelonging = ({ sheetType, sheetId, belongingType, belongingId, status, unequippable, list }) => {
  console.log('Equip Belonging:', sheetType, sheetId, belongingType, belongingId, status, unequippable, list);

  store.dispatch(updateSheetResourceStart(sheetType, sheetId, belongingType, belongingId, { equipped: !status }));
};

export default equipBelonging;
