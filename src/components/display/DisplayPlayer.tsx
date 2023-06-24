import { useActions } from '../../hooks/useActions';

import { getSpeciesAbility } from '../../utils/helpers/species';
import ModalTypes from '../../utils/ModalTypes';
import SlideOverTypes from '../../utils/SlideOverTypes';
import { calculateModifiers, calculateShieldValue, calculateSpeedAdjustment } from '../../utils/functions/calculations';
import { displayModifier } from '../../utils/helpers/modifiers';

import ListItem from '../data/ListItem';
import DescriptionList from '../data/DescriptionList';
import InfoList from '../data/InfoList';

import DisplayAugmentation from './DisplayAugmentation';
import DisplayWeapon from './DisplayWeapon';
import DisplayWearable from './DisplayWearable';
import DisplayConsumable from './DisplayConsumable';
import DisplayUsable from './DisplayUsable';

import Heading from '../Heading';

import { Player } from '../../models/sheet/resources';
import { Species } from '../../models/resource';
import { DisplayProps } from './display.types';
import { SheetType } from '../../models/sheet';

interface PlayerDetailsProps {
  player: Player;
  species: Species[];
}

const PlayerDetails: React.FC<PlayerDetailsProps> = ({ player, species }) => {
  const equippedWearables = player.wearables.filter(wear => wear.equipped);

  const modifiers = calculateModifiers(player.modifiers, equippedWearables);
  const abilities = getSpeciesAbility(player.speciesId, species);

  return (
    <DescriptionList
      list={[
        { name: 'Player Name', values: [player.playerNickname ? `${player.playerNickname} (${player.playerName})` : player.playerName], half: true },
        { name: 'Shield Value', values: [calculateShieldValue(equippedWearables)], half: true },
        { name: 'Species', values: [player.speciesName], half: true },
        { name: 'Mortality', values: [player.mortality], half: true },
        { name: 'Level', values: [player.level], half: true },
        { name: 'Wallet', values: [player.wallet], half: true },
        { name: 'Active', values: [player.active ? 'Yes' : 'No'], half: true },
        { name: 'Speed', values: [player.speed + calculateSpeedAdjustment(equippedWearables)], half: true },
        { name: 'Health', values: [`${player.currentHp}/${player.maxHp}`], half: true },
        { name: 'Modifiers', values: modifiers.length ? modifiers.map(modifier => displayModifier(modifier)) : ['No modifiers'], columns: 2 },
        {
          name: 'Activated Ability',
          values: [abilities.activated],
        },
        {
          name: 'Passive Abilities',
          values: [abilities.passive],
        },
        {
          name: 'Detraction',
          values: [abilities.detraction],
        },
      ]}
      classes="my-2"
    />
  );
};

interface DisplayPlayerProps extends DisplayProps {
  player: Player;
  species: Species[];
}

const DisplayPlayer: React.FC<DisplayPlayerProps> = ({ player, species, condensed, listItem }) => {
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
              click: () => setModal({ type: ModalTypes.editWallet, data: { entityType: 'players', entity: player } }),
            },
            {
              text: 'Mortality',
              click: () => setModal({ type: ModalTypes.editMortality, data: { entityType: 'players', entity: player } }),
            },
            {
              text: 'Level',
              click: () => setModal({ type: ModalTypes.editLevel, data: { entityType: 'players', entity: player } }),
            },
            {
              text: 'Health',
              click: () => setModal({ type: ModalTypes.editHealth, data: { entityType: 'players', entity: player } }),
            },
            {
              text: 'Modifiers',
              click: () => setModal({ type: ModalTypes.editModifiers, data: { entityType: 'players', entity: player } }),
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
            { text: 'Strength', click: () => setModal({ type: ModalTypes.editStat, data: { stat: 'strength', entityType: 'players', entity: player } }) },
            { text: 'Agility', click: () => setModal({ type: ModalTypes.editStat, data: { stat: 'agility', entityType: 'players', entity: player } }) },
            { text: 'Persona', click: () => setModal({ type: ModalTypes.editStat, data: { stat: 'persona', entityType: 'players', entity: player } }) },
            { text: 'Aptitude', click: () => setModal({ type: ModalTypes.editStat, data: { stat: 'aptitude', entityType: 'players', entity: player } }) },
          ],
        }}
      >
        Stats
      </Heading>
      {/* Do I want to show stat experience as well? */}
      <DescriptionList
        list={[
          { name: 'Strength', values: [`D${player.strength.die}`], half: true },
          { name: 'Agility', values: [`D${player.agility.die}`], half: true },
          { name: 'Persona', values: [`D${player.persona.die}`], half: true },
          { name: 'Aptitude', values: [`D${player.aptitude.die}`], half: true },
        ]}
        classes="my-2"
      />

      <Heading
        edit={{
          menu: [
            { text: 'Slowed', click: () => setModal({ type: ModalTypes.editCondition, data: { condition: 'slowed', entityType: 'players', entity: player } }) },
            { text: 'Agony', click: () => setModal({ type: ModalTypes.editCondition, data: { condition: 'agony', entityType: 'players', entity: player } }) },
            { text: 'Injured', click: () => setModal({ type: ModalTypes.editCondition, data: { condition: 'injured', entityType: 'players', entity: player } }) },
            { text: 'Disturbed', click: () => setModal({ type: ModalTypes.editCondition, data: { condition: 'disturbed', entityType: 'players', entity: player } }) },
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

      <Heading edit={{ click: () => setSlideOver({ type: SlideOverTypes.editDescriptionForm, data: { sheetType: 'campaigns', sheetId: player.campaign, entityType: 'players', entity: player } }) }}>
        Character Description
      </Heading>
      <InfoList list={[player.charDescription]} />

      <Heading edit={{ click: () => setSlideOver({ type: SlideOverTypes.editBackgroundForm, data: { sheetType: 'campaigns', sheetId: player.campaign, entityType: 'players', entity: player } }) }}>
        Character Background
      </Heading>
      <InfoList list={[player.charBackground]} />

      <Heading
        edit={{
          text: 'Purchase',
          click: () =>
            setSlideOver({
              type: SlideOverTypes.purchaseAugmentation,
              data: { sheetType: 'characters', sheetId: player._id, entity: player, entityType: 'players', augmentations: player.augmentations },
            }),
        }}
      >
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
              data: { entityType: 'players', entityId: player._id, belongingType: 'weapons' },
            }),
        }}
      >
        Equipped Weapons
      </Heading>
      <ul className="grid grid-cols-2 gap-4">
        {player.weapons
          .filter(weapon => weapon.equipped)
          .map(weapon => (
            <DisplayWeapon key={weapon._id} weapon={weapon} sheetType={SheetType.characters} listItem condensed="view" />
          ))}
      </ul>

      <Heading
        edit={{
          text: 'Manage',
          click: () =>
            setSlideOver({
              type: SlideOverTypes.manageEquippedBelongings,
              data: { entityType: 'players', entityId: player._id, belongingType: 'wearables' },
            }),
        }}
      >
        Equipped Wearables
      </Heading>
      <ul className="grid grid-cols-2 gap-4">
        {player.wearables
          .filter(wearable => wearable.equipped)
          .map(wearable => (
            <DisplayWearable key={wearable._id} wearable={wearable} sheetType={SheetType.characters} listItem condensed="view" />
          ))}
      </ul>

      <Heading
        edit={{
          text: 'Manage',
          click: () =>
            setSlideOver({
              type: SlideOverTypes.manageEquippedBelongings,
              data: { entityType: 'players', entityId: player._id, belongingType: 'consumables' },
            }),
        }}
      >
        Equipped Consumables
      </Heading>
      <ul className="grid grid-cols-2 gap-4">
        {player.consumables
          .filter(consumable => consumable.equipped)
          .map(consumable => (
            <DisplayConsumable key={consumable._id} consumable={consumable} sheetType={SheetType.characters} listItem condensed="view" />
          ))}
      </ul>

      <Heading
        edit={{
          text: 'Manage',
          click: () =>
            setSlideOver({
              type: SlideOverTypes.manageEquippedBelongings,
              data: { entityType: 'players', entityId: player._id, belongingType: 'usables' },
            }),
        }}
      >
        Equipped Usables
      </Heading>
      <ul className="grid grid-cols-2 gap-4">
        {player.usables
          .filter(usable => usable.equipped)
          .map(usable => (
            <DisplayUsable key={usable._id} usable={usable} sheetType={SheetType.characters} listItem condensed="view" />
          ))}
      </ul>
    </div>
  );
};

export default DisplayPlayer;
