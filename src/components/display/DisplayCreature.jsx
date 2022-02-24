import SlideOverTypes from '../../utils/SlideOverTypes';
import ModalTypes from '../../utils/ModalTypes';
import { capitalize } from '../../utils/helpers/strings';

import ListItem from '../data/ListItem';
import DescriptionList from '../data/DescriptionList';
import InfoList from '../data/InfoList';

const CreatureDetails = ({ creature, showStats }) => {
  return (
    <DescriptionList
      list={[
        { name: 'Types', values: [creature.types.map(type => type.name).join(', ')] },
        { name: 'Description', values: [creature.description] },
        { name: 'Damage Level', values: [creature.damageLevel], half: true },
        { name: 'Attacking Stat', values: [capitalize(creature.attackingStat)], half: true },
        { name: 'Active', values: [creature.active ? 'Yes' : 'No'], half: true },
        { name: 'Mortality', values: [creature.mortality], half: true },
        showStats ? { name: 'Fortitude', values: [creature.fortitude], half: true } : null,
        showStats ? { name: 'Agility', values: [creature.agility], half: true } : null,
        showStats ? { name: 'Persona', values: [creature.persona], half: true } : null,
        showStats ? { name: 'Aptitude', values: [creature.aptitude], half: true } : null,
      ]}
      classes="mt-2"
    />
  );
};

const DisplayCreature = ({ creature, condensed, noButtonPanel, listItem }) => {
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
    <div className="py-3">
      <h3 className="text-lg border-b border-gray-200 mb-4 font-semibold text-gray-800">{creature.name}</h3>
      <CreatureDetails creature={creature} />

      <h3 className="text-lg border-b border-gray-200 mt-8 mb-4 font-semibold text-gray-800">Active Stats</h3>
      {/* Do I want to show stat advantage as well? */}
      <DescriptionList
        list={[
          { name: 'Fortitude', values: [creature.fortitude.points], half: true },
          { name: 'Agility', values: [creature.agility.points], half: true },
          { name: 'Persona', values: [creature.persona.points], half: true },
          { name: 'Aptitude', values: [creature.aptitude.points], half: true },
        ]}
        classes="my-2"
      />

      <h3 className="text-lg border-b border-gray-200 mt-8 mb-4 font-semibold text-gray-800">Passive Stats</h3>
      <DescriptionList
        list={[
          { name: 'Health', values: [`${creature.currentHp} / ${creature.maxHp}`], half: true },
          { name: 'Dodge Value', values: [creature.dodgeValue], half: true },
          { name: 'Initiative', values: [creature.initiative], half: true },
          { name: 'Assist', values: [creature.assist], half: true },
        ]}
        classes="my-2"
      />

      <h3 className="text-lg border-b border-gray-200 mt-8 mb-4 font-semibold text-gray-800">Conditions</h3>
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