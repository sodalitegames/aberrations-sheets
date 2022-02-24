import { useDispatch } from 'react-redux';

import { setModal, setNestedModal } from '../../redux/app/app.actions';

import ModalTypes from '../../utils/ModalTypes';
import { formatDate } from '../../utils/helpers/dates';

import ListItem from '../data/ListItem';
import DescriptionList from '../data/DescriptionList';
import Button from '../Button';

const DisplayInvite = ({ invite, noActions, sheetType }) => {
  const dispatch = useDispatch();

  return (
    <ListItem heading={`${invite.campaignName} by ${invite.ccName}`}>
      <DescriptionList
        list={[
          { name: 'Invite Sent', values: [formatDate(invite.createdAt)] },
          sheetType === 'campaigns' ? { name: 'Sent To', values: [`Character - ${invite.charSheetId}`] } : null,
          { name: 'Status', values: [invite.status] },
          invite.message ? { name: 'Message', values: [invite.message] } : null,
        ]}
        classes="mt-2"
      />
      {!noActions && invite.status === 'Pending' ? (
        sheetType === 'characters' ? (
          <div className="mt-4">
            <Button onClick={() => dispatch(setModal({ type: ModalTypes.updateInviteStatus, id: invite._id, data: { sheetType: sheetType, status: 'Accepted' } }))}>Accept Invite</Button>
            <Button text classes="mt-2" onClick={() => dispatch(setModal({ type: ModalTypes.updateInviteStatus, id: invite._id, data: { sheetType: sheetType, status: 'Declined' } }))}>
              Decline Invite
            </Button>
          </div>
        ) : (
          <div className="mt-4">
            <Button onClick={() => dispatch(setNestedModal({ type: ModalTypes.updateInviteStatus, id: invite._id, data: { sheetType: sheetType, status: 'Revoked' } }))}>Revoke Invite</Button>
            <Button
              text
              classes="mt-2"
              onClick={() =>
                dispatch(
                  setNestedModal({
                    type: ModalTypes.deleteResource,
                    id: invite._id,
                    data: {
                      sheetType: sheetType,
                      resourceType: 'invites',
                      title: 'Are you sure you want to delete this invite?',
                      submitText: 'Yes, delete this invite',
                      notification: { heading: 'Invite Deleted', message: `You have successfully deleted invite to Character #${invite.charSheetId}.` },
                    },
                  })
                )
              }
            >
              Delete Invite
            </Button>
          </div>
        )
      ) : !noActions ? (
        <div className="mt-4">
          <Button
            text
            onClick={() =>
              dispatch(
                setNestedModal({
                  type: ModalTypes.deleteResource,
                  id: invite._id,
                  data: {
                    sheetType: sheetType,
                    resourceType: 'invites',
                    title: 'Are you sure you want to delete this invite?',
                    submitText: 'Yes, delete this invite',
                    notification: { heading: 'Invite Deleted', message: `You have successfully deleted invite to Character #${invite.charSheetId}.` },
                  },
                })
              )
            }
          >
            Delete Invite
          </Button>
        </div>
      ) : null}
    </ListItem>
  );
};

export default DisplayInvite;
