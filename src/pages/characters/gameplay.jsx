import { useRecoilValue, useSetRecoilState } from 'recoil';

import { modalState, slideOverState } from '../../recoil/app/app.atoms';
import { charSheetState } from '../../recoil/character/character.atoms';

import { getCharactersSpecies } from '../../recoil/resources/resources.selector';
import { getEquippedWeapons, getEquippedWearables, getEquippedConsumables, getEquippedUsables } from '../../recoil/character/character.selectors';

import classNames from '../../utils/classNames';
import ModalTypes from '../../utils/ModalTypes';
import SlideOverTypes from '../../utils/SlideOverTypes';
import { getHealthMessage, getWalletMessage } from '../../utils/messages';

import SheetPageContent from '../../layouts/components/sheet/SheetPageContent';

import PanelSection from '../../components/shared/PanelSection';
import Stats from '../../components/characters/Stats';
import Button from '../../components/shared/Button';
import Chip from '../../components/shared/Chip';

import Weapon from '../../components/characters/display/Weapon';
import Wearable from '../../components/characters/display/Wearable';
import Consumable from '../../components/characters/display/Consumable';
import Usable from '../../components/characters/display/Usable';
import Augmentation from '../../components/characters/display/Augmentation';

const CharacterGameplayPage = () => {
  const charSheet = useRecoilValue(charSheetState);
  const setModal = useSetRecoilState(modalState);
  const setSlideOver = useSetRecoilState(slideOverState);
  const charsSpecies = useRecoilValue(getCharactersSpecies);

  const equippedWeapons = useRecoilValue(getEquippedWeapons);
  const equippedWearables = useRecoilValue(getEquippedWearables);
  const equippedConsumables = useRecoilValue(getEquippedConsumables);
  const equippedUsables = useRecoilValue(getEquippedUsables);

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
                <p className="text-sm font-medium text-gray-500">Ability: {charsSpecies.ability}</p>
              </div>
            </div>
            <div className="mt-5 flex flex-shrink-0 justify-center sm:mt-0">
              <Button onClick={() => setSlideOver({ type: SlideOverTypes.rollDice })}>Roll Dice</Button>
            </div>
          </div>
        </PanelSection>

        {/* Stats */}
        <PanelSection colSpan={2}>
          <Stats
            generalExhaustion={charSheet.generalExhaustion}
            power={charSheet.power}
            stats={[
              { name: 'Fortitude', passive: { name: 'Max Hp', calc: 'Fortitude * 5', value: charSheet.maxHp }, ...charSheet.fortitude },
              { name: 'Agility', passive: { name: 'Dodge Value', calc: 'Agility / 3 (Rd. Down)', value: charSheet.dodgeValue }, ...charSheet.agility },
              { name: 'Persona', passive: { name: 'Initiative', calc: 'Equal to Persona', value: charSheet.initiative }, ...charSheet.persona },
              { name: 'Aptitude', passive: { name: 'Assist', calc: 'Aptitude / 2 (Rd. Down)', value: charSheet.assist }, ...charSheet.aptitude },
            ]}
          />
        </PanelSection>

        <div className="space-y-4">
          {/* Equipped Weapons */}
          <PanelSection title="Equipped Weapons">
            <div className="flow-root mt-6">
              <ul className="-my-5 divide-y divide-gray-200">
                {equippedWeapons.map(weapon => (
                  <Weapon key={weapon._id} weapon={weapon} condensed="view" />
                ))}
              </ul>

              <div className="mt-6">
                <Button onClick={() => setSlideOver({ type: SlideOverTypes.manageEquippedBelongings, id: 'weapons' })}>Manage equipped Weapons</Button>
              </div>
            </div>
          </PanelSection>
          {/* Equipped Wearables */}
          <PanelSection title="Equipped Wearables">
            <div className="flow-root mt-6">
              <ul className="-my-5 divide-y divide-gray-200">
                {equippedWearables.map(wearable => (
                  <Wearable key={wearable._id} wearable={wearable} condensed="view" />
                ))}
              </ul>
              <div className="mt-6">
                <Button onClick={() => setSlideOver({ type: SlideOverTypes.manageEquippedWearables })}>Manage equipped Wearables</Button>
              </div>
            </div>
          </PanelSection>
        </div>

        <div className="space-y-4">
          {/* Equipped Consumables */}
          <PanelSection title="Equipped Consumables">
            <div className="flow-root mt-6">
              <ul className="-my-5 divide-y divide-gray-200">
                {equippedConsumables.map(consumable => (
                  <Consumable key={consumable._id} consumable={consumable} condensed="view" />
                ))}
              </ul>
              <div className="mt-6">
                <Button onClick={() => setSlideOver({ type: SlideOverTypes.manageEquippedBelongings, id: 'consumables' })}>Manage equipped Consumables</Button>
              </div>
            </div>
          </PanelSection>
          {/* Equipped Usables */}
          <PanelSection title="Equipped Usables">
            <div className="flow-root mt-6">
              <ul className="-my-5 divide-y divide-gray-200">
                {equippedUsables.map(usable => (
                  <Usable key={usable._id} usable={usable} condensed="view" />
                ))}
              </ul>
              <div className="mt-6">
                <Button onClick={() => setSlideOver({ type: SlideOverTypes.manageEquippedBelongings, id: 'usables' })}>Manage equipped Usables</Button>
              </div>
            </div>
          </PanelSection>
        </div>
      </div>

      {/* Right column */}
      <div className="grid grid-cols-1 gap-4">
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
            <Button onClick={() => setModal({ type: ModalTypes.takeDamage })}>Take Damage</Button>
            <Button onClick={() => setModal({ type: ModalTypes.healDamage })} classes="mt-2">
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
            <Button onClick={() => setModal({ type: ModalTypes.recieveMoney })}>Recieve Money</Button>
            <Button onClick={() => setModal({ type: ModalTypes.payMoney })} classes="mt-2">
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
            <ul className="-my-5 divide-y divide-gray-200">
              {charSheet.augmentations.map(aug => (
                <Augmentation key={aug._id} aug={aug} />
              ))}
            </ul>
            <div className="mt-6">
              <Button onClick={() => setSlideOver({ type: SlideOverTypes.purchaseAugmentation })}>Purchase a new Augmentation</Button>
            </div>
          </div>
        </PanelSection>
      </div>
    </SheetPageContent>
  );
};

export default CharacterGameplayPage;
