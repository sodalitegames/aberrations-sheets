import { useSelector } from 'react-redux';

import { selectCurrentUser } from '../../redux/user/user.selectors';

import PageContent from '../../layouts/components/home/PageContent';
import PageSection from '../../layouts/components/home/PageSection';

import PagePanel from '../../layouts/components/home/PagePanel';

const HomePage = () => {
  const currentUser = useSelector(selectCurrentUser);
  return (
    <PageContent heading={`Welcome back, ${currentUser.name}`}>
      <PageSection heading="Overview">
        <PagePanel>{/* Panel content goes here... */}</PagePanel>
      </PageSection>
    </PageContent>
  );
};

export default HomePage;
