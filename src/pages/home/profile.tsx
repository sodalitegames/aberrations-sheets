import { useSelector } from 'react-redux';

import { selectCurrentUser } from '../../redux/user/user.selectors';

import PageContent from '../../layouts/components/home/PageContent';
import PagePanel from '../../layouts/components/home/PagePanel';

const ProfilePage = () => {
  const currentUser = useSelector(selectCurrentUser)!;
  return (
    <PageContent heading="Profile">
      <PagePanel
        heading="My Information"
        subheading="You can update your information at our website on your account dashboard."
        footer={[{ text: 'Edit Information on Dashboard', to: 'https://aberrations-rpg.com/dashboard/account-settings', external: true }]}
      >
        <dl className="divide-y divide-gray-200">
          <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4">
            <dt className="text-sm font-medium text-gray-500">Name</dt>
            <dd className="flex mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
              <span className="flex-grow">{currentUser.name}</span>
            </dd>
          </div>

          <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:pt-5">
            <dt className="text-sm font-medium text-gray-500">Email</dt>
            <dd className="flex mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
              <span className="flex-grow">{currentUser.email}</span>
            </dd>
          </div>
          <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:border-b sm:border-gray-200">
            <dt className="text-sm font-medium text-gray-500">Plan</dt>
            <dd className="flex mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
              <span className="flex-grow">{currentUser.subscription ? 'Paid' : 'Free'}</span>
            </dd>
          </div>
        </dl>
      </PagePanel>
    </PageContent>
  );
};

export default ProfilePage;
