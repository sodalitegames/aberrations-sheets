import { useSelector } from 'react-redux';

import { selectCurrentUser } from '../../redux/user/user.selectors';

import PageContent from '../../layouts/components/home/PageContent';
import PageSection from '../../layouts/components/home/PageSection';
import PagePanel from '../../layouts/components/home/PagePanel';

const ProfilePage = () => {
  const currentUser = useSelector(selectCurrentUser);
  return (
    <PageContent heading="My Profile">
      <PageSection heading="My Profile">
        <PagePanel>
          {JSON.stringify(currentUser)}
          {/* Panel content goes here... */}
        </PagePanel>
      </PageSection>
    </PageContent>
  );
};

export default ProfilePage;
