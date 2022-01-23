import SlideOverTypes from '../../../utils/SlideOverTypes';
import ModalTypes from '../../../utils/ModalTypes';

import ListItem from '../../shared/ListItem';
import DescriptionList from '../../shared/DescriptionList';
import InfoList from '../../shared/InfoList';

const Consumable = ({ consumable, condensed, noButtonPanel }) => {
  if (condensed === 'view') {
    return (
      <ListItem
        heading={`${consumable.name} (Level ${consumable.level})`}
        view={{ type: ModalTypes.showBelonging, id: consumable._id, data: { sheetType: 'characters', resourceType: 'consumables' } }}
      >
        <InfoList list={[`Categories: ${consumable.categories.map(cat => cat.name).join(', ')}`, `Uses left: ${consumable.uses}`]} />
        <p className="text-sm text-gray-500 truncate">{consumable.handle}</p>
      </ListItem>
    );
  }

  if (condensed === 'expandable') {
    return 'expandable';
  }

  return (
    <ListItem
      heading={consumable.name}
      noButtonPanel={noButtonPanel}
      editable={{ type: SlideOverTypes.consumableForm, id: consumable._id, data: { sheetType: 'characters' } }}
      deletable={{
        type: ModalTypes.deleteResource,
        id: consumable._id,
        data: {
          sheetType: 'characters',
          resourceType: 'consumables',
          title: `Are you sure you want to delete ${consumable.name}?`,
          submitText: `Yes, delete ${consumable.name}`,
          equipped: consumable.equipped,
        },
      }}
    >
      <DescriptionList
        list={[
          { name: 'Level', values: [consumable.level], half: true },
          { name: 'Quantity', values: [consumable.quantity], half: true },
          { name: 'Uses', values: [consumable.uses], half: true },
          consumable.associatedStat ? { name: 'Associated Stat', values: [consumable.associatedStat], half: true } : null,
          { name: 'Categories', values: [consumable.categories.map(cat => cat.name).join(', ')] },
          consumable.description ? { name: 'Description', values: [consumable.description] } : null,
        ]}
        classes="mt-2"
      />
    </ListItem>
  );
};

export default Consumable;
