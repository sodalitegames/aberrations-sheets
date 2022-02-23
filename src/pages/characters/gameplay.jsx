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

import PanelSection from '../../components/sheets/PanelSection';
import Button from '../../components/shared/Button';
import Chip from '../../components/shared/Chip';
import ListContainer from '../../components/shared/data/ListContainer';

import DisplayAugmentation from '../../components/characters/display/DisplayAugmentation';

import DisplayWeapon from '../../components/sheets/display/DisplayWeapon';
import DisplayWearable from '../../components/sheets/display/DisplayWearable';
import DisplayConsumable from '../../components/sheets/display/DisplayConsumable';
import DisplayUsable from '../../components/sheets/display/DisplayUsable';

import NewlineText from '../../components/utility/NewlineText';

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
      <div className="grid grid-cols-2 gap-4 md:col-span-4 lg:col-span-2">
        {/* Welcome panel */}
        <PanelSection colSpan={2}>
          <div className="pb-6 sm:flex sm:items-center sm:justify-between">
            <div className="sm:flex sm:space-x-5">
              <div className="mt-4 text-center sm:mt-0 sm:pt-1 sm:text-left">
                <p className="text-xl font-bold text-gray-900 sm:text-2xl">{charSheet.characterName}</p>
                <div className="text-sm font-medium text-gray-500">
                  <NewlineText>{charSheet.species.name + ' Ability: ' + charSheet.species.ability}</NewlineText>
                </div>
              </div>
            </div>
            <div className="flex flex-col justify-center mt-5 ml-5 space-y-2 shrink-0 sm:mt-0">
              <Button onClick={() => dispatch(setSlideOver({ type: SlideOverTypes.rollDice }))}>Roll Dice</Button>
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
      </div>

      {/* Right column */}
      <div className="grid grid-cols-1 gap-4 md:col-span-4 lg:col-span-1 md:grid-cols-2 lg:grid-cols-1">
        {/* Actions */}
        <PanelSection classes="md:col-span-2 lg:col-span-1">
          <Button onClick={() => dispatch(setModal({ type: ModalTypes.takeARest }))}>Take a Rest</Button>
          <Button onClick={() => dispatch(setSlideOver({ type: SlideOverTypes.manageCharacter }))} classes="mt-2">
            Manage Character
          </Button>
        </PanelSection>

        {/* Health */}
        <PanelSection>
          <div className="flex flex-col items-center justify-between text-5xl font-semibold text-gray-900">
            <h5 className="text-xl font-normal">Current Health</h5>
            <span className={classNames(charSheet.currentHp >= charSheet.maxHp / 2 ? 'text-green-800' : '', charSheet.currentHp >= charSheet.maxHp / 4 ? 'text-yellow-800' : 'text-red-800')}>
              {charSheet.currentHp} / {charSheet.maxHp}
            </span>
            <span className="text-sm font-medium text-center text-gray-500 uppercase">{getHealthMessage(charSheet.currentHp, charSheet.maxHp)}</span>
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
            <h5 className="text-xl font-normal">Wallet</h5>
            <span>{charSheet.wallet}</span>
            <span className="text-sm font-medium text-gray-500 uppercase">{getWalletMessage(charSheet.wallet)}</span>
          </div>
          <div className="mt-6">
            <Button onClick={() => dispatch(setModal({ type: ModalTypes.receiveMoney }))}>Receive Money</Button>
            <Button onClick={() => dispatch(setModal({ type: ModalTypes.payMoney }))} classes="mt-2">
              Pay Money
            </Button>
          </div>
        </PanelSection>
      </div>

      <div className="space-y-4">
        {/* Equipped Weapons */}
        <PanelSection title="Equipped Weapons">
          <div className="flow-root mt-2">
            <ListContainer
              list={equippedWeapons}
              button={{ click: () => dispatch(setSlideOver({ type: SlideOverTypes.manageEquippedBelongings, data: { type: 'weapons' } })), text: 'Manage equipped Weapons' }}
              empty={{
                heading: 'No Equipped Weapons',
                message: 'Get started by equipping your first one now',
                button: { click: () => dispatch(setSlideOver({ type: SlideOverTypes.manageEquippedBelongings, data: { type: 'weapons' } })), text: 'Equip Weapon' },
              }}
            >
              {equippedWeapons.map(weapon => (
                <DisplayWeapon key={weapon._id} weapon={weapon} sheetType="characters" condensed="view" listItem />
              ))}
            </ListContainer>
          </div>
        </PanelSection>

        {/* Equipped Wearables */}
        <PanelSection title="Equipped Wearables">
          <div className="flow-root mt-2">
            <ListContainer
              list={equippedWearables}
              button={{ click: () => dispatch(setSlideOver({ type: SlideOverTypes.manageEquippedBelongings, data: { type: 'wearables' } })), text: 'Manage equipped Wearables' }}
              empty={{
                heading: 'No Equipped Wearables',
                message: 'Get started by equipping your first one now',
                button: { click: () => dispatch(setSlideOver({ type: SlideOverTypes.manageEquippedBelongings, data: { type: 'wearables' } })), text: 'Equip Wearable' },
              }}
            >
              {equippedWearables.map(wearable => (
                <DisplayWearable key={wearable._id} wearable={wearable} sheetType="characters" condensed="view" listItem />
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
              button={{ click: () => dispatch(setSlideOver({ type: SlideOverTypes.manageEquippedBelongings, data: { type: 'consumables' } })), text: 'Manage equipped Consumables' }}
              empty={{
                heading: 'No Equipped Consumables',
                message: 'Get started by equipping your first one now',
                button: { click: () => dispatch(setSlideOver({ type: SlideOverTypes.manageEquippedBelongings, data: { type: 'consumables' } })), text: 'Equip Consumable' },
              }}
            >
              {equippedConsumables.map(consumable => (
                <DisplayConsumable key={consumable._id} consumable={consumable} sheetType="characters" condensed="view" listItem />
              ))}
            </ListContainer>
          </div>
        </PanelSection>

        {/* Equipped Usables */}
        <PanelSection title="Equipped Usables">
          <div className="flow-root mt-2">
            <ListContainer
              list={equippedUsables}
              button={{ click: () => dispatch(setSlideOver({ type: SlideOverTypes.manageEquippedBelongings, data: { type: 'usables' } })), text: 'Manage equipped Usables' }}
              empty={{
                heading: 'No Equipped Usables',
                message: 'Get started by equipping your first one now',
                button: { click: () => dispatch(setSlideOver({ type: SlideOverTypes.manageEquippedBelongings, data: { type: 'usables' } })), text: 'Equip Usable' },
              }}
            >
              {equippedUsables.map(usable => (
                <DisplayUsable key={usable._id} usable={usable} sheetType="characters" condensed="view" listItem />
              ))}
            </ListContainer>
          </div>
        </PanelSection>
      </div>

      {/* Augmentations */}
      <PanelSection>
        <div className="flex flex-wrap justify-between md:space-y-2 lg:space-y-0">
          <h2 className="text-base font-medium text-gray-900">Augmentations</h2>
          <Chip editable={{ type: ModalTypes.editSpentUpgradePoints }} color={charSheet.upgradePoints ? 'green' : 'yellow'}>
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
              <DisplayAugmentation key={aug._id} aug={aug} />
            ))}
          </ListContainer>
        </div>
      </PanelSection>
    </SheetPageContent>
  );
};

export default CharacterGameplayPage;
