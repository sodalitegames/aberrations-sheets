import { useDispatch } from 'react-redux';

import { setModal } from '../../../redux/app/app.actions';

import DescriptionList from '../../shared/data/DescriptionList';
import Button from '../../shared/Button';
import ModalTypes from '../../../utils/ModalTypes';

const DisplayCampaign = ({ campaign, condensed }) => {
  const dispatch = useDispatch();

  if (condensed === 'view') {
    return 'view';
  }

  if (condensed === 'expandable') {
    return 'expandable';
  }

  return (
    <div>
      <DescriptionList
        list={[
          { name: 'Campaign Name', values: [campaign.name] },
          { name: 'CC Name', values: [campaign.ccNickname || campaign.ccName] },
          { name: 'Players', values: [`${campaign.players.map(player => player.playerNickname || player.playerName).join(', ')}`] },
          { name: 'Characters', values: [`${campaign.players.map(player => player.characterName).join(', ')}`] },
        ]}
      />
      <div className="mt-6">
        <Button text onClick={() => dispatch(setModal({ type: ModalTypes.leaveCampaign }))}>
          Leave Campaign
        </Button>
      </div>
    </div>
  );
};

export default DisplayCampaign;