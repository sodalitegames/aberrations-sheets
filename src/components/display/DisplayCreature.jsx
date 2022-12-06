import { useActions } from '../../hooks/useActions';

import SlideOverTypes from '../../utils/SlideOverTypes';
import ModalTypes from '../../utils/ModalTypes';
import { capitalize } from '../../utils/helpers/strings';
import { displayModifier } from '../../utils/helpers/modifiers';

import ListItem from '../data/ListItem';
import DescriptionList from '../data/DescriptionList';
import InfoList from '../data/InfoList';

import Heading from '../Heading';

const CreatureDetails = ({ creature }) => {
  return (
    <DescriptionList
      list={[
        { name: 'Types', values: [{ value: creature.types.map(type => type.name).join(', '), tooltip: creature.types.map(type => `${type.name} - ${type.description}`) }] },
        { name: 'Description', values: [creature.description] },
        { name: 'Damage Level', values: [creature.damageLevel], half: true },
        { name: 'Attacking Stat', values: [capitalize(creature.attackingStat)], half: true },
        { name: 'Shield Value', values: [creature.shieldValue], half: true },
        { name: 'Active', values: [creature.active ? 'Yes' : 'No'], half: true },
        { name: 'Mortality', values: [creature.mortality], half: true },
        { name: 'Speed', values: [creature.speed], half: true },
        { name: 'Health', values: [`${creature.currentHp}/${creature.maxHp}`], half: true },
        { name: 'Modifiers', values: creature.modifiers.length ? creature.modifiers.map(modifier => displayModifier(modifier)) : ['No modifiers'], columns: 2 },
      ]}
      classes="mt-2"
    />
  );
};

const DisplayCreature = ({ creature, condensed, noButtonPanel, listItem }) => {
  const { setModal } = useActions();

  if (listItem) {
    if (condensed) {
      return (
        <ListItem heading={`${creature.name} (Level ${creature.damageLevel})`}>
          <InfoList list={[`Types: ${creature.types.map(type => type.name).join(', ')}`]} />
        </ListItem>
      );
    }

    return (
      <ListItem
        heading={creature.name}
        noButtonPanel={noButtonPanel}
        editable={{ type: SlideOverTypes.creatureForm, id: creature._id, data: { sheetType: 'campaigns' } }}
        deletable={{
          type: ModalTypes.deleteResource,
          id: creature._id,
          data: {
            sheetType: 'campaigns',
            resourceType: 'creatures',
            title: `Are you sure you want to delete ${creature.name}?`,
            submitText: `Yes, delete ${creature.name}`,
            equipped: creature.equipped,
            notification: { heading: 'Creature Deleted', message: `You have successfully deleted ${creature.name}.` },
          },
        }}
      >
        <CreatureDetails creature={creature} showStats />
      </ListItem>
    );
  }

  return (
    <div className="py-3 -mt-10">
      <Heading
        edit={{
          menu: [
            {
              text: 'Mortality',
              click: () => setModal({ type: ModalTypes.editMortality, data: { type: 'creature', entity: creature } }),
            },
            {
              text: 'Health',
              click: () => setModal({ type: ModalTypes.editHealth, data: { type: 'creature', entity: creature } }),
            },
            {
              text: 'Modifiers',
              click: () => setModal({ type: ModalTypes.editModifiers, data: { type: 'creature', resource: creature } }),
            },
          ],
        }}
      >
        {creature.name}
      </Heading>
      <CreatureDetails creature={creature} />

      <Heading
        edit={{
          menu: [
            { text: 'Strength', click: () => setModal({ type: ModalTypes.editStat, id: 'strength', data: { type: 'creature', resource: creature } }) },
            { text: 'Agility', click: () => setModal({ type: ModalTypes.editStat, id: 'agility', data: { type: 'creature', resource: creature } }) },
            { text: 'Persona', click: () => setModal({ type: ModalTypes.editStat, id: 'persona', data: { type: 'creature', resource: creature } }) },
            { text: 'Aptitude', click: () => setModal({ type: ModalTypes.editStat, id: 'aptitude', data: { type: 'creature', resource: creature } }) },
          ],
        }}
      >
        Active Stats
      </Heading>
      <DescriptionList
        list={[
          { name: 'Strength', values: [`D${creature.strength.die}`], half: true },
          { name: 'Agility', values: [`D${creature.agility.die}`], half: true },
          { name: 'Persona', values: [`D${creature.persona.die}`], half: true },
          { name: 'Aptitude', values: [`D${creature.aptitude.die}`], half: true },
        ]}
        classes="my-2"
      />

      <Heading
        edit={{
          menu: [
            { text: 'Slowed', click: () => setModal({ type: ModalTypes.editCondition, id: 'slowed', data: { type: 'creature', resource: creature } }) },
            { text: 'Agony', click: () => setModal({ type: ModalTypes.editCondition, id: 'agony', data: { type: 'creature', resource: creature } }) },
            { text: 'Injured', click: () => setModal({ type: ModalTypes.editCondition, id: 'injured', data: { type: 'creature', resource: creature } }) },
            { text: 'Disturbed', click: () => setModal({ type: ModalTypes.editCondition, id: 'disturbed', data: { type: 'creature', resource: creature } }) },
          ],
        }}
      >
        Conditions
      </Heading>
      <DescriptionList
        list={[
          { name: 'Slowed', values: [creature.conditions.slowed], half: true },
          { name: 'Agony', values: [creature.conditions.agony], half: true },
          { name: 'Injured', values: [creature.conditions.injured], half: true },
          { name: 'Disturbed', values: [creature.conditions.disturbed], half: true },
        ]}
        classes="my-2"
      />

      {/* Add in Types in Depth, Description in depth, and more */}
    </div>
  );
};

export default DisplayCreature;
