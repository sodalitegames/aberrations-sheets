import { useActions } from '../../hooks/useActions';

import ModalTypes from '../../utils/ModalTypes';
import { formatDate } from '../../utils/helpers/dates';

import ListItem from '../data/ListItem';
import DescriptionList from '../data/DescriptionList';
import Button from '../Button';

import { Invite } from '../../models/sheet/resources';
import { SheetType } from '../../models/sheet';

interface Props {
  invite: Invite;
  noActions?: boolean;
  sheetType: SheetType;
}

const DisplayInvite: React.FC<Props> = ({ invite, noActions, sheetType }) => {
  const { setModal, setNestedModal } = useActions();

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
            <Button onClick={() => setModal({ type: ModalTypes.updateInviteStatus, data: { sheetType: sheetType, status: 'Accepted', invite } })}>Accept Invite</Button>
            <Button text classes="mt-2" onClick={() => setModal({ type: ModalTypes.updateInviteStatus, data: { sheetType: sheetType, status: 'Declined', invite } })}>
              Decline Invite
            </Button>
          </div>
        ) : (
          <div className="mt-4">
            <Button onClick={() => setNestedModal({ type: ModalTypes.updateInviteStatus, data: { sheetType: sheetType, status: 'Revoked', invite } })}>Revoke Invite</Button>
            <Button
              text
              classes="mt-2"
              onClick={() =>
                setNestedModal({
                  type: ModalTypes.deleteResource,
                  data: {
                    sheetType: sheetType,
                    resourceType: 'invites',
                    resource: invite,
                    title: 'Are you sure you want to delete this invite?',
                    submitText: 'Yes, delete this invite',
                    notification: { heading: 'Invite Deleted', message: `You have successfully deleted invite to Character #${invite.charSheetId}.` },
                  },
                })
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
              setNestedModal({
                type: ModalTypes.deleteResource,
                data: {
                  sheetType: sheetType,
                  resourceType: 'invites',
                  resource: invite,
                  title: 'Are you sure you want to delete this invite?',
                  submitText: 'Yes, delete this invite',
                  notification: { heading: 'Invite Deleted', message: `You have successfully deleted invite to Character #${invite.charSheetId}.` },
                },
              })
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
