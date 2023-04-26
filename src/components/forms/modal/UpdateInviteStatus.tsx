import { useState, FormEvent } from 'react';
import { useDispatch } from 'react-redux';

import { updateSheetResourceStart } from '../../../redux/sheet/sheet.actions';

import { ModalForm } from '../Modal';

import Select from '../elements/Select';
import Notice, { NoticeStatus } from '../../Notice';

import DisplayInvite from '../../display/DisplayInvite';

import { SheetResourceType, SheetType } from '../../../models/sheet';
import { Invite } from '../../../models/sheet/resources';
import ListContainer from '../../data/ListContainer';

interface Props {
  nested?: boolean;
  data: {
    status: 'Accepted' | 'Declined' | 'Revoked';
    sheetType: SheetType;
    invite: Invite;
  };
}

const UpdateInviteStatus: React.FC<Props> = ({ data, nested }) => {
  const dispatch = useDispatch();

  const [status, setStatus] = useState(data.status);

  const submitHandler = async (e: FormEvent) => {
    e.preventDefault();

    dispatch(
      updateSheetResourceStart(
        data.sheetType,
        data.sheetType === 'characters' ? data.invite.charSheetId : data.invite.sheetId,
        SheetResourceType.invites,
        data.invite._id,
        { status: status },
        {
          modal: nested ? false : true,
          nestedModal: nested ? true : false,
          notification: {
            status: status === 'Declined' || status === 'Revoked' ? 'alert' : 'success',
            heading: 'Invite Status Updated',
            message: `You have successfully ${status.toLowerCase()} this invite.`,
          },
        }
      )
    );
  };

  return (
    <ModalForm
      nested={nested}
      title={
        status === 'Accepted'
          ? 'Accept Campaign Invitation'
          : status === 'Declined'
          ? 'Are you sure you want to decline this invite?'
          : status === 'Revoked'
          ? 'Are you sure you want to revoke this invite?'
          : 'Update Invite Status'
      }
      submitText={
        status === 'Accepted'
          ? `Join ${data.invite.campaignName}`
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
          changeHandler={setStatus}
          required
        />
      ) : (
        <Select label="Update Status" name="status" value={status} options={[{ name: 'Revoke', id: 'Revoked' }]} changeHandler={setStatus} required />
      )}

      <ListContainer list={[data.invite]} classes="mt-4">
        <DisplayInvite invite={data.invite} sheetType={data.sheetType} noActions />
      </ListContainer>

      {status === 'Declined' || status === 'Revoked' ? (
        <Notice noIcon status={NoticeStatus.Error} message={`You will not be able to change your decision once you have ${status === 'Declined' ? 'declined' : 'revoked'} this invitation.`} />
      ) : null}
    </ModalForm>
  );
};

export default UpdateInviteStatus;
