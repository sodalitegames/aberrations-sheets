import { useSelector } from 'react-redux';

import { selectCurrentCampaign } from '../../redux/campaign/campaign.selectors';

import { getSpeciesAbility } from '../../utils/helpers/species';
import ModalTypes from '../../utils/ModalTypes';
import SlideOverTypes from '../../utils/SlideOverTypes';
import { calculateShieldValue, calculateSpeedAdjustment, calculateModifiers } from '../../utils/functions/calculations';
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
import { useActions } from '../../hooks/useActions';

import { Npc } from '../../models/sheet/resources';
import { Species } from '../../models/resource';
import { DisplayProps } from './display.types';
import { SheetType } from '../../models/sheet';

interface NpcDetailsProps {
  npc: Npc;
  species: Species[];
}

const NpcDetails: React.FC<NpcDetailsProps> = ({ npc, species }) => {
  const modifiers = calculateModifiers(npc.modifiers, npc.wearables);
  const abilities = getSpeciesAbility(npc.speciesId, species);

  return (
    <DescriptionList
      list={[
        { name: 'Species', values: [npc.speciesName], half: true },
        { name: 'Shield Value', values: [calculateShieldValue(npc.wearables)], half: true },
        { name: 'Diplomacy', values: [npc.diplomacy], half: true },
        { name: 'Type', values: [npc.type], half: true },
        { name: 'Temperament', values: [npc.temperament], half: true },
        { name: 'Experience', values: [npc.experience], half: true },
        { name: 'Mortality', values: [npc.mortality], half: true },
        { name: 'Milestones', values: [npc.milestones], half: true },
        { name: 'Wallet', values: [npc.wallet], half: true },
        { name: 'Active', values: [npc.active ? 'Yes' : 'No'], half: true },
        { name: 'Speed', values: [npc.speed + calculateSpeedAdjustment(npc.wearables)], half: true },
        { name: 'Health', values: [`${npc.currentHp}/${npc.maxHp}`], half: true },
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
      classes="mt-2"
    />
  );
};

interface DisplayNpcProps extends DisplayProps {
  npc: Npc;
  species: Species[];
}

const DisplayNpc: React.FC<DisplayNpcProps> = ({ npc, species, condensed, listItem }) => {
  const { setModal, setSlideOver } = useActions();

  const campSheet = useSelector(selectCurrentCampaign)!;

  if (listItem) {
    if (condensed) {
      return (
        <ListItem heading={`${npc.name} (${npc.speciesName})`}>
          <InfoList list={[`${npc.diplomacy} | ${npc.type}`]} />
        </ListItem>
      );
    }

    return (
      <ListItem heading={npc.name}>
        <NpcDetails npc={npc} species={species} />
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
              click: () => setModal({ type: ModalTypes.editWallet, data: { entityType: 'npcs', entity: npc } }),
            },
            {
              text: 'Mortality',
              click: () => setModal({ type: ModalTypes.editMortality, data: { entityType: 'npcs', entity: npc } }),
            },
            {
              text: 'Experience',
              click: () => setModal({ type: ModalTypes.editExperience, data: { entityType: 'npcs', entity: npc } }),
            },
            {
              text: 'Health',
              click: () => setModal({ type: ModalTypes.editHealth, data: { entityType: 'npcs', entity: npc } }),
            },
            {
              text: 'Milestones',
              click: () => setModal({ type: ModalTypes.editMilestones, data: { entityType: 'npcs', entity: npc } }),
            },
            {
              text: 'Modifiers',
              click: () => setModal({ type: ModalTypes.editModifiers, data: { entityType: 'npcs', entity: npc } }),
            },
          ],
        }}
      >
        {npc.name}
      </Heading>
      <NpcDetails npc={npc} species={species} />

      <Heading
        edit={{
          menu: [
            { text: 'Strength', click: () => setModal({ type: ModalTypes.editStat, data: { stat: 'strength', entityType: 'npcs', entity: npc } }) },
            { text: 'Agility', click: () => setModal({ type: ModalTypes.editStat, data: { stat: 'agility', entityType: 'npcs', entity: npc } }) },
            { text: 'Persona', click: () => setModal({ type: ModalTypes.editStat, data: { stat: 'persona', entityType: 'npcs', entity: npc } }) },
            { text: 'Aptitude', click: () => setModal({ type: ModalTypes.editStat, data: { stat: 'aptitude', entityType: 'npcs', entity: npc } }) },
          ],
        }}
      >
        Active Stats
      </Heading>
      <DescriptionList
        list={[
          { name: 'Strength', values: [`D${npc.strength.die}`], half: true },
          { name: 'Agility', values: [`D${npc.agility.die}`], half: true },
          { name: 'Persona', values: [`D${npc.persona.die}`], half: true },
          { name: 'Aptitude', values: [`D${npc.aptitude.die}`], half: true },
        ]}
        classes="my-2"
      />

      <Heading
        edit={{
          menu: [
            { text: 'Slowed', click: () => setModal({ type: ModalTypes.editCondition, data: { stat: 'slowed', entityType: 'npcs', entity: npc } }) },
            { text: 'Agony', click: () => setModal({ type: ModalTypes.editCondition, data: { stat: 'agony', entityType: 'npcs', entity: npc } }) },
            { text: 'Injured', click: () => setModal({ type: ModalTypes.editCondition, data: { stat: 'injured', entityType: 'npcs', entity: npc } }) },
            { text: 'Disturbed', click: () => setModal({ type: ModalTypes.editCondition, data: { stat: 'disturbed', entityType: 'npcs', entity: npc } }) },
          ],
        }}
      >
        Conditions
      </Heading>
      <DescriptionList
        list={[
          { name: 'Slowed', values: [npc.conditions.slowed], half: true },
          { name: 'Agony', values: [npc.conditions.agony], half: true },
          { name: 'Injured', values: [npc.conditions.injured], half: true },
          { name: 'Disturbed', values: [npc.conditions.disturbed], half: true },
        ]}
        classes="my-2"
      />

      <Heading edit={{ click: () => setSlideOver({ type: SlideOverTypes.editDescriptionForm, data: { sheetType: 'campaigns', sheetId: npc.sheetId, entityType: 'npcs', entity: npc } }) }}>
        Description
      </Heading>
      <InfoList list={[npc.description]} />

      <Heading edit={{ click: () => setSlideOver({ type: SlideOverTypes.editBackgroundForm, data: { sheetType: 'campaigns', sheetId: npc.sheetId, entityType: 'npcs', entity: npc } }) }}>
        Background
      </Heading>
      <InfoList list={[npc.background]} />

      <Heading
        edit={{ text: 'Purchase', click: () => setSlideOver({ type: SlideOverTypes.purchaseAugmentation, data: { sheetType: 'campaigns', sheetId: npc.sheetId, entityType: 'npcs', entity: npc } }) }}
      >
        Augmentations
      </Heading>
      <ul className="grid">
        {campSheet.augmentations
          .filter(aug => aug.npcId === npc._id)
          .map(aug => (
            <DisplayAugmentation key={aug._id} aug={aug} noButtonPanel />
          ))}
      </ul>

      <Heading
        edit={{
          text: 'Manage',
          click: () => setSlideOver({ type: SlideOverTypes.manageAssignedBelongings, data: { belongingType: 'weapons', npc: npc } }),
        }}
      >
        Weapons
      </Heading>
      <ul className="grid grid-cols-2 gap-4">
        {campSheet.weapons
          .filter(weap => weap.npcId === npc._id)
          .map(weapon => (
            <DisplayWeapon key={weapon._id} weapon={weapon} sheetType={SheetType.campaigns} listItem condensed="view" />
          ))}
      </ul>

      <Heading
        edit={{
          text: 'Manage',
          click: () => setSlideOver({ type: SlideOverTypes.manageAssignedBelongings, data: { belongingType: 'wearables', npc: npc } }),
        }}
      >
        Wearables
      </Heading>
      <ul className="grid grid-cols-2 gap-4">
        {campSheet.wearables
          .filter(wear => wear.npcId === npc._id)
          .map(wearable => (
            <DisplayWearable key={wearable._id} wearable={wearable} sheetType={SheetType.campaigns} listItem condensed="view" />
          ))}
      </ul>

      <Heading
        edit={{
          text: 'Manage',
          click: () => setSlideOver({ type: SlideOverTypes.manageAssignedBelongings, data: { belongingType: 'consumables', npc: npc } }),
        }}
      >
        Consumables
      </Heading>
      <ul className="grid grid-cols-2 gap-4">
        {campSheet.consumables
          .filter(cons => cons.npcId === npc._id)
          .map(consumable => (
            <DisplayConsumable key={consumable._id} consumable={consumable} sheetType={SheetType.campaigns} listItem condensed="view" />
          ))}
      </ul>

      <Heading
        edit={{
          text: 'Manage',
          click: () => setSlideOver({ type: SlideOverTypes.manageAssignedBelongings, data: { belongingType: 'usables', npc: npc } }),
        }}
      >
        Usables
      </Heading>
      <ul className="grid grid-cols-2 gap-4">
        {campSheet.usables
          .filter(usab => usab.npcId === npc._id)
          .map(usable => (
            <DisplayUsable key={usable._id} usable={usable} sheetType={SheetType.campaigns} listItem condensed="view" />
          ))}
      </ul>
    </div>
  );
};

export default DisplayNpc;
