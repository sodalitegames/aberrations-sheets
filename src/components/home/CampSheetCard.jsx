import PagePanel from '../../layouts/components/home/PagePanel';

import DescriptionList from '../shared/DescriptionList';

const CampSheetCard = ({ campSheet }) => {
  return (
    <PagePanel heading={campSheet.name} subheading={campSheet.players.length ? JSON.stringify(campSheet.players) : 'No players assigned'} link={{ text: 'Go to Campaign', to: campSheet._id }}>
      <DescriptionList list={[{ name: 'Overview', values: [campSheet.overview] }]} />
    </PagePanel>
  );
};

export default CampSheetCard;
