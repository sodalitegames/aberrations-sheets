import SlideOverTypes from '../../../utils/SlideOverTypes';
import ModalTypes from '../../../utils/ModalTypes';
import { capitalize } from '../../../utils/strings';

import ListItem from '../../shared/ListItem';
import DescriptionList from '../../shared/DescriptionList';
import InfoList from '../../shared/InfoList';

const getWearableMods = (FOR, AGL, PER, APT) => {
  let stats = [];

  if (FOR) {
    stats.push(`${FOR > 0 ? '+' : ''}${FOR} FOR`);
  }

  if (AGL) {
    stats.push(`${AGL > 0 ? '+' : ''}${AGL} AGL`);
  }

  if (PER) {
    stats.push(`${PER > 0 ? '+' : ''}${PER} PER`);
  }

  if (APT) {
    stats.push(`${APT > 0 ? '+' : ''}${APT} APT`);
  }

  if (!stats.length) {
    return 'No Mods';
  }

  return stats.join(' / ');
};

const DisplayWearable = ({ wearable, condensed, noButtonPanel, listItem, sheetType }) => {
  if (listItem) {
    if (condensed === 'view') {
      return (
        <ListItem
          heading={`${wearable.name} (${capitalize(wearable.bodyArea)})`}
          view={{ type: ModalTypes.showBelonging, id: wearable._id, data: { sheetType: sheetType, resourceType: 'wearables' } }}
        >
          <InfoList list={[getWearableMods(wearable.statMods.fortitude, wearable.statMods.agility, wearable.statMods.persona, wearable.statMods.aptitude)]} />
        </ListItem>
      );
    }

    if (condensed) {
      return (
        <ListItem heading={`${wearable.name} (${capitalize(wearable.bodyArea)})`}>
          <InfoList list={[getWearableMods(wearable.statMods.fortitude, wearable.statMods.agility, wearable.statMods.persona, wearable.statMods.aptitude)]} />
        </ListItem>
      );
    }

    return (
      <ListItem
        heading={wearable.name}
        noButtonPanel={noButtonPanel}
        editable={{ type: SlideOverTypes.wearableForm, id: wearable._id, data: { sheetType: sheetType } }}
        deletable={{
          type: ModalTypes.deleteResource,
          id: wearable._id,
          data: {
            sheetType: sheetType,
            resourceType: 'wearables',
            title: `Are you sure you want to delete ${wearable.name}?`,
            submitText: `Yes, delete ${wearable.name}`,
            equipped: wearable.equipped,
          },
        }}
      >
        <DescriptionList
          list={[
            { name: 'Body Area', values: [capitalize(wearable.bodyArea)] },
            { name: 'Description', values: [wearable.description] },
            { name: 'Fortitude Mod', values: [wearable.statMods.fortitude], half: true },
            { name: 'Agility Mod', values: [wearable.statMods.agility], half: true },
            { name: 'Persona Mod', values: [wearable.statMods.persona], half: true },
            { name: 'Aptitude Mod', values: [wearable.statMods.aptitude], half: true },
          ]}
          classes="mt-2"
        />
      </ListItem>
    );
  }

  return (
    <div className="py-3">
      <h3 className="text-sm font-semibold text-gray-800">{wearable.name}</h3>
      <div>
        <DescriptionList
          list={[
            { name: 'Body Area', values: [capitalize(wearable.bodyArea)] },
            { name: 'Description', values: [wearable.description] },
            { name: 'Fortitude Mod', values: [wearable.statMods.fortitude], half: true },
            { name: 'Agility Mod', values: [wearable.statMods.agility], half: true },
            { name: 'Persona Mod', values: [wearable.statMods.persona], half: true },
            { name: 'Aptitude Mod', values: [wearable.statMods.aptitude], half: true },
          ]}
          classes="mt-2"
        />
      </div>
    </div>
  );
};

export default DisplayWearable;