import PagePanel from '../../layouts/components/home/PagePanel';

import DescriptionList from '../data/DescriptionList';

export default function CharSheetCard({ charSheet }) {
  return (
    <PagePanel
      heading={charSheet.characterName}
      subheading={charSheet.campaign ? `Campaign - ${charSheet.campaign.name} by ${charSheet.campaign.ccNickname || charSheet.campaign.ccName}` : 'No campaign assigned'}
      link={{ text: 'Go to Character', to: `${charSheet._id}/gameplay` }}
    >
      <DescriptionList
        list={[
          { name: 'Species', values: [charSheet.speciesName], half: true },
          { name: 'Level', values: [charSheet.level], half: true },
          { name: 'Description', values: [charSheet.charDescription] },
        ]}
      />
    </PagePanel>
  );
}
