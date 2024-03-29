import { useSelector } from 'react-redux';
import { selectCurrentCampaign } from '../../redux/campaign/campaign.selectors';

import SlideOverTypes from '../../utils/SlideOverTypes';
import ModalTypes from '../../utils/ModalTypes';
import { getNpcName } from '../../utils/helpers/npcs';

import ListItem from '../data/ListItem';
import DescriptionList from '../data/DescriptionList';
import InfoList from '../data/InfoList';

import { Usable } from '../../models/sheet/resources';
import { SheetType } from '../../models/sheet';
import { DisplayBelongingProps, DisplayProps } from './display.types';

interface UsableDetailsProps {
  usable: Usable;
  sheetType: SheetType;
}

const UsableDetails: React.FC<UsableDetailsProps> = ({ usable, sheetType }) => {
  const campSheet = useSelector(selectCurrentCampaign);

  return (
    <DescriptionList
      list={[
        { name: 'Type', values: [usable.type], half: true },
        { name: 'Quantity', values: [`${usable.quantity} ${usable.units || 'units'}`], half: true },
        { name: 'Equippable', values: [usable.equippable ? 'Yes' : 'No'], half: true },
        sheetType === 'characters' ? { name: 'Equipped', values: [usable.equipped ? 'Yes' : 'No'], half: true } : null,
        sheetType === 'campaigns' ? { name: 'Active', values: [usable.active ? 'Yes' : 'No'], half: true } : null,
        sheetType === 'campaigns' ? { name: 'Assigned Npc', values: [usable.npcId ? getNpcName(usable.npcId, campSheet?.npcs || []) : 'Unassigned'] } : null,
        { name: 'Description', values: [usable.description] },
        usable.metadata?.givenBy ? { name: 'Received From', values: [usable.metadata.givenBy], half: true } : null,
        usable.metadata?.givenTo ? { name: 'Given To', values: [usable.metadata.givenTo], half: true } : null,
      ]}
      classes="mt-2"
    />
  );
};

interface DisplayUsableProps extends DisplayProps, DisplayBelongingProps {
  usable: Usable;
  sheetType: SheetType;
}

const DisplayUsable: React.FC<DisplayUsableProps> = ({ usable, condensed, actions, noButtonPanel, listItem, sheetType }) => {
  if (listItem) {
    if (condensed === 'view') {
      return (
        <ListItem heading={`${usable.name} (${usable.type})`} view={{ type: ModalTypes.showBelonging, data: { belongingType: 'usables', belonging: usable } }}>
          <InfoList list={[{ tooltip: [usable.description], value: usable.description }]} />
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
        editable={{ type: SlideOverTypes.usableForm, data: { sheetType, sheetId: usable.sheetId, usable } }}
        deletable={{
          type: ModalTypes.deleteResource,
          data: {
            sheetType: sheetType,
            resourceType: 'usables',
            resource: usable,
            title: `Are you sure you want to delete ${usable.name}?`,
            submitText: `Yes, delete ${usable.name}`,
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
