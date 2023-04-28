import { Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';

import { selectNotifications, selectAlert } from './redux/app/app.selectors';
import { selectToken, selectCurrentUser, selectUserLoading } from './redux/user/user.selectors';

import AuthenticatePage from './pages/auth/authenticate';

import Notifications from './layouts/components/shared/Notifications';
import Alert from './layouts/components/shared/Alert';

import SlideOver from './components/forms/SlideOver';
import Modal from './components/forms/Modal';

import Loading from './components/Loading';

function App() {
  const token = useSelector(selectToken);
  const currentUser = useSelector(selectCurrentUser);
  const loading = useSelector(selectUserLoading);
  const notifications = useSelector(selectNotifications);
  const alert = useSelector(selectAlert);

  if (loading) {
    return <Loading />;
  }

  if (!token || !currentUser) {
    return <AuthenticatePage />;
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
