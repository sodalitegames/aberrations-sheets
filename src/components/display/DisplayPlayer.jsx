import { useActions } from '../../hooks/useActions';

import { getSpeciesAbility } from '../../utils/helpers/species';
import ModalTypes from '../../utils/ModalTypes';
import SlideOverTypes from '../../utils/SlideOverTypes';

import ListItem from '../data/ListItem';
import DescriptionList from '../data/DescriptionList';
import InfoList from '../data/InfoList';

import DisplayAugmentation from './DisplayAugmentation';
import DisplayWeapon from './DisplayWeapon';
import DisplayWearable from './DisplayWearable';
import DisplayConsumable from './DisplayConsumable';
import DisplayUsable from './DisplayUsable';

import Heading from '../Heading';

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
  const { setModal, setSlideOver } = useActions();

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
    <div className="py-3 -mt-10">
      <Heading
        edit={{
          menu: [
            {
              text: 'Wallet',
              click: () => setModal({ type: ModalTypes.editWallet, data: { type: 'player', entity: player } }),
            },
            {
              text: 'Mortality',
              click: () => setModal({ type: ModalTypes.editMortality, data: { type: 'player', entity: player } }),
            },
            {
              text: 'Upgrade Points',
              click: () => setModal({ type: ModalTypes.editSpentUpgradePoints, data: { type: 'player', entity: player } }),
            },
            {
              text: 'Health',
              click: () => setModal({ type: ModalTypes.editHealth, data: { type: 'player', entity: player } }),
            },
          ],
        }}
      >
        {player.characterName}
      </Heading>
      <PlayerDetails player={player} species={species} />

      <Heading
        edit={{
          menu: [
            { text: 'Fortitude', click: () => setModal({ type: ModalTypes.editStat, id: 'fortitude', data: { type: 'player', resource: player } }) },
            { text: 'Agility', click: () => setModal({ type: ModalTypes.editStat, id: 'agility', data: { type: 'player', resource: player } }) },
            { text: 'Persona', click: () => setModal({ type: ModalTypes.editStat, id: 'persona', data: { type: 'player', resource: player } }) },
            { text: 'Aptitude', click: () => setModal({ type: ModalTypes.editStat, id: 'aptitude', data: { type: 'player', resource: player } }) },
          ],
        }}
      >
        Active Stats
      </Heading>
      {/* Do I want to show stat experience as well? */}
      <DescriptionList
        list={[
          { name: 'Fortitude', values: [player.fortitude.points + player.fortitude.modifier], half: true },
          { name: 'Agility', values: [player.agility.points + player.agility.modifier], half: true },
          { name: 'Persona', values: [player.persona.points + player.persona.modifier], half: true },
          { name: 'Aptitude', values: [player.aptitude.points + player.aptitude.modifier], half: true },
        ]}
        classes="my-2"
      />

      <Heading>Stat Advantage</Heading>
      <DescriptionList
        list={[
          { name: 'Fortitude', values: [player.fortitude.advantage], half: true },
          { name: 'Agility', values: [player.agility.advantage], half: true },
          { name: 'Persona', values: [player.persona.advantage], half: true },
          { name: 'Aptitude', values: [player.aptitude.advantage], half: true },
        ]}
        classes="my-2"
      />

      <Heading>Passive Stats</Heading>
      <DescriptionList
        list={[
          { name: 'Health', values: [`${player.currentHp} / ${player.maxHp}`], half: true },
          { name: 'Dodge Value', values: [player.dodgeValue], half: true },
          { name: 'Initiative', values: [player.initiative], half: true },
          { name: 'Assist', values: [player.assist], half: true },
        ]}
        classes="my-2"
      />

      <Heading
        edit={{
          menu: [
            { text: 'Slowed', click: () => setModal({ type: ModalTypes.editCondition, id: 'slowed', data: { type: 'player', resource: player } }) },
            { text: 'Agony', click: () => setModal({ type: ModalTypes.editCondition, id: 'agony', data: { type: 'player', resource: player } }) },
            { text: 'Injured', click: () => setModal({ type: ModalTypes.editCondition, id: 'injured', data: { type: 'player', resource: player } }) },
            { text: 'Disturbed', click: () => setModal({ type: ModalTypes.editCondition, id: 'disturbed', data: { type: 'player', resource: player } }) },
          ],
        }}
      >
        Conditions
      </Heading>
      <DescriptionList
        list={[
          { name: 'Slowed', values: [player.conditions.slowed], half: true },
          { name: 'Agony', values: [player.conditions.agony], half: true },
          { name: 'Injured', values: [player.conditions.injured], half: true },
          { name: 'Disturbed', values: [player.conditions.disturbed], half: true },
        ]}
        classes="my-2"
      />

      <Heading edit={{ click: () => setSlideOver({ type: SlideOverTypes.editDescriptionForm, data: { type: 'player', description: player.charDescription, resourceId: player._id } }) }}>
        Character Description
      </Heading>
      <InfoList list={[player.charDescription]} />

      <Heading edit={{ click: () => setSlideOver({ type: SlideOverTypes.editBackgroundForm, data: { type: 'player', background: player.charBackground, resourceId: player._id } }) }}>
        Character Background
      </Heading>
      <InfoList list={[player.charBackground]} />

      <Heading edit={{ text: 'Purchase', click: () => setSlideOver({ type: SlideOverTypes.purchaseAugmentation, data: { sheetType: 'characters', sheetId: player._id, entity: player } }) }}>
        Augmentations
      </Heading>
      <ul className="grid">
        {player.augmentations.map(aug => (
          <DisplayAugmentation key={aug._id} aug={aug} noButtonPanel />
        ))}
      </ul>

      <Heading
        edit={{
          text: 'Manage',
          click: () =>
            setSlideOver({
              type: SlideOverTypes.manageEquippedBelongings,
              data: { type: 'weapons', sheet: player, sheetType: 'players', equippedList: player.weapons.filter(weapon => weapon.equipped) },
            }),
        }}
      >
        Equipped Weapons
      </Heading>
      <ul className="grid grid-cols-2">
        {player.weapons
          .filter(weapon => weapon.equipped)
          .map(weapon => (
            <DisplayWeapon key={weapon._id} weapon={weapon} sheetType="campaigns" listItem condensed />
          ))}
      </ul>

      <Heading
        edit={{
          text: 'Manage',
          click: () =>
            setSlideOver({
              type: SlideOverTypes.manageEquippedBelongings,
              data: {
                type: 'wearables',
                sheet: player,
                sheetType: 'players',
                equippedList: player.wearables.filter(wearable => wearable.equipped),
                equipmentMods: player.wearables
                  .filter(wearable => wearable.equipped)
                  .reduce(
                    (mods, wearable) => ({
                      fortitude: mods.fortitude + wearable.statMods.fortitude,
                      agility: mods.agility + wearable.statMods.agility,
                      persona: mods.persona + wearable.statMods.persona,
                      aptitude: mods.aptitude + wearable.statMods.aptitude,
                    }),
                    { fortitude: 0, agility: 0, persona: 0, aptitude: 0 }
                  ),
              },
            }),
        }}
      >
        Equipped Wearables
      </Heading>
      <ul className="grid grid-cols-2">
        {player.wearables
          .filter(wearable => wearable.equipped)
          .map(wearable => (
            <DisplayWearable key={wearable._id} wearable={wearable} sheetType="campaigns" listItem condensed />
          ))}
      </ul>

      <Heading
        edit={{
          text: 'Manage',
          click: () =>
            setSlideOver({
              type: SlideOverTypes.manageEquippedBelongings,
              data: { type: 'consumables', sheet: player, sheetType: 'players', equippedList: player.consumables.filter(consumable => consumable.equipped) },
            }),
        }}
      >
        Equipped Consumables
      </Heading>
      <ul className="grid grid-cols-2">
        {player.consumables
          .filter(consumable => consumable.equipped)
          .map(consumable => (
            <DisplayConsumable key={consumable._id} consumable={consumable} sheetType="campaigns" listItem condensed />
          ))}
      </ul>

      <Heading
        edit={{
          text: 'Manage',
          click: () =>
            setSlideOver({
              type: SlideOverTypes.manageEquippedBelongings,
              data: { type: 'usables', sheet: player, sheetType: 'players', equippedList: player.usables.filter(usable => usable.equipped) },
            }),
        }}
      >
        Equipped Usables
      </Heading>
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
