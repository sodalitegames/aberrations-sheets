import SheetActionTypes from '../sheet/sheet.types';

const INITIAL_STATE = {
  current: null,
  error: null,
  permissions: undefined,
};

const campaignReducer = (state = INITIAL_STATE, action) => {
  // Make sure the action is from the campaign sheet
  if (action.payload && action.payload.sheetType !== 'campaigns') {
    return state;
  }

  switch (action.type) {
    case SheetActionTypes.FETCH_CURRENT_SHEET_SUCCESS:
      return {
        ...state,
        current: action.payload.currentSheet,
      };
    case SheetActionTypes.FETCH_CURRENT_SHEET_FAILURE:
      return {
        ...state,
        error: action.payload.error,
      };
    default:
      return state;
  }
};

export default campaignReducer;
