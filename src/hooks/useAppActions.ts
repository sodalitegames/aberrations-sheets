import { useMemo } from 'react';
import { useDispatch } from 'react-redux';
import { bindActionCreators } from 'redux';

import * as appActions from '../redux/app/app.actions';

console.log('App Actions', appActions);

export const useAppActions = () => {
  const dispatch = useDispatch();

  return useMemo(() => {
    return bindActionCreators(appActions, dispatch);
  }, [dispatch]);
};
