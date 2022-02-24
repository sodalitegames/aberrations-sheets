import SlideOverTypes from '../../utils/SlideOverTypes';
import ModalTypes from '../../utils/ModalTypes';

import ListItem from '../data/ListItem';
import DescriptionList from '../data/DescriptionList';
import InfoList from '../data/InfoList';

const UsableDetails = ({ usable, sheetType }) => {
  return (
    <DescriptionList
      list={[
        { name: 'Type', values: [usable.type], half: true },
        { name: 'Quantity', values: [`${usable.quantity} ${usable.units || 'units'}`], half: true },
        { name: 'Equippable', values: [usable.equippable ? 'Yes' : 'No'], half: true },
        sheetType === 'characters' ? { name: 'Equipped', values: [usable.equipped ? 'Yes' : 'No'], half: true } : null,
        sheetType === 'campaigns' ? { name: 'Active', values: [usable.active ? 'Yes' : 'No'], half: true } : null,
        sheetType === 'campaigns' ? { name: 'Assigned Npc', values: [usable.npcId ? usable.npcId : 'Unassigned'] } : null,
        { name: 'Description', values: [usable.description] },
        usable.metadata?.givenBy ? { name: 'Received From', values: [usable.metadata.givenBy], half: true } : null,
        usable.metadata?.givenTo ? { name: 'Given To', values: [usable.metadata.givenTo], half: true } : null,
      ]}
      classes="mt-2"
    />
  );
};

const DisplayUsable = ({ usable, condensed, actions, noButtonPanel, listItem, sheetType }) => {
  if (listItem) {
    if (condensed === 'view') {
      return (
        <ListItem heading={`${usable.name} (${usable.type})`} view={{ type: ModalTypes.showBelonging, id: usable._id, data: { sheetType: sheetType, resourceType: 'usables' } }}>
          <InfoList list={[{ title: usable.description, value: usable.description }]} />
        </ListItem>
      );
    }

    if (condensed) {
      return (
        <ListItem heading={`${usable.name} (${usable.quantity} ${usable.units || 'units'})`} actions={actions}>
          <InfoList list={[usable.type]} />
        </ListItem>
      );
    }

    return (
      <ListItem
        heading={usable.name}
        noButtonPanel={noButtonPanel}
        editable={{ type: SlideOverTypes.usableForm, id: usable._id, data: { sheetType: sheetType } }}
        deletable={{
          type: ModalTypes.deleteResource,
          id: usable._id,
          data: {
            sheetType: sheetType,
            resourceType: 'usables',
            title: `Are you sure you want to delete ${usable.name}?`,
            submitText: `Yes, delete ${usable.name}`,
            equipped: usable.equipped,
            notification: { heading: 'Usable Deleted', message: `You have successfully deleted ${usable.name}.` },
          },
        }}
      >
        <UsableDetails usable={usable} sheetType={sheetType} />
      </ListItem>
    );
  }

  return (
    <div className="py-3">
      <h3 className="text-sm font-semibold text-gray-800">{usable.name}</h3>
      <div>
        <UsableDetails usable={usable} sheetType={sheetType} />
      </div>
    </div>
  );
};

export default DisplayUsable;
