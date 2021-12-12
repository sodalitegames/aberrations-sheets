import { useDispatch } from 'react-redux';

import { setModal } from '../../../redux/app/app.actions';

import ModalTypes from '../../../utils/ModalTypes';

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
          // { name: 'Campaign Captain', values: [invite.ccName] },
          { name: 'Invite Sent', values: [new Date(invite.createdAt).toDateString()] },
          { name: 'Status', values: [invite.status] },
          { name: 'Message', values: [invite.message] },
        ]}
        classes="mt-2"
      />
      {!noActions && invite.status === 'Pending' ? (
        <>
          <div className="mt-4">
            <Button onClick={() => dispatch(setModal({ type: ModalTypes.revokeInvite, id: invite._id }))}>Revoke Invite</Button>
          </div>
          <div className="mt-2">
            <Button text onClick={() => dispatch(setModal({ type: ModalTypes.deleteInvite, id: invite._id }))}>
              Delete Invite
            </Button>
          </div>
        </>
      ) : null}
    </ListItem>
  );
};

export default Invite;
