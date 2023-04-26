import { useSelector } from 'react-redux';

import { selectCurrentCampaign } from '../../../redux/campaign/campaign.selectors';

import { SlideOverContainer } from '../SlideOver';

import ListContainer from '../../data/ListContainer';

import Notice, { NoticeStatus } from '../../Notice';

import DisplayInvite from '../../display/DisplayInvite';

import { SheetType } from '../../../models/sheet';

const ManageInvites = () => {
  const campSheet = useSelector(selectCurrentCampaign)!;

  return (
    <SlideOverContainer title="Manage Sent Invites" description="Manage your sent invitations below." cancelText="Done">
      <div className="px-6">
        {campSheet.invites.length ? (
          <ListContainer list={campSheet.invites}>
            {campSheet.invites.map(invite => (
              <DisplayInvite key={invite._id} invite={invite} sheetType={SheetType.campaigns} />
            ))}
          </ListContainer>
        ) : (
          <Notice status={NoticeStatus.Info} message="You have not sent any invites." classes="mt-4" />
        )}
      </div>
    </SlideOverContainer>
  );
};

export default ManageInvites;
