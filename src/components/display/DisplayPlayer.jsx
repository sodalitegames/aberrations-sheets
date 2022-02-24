import { getSpeciesAbility } from '../../utils/helpers/species';

import ListItem from '../data/ListItem';
import DescriptionList from '../data/DescriptionList';
import InfoList from '../data/InfoList';

import DisplayAugmentation from './DisplayAugmentation';
import DisplayWeapon from './DisplayWeapon';
import DisplayWearable from './DisplayWearable';
import DisplayConsumable from './DisplayConsumable';
import DisplayUsable from './DisplayUsable';

const PlayerDetails = ({ player, species }) => {
  return (
    <DescriptionList
      list={[
        { name: 'Player Name', values: [player.playerNickname ? `${player.playerNickname} (${player.playerName})` : player.playerName], half: true },
        { name: 'Character Power', values: [player.power], half: true },
        { name: 'Species', values: [player.speciesName], half: true },
        { name: 'Mortality', values: [player.mortality], half: true },
        { name: 'Upgrade Points', values: [player.upgradePoints], half: true },
        { name: 'Wallet', values: [player.wallet], half: true },
        { name: 'Active', values: [player.active ? 'Yes' : 'No'], half: true },
        { name: 'Species Ability', values: [getSpeciesAbility(player.speciesId, species)] },
      ]}
      classes="my-2"
    />
  );
};

const DisplayPlayer = ({ player, species, condensed, listItem }) => {
  if (listItem) {
    if (condensed) {
      return (
        <ListItem heading={player.characterName}>
          <InfoList list={[`Played by ${player.playerNickname || player.playerName}`]} />
        </ListItem>
      );
    }

    return (
      <ListItem heading={player.playerNickname ? `${player.playerNickname} (${player.playerName})` : player.playerName}>
        <PlayerDetails player={player} species={species} />
      </ListItem>
    );
  }

  return (
    <div className="py-3">
      <h3 className="mb-4 text-lg font-semibold text-gray-800 border-b border-gray-200">{player.characterName}</h3>
      <PlayerDetails player={player} species={species} />

      <h3 className="mt-8 mb-4 text-lg font-semibold text-gray-800 border-b border-gray-200">Active Stats</h3>
      {/* Do I want to show stat experience and advantage as well? */}
      <DescriptionList
        list={[
          { name: 'Fortitude', values: [player.fortitude.points + player.fortitude.modifier], half: true },
          { name: 'Agility', values: [player.agility.points + player.agility.modifier], half: true },
          { name: 'Persona', values: [player.persona.points + player.persona.modifier], half: true },
          { name: 'Aptitude', values: [player.aptitude.points + player.aptitude.modifier], half: true },
        ]}
        classes="my-2"
      />

      <h3 className="mt-8 mb-4 text-lg font-semibold text-gray-800 border-b border-gray-200">Passive Stats</h3>
      <DescriptionList
        list={[
          { name: 'Health', values: [`${player.currentHp} / ${player.maxHp}`], half: true },
          { name: 'Dodge Value', values: [player.dodgeValue], half: true },
          { name: 'Initiative', values: [player.initiative], half: true },
          { name: 'Assist', values: [player.assist], half: true },
        ]}
        classes="my-2"
      />

      <h3 className="mt-8 mb-4 text-lg font-semibold text-gray-800 border-b border-gray-200">Conditions</h3>
      <DescriptionList
        list={[
          { name: 'Slowed', values: [player.conditions.slowed], half: true },
          { name: 'Agony', values: [player.conditions.agony], half: true },
          { name: 'Injured', values: [player.conditions.injured], half: true },
          { name: 'Disturbed', values: [player.conditions.disturbed], half: true },
        ]}
        classes="my-2"
      />

      <h3 className="mt-8 mb-4 text-lg font-semibold text-gray-800 border-b border-gray-200">Character Description</h3>
      <InfoList list={[player.charDescription]} />

      <h3 className="mt-8 mb-4 text-lg font-semibold text-gray-800 border-b border-gray-200">Character Background</h3>
      <InfoList list={[player.charBackground]} />

      <h3 className="mt-8 mb-4 text-lg font-semibold text-gray-800 border-b border-gray-200">Augmentations</h3>
      <ul className="grid">
        {player.augmentations.map(aug => (
          <DisplayAugmentation key={aug._id} aug={aug} noButtonPanel />
        ))}
      </ul>

      <h3 className="mt-8 mb-4 text-lg font-semibold text-gray-800 border-b border-gray-200">Equipped Weapons</h3>
      <ul className="grid grid-cols-2">
        {player.weapons
          .filter(weapon => weapon.equipped)
          .map(weapon => (
            <DisplayWeapon key={weapon._id} weapon={weapon} sheetType="campaigns" listItem condensed />
          ))}
      </ul>

      <h3 className="mt-8 mb-4 text-lg font-semibold text-gray-800 border-b border-gray-200">Equipped Wearables</h3>
      <ul className="grid grid-cols-2">
        {player.wearables
          .filter(wearable => wearable.equipped)
          .map(wearable => (
            <DisplayWearable key={wearable._id} wearable={wearable} sheetType="campaigns" listItem condensed />
          ))}
      </ul>

      <h3 className="mt-8 mb-4 text-lg font-semibold text-gray-800 border-b border-gray-200">Equipped Consumables</h3>
      <ul className="grid grid-cols-2">
        {player.consumables
          .filter(consumable => consumable.equipped)
          .map(consumable => (
            <DisplayConsumable key={consumable._id} consumable={consumable} sheetType="campaigns" listItem condensed />
          ))}
      </ul>
      <h3 className="mt-8 mb-4 text-lg font-semibold text-gray-800 border-b border-gray-200">Equipped Usables</h3>
      <ul className="grid grid-cols-2">
        {player.usables
          .filter(usable => usable.equipped)
          .map(usable => (
            <DisplayUsable key={usable._id} usable={usable} sheetType="campaigns" listItem condensed />
          ))}
      </ul>
    </div>
  );
};

export default DisplayPlayer;
