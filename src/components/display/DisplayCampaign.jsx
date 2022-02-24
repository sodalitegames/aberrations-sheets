import { useDispatch } from 'react-redux';

import { setModal } from '../../redux/app/app.actions';

import DescriptionList from '../data/DescriptionList';
import Button from '../Button';
import ModalTypes from '../../utils/ModalTypes';

const DisplayCampaign = ({ campaign }) => {
  const dispatch = useDispatch();

  return (
    <div>
      <DescriptionList
        list={[
          { name: 'Campaign Name', values: [campaign.name] },
          { name: 'CC Name', values: [campaign.ccNickname || campaign.ccName] },
          {
            name: 'Players',
            values: campaign.players.map(player => player.playerNickname || player.playerName),
            half: true,
          },
          { name: 'Characters', values: campaign.players.map(player => player.characterName), half: true },
        ]}
      />
      <div className="mt-6">
        <Button text onClick={() => dispatch(setModal({ type: ModalTypes.removeCharacterFromCampaign, data: { sheetType: 'characters' } }))}>
          Leave Campaign
        </Button>
      </div>
    </div>
  );
};

export default DisplayCampaign;