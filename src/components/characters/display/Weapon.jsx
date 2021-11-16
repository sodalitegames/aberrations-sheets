import SlideOverTypes from '../../../utils/SlideOverTypes';
import ModalTypes from '../../../utils/ModalTypes';

import ListItem from '../../shared/ListItem';
import DescriptionList from '../../shared/DescriptionList';
import InfoList from '../../shared/InfoList';

const Weapon = ({ weapon, condensed, noButtonPanel }) => {
  if (condensed === 'view') {
    return (
      <ListItem heading={`${weapon.name} (${weapon.levelDamage})`} view={{ type: ModalTypes.displayBelonging, id: weapon._id, data: { type: 'weapon' } }}>
        <InfoList list={[`${weapon.associatedStat[0].toUpperCase() + weapon.associatedStat.split(1)} | Range: ${weapon.range}`, { title: 'not working yet', value: weapon.ability }]} />
      </ListItem>
    );
  }

  if (condensed === 'expandable') {
    return 'expandable';
  }

  return (
    <ListItem
      heading={weapon.nickname || weapon.name}
      noButtonPanel={noButtonPanel}
      editable={{ type: SlideOverTypes.editWeaponForm, id: weapon._id }}
      deletable={{
        type: ModalTypes.confirmDelete,
        id: weapon._id,
        data: { type: 'weapons', title: `Are you sure you want to delete ${weapon.nickname || weapon.name}?`, submitText: `Yes, delete ${weapon.nickname || weapon.name}` },
      }}
    >
      <DescriptionList
        list={[
          { name: 'Type', values: [weapon.type], half: true },
          { name: 'Associated Stat', values: [weapon.associatedStat[0].toUpperCase() + weapon.associatedStat.slice(1)], half: true },
          { name: 'Level & Damage', values: [weapon.levelDamage], half: true },
          { name: 'Range', values: [weapon.range], half: true },
          weapon.ability ? { name: 'Ability', values: [weapon.ability] } : null,
          weapon.description ? { name: 'Description', values: [weapon.description] } : null,
        ]}
        classes="mt-2"
      />
    </ListItem>
  );
};

export default Weapon;
