import { useSelector } from 'react-redux';
import { selectCurrentCampaign } from '../../redux/campaign/campaign.selectors';

import SlideOverTypes from '../../utils/SlideOverTypes';
import ModalTypes from '../../utils/ModalTypes';
import { capitalize } from '../../utils/helpers/strings';
import { getNpcName } from '../../utils/helpers/npcs';

import ListItem from '../data/ListItem';
import DescriptionList from '../data/DescriptionList';
import InfoList from '../data/InfoList';

import { Consumable } from '../../models/sheet/resources';
import { SheetType } from '../../models/sheet';
import { DisplayBelongingProps, DisplayProps } from './display.types';

interface ConsumableDetailsProps {
  consumable: Consumable;
  sheetType: SheetType;
}

const ConsumableDetails: React.FC<ConsumableDetailsProps> = ({ consumable, sheetType }) => {
  const campSheet = useSelector(selectCurrentCampaign);

  return (
    <DescriptionList
      list={[
        { name: 'Level', values: [consumable.level], half: true },
        { name: 'Quantity', values: [consumable.quantity], half: true },
        { name: 'Uses', values: [consumable.uses], half: true },
        sheetType === 'characters' ? { name: 'Equipped', values: [consumable.equipped ? 'Yes' : 'No'], half: true } : null,
        sheetType === 'campaigns' ? { name: 'Active', values: [consumable.active ? 'Yes' : 'No'], half: true } : null,
        consumable.associatedStat ? { name: 'Associated Stat', values: [capitalize(consumable.associatedStat)], half: true } : null,
        sheetType === 'campaigns' ? { name: 'Assigned Npc', values: [consumable.npcId ? getNpcName(consumable.npcId, campSheet?.npcs || []) : 'Unassigned'], half: true } : null,
        { name: 'Categories', values: [{ value: consumable.categories.map(cat => cat.name).join(', '), tooltip: consumable.categories.map(cat => `${cat.name} - ${cat.description}`) }] },
        consumable.description ? { name: 'Description', values: [consumable.description] } : null,
        consumable.metadata?.givenBy ? { name: 'Received From', values: [consumable.metadata.givenBy], half: true } : null,
        consumable.metadata?.givenTo ? { name: 'Given To', values: [consumable.metadata.givenTo], half: true } : null,
      ]}
      classes="mt-2"
    />
  );
};

interface DisplayConsumableProps extends DisplayProps, DisplayBelongingProps {
  consumable: Consumable;
  sheetType: SheetType;
}

const DisplayConsumable: React.FC<DisplayConsumableProps> = ({ consumable, condensed, actions, noButtonPanel, listItem, sheetType }) => {
  if (listItem) {
    if (condensed === 'view') {
      return (
        <ListItem heading={`${consumable.name} (Level ${consumable.level})`} view={{ type: ModalTypes.showBelonging, data: { belongingType: 'consumables', belonging: consumable } }}>
          <InfoList
            list={[
              { tooltip: consumable.categories.map(cat => `${cat.name} - ${cat.description}`), value: `Categories: ${consumable.categories.map(cat => cat.name).join(', ')}` },
              `Uses left: ${consumable.uses}`,
            ]}
          />
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
        editable={{ type: SlideOverTypes.consumableForm, data: { sheetType, sheetId: consumable.sheetId, consumable } }}
        deletable={{
          type: ModalTypes.deleteResource,
          data: {
            sheetType: sheetType,
            resourceType: 'consumables',
            resource: consumable,
            title: `Are you sure you want to delete ${consumable.name}?`,
            submitText: `Yes, delete ${consumable.name}`,
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
