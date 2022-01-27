import SlideOverTypes from '../../../utils/SlideOverTypes';
import ModalTypes from '../../../utils/ModalTypes';
import { capitalize } from '../../../utils/strings';
import { getWeaponRangeString } from '../../../utils/displayBelongings';

import ListItem from '../../shared/data/ListItem';
import DescriptionList from '../../shared/data/DescriptionList';
import InfoList from '../../shared/data/InfoList';

const createWeaponList = (stat, range, ability) => {
  const weapon = [`${capitalize(stat)} | ${range} Range`];
  if (ability) weapon.push({ title: ability, value: ability.replace('"', '') });
  return weapon;
};

const WeaponDetails = ({ weapon, sheetType }) => {
  return (
    <DescriptionList
      list={[
        { name: 'Type', values: [weapon.type], half: true },
        { name: 'Associated Stat', values: [capitalize(weapon.associatedStat)], half: true },
        { name: 'Level & Damage', values: [weapon.levelDamage], half: true },
        { name: 'Range', values: [getWeaponRangeString(weapon.range)], half: true },
        sheetType === 'characters' ? { name: 'Equipped', values: [weapon.equipped ? 'Yes' : 'No'], half: true } : null,
        sheetType === 'campaigns' ? { name: 'Active', values: [weapon.active ? 'Yes' : 'No'], half: true } : null,
        { name: 'Quantity', values: [weapon.quantity], half: true },
        sheetType === 'campaigns' ? { name: 'Assigned Npc', values: [weapon.npcId ? weapon.npcId : 'Unassigned'] } : null,
        weapon.ability ? { name: 'Ability', values: [weapon.ability] } : null,
        weapon.description ? { name: 'Description', values: [weapon.description] } : null,
        weapon.metadata?.givenBy ? { name: 'Received From', value: [weapon.metadata.givenBy], half: true } : null,
        weapon.metadata?.givenTo ? { name: 'Given To', value: [weapon.metadata.givenTo], half: true } : null,
      ]}
      classes="mt-2"
    />
  );
};

const DisplayWeapon = ({ weapon, condensed, actions, noButtonPanel, listItem, sheetType }) => {
  if (listItem) {
    if (condensed === 'view') {
      return (
        <ListItem heading={`${weapon.name} (Level ${weapon.levelDamage})`} view={{ type: ModalTypes.showBelonging, id: weapon._id, data: { sheetType: sheetType, resourceType: 'weapons' } }}>
          <InfoList list={createWeaponList(weapon.associatedStat, weapon.range, weapon.ability)} />
        </ListItem>
      );
    }

    if (condensed) {
      return (
        <ListItem heading={`${weapon.nickname || weapon.name} (Level ${weapon.levelDamage})`} actions={actions}>
          <InfoList list={[`${capitalize(weapon.associatedStat)} | ${weapon.range} Range`]} />
        </ListItem>
      );
    }

    return (
      <ListItem
        heading={weapon.nickname ? `${weapon.nickname} (${weapon.name})` : weapon.name}
        noButtonPanel={noButtonPanel}
        editable={{ type: SlideOverTypes.editWeaponForm, id: weapon._id, data: { sheetType: sheetType } }}
        deletable={{
          type: ModalTypes.deleteResource,
          id: weapon._id,
          data: {
            sheetType: sheetType,
            resourceType: 'weapons',
            title: `Are you sure you want to delete ${weapon.nickname || weapon.name}?`,
            submitText: `Yes, delete ${weapon.nickname || weapon.name}`,
            equipped: weapon.equipped,
            notification: { heading: 'Weapon Deleted', message: `You have successfully deleted ${weapon.name}.` },
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
