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
        { name: 'Shield Value', values: [player.shieldValue], half: true },
        { name: 'Species', values: [player.speciesName], half: true },
        { name: 'Mortality', values: [player.mortality], half: true },
        { name: 'Experience', values: [player.experience], half: true },
        { name: 'Wallet', values: [player.wallet], half: true },
        { name: 'Active', values: [player.active ? 'Yes' : 'No'], half: true },
        { name: 'Milestones', values: [player.milestones], half: true },
        { name: 'Speed', values: [player.speed], half: true },
        { name: 'Health', values: [`${player.currentHp}/${player.maxHp}`], half: true },
        {
          name: 'Activated Ability',
          values: [getSpeciesAbility(player.speciesId, species).activated],
        },
        {
          name: 'Passive Abilities',
          values: [getSpeciesAbility(player.speciesId, species).passive],
        },
        {
          name: 'Detraction',
          values: [getSpeciesAbility(player.speciesId, species).detraction],
        },
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
              text: 'Experience',
              click: () => setModal({ type: ModalTypes.editExperience, data: { type: 'player', entity: player } }),
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
            { text: 'Strength', click: () => setModal({ type: ModalTypes.editStat, id: 'strength', data: { type: 'player', resource: player } }) },
            { text: 'Agility', click: () => setModal({ type: ModalTypes.editStat, id: 'agility', data: { type: 'player', resource: player } }) },
            { text: 'Persona', click: () => setModal({ type: ModalTypes.editStat, id: 'persona', data: { type: 'player', resource: player } }) },
            { text: 'Aptitude', click: () => setModal({ type: ModalTypes.editStat, id: 'aptitude', data: { type: 'player', resource: player } }) },
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
              data: { type: 'players', playerId: player._id, belongingType: 'weapons' },
            }),
        }}
      >
        Equipped Weapons
      </Heading>
      <ul className="grid grid-cols-2">
        {player.weapons
          .filter(weapon => weapon.equipped)
          .map(weapon => (
            <DisplayWeapon key={weapon._id} weapon={weapon} sheetType="players" playerId={player._id} listItem condensed />
          ))}
      </ul>

      <Heading
        edit={{
          text: 'Manage',
          click: () =>
            setSlideOver({
              type: SlideOverTypes.manageEquippedBelongings,
              data: { type: 'players', playerId: player._id, belongingType: 'wearables' },
            }),
        }}
      >
        Equipped Wearables
      </Heading>
      <ul className="grid grid-cols-2">
        {player.wearables
          .filter(wearable => wearable.equipped)
          .map(wearable => (
            <DisplayWearable key={wearable._id} wearable={wearable} sheetType="players" playerId={player._id} listItem condensed />
          ))}
      </ul>

      <Heading
        edit={{
          text: 'Manage',
          click: () =>
            setSlideOver({
              type: SlideOverTypes.manageEquippedBelongings,
              data: { type: 'players', playerId: player._id, belongingType: 'consumables' },
            }),
        }}
      >
        Equipped Consumables
      </Heading>
      <ul className="grid grid-cols-2">
        {player.consumables
          .filter(consumable => consumable.equipped)
          .map(consumable => (
            <DisplayConsumable key={consumable._id} consumable={consumable} sheetType="players" playerId={player._id} listItem condensed />
          ))}
      </ul>

      <Heading
        edit={{
          text: 'Manage',
          click: () =>
            setSlideOver({
              type: SlideOverTypes.manageEquippedBelongings,
              data: { type: 'players', playerId: player._id, belongingType: 'usables' },
            }),
        }}
      >
        Equipped Usables
      </Heading>
      <ul className="grid grid-cols-2">
        {player.usables
          .filter(usable => usable.equipped)
          .map(usable => (
            <DisplayUsable key={usable._id} usable={usable} sheetType="players" playerId={player._id} listItem condensed />
          ))}
      </ul>
    </div>
  );
};

export default DisplayPlayer;
