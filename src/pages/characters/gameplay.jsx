import { useSelector, useDispatch } from 'react-redux';

import { selectCurrentCharacter, selectEquippedWeapons, selectEquippedWearables, selectEquippedConsumables, selectEquippedUsables } from '../../redux/character/character.selectors';

import { setModal, setSlideOver } from '../../redux/app/app.actions';

import classNames from '../../utils/classNames';
import ModalTypes from '../../utils/ModalTypes';
import SlideOverTypes from '../../utils/SlideOverTypes';
import { getHealthMessage, getWalletMessage } from '../../utils/messages';

import SheetPageContent from '../../layouts/components/sheet/SheetPageContent';

import Stats from '../../components/characters/Stats';
import Conditions from '../../components/characters/Conditions';

import PanelSection from '../../components/shared/PanelSection';
import Button from '../../components/shared/Button';
import Chip from '../../components/shared/Chip';
import ListContainer from '../../components/shared/ListContainer';

import Weapon from '../../components/characters/display/Weapon';
import Wearable from '../../components/characters/display/Wearable';
import Consumable from '../../components/characters/display/Consumable';
import Usable from '../../components/characters/display/Usable';
import Augmentation from '../../components/characters/display/Augmentation';

const CharacterGameplayPage = () => {
  const dispatch = useDispatch();

  const charSheet = useSelector(selectCurrentCharacter);

  const equippedWeapons = useSelector(selectEquippedWeapons);
  const equippedWearables = useSelector(selectEquippedWearables);
  const equippedConsumables = useSelector(selectEquippedConsumables);
  const equippedUsables = useSelector(selectEquippedUsables);

  return (
    <SheetPageContent title="Gameplay" columns={3}>
      {/* Left column */}
      <div className="grid grid-cols-2 gap-4 lg:col-span-2">
        {/* Welcome panel */}
        <PanelSection colSpan={2}>
          <div className="sm:flex sm:items-center sm:justify-between pb-6">
            <div className="sm:flex sm:space-x-5">
              <div className="mt-4 text-center sm:mt-0 sm:pt-1 sm:text-left">
                <p className="text-xl font-bold text-gray-900 sm:text-2xl">{charSheet.characterName}</p>
                <p className="text-sm font-medium text-gray-500">
                  {charSheet.species.name} Ability: {charSheet.species.ability}
                </p>
              </div>
            </div>
            <div className="ml-5 mt-5 flex flex-col flex-shrink-0 justify-center sm:mt-0 space-y-2">
              <Button onClick={() => dispatch(setSlideOver({ type: SlideOverTypes.manageCharacter }))}>Manage Character</Button>
            </div>
          </div>
        </PanelSection>

        {/* Stats */}
        <PanelSection colSpan={2}>
          <Stats
            mortality={charSheet.mortality}
            slowed={charSheet.conditions.slowed}
            power={charSheet.power}
            stats={[
              { name: 'Fortitude', passive: { name: 'Max Hp', calc: 'Fortitude * 5', value: charSheet.maxHp }, ...charSheet.fortitude },
              { name: 'Agility', passive: { name: 'Dodge Value', calc: 'Agility / 3 (Rd. Down)', value: charSheet.dodgeValue }, ...charSheet.agility },
              { name: 'Persona', passive: { name: 'Initiative', calc: 'Equal to Persona', value: charSheet.initiative }, ...charSheet.persona },
              { name: 'Aptitude', passive: { name: 'Assist', calc: 'Aptitude / 2 (Rd. Down)', value: charSheet.assist }, ...charSheet.aptitude },
            ]}
          />
          <Conditions conditions={charSheet.conditions} />
        </PanelSection>

        <div className="space-y-4">
          {/* Equipped Weapons */}
          <PanelSection title="Equipped Weapons">
            <div className="flow-root mt-2">
              <ListContainer
                list={equippedWeapons}
                button={{ click: () => dispatch(setSlideOver({ type: SlideOverTypes.manageEquippedBelongings, id: 'weapons' })), text: 'Manage equipped Weapons' }}
                empty={{
                  heading: 'No Equipped Weapons',
                  message: 'Get started by equipping your first one now',
                  button: { click: () => dispatch(setSlideOver({ type: SlideOverTypes.manageEquippedBelongings, id: 'weapons' })), text: 'Equip Weapon' },
                }}
              >
                {equippedWeapons.map(weapon => (
                  <Weapon key={weapon._id} weapon={weapon} condensed="view" />
                ))}
              </ListContainer>
            </div>
          </PanelSection>

          {/* Equipped Wearables */}
          <PanelSection title="Equipped Wearables">
            <div className="flow-root mt-2">
              <ListContainer
                list={equippedWearables}
                button={{ click: () => dispatch(setSlideOver({ type: SlideOverTypes.manageEquippedWearables })), text: 'Manage equipped Wearables' }}
                empty={{
                  heading: 'No Equipped Wearables',
                  message: 'Get started by equipping your first one now',
                  button: { click: () => dispatch(setSlideOver({ type: SlideOverTypes.manageEquippedWearables })), text: 'Equip Wearable' },
                }}
              >
                {equippedWearables.map(wearable => (
                  <Wearable key={wearable._id} wearable={wearable} condensed="view" />
                ))}
              </ListContainer>
            </div>
          </PanelSection>
        </div>

        <div className="space-y-4">
          {/* Equipped Consumables */}
          <PanelSection title="Equipped Consumables">
            <div className="flow-root mt-2">
              <ListContainer
                list={equippedConsumables}
                button={{ click: () => dispatch(setSlideOver({ type: SlideOverTypes.manageEquippedBelongings, id: 'consumables' })), text: 'Manage equipped Consumables' }}
                empty={{
                  heading: 'No Equipped Consumables',
                  message: 'Get started by equipping your first one now',
                  button: { click: () => dispatch(setSlideOver({ type: SlideOverTypes.manageEquippedBelongings, id: 'consumables' })), text: 'Equip Consumable' },
                }}
              >
                {equippedConsumables.map(consumable => (
                  <Consumable key={consumable._id} consumable={consumable} condensed="view" />
                ))}
              </ListContainer>
            </div>
          </PanelSection>

          {/* Equipped Usables */}
          <PanelSection title="Equipped Usables">
            <div className="flow-root mt-2">
              <ListContainer
                list={equippedUsables}
                button={{ click: () => dispatch(setSlideOver({ type: SlideOverTypes.manageEquippedBelongings, id: 'usables' })), text: 'Manage equipped Usables' }}
                empty={{
                  heading: 'No Equipped Usables',
                  message: 'Get started by equipping your first one now',
                  button: { click: () => dispatch(setSlideOver({ type: SlideOverTypes.manageEquippedBelongings, id: 'usables' })), text: 'Equip Usable' },
                }}
              >
                {equippedUsables.map(usable => (
                  <Usable key={usable._id} usable={usable} condensed="view" />
                ))}
              </ListContainer>
            </div>
          </PanelSection>
        </div>
      </div>

      {/* Right column */}
      <div className="grid grid-cols-1 gap-4">
        {/* Actions */}
        <PanelSection>
          <Button onClick={() => dispatch(setSlideOver({ type: SlideOverTypes.rollDice }))}>Roll Dice</Button>
          <Button onClick={() => dispatch(setModal({ type: ModalTypes.takeARest }))} classes="mt-2">
            Take a Rest
          </Button>
        </PanelSection>

        {/* Health */}
        <PanelSection>
          <div className="flex flex-col items-center justify-between text-5xl font-semibold text-gray-900">
            <h5 className="font-normal text-xl">Current Health</h5>
            <span className={classNames(charSheet.currentHp >= charSheet.maxHp / 2 ? 'text-green-800' : '', charSheet.currentHp >= charSheet.maxHp / 4 ? 'text-yellow-800' : 'text-red-800')}>
              {charSheet.currentHp} / {charSheet.maxHp}
            </span>
            <span className="text-sm font-medium text-gray-500 uppercase">{getHealthMessage(charSheet.currentHp, charSheet.maxHp)}</span>
          </div>
          <div className="mt-6">
            <Button onClick={() => dispatch(setModal({ type: ModalTypes.takeDamage }))}>Take Damage</Button>
            <Button onClick={() => dispatch(setModal({ type: ModalTypes.healDamage }))} classes="mt-2">
              Heal Damage
            </Button>
          </div>
        </PanelSection>

        {/* Wallet */}
        <PanelSection>
          <div className="flex flex-col items-center justify-between text-5xl font-semibold">
            <h5 className="font-normal text-xl">Wallet</h5>
            <span>{charSheet.wallet}</span>
            <span className="text-sm font-medium text-gray-500 uppercase">{getWalletMessage(charSheet.wallet)}</span>
          </div>
          <div className="mt-6">
            <Button onClick={() => dispatch(setModal({ type: ModalTypes.recieveMoney }))}>Recieve Money</Button>
            <Button onClick={() => dispatch(setModal({ type: ModalTypes.payMoney }))} classes="mt-2">
              Pay Money
            </Button>
          </div>
        </PanelSection>

        {/* Augmentations */}
        <PanelSection>
          <div className="flex justify-between">
            <h2 className="text-base font-medium text-gray-900">Augmentations</h2>
            <Chip editable={{ type: ModalTypes.editUpgradePoints }} color={charSheet.upgradePoints ? 'green' : 'yellow'}>
              {charSheet.upgradePoints} Upgrade {charSheet.upgradePoints === 1 ? 'Point' : 'Points'}
            </Chip>
          </div>
          <div className="flow-root mt-6">
            <ListContainer
              list={charSheet.augmentations}
              button={{ click: () => dispatch(setSlideOver({ type: SlideOverTypes.purchaseAugmentation })), text: 'Purchase a new Augmentation' }}
              empty={{
                heading: 'No Augmentations',
                message: 'Get started by purchasing your first one now',
                button: { click: () => dispatch(setSlideOver({ type: SlideOverTypes.purchaseAugmentation })), text: 'Purchase Augmentation' },
              }}
            >
              {charSheet.augmentations.map(aug => (
                <Augmentation key={aug._id} aug={aug} />
              ))}
            </ListContainer>
          </div>
        </PanelSection>
      </div>
    </SheetPageContent>
  );
};

export default CharacterGameplayPage;
