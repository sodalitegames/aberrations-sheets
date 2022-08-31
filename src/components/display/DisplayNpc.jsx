import { useSelector } from 'react-redux';

import { selectCurrentCampaign } from '../../redux/campaign/campaign.selectors';

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
import { useActions } from '../../hooks/useActions';

const NpcDetails = ({ npc, species }) => {
  return (
    <DescriptionList
      list={[
        { name: 'Species', values: [npc.speciesName], half: true },
        { name: 'Shield Value', values: [npc.shieldValue], half: true },
        { name: 'Diplomacy', values: [npc.diplomacy], half: true },
        { name: 'Type', values: [npc.type], half: true },
        { name: 'Temperament', values: [npc.temperament], half: true },
        { name: 'Experience', values: [npc.experience], half: true },
        { name: 'Mortality', values: [npc.mortality], half: true },
        { name: 'Milestones', values: [npc.milestones], half: true },
        { name: 'Wallet', values: [npc.wallet], half: true },
        { name: 'Active', values: [npc.active ? 'Yes' : 'No'], half: true },
        { name: 'Speed', values: [npc.speed], half: true },
        { name: 'Health', values: [`${npc.currentHp}/${npc.maxHp}`], half: true },
        {
          name: 'Activated Ability',
          values: [getSpeciesAbility(npc.speciesId, species).activated],
        },
        {
          name: 'Passive Abilities',
          values: [getSpeciesAbility(npc.speciesId, species).passive],
        },
        {
          name: 'Detraction',
          values: [getSpeciesAbility(npc.speciesId, species).detraction],
        },
      ]}
      classes="mt-2"
    />
  );
};

const DisplayNpc = ({ npc, species, condensed, listItem }) => {
  const { setModal, setSlideOver } = useActions();

  const campSheet = useSelector(selectCurrentCampaign);

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
        <NpcDetails npc={npc} />
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
              click: () => setModal({ type: ModalTypes.editWallet, data: { type: 'npc', entity: npc } }),
            },
            {
              text: 'Mortality',
              click: () => setModal({ type: ModalTypes.editMortality, data: { type: 'npc', entity: npc } }),
            },
            {
              text: 'Experience',
              click: () => setModal({ type: ModalTypes.editExperience, data: { type: 'npc', entity: npc } }),
            },
            {
              text: 'Health',
              click: () => setModal({ type: ModalTypes.editHealth, data: { type: 'npc', entity: npc } }),
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
            { text: 'Strength', click: () => setModal({ type: ModalTypes.editStat, id: 'strength', data: { type: 'npc', resource: npc } }) },
            { text: 'Agility', click: () => setModal({ type: ModalTypes.editStat, id: 'agility', data: { type: 'npc', resource: npc } }) },
            { text: 'Persona', click: () => setModal({ type: ModalTypes.editStat, id: 'persona', data: { type: 'npc', resource: npc } }) },
            { text: 'Aptitude', click: () => setModal({ type: ModalTypes.editStat, id: 'aptitude', data: { type: 'npc', resource: npc } }) },
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
            { text: 'Slowed', click: () => setModal({ type: ModalTypes.editCondition, id: 'slowed', data: { type: 'npc', resource: npc } }) },
            { text: 'Agony', click: () => setModal({ type: ModalTypes.editCondition, id: 'agony', data: { type: 'npc', resource: npc } }) },
            { text: 'Injured', click: () => setModal({ type: ModalTypes.editCondition, id: 'injured', data: { type: 'npc', resource: npc } }) },
            { text: 'Disturbed', click: () => setModal({ type: ModalTypes.editCondition, id: 'disturbed', data: { type: 'npc', resource: npc } }) },
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

      <Heading edit={{ click: () => setSlideOver({ type: SlideOverTypes.editDescriptionForm, data: { type: 'npc', description: npc.description, resourceId: npc._id } }) }}>Description</Heading>
      <InfoList list={[npc.description]} />

      <Heading edit={{ click: () => setSlideOver({ type: SlideOverTypes.editBackgroundForm, data: { type: 'npc', background: npc.background, resourceId: npc._id } }) }}>Background</Heading>
      <InfoList list={[npc.background]} />

      <Heading edit={{ text: 'Purchase', click: () => setSlideOver({ type: SlideOverTypes.purchaseAugmentation, data: { sheetType: 'campaigns', sheetId: npc.sheetId, entity: npc } }) }}>
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
          click: () => setSlideOver({ type: SlideOverTypes.manageAssignedBelongings, data: { type: 'weapons', npc: npc } }),
        }}
      >
        Weapons
      </Heading>
      <ul className="grid grid-cols-2">
        {campSheet.weapons
          .filter(weap => weap.npcId === npc._id)
          .map(weapon => (
            <DisplayWeapon key={weapon._id} weapon={weapon} sheetType="campaigns" listItem condensed />
          ))}
      </ul>

      <Heading
        edit={{
          text: 'Manage',
          click: () => setSlideOver({ type: SlideOverTypes.manageAssignedBelongings, data: { type: 'wearables', npc: npc } }),
        }}
      >
        Wearables
      </Heading>
      <ul className="grid grid-cols-2">
        {campSheet.wearables
          .filter(wear => wear.npcId === npc._id)
          .map(wearable => (
            <DisplayWearable key={wearable._id} wearable={wearable} sheetType="campaigns" listItem condensed />
          ))}
      </ul>

      <Heading
        edit={{
          text: 'Manage',
          click: () => setSlideOver({ type: SlideOverTypes.manageAssignedBelongings, data: { type: 'consumables', npc: npc } }),
        }}
      >
        Consumables
      </Heading>
      <ul className="grid grid-cols-2">
        {campSheet.consumables
          .filter(cons => cons.npcId === npc._id)
          .map(consumable => (
            <DisplayConsumable key={consumable._id} consumable={consumable} sheetType="campaigns" listItem condensed />
          ))}
      </ul>

      <Heading
        edit={{
          text: 'Manage',
          click: () => setSlideOver({ type: SlideOverTypes.manageAssignedBelongings, data: { type: 'usables', npc: npc } }),
        }}
      >
        Usables
      </Heading>
      <ul className="grid grid-cols-2">
        {campSheet.usables
          .filter(usab => usab.npcId === npc._id)
          .map(usable => (
            <DisplayUsable key={usable._id} usable={usable} sheetType="campaigns" listItem condensed />
          ))}
      </ul>
    </div>
  );
};

export default DisplayNpc;
