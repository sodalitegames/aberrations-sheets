import { useDispatch } from 'react-redux';
import { bindActionCreators } from 'redux';

import * as resourceActions from '../redux/resource/resource.actions';

console.log('Resource Actions', resourceActions);

export const useActions = () => {
  const dispatch = useDispatch();

  return bindActionCreators(resourceActions, dispatch);
};
