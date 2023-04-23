import { useSelector } from 'react-redux';
import { selectCurrentCampaign } from '../../redux/campaign/campaign.selectors';

import SlideOverTypes from '../../utils/SlideOverTypes';
import ModalTypes from '../../utils/ModalTypes';
import { capitalize } from '../../utils/helpers/strings';
import { getNpcName } from '../../utils/helpers/npcs';

import ListItem from '../data/ListItem';
import DescriptionList from '../data/DescriptionList';
import InfoList from '../data/InfoList';

import { Wearable } from '../../models/sheet/resources';
import { EntityType, SheetType } from '../../models/sheet';
import { DisplayBelongingProps, DisplayProps } from './display.types';

interface WearableDetailsProps {
  wearable: Wearable;
  sheetType: SheetType | EntityType;
}

const WearableDetails: React.FC<WearableDetailsProps> = ({ wearable, sheetType }) => {
  const campSheet = useSelector(selectCurrentCampaign);

  return (
    <DescriptionList
      list={[
        { name: 'Body Area', values: [capitalize(wearable.bodyArea)], half: true },
        sheetType === 'characters' ? { name: 'Equipped', values: [wearable.equipped ? 'Yes' : 'No'], half: true } : null,
        { name: 'Quantity', values: [wearable.quantity], half: true },
        sheetType === 'campaigns' ? { name: 'Active', values: [wearable.active ? 'Yes' : 'No'], half: true } : null,
        sheetType === 'campaigns' ? { name: 'Assigned Npc', values: [wearable.npcId ? getNpcName(wearable.npcId, campSheet?.npcs) : 'Unassigned'], half: true } : null,
        { name: 'Description', values: [wearable.description] },
        { name: 'Shield Value', values: [wearable.shieldValue], half: true },
        { name: 'Speed Adjustment', values: [wearable.speedAdjustment], half: true },
        { name: 'Modifiers', values: wearable.modifiers.length ? wearable.modifiers.map(mod => `${mod.modifier} ${mod.amount > 0 ? `+${mod.amount}` : mod.amount}`) : ['No modifiers'] },
        wearable.metadata?.givenBy ? { name: 'Received From', values: [wearable.metadata.givenBy], half: true } : null,
        wearable.metadata?.givenTo ? { name: 'Given To', values: [wearable.metadata.givenTo], half: true } : null,
      ]}
      classes="mt-2"
    />
  );
};

interface DisplayWearableProps extends DisplayProps, DisplayBelongingProps {
  wearable: Wearable;
  sheetType: SheetType | EntityType;
}

const DisplayWearable: React.FC<DisplayWearableProps> = ({ wearable, condensed, actions, noButtonPanel, listItem, sheetType, playerId }) => {
  if (listItem) {
    if (condensed === 'view') {
      return (
        <ListItem
          heading={`${wearable.name} (${capitalize(wearable.bodyArea)})`}
          view={{ type: ModalTypes.showBelonging, id: wearable._id, data: { sheetType: sheetType, playerId, belongingType: 'wearables' } }}
        >
          <InfoList
            list={[
              { tooltip: [`Shield Value: ${wearable.shieldValue} / Speed Adjustment: ${wearable.speedAdjustment}`], value: `SV: ${wearable.shieldValue} / SA: ${wearable.speedAdjustment}` },
              wearable.modifiers.length
                ? {
                    tooltip: wearable.modifiers.map(mod => `${mod.modifier} ${mod.amount > 0 ? `+${mod.amount}` : mod.amount}`),
                    value: `${wearable.modifiers.length} Modifier${wearable.modifiers.length > 1 ? 's' : ''}`,
                  }
                : '0 Modifiers',
            ]}
          />
        </ListItem>
      );
    }

    if (condensed) {
      return (
        <ListItem heading={`${wearable.name} (${capitalize(wearable.bodyArea)})`} actions={actions}>
          <InfoList
            list={[
              {
                tooltip: [`Shield Value: ${wearable.shieldValue}`, `Speed Adjustment: ${wearable.speedAdjustment}`],
                value: `SV: ${wearable.shieldValue} / SA: ${wearable.speedAdjustment}`,
              },
              wearable.modifiers.length
                ? {
                    tooltip: wearable.modifiers.map(mod => `${mod.modifier} ${mod.amount > 0 ? `+${mod.amount}` : mod.amount}`),
                    value: `${wearable.modifiers.length} Modifier${wearable.modifiers.length > 1 ? 's' : ''}`,
                  }
                : '0 Modifiers',
            ]}
          />
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
