import SlideOverTypes from '../../utils/SlideOverTypes';
import ModalTypes from '../../utils/ModalTypes';
import { capitalize } from '../../utils/helpers/strings';

import ListItem from '../data/ListItem';
import DescriptionList from '../data/DescriptionList';
import InfoList from '../data/InfoList';

const ConsumableDetails = ({ consumable, sheetType }) => {
  return (
    <DescriptionList
      list={[
        { name: 'Level', values: [consumable.level], half: true },
        { name: 'Quantity', values: [consumable.quantity], half: true },
        { name: 'Uses', values: [consumable.uses], half: true },
        sheetType === 'characters' ? { name: 'Equipped', values: [consumable.equipped ? 'Yes' : 'No'], half: true } : null,
        sheetType === 'campaigns' ? { name: 'Active', values: [consumable.active ? 'Yes' : 'No'], half: true } : null,
        consumable.associatedStat ? { name: 'Associated Stat', values: [capitalize(consumable.associatedStat)], half: true } : null,
        sheetType === 'campaigns' ? { name: 'Assigned Npc', values: [consumable.npcId ? consumable.npcId : 'Unassigned'], half: true } : null,
        { name: 'Categories', values: [consumable.categories.map(cat => cat.name).join(', ')] },
        consumable.description ? { name: 'Description', values: [consumable.description] } : null,
        consumable.metadata?.givenBy ? { name: 'Received From', values: [consumable.metadata.givenBy], half: true } : null,
        consumable.metadata?.givenTo ? { name: 'Given To', values: [consumable.metadata.givenTo], half: true } : null,
      ]}
      classes="mt-2"
    />
  );
};

const DisplayConsumable = ({ consumable, condensed, actions, noButtonPanel, listItem, sheetType, playerId }) => {
  if (listItem) {
    if (condensed === 'view') {
      return (
        <ListItem
          heading={`${consumable.name} (Level ${consumable.level})`}
          view={{ type: ModalTypes.showBelonging, id: consumable._id, data: { sheetType: sheetType, playerId, belongingType: 'consumables' } }}
        >
          <InfoList list={[`Categories: ${consumable.categories.map(cat => cat.name).join(', ')}`, `Uses left: ${consumable.uses}`]} />
        </ListItem>
      );
    }

    if (condensed) {
      return (
        <ListItem heading={`${consumable.name} (Level ${consumable.level})`} actions={actions}>
          <InfoList list={[`Categories: ${consumable.categories.map(cat => cat.name).join(', ')}`, `Uses left: ${consumable.uses}`]} />
        </ListItem>
      );
    }

    return (
      <ListItem
        heading={consumable.name}
        noButtonPanel={noButtonPanel}
        editable={{ type: SlideOverTypes.consumableForm, id: consumable._id, data: { sheetType: sheetType } }}
        deletable={{
          type: ModalTypes.deleteResource,
          id: consumable._id,
          data: {
            sheetType: sheetType,
            resourceType: 'consumables',
            title: `Are you sure you want to delete ${consumable.name}?`,
            submitText: `Yes, delete ${consumable.name}`,
            equipped: consumable.equipped,
            notification: { heading: 'Consumable Deleted', message: `You have successfully deleted ${consumable.name}.` },
          },
        }}
      >
        <ConsumableDetails consumable={consumable} sheetType={sheetType} />
      </ListItem>
    );
  }

  return (
    <div className="py-3">
      <h3 className="text-sm font-semibold text-gray-800">{consumable.name}</h3>
      <div>
        <ConsumableDetails consumable={consumable} sheetType={sheetType} />
      </div>
    </div>
  );
};

export default DisplayConsumable;
