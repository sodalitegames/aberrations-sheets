import { useSelector } from 'react-redux';

import { selectCurrentCampaign } from '../../../redux/campaign/campaign.selectors';

import { SlideOverContainer } from '../SlideOver';

import ListContainer from '../../data/ListContainer';

import DisplayInvite from '../../display/DisplayInvite';

const ManageInvites = () => {
  const campSheet = useSelector(selectCurrentCampaign);

  return (
    <SlideOverContainer title="Manage Sent Invites" description="Manage your sent invitations below." cancelText="Done">
      <div className="px-6">
        <ListContainer>
          {campSheet.invites.map(invite => (
            <DisplayInvite key={invite._id} invite={invite} sheetType="campaigns" />
          ))}
        </ListContainer>
      </div>
    </SlideOverContainer>
  );
};

export default ManageInvites;
