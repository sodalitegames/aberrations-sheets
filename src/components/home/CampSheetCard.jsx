import PagePanel from '../../layouts/components/home/PagePanel';

import DescriptionList from '../shared/data/DescriptionList';

const CampSheetCard = ({ campSheet }) => {
  return (
    <PagePanel
      heading={campSheet.name}
      subheading={campSheet.players.length ? `Players - ${campSheet.players.map(player => player.playerNickname || player.playerName).join(', ')}` : 'No players assigned'}
      link={{ text: 'Go to Campaign', to: `${campSheet._id}/gameplay` }}
    >
      <DescriptionList
        list={[
          { name: 'Player Characters', values: [`${campSheet.players.length ? campSheet.players.map(player => player.characterName).join(', ') : 'No characters assigned'}`] },
          { name: 'Overview', values: [campSheet.overview] },
        ]}
      />
    </PagePanel>
  );
};

export default CampSheetCard;
