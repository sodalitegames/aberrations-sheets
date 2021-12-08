import { useSelector } from 'react-redux';

import { selectCurrentUser } from '../../redux/user/user.selectors';

import PageContent from '../../layouts/components/home/PageContent';
import PagePanel from '../../layouts/components/home/PagePanel';

import Notice from '../../components/shared/Notice';

const HomePage = () => {
  const currentUser = useSelector(selectCurrentUser);
  return (
    <PageContent heading={`Welcome back, ${currentUser.name}`}>
      <Notice status="warn" heading="Under Construction" message="This page is currently under construction." />
      <PagePanel heading="Home Page" subheading="Home page under construction...">
        {/* Panel content goes here... */}
      </PagePanel>
    </PageContent>
  );
};

export default HomePage;
