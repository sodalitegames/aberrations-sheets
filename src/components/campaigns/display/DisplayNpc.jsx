import { getSpeciesAbility } from '../../../utils/displaySpecies';

import ListItem from '../../shared/data/ListItem';
import DescriptionList from '../../shared/data/DescriptionList';
import InfoList from '../../shared/data/InfoList';

import DisplayAugmentation from '../../characters/display/DisplayAugmentation';
import DisplayWeapon from '../../sheets/display/DisplayWeapon';
import DisplayWearable from '../../sheets/display/DisplayWearable';
import DisplayConsumable from '../../sheets/display/DisplayConsumable';
import DisplayUsable from '../../sheets/display/DisplayUsable';

const NpcDetails = ({ npc, species }) => {
  return (
    <DescriptionList
      list={[
        { name: 'Character Power', values: [npc.power], half: true },
        { name: 'Species', values: [npc.speciesName], half: true },
        { name: 'Diplomacy', values: [npc.diplomacy], half: true },
        { name: 'Type', values: [npc.type], half: true },
        { name: 'Temperament', values: [npc.temperament], half: true },
        { name: 'Mortality', values: [npc.mortality], half: true },
        { name: 'Upgrade Points', values: [npc.upgradePoints], half: true },
        { name: 'Wallet', values: [npc.wallet], half: true },
        { name: 'Active', values: [npc.active ? 'Yes' : 'No'], half: true },
        { name: 'Species Ability', values: [getSpeciesAbility(npc.speciesId, species)] },
      ]}
      classes="mt-2"
    />
  );
};

const DisplayNpc = ({ npc, species, condensed, listItem }) => {
  if (listItem) {
    if (condensed) {
      return (
        <ListItem heading={`${npc.name} (${npc.power} Power)`}>
          <InfoList list={[`${npc.speciesName} | ${npc.type}`]} />
        </ListItem>
      );
    }

    return (
      <ListItem heading={npc.name}>
        <NpcDetails npc={npc} />
      </ListItem>
    );
  }

  return (
    <div className="py-3">
      <h3 className="text-lg border-b border-gray-200 mb-4 font-semibold text-gray-800">{npc.name}</h3>
      <NpcDetails npc={npc} species={species} />

      <h3 className="text-lg border-b border-gray-200 mt-8 mb-4 font-semibold text-gray-800">Active Stats</h3>
      {/* Do I want to show stat experience and advantage as well? */}
      <DescriptionList
        list={[
          { name: 'Fortitude', values: [npc.fortitude.points + npc.fortitude.modifier], half: true },
          { name: 'Agility', values: [npc.agility.points + npc.agility.modifier], half: true },
          { name: 'Persona', values: [npc.persona.points + npc.persona.modifier], half: true },
          { name: 'Aptitude', values: [npc.aptitude.points + npc.aptitude.modifier], half: true },
        ]}
        classes="my-2"
      />

      <h3 className="text-lg border-b border-gray-200 mt-8 mb-4 font-semibold text-gray-800">Passive Stats</h3>
      <DescriptionList
        list={[
          { name: 'Health', values: [`${npc.currentHp} / ${npc.maxHp}`], half: true },
          { name: 'Dodge Value', values: [npc.dodgeValue], half: true },
          { name: 'Initiative', values: [npc.initiative], half: true },
          { name: 'Assist', values: [npc.assist], half: true },
        ]}
        classes="my-2"
      />

      <h3 className="text-lg border-b border-gray-200 mt-8 mb-4 font-semibold text-gray-800">Conditions</h3>
      <DescriptionList
        list={[
          { name: 'Slowed', values: [npc.conditions.slowed], half: true },
          { name: 'Agony', values: [npc.conditions.agony], half: true },
          { name: 'Injured', values: [npc.conditions.injured], half: true },
          { name: 'Disturbed', values: [npc.conditions.disturbed], half: true },
        ]}
        classes="my-2"
      />

      <h3 className="text-lg border-b border-gray-200 mt-8 mb-4 font-semibold text-gray-800">Description</h3>
      <InfoList list={[npc.description]} />

      <h3 className="text-lg border-b border-gray-200 mt-8 mb-4 font-semibold text-gray-800">Background</h3>
      <InfoList list={[npc.background]} />

      <h3 className="text-lg border-b border-gray-200 mt-8 mb-4 font-semibold text-gray-800">Augmentations</h3>
      <ul className="grid">
        {npc.augmentations?.map(aug => (
          <DisplayAugmentation key={aug._id} aug={aug} noButtonPanel />
        ))}
      </ul>

      <h3 className="text-lg border-b border-gray-200 mt-8 mb-4 font-semibold text-gray-800">Weapons</h3>
      <ul className="grid grid-cols-2">
        {npc.weapons?.map(weapon => (
          <DisplayWeapon key={weapon._id} weapon={weapon} sheetType="campaigns" listItem condensed />
        ))}
      </ul>

      <h3 className="text-lg border-b border-gray-200 mt-8 mb-4 font-semibold text-gray-800">Wearables</h3>
      <ul className="grid grid-cols-2">
        {npc.wearables?.map(wearable => (
          <DisplayWearable key={wearable._id} wearable={wearable} sheetType="campaigns" listItem condensed />
        ))}
      </ul>

      <h3 className="text-lg border-b border-gray-200 mt-8 mb-4 font-semibold text-gray-800">Consumables</h3>
      <ul className="grid grid-cols-2">
        {npc.consumables?.map(consumable => (
          <DisplayConsumable key={consumable._id} consumable={consumable} sheetType="campaigns" listItem condensed />
        ))}
      </ul>

      <h3 className="text-lg border-b border-gray-200 mt-8 mb-4 font-semibold text-gray-800">Usables</h3>
      <ul className="grid grid-cols-2">
        {npc.usables?.map(usable => (
          <DisplayUsable key={usable._id} usable={usable} sheetType="campaigns" listItem condensed />
        ))}
      </ul>
    </div>
  );
};

export default DisplayNpc;
