import { useSetRecoilState } from 'recoil';

import { slideOverState } from '../../../recoil/app/app.atoms';

import SlideOverTypes from '../../../utils/SlideOverTypes';

import ListItem from '../../shared/ListItem';
import DescriptionList from '../../shared/DescriptionList';
import Button from '../../shared/Button';

const Invite = ({ invite, condensed }) => {
  const setSlideOver = useSetRecoilState(slideOverState);

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
          { name: 'Message', values: [invite.message] },
        ]}
        classes="mt-2"
      />
      <div className="mt-4">
        <Button onClick={() => setSlideOver({ type: SlideOverTypes.charLogForm })}>Accept Invite</Button>
      </div>
      <div className="mt-2">
        <Button text onClick={() => setSlideOver({ type: SlideOverTypes.charLogForm })}>
          Decline Invite
        </Button>
      </div>
    </ListItem>
  );
};

export default Invite;