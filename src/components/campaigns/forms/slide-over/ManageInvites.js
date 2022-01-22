import { useSelector } from 'react-redux';

import { selectCurrentCampaign } from '../../../../redux/campaign/campaign.selectors';

import { SlideOverContainer } from '../../../../layouts/components/app/SlideOver';

import ListContainer from '../../../shared/ListContainer';

import Invite from '../../display/Invite';

const ManageInvites = () => {
  const campSheet = useSelector(selectCurrentCampaign);

  return (
    <SlideOverContainer title="Manage Sent Invites" description="Manage your sent invitations below." cancelText="Done">
      <div className="px-6">
        <ListContainer>
          {campSheet.invites.map(invite => (
            <Invite key={invite._id} invite={invite} />
          ))}
        </ListContainer>
      </div>
    </SlideOverContainer>
  );
};

export default ManageInvites;
