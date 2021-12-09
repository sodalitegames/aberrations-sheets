import PagePanel from '../../layouts/components/home/PagePanel';

import DescriptionList from '../shared/DescriptionList';

const CampSheetCard = ({ campSheet }) => {
  return (
    <PagePanel
      heading={campSheet.name}
      subheading={campSheet.players.length ? `Players - ${campSheet.players.map(player => player.playerName).join(', ')}` : 'No players assigned'}
      link={{ text: 'Go to Campaign', to: campSheet._id }}
    >
      <DescriptionList
        list={[
          { name: 'Player Characters', values: campSheet.players.map(player => player.characterName) },
          { name: 'Overview', values: [campSheet.overview] },
        ]}
      />
    </PagePanel>
  );
};

export default CampSheetCard;
