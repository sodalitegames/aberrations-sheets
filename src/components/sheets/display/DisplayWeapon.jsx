import SlideOverTypes from '../../../utils/SlideOverTypes';
import ModalTypes from '../../../utils/ModalTypes';
import { capitalize } from '../../../utils/strings';

import ListItem from '../../shared/data/ListItem';
import DescriptionList from '../../shared/data/DescriptionList';
import InfoList from '../../shared/data/InfoList';

const createWeaponList = (stat, range, ability) => {
  const weapon = [`${capitalize(stat)} | ${range} Range`];
  if (ability) weapon.push({ title: ability, value: ability.replace('"', '') });
  return weapon;
};

const DisplayWeapon = ({ weapon, condensed, noButtonPanel, listItem, sheetType }) => {
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
        <ListItem heading={`${weapon.nickname || weapon.name} (Level ${weapon.levelDamage})`}>
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
          },
        }}
      >
        <DescriptionList
          list={[
            { name: 'Type', values: [weapon.type], half: true },
            { name: 'Associated Stat', values: [capitalize(weapon.associatedStat)], half: true },
            { name: 'Level & Damage', values: [weapon.levelDamage], half: true },
            { name: 'Range', values: [weapon.range], half: true },
            { name: 'Equipped', values: [weapon.equipped ? 'Yes' : 'No'], half: true },
            { name: 'Quantity', values: [weapon.quantity], half: true },
            weapon.ability ? { name: 'Ability', values: [weapon.ability] } : null,
            weapon.description ? { name: 'Description', values: [weapon.description] } : null,
          ]}
          classes="mt-2"
        />
      </ListItem>
    );
  }

  return (
    <div className="py-3">
      <h3 className="text-sm font-semibold text-gray-800">{weapon.nickname ? `${weapon.nickname} (${weapon.name})` : weapon.name}</h3>
      <div>
        <DescriptionList
          list={[
            { name: 'Type', values: [weapon.type], half: true },
            { name: 'Associated Stat', values: [capitalize(weapon.associatedStat)], half: true },
            { name: 'Level & Damage', values: [weapon.levelDamage], half: true },
            { name: 'Range', values: [weapon.range], half: true },
            { name: 'Equipped', values: [weapon.equipped ? 'Yes' : 'No'], half: true },
            { name: 'Quantity', values: [weapon.quantity], half: true },
            weapon.ability ? { name: 'Ability', values: [weapon.ability] } : null,
            weapon.description ? { name: 'Description', values: [weapon.description] } : null,
          ]}
          classes="mt-2"
        />
      </div>
    </div>
  );
};

export default DisplayWeapon;
