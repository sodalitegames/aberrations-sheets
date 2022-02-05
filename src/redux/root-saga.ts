import { all, call } from 'redux-saga/effects';

//import { appSagas } from './app/app.sagas';
import { userSagas } from './user/user.sagas';
import { resourceSagas } from './resource/resource.sagas';
import { sheetSagas } from './sheet/sheet.sagas';
//import { characterSagas } from './character/character.sagas';
//import { campaignSagas } from './campaign/campaign.sagas';

export default function* rootSaga() {
  yield all([call(userSagas), call(resourceSagas), call(sheetSagas)]);
}
