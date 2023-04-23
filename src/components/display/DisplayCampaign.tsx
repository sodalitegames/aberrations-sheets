import { useActions } from '../../hooks/useActions';

import DescriptionList from '../data/DescriptionList';
import Button from '../Button';
import ModalTypes from '../../utils/ModalTypes';

import { Campaign } from '../../models/sheet';

interface Props {
  campaign: Campaign;
}

const DisplayCampaign: React.FC<Props> = ({ campaign }) => {
  const { setModal } = useActions();

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
        <Button text onClick={() => setModal({ type: ModalTypes.removeCharacterFromCampaign, data: { sheetType: 'characters' } })}>
          Leave Campaign
        </Button>
      </div>
    </div>
  );
};

export default DisplayCampaign;
