import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { selectCurrentCampaign } from '../../../../redux/campaign/campaign.selectors';

import { setSlideOver } from '../../../../redux/app/app.actions';
import { updateSheetStart } from '../../../../redux/sheet/sheet.actions';

import { SlideOverForm } from '../../../../layouts/components/app/SlideOver';

import ListContainer from '../../../shared/ListContainer';

import Invite from '../../display/Invite';

const ManageInvites = () => {
  const dispatch = useDispatch();

  const campSheet = useSelector(selectCurrentCampaign);

  const [overview, setOverview] = useState('');

  useEffect(() => {
    if (campSheet) {
      setOverview(campSheet.overview);
    }
  }, [campSheet]);

  const submitHandler = async e => {
    e.preventDefault();

    if (!overview) return alert('Must provide overview');

    dispatch(updateSheetStart('campaigns', campSheet._id, { overview }));

    dispatch(setSlideOver(null));
  };

  console.log(campSheet);

  return (
    <SlideOverForm title="Manage Sent Invites" description="Manage your sent invitations below." submitText="Save changes" cancelText="Done" submitHandler={submitHandler} submitDisabled={true}>
      <div className="px-6">
        <ListContainer>
          {campSheet.invites.map(invite => (
            <Invite key={invite._id} invite={invite} />
          ))}
        </ListContainer>
      </div>
    </SlideOverForm>
  );
};

export default ManageInvites;
