import SlideOverTypes from '../../../utils/SlideOverTypes';
import ModalTypes from '../../../utils/ModalTypes';

import ListItem from '../../shared/ListItem';
import DescriptionList from '../../shared/DescriptionList';
import InfoList from '../../shared/InfoList';

const Wearable = ({ wearable, condensed, noButtonPanel }) => {
  if (condensed === 'view') {
    return (
      <ListItem heading={wearable.name} view={{ type: ModalTypes.displayBelonging, id: wearable._id, data: { type: 'wearable' } }}>
        <InfoList list={[wearable.equipped]} />
      </ListItem>
    );
  }

  if (condensed === 'expandable') {
    return 'expandable';
  }

  return (
    <ListItem
      heading={wearable.name}
      noButtonPanel={noButtonPanel}
      editable={{ type: SlideOverTypes.wearableForm, id: wearable._id }}
      deletable={{
        type: ModalTypes.confirmDelete,
        id: wearable._id,
        data: { type: 'wearables', title: `Are you sure you want to delete ${wearable.name}?`, submitText: `Yes, delete ${wearable.name}` },
      }}
    >
      <DescriptionList
        list={[
          { name: 'Body Area', values: [wearable.bodyArea[0].toUpperCase() + wearable.bodyArea.slice(1)] },
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
};

export default Wearable;
