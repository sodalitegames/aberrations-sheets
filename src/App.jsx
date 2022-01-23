import { useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { selectNotifications, selectAlert } from './redux/app/app.selectors';
import { selectToken, selectCurrentUser } from './redux/user/user.selectors';

import { fetchCurrentUserStart } from './redux/user/user.actions';

import Authenticate from './pages/auth/authenticate';

import SlideOver from './layouts/components/app/SlideOver';
import Modal from './layouts/components/app/Modal';
import Loading from './layouts/components/app/Loading';
import Notification from './layouts/components/app/Notifications';
import Alert from './layouts/components/app/Alert';

function App() {
  const dispatch = useDispatch();

  const token = useSelector(selectToken);
  const currentUser = useSelector(selectCurrentUser);
  const notifications = useSelector(selectNotifications);
  const alert = useSelector(selectAlert);

  useEffect(() => {
    if (token) {
      dispatch(fetchCurrentUserStart(token));
    }
  }, [dispatch, token]);

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
      <Notification notifications={notifications} />
      {alert ? <Alert /> : null}
    </>
  );
}

export default App;
