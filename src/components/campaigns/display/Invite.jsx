import { useDispatch } from 'react-redux';

import { setModal } from '../../../redux/app/app.actions';

import ModalTypes from '../../../utils/ModalTypes';
import { formatDate } from '../../../utils/formatDate';

import ListItem from '../../shared/ListItem';
import DescriptionList from '../../shared/DescriptionList';
import Button from '../../shared/Button';

const Invite = ({ invite, noActions, condensed }) => {
  const dispatch = useDispatch();

  if (condensed === 'view') {
    return 'view';
  }

  if (condensed === 'expandable') {
    return 'expandable';
  }

  return (
    <ListItem heading={`${invite.campaignName} by ${invite.ccName}`}>
      <DescriptionList
        list={[
          { name: 'Invite Sent', values: [formatDate(invite.createdAt)] },
          { name: 'Sent To', values: [`Character - ${invite.charSheetId}`] },
          { name: 'Status', values: [invite.status] },
          invite.message ? { name: 'Message', values: [invite.message] } : null,
        ]}
        classes="mt-2"
      />
      {!noActions && invite.status === 'Pending' ? (
        <>
          <div className="mt-4">
            <Button onClick={() => dispatch(setModal({ type: ModalTypes.revokeInvite, id: invite._id }))} disabled>
              Revoke Invite
            </Button>
          </div>
          <div className="mt-2">
            <Button text onClick={() => dispatch(setModal({ type: ModalTypes.deleteInvite, id: invite._id }))} disabled>
              Delete Invite
            </Button>
          </div>
        </>
      ) : null}
    </ListItem>
  );
};

export default Invite;
