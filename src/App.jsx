import { useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { selectToken, selectCurrentUser } from './redux/user/user.selectors';

import { fetchCurrentUserStart } from './redux/user/user.actions';

import SlideOver from './layouts/components/app/SlideOver';
import Modal from './layouts/components/app/Modal';
import Authenticate from './pages/auth/authenticate';
import Loading from './layouts/components/app/Loading';
// import Notification from './layouts/components/app/Notification';

function App() {
  const dispatch = useDispatch();

  const token = useSelector(selectToken);
  const currentUser = useSelector(selectCurrentUser);

  useEffect(() => {
    if (token) {
      dispatch(fetchCurrentUserStart({ token }));
    }
  }, [dispatch, token]);

  console.log(currentUser);

  if (!token) {
    return <Authenticate />;
  }

  if (!currentUser) {
    return <Loading />;
  }

  return (
    <>
      <Outlet />
      <SlideOver />
      <Modal />
      {/* <Notification />  */}
    </>
  );
}

export default App;
