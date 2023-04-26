import { useSelector } from 'react-redux';
import { selectCurrentCampaign } from '../../redux/campaign/campaign.selectors';

import SlideOverTypes from '../../utils/SlideOverTypes';
import ModalTypes from '../../utils/ModalTypes';
import { capitalize } from '../../utils/helpers/strings';
import { getWeaponRangeString } from '../../utils/helpers/belongings';
import { getNpcName } from '../../utils/helpers/npcs';

import ListItem from '../data/ListItem';
import DescriptionList from '../data/DescriptionList';
import InfoList, { InfoListItem } from '../data/InfoList';

import { Weapon } from '../../models/sheet/resources';
import { SheetType, StatType } from '../../models/sheet';
import { DisplayBelongingProps, DisplayProps } from './display.types';

const createWeaponList = (stat: StatType, range: string, ability: string): (InfoListItem | string)[] => {
  const weapon: (InfoListItem | string)[] = [`${capitalize(stat)} | ${range} Range`];
  if (ability) weapon.push({ tooltip: [ability], value: ability.replace('"', '') });
  return weapon;
};

interface WeaponDetailsProps {
  weapon: Weapon;
  sheetType: SheetType;
}

const WeaponDetails: React.FC<WeaponDetailsProps> = ({ weapon, sheetType }) => {
  const campSheet = useSelector(selectCurrentCampaign);

  return (
    <DescriptionList
      list={[
        { name: 'Type', values: [weapon.type], half: true },
        { name: 'Associated Stat', values: [capitalize(weapon.associatedStat)], half: true },
        { name: 'Damage Modifier', values: [`+${weapon.damageModifier}`], half: true },
        { name: 'Range', values: [getWeaponRangeString(weapon.range)], half: true },
        sheetType === 'characters' ? { name: 'Equipped', values: [weapon.equipped ? 'Yes' : 'No'], half: true } : null,
        sheetType === 'campaigns' ? { name: 'Active', values: [weapon.active ? 'Yes' : 'No'], half: true } : null,
        { name: 'Quantity', values: [weapon.quantity], half: true },
        sheetType === 'campaigns' ? { name: 'Assigned Npc', values: [weapon.npcId ? getNpcName(weapon.npcId, campSheet?.npcs || []) : 'Unassigned'] } : null,
        weapon.ability ? { name: 'Ability', values: [weapon.ability] } : null,
        weapon.description ? { name: 'Description', values: [weapon.description] } : null,
        weapon.metadata?.givenBy ? { name: 'Received From', values: [weapon.metadata.givenBy], half: true } : null,
        weapon.metadata?.givenTo ? { name: 'Given To', values: [weapon.metadata.givenTo], half: true } : null,
      ]}
      classes="mt-2"
    />
  );
};

interface DisplayWeaponProps extends DisplayProps, DisplayBelongingProps {
  weapon: Weapon;
  sheetType: SheetType;
}

const DisplayWeapon: React.FC<DisplayWeaponProps> = ({ weapon, condensed, actions, noButtonPanel, listItem, sheetType }) => {
  if (listItem) {
    if (condensed === 'view') {
      return (
        <ListItem heading={`${weapon.nickname || weapon.name} (Mod +${weapon.damageModifier})`} view={{ type: ModalTypes.showBelonging, data: { belongingType: 'weapons', belonging: weapon } }}>
          <InfoList list={createWeaponList(weapon.associatedStat, getWeaponRangeString(weapon.range), weapon.ability)} />
        </ListItem>
      );
    }

    if (condensed) {
      return (
        <ListItem heading={`${weapon.nickname || weapon.name} (Mod +${weapon.damageModifier})`} actions={actions}>
          <InfoList list={[`${capitalize(weapon.associatedStat)} | ${getWeaponRangeString(weapon.range)} Range`]} />
        </ListItem>
      );
    }

    return (
      <ListItem
        heading={weapon.nickname ? `${weapon.nickname} (${weapon.name})` : weapon.name}
        noButtonPanel={noButtonPanel}
        editable={{ type: SlideOverTypes.editWeaponForm, data: { sheetType, sheetId: weapon.sheetId, weapon } }}
        deletable={{
          type: ModalTypes.deleteResource,
          data: {
            sheetType: sheetType,
            resourceType: 'weapons',
            resource: weapon,
            title: `Are you sure you want to delete ${weapon.nickname || weapon.name}?`,
            submitText: `Yes, delete ${weapon.nickname || weapon.name}`,
            notification: { heading: 'Weapon Deleted', message: `You have successfully deleted ${weapon.nickname || weapon.name}.` },
          },
        }}
      >
        <WeaponDetails weapon={weapon} sheetType={sheetType} />
      </ListItem>
    );
  }

  return (
    <div className="py-3">
      <h3 className="text-sm font-semibold text-gray-800">{weapon.nickname ? `${weapon.nickname} (${weapon.name})` : weapon.name}</h3>
      <div>
        <WeaponDetails weapon={weapon} sheetType={sheetType} />
      </div>
    </div>
  );
};

export default DisplayWeapon;
