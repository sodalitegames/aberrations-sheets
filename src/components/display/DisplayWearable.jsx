import SlideOverTypes from '../../utils/SlideOverTypes';
import ModalTypes from '../../utils/ModalTypes';
import { capitalize } from '../../utils/helpers/strings';

import ListItem from '../data/ListItem';
import DescriptionList from '../data/DescriptionList';
import InfoList from '../data/InfoList';

const WearableDetails = ({ wearable, sheetType }) => {
  return (
    <DescriptionList
      list={[
        { name: 'Body Area', values: [capitalize(wearable.bodyArea)], half: true },
        sheetType === 'characters' ? { name: 'Equipped', values: [wearable.equipped ? 'Yes' : 'No'], half: true } : null,
        { name: 'Quantity', values: [wearable.quantity], half: true },
        sheetType === 'campaigns' ? { name: 'Active', values: [wearable.active ? 'Yes' : 'No'], half: true } : null,
        sheetType === 'campaigns' ? { name: 'Assigned Npc', values: [wearable.npcId ? wearable.npcId : 'Unassigned'], half: true } : null,
        { name: 'Description', values: [wearable.description] },
        { name: 'Shield Value', values: [wearable.shieldValue], half: true },
        { name: 'Speed Adjustment', values: [wearable.speedAdjustment], half: true },
        wearable.metadata?.givenBy ? { name: 'Received From', values: [wearable.metadata.givenBy], half: true } : null,
        wearable.metadata?.givenTo ? { name: 'Given To', values: [wearable.metadata.givenTo], half: true } : null,
      ]}
      classes="mt-2"
    />
  );
};

const DisplayWearable = ({ wearable, condensed, actions, noButtonPanel, listItem, sheetType, playerId }) => {
  if (listItem) {
    if (condensed === 'view') {
      return (
        <ListItem
          heading={`${wearable.name} (${capitalize(wearable.bodyArea)})`}
          view={{ type: ModalTypes.showBelonging, id: wearable._id, data: { sheetType: sheetType, playerId, belongingType: 'wearables' } }}
        >
          <InfoList list={[`Shield Value: ${wearable.shieldValues.hello} / Speed Adjustment: ${wearable.speedAdjustment}`]} />
        </ListItem>
      );
    }

    if (condensed) {
      return (
        <ListItem heading={`${wearable.name} (${capitalize(wearable.bodyArea)})`} actions={actions}>
          <InfoList list={[`Shield Value: ${wearable.shieldValue} / Speed Adjustment: ${wearable.speedAdjustment}`]} />
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
            notification: { heading: 'Wearable Deleted', message: `You have successfully deleted ${wearable.name}.` },
          },
        }}
      >
        <WearableDetails wearable={wearable} sheetType={sheetType} />
      </ListItem>
    );
  }

  return (
    <div className="py-3">
      <h3 className="text-sm font-semibold text-gray-800">{wearable.name}</h3>
      <div>
        <WearableDetails wearable={wearable} sheetType={sheetType} />
      </div>
    </div>
  );
};

export default DisplayWearable;
