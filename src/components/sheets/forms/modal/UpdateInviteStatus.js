import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { selectCurrentCharacter } from '../../../../redux/character/character.selectors';
import { selectCurrentCampaign } from '../../../../redux/campaign/campaign.selectors';

import { updateSheetResourceStart } from '../../../../redux/sheet/sheet.actions';

import { ModalForm } from '../../../../layouts/components/app/Modal';

import ListContainer from '../../../shared/data/ListContainer';
import Select from '../../../shared/form/Select';
import Notice from '../../../shared/Notice';

import DisplayInvite from '../../display/DisplayInvite';

const UpdateInviteStatus = ({ id, data, nested }) => {
  const dispatch = useDispatch();

  const charSheet = useSelector(selectCurrentCharacter);
  const campSheet = useSelector(selectCurrentCampaign);

  const [invite, setInvite] = useState(null);
  const [status, setStatus] = useState('');

  useEffect(() => {
    // Set the status based on the button that opened this modal
    setStatus(data.status);

    if (data.sheetType === 'characters') {
      if (charSheet) {
        setInvite(charSheet.invites.find(invite => invite._id === id));
      }
    }

    if (data.sheetType === 'campaigns') {
      if (campSheet) {
        setInvite(campSheet.invites.find(invite => invite._id === id));
      }
    }
  }, [data.status, data.sheetType, charSheet, campSheet, id]);

  const selectStatus = e => {
    if (!e.target.value) return setStatus('');
    setStatus(e.target.value);
  };

  const submitHandler = async e => {
    e.preventDefault();

    const sheetId = data.sheetType === 'characters' ? charSheet._id : campSheet._id;

    dispatch(updateSheetResourceStart(data.sheetType, sheetId, 'invites', id, { status: status }, { modal: nested ? false : true, nestedModal: nested ? true : false }));
  };

  return (
    <ModalForm
      nested={nested}
      title={
        status === 'Accepted'
          ? 'Accept Campaign Invitation'
          : status === 'Declined'
          ? 'Are you sure you want to decline?'
          : status === 'Revoked'
          ? 'Are you sure you want to revoke this invite?'
          : 'Update Invite Status'
      }
      submitText={
        status === 'Accepted'
          ? `Join ${invite?.campaignName}`
          : status === 'Declined'
          ? 'Yes, I want to decline this invite'
          : status === 'Revoked'
          ? 'Yes, I want to revoke this invite'
          : 'Update Invite Status'
      }
      submitHandler={submitHandler}
      submitDisabled={!status}
    >
      {data.sheetType === 'characters' ? (
        <Select
          label="Update Status"
          name="status"
          value={status}
          options={[
            { name: 'Accept', id: 'Accepted' },
            { name: 'Decline', id: 'Declined' },
          ]}
          changeHandler={selectStatus}
          required
        />
      ) : (
        <Select label="Update Status" name="status" value={status} options={[{ name: 'Revoked', id: 'Revoked' }]} changeHandler={selectStatus} required />
      )}

      {invite ? (
        <ListContainer classes="mt-4">
          <DisplayInvite invite={invite} sheetType={data.sheetType} noActions />
        </ListContainer>
      ) : null}

      {status === 'Declined' || status === 'Revoked' ? (
        <Notice noIcon status="error" message={`You will not be change your decision once you have ${status === 'Declined' ? 'declined' : 'revoked'} this invitation`} />
      ) : null}
    </ModalForm>
  );
};

export default UpdateInviteStatus;
