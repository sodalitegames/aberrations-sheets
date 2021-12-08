import PagePanel from '../../layouts/components/home/PagePanel';

import DescriptionList from '../shared/DescriptionList';

export default function CharSheetCard({ charSheet }) {
  return (
    <PagePanel
      heading={charSheet.characterName}
      subheading={charSheet.campaign ? `${charSheet.campaign.name} by ${charSheet.campaign.ccName}` : 'No campaign assigned'}
      link={{ text: 'Go to Character', to: charSheet._id }}
    >
      <DescriptionList
        list={[
          { name: 'Species', values: [charSheet.speciesName], half: true },
          { name: 'Power', values: [charSheet.power], half: true },
          { name: 'Description', values: [charSheet.charDescription] },
        ]}
      />
    </PagePanel>
  );
}
