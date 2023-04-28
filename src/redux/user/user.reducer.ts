import { UserAction, UserActionTypes } from './user.types';
// import { SheetActionTypes } from '../sheet/sheet.types';
import { User } from '../../models/user';
import { AppError } from '../../models/app';
import { CampaignSheet, CharacterSheet } from '../../models/sheet';

export interface UserState {
  token: string | null;
  current: User | null;
  loading: boolean;
  signin: {
    error: AppError | null;
    message: AppError | null;
  };
  characters: CharacterSheet[];
  campaigns: CampaignSheet[];
  fetched: {
    characters: boolean;
    campaigns: boolean;
  };
  error: {
    characters: {
      fetch: AppError | null;
      create: AppError | null;
    };
    campaigns: {
      fetch: AppError | null;
      create: AppError | null;
    };
  };
}

const INITIAL_STATE = {
  token: null,
  current: null,
  loading: true,
  signin: {
    error: null,
    message: null,
  },
  characters: [],
  campaigns: [],
  fetched: {
    characters: false,
    campaigns: false,
  },
  error: {
    characters: {
      fetch: null,
      create: null,
    },
    campaigns: {
      fetch: null,
      create: null,
    },
  },
};

const userReducer = (state: UserState = INITIAL_STATE, action: UserAction): UserState => {
  switch (action.type) {
    // case SheetActionTypes.UPDATE_SHEET_SUCCESS:
    //   console.log('from user reducer', action.payload);
    //   console.log('whats up!');
    //   return state;
    case UserActionTypes.AUTH_STATE_CHANGE:
      return {
        ...state,
        token: action.payload.token,
        current: action.payload.user,
        loading: false,
      };
    case UserActionTypes.SIGN_IN_SUCCESS:
      return {
        ...state,
        signin: {
          message: action.payload,
          error: null,
        },
      };
    case UserActionTypes.SIGN_IN_FAILURE:
      return {
        ...state,
        signin: {
          message: null,
          error: action.payload,
        },
      };
    case UserActionTypes.SIGN_OUT_SUCCESS:
      return {
        ...INITIAL_STATE,
        loading: false,
      };
    case UserActionTypes.FETCH_SHEETS_FOR_USER_SUCCESS:
      return {
        ...state,
        [action.payload.sheetType]: action.payload.sheetsList,
        error: {
          ...state.error,
          [action.payload.sheetType]: {
            ...state.error[action.payload.sheetType],
            fetch: null,
          },
        },
        fetched: {
          ...state.fetched,
          [action.payload.sheetType]: true,
        },
      };
    case UserActionTypes.CREATE_SHEET_FOR_USER_SUCCESS:
      return {
        ...state,
        [action.payload.sheetType]: [action.payload.newSheet, ...state[action.payload.sheetType]],
        error: {
          ...state.error,
          [action.payload.sheetType]: {
            ...state.error[action.payload.sheetType],
            create: null,
          },
        },
      };
    case UserActionTypes.FETCH_SHEETS_FOR_USER_FAILURE:
      return {
        ...state,
        error: {
          ...state.error,
          [action.payload.sheetType]: {
            ...state.error[action.payload.sheetType],
            fetch: action.payload.error,
          },
        },
        fetched: {
          ...state.fetched,
          [action.payload.sheetType]: true,
        },
      };
    case UserActionTypes.CREATE_SHEET_FOR_USER_FAILURE:
      return {
        ...state,
        error: {
          ...state.error,
          [action.payload.sheetType]: {
            ...state.error[action.payload.sheetType],
            create: action.payload.error,
          },
        },
        fetched: {
          ...state.fetched,
          [action.payload.sheetType]: true,
        },
      };
    default:
      return state;
  }
};

export default userReducer;
