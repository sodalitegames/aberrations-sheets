import { combineReducers } from 'redux';

import appReducer from './app/app.reducer';
import userReducer from './user/user.reducer';
import resourceReducer from './resource/resource.reducer';
import characterReducer from './character/character.reducer';
import campaignReducer from './campaign/campaign.reducer';

const rootReducer = combineReducers({
  app: appReducer,
  user: userReducer,
  resources: resourceReducer,
  character: characterReducer,
  campaign: campaignReducer,
});

export default rootReducer;

export type RootState = ReturnType<typeof rootReducer>;
