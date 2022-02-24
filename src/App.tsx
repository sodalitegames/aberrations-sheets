import { useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { selectNotifications, selectAlert } from './redux/app/app.selectors';
import { selectToken, selectCurrentUser } from './redux/user/user.selectors';

import { fetchCurrentUserStart } from './redux/user/user.actions';

import AuthenticatePage from './pages/auth/authenticate';

import Notifications from './layouts/components/shared/Notifications';
import Alert from './layouts/components/shared/Alert';

import SlideOver from './components/forms/SlideOver';
import Modal from './components/forms/Modal';

import Loading from './components/Loading';

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
    return <AuthenticatePage />;
  }

  if (!currentUser) {
    return <Loading />;
  }

  return (
    <>
      <Outlet />
      <SlideOver />
      <Modal />
      <Notifications notifications={notifications} />
      {alert ? <Alert /> : null}
    </>
  );
}

export default App;
