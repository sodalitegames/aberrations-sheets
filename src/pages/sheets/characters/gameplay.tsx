import { useSelector } from 'react-redux';

import { PencilIcon } from '@heroicons/react/solid';
// import { InformationCircleIcon } from '@heroicons/react/outline';

import {
  selectCurrentCharacter,
  selectEquippedWeapons,
  selectEquippedWearables,
  selectEquippedConsumables,
  selectEquippedUsables,
  selectShieldValue,
  selectSpeedAdjustment,
  selectAugmentationPoints,
  selectModifiers,
} from '../../../redux/character/character.selectors';

import { useActions } from '../../../hooks/useActions';
import { useResource } from '../../../hooks/useResource';

import classNames from '../../../utils/classNames';
import ModalTypes from '../../../utils/ModalTypes';
import SlideOverTypes from '../../../utils/SlideOverTypes';
import { getHealthMessage, getWalletMessage } from '../../../utils/helpers/messages';
import { displayModifier } from '../../../utils/helpers/modifiers';
import { getSpecies } from '../../../utils/helpers/species';

import SheetPageContent from '../../../layouts/components/sheet/SheetPageContent';

import Stats from '../../../components/sections/Stats';
import Conditions from '../../../components/sections/Conditions';

import SheetPagePanel from '../../../layouts/components/sheet/SheetPagePanel';
import Button from '../../../components/Button';
import ListContainer from '../../../components/data/ListContainer';

import DisplayAugmentation from '../../../components/display/DisplayAugmentation';

import DisplayWeapon from '../../../components/display/DisplayWeapon';
import DisplayWearable from '../../../components/display/DisplayWearable';
import DisplayConsumable from '../../../components/display/DisplayConsumable';
import DisplayUsable from '../../../components/display/DisplayUsable';
import NewlineText from '../../../components/NewlineText';
import Chip, { ChipColor } from '../../../components/Chip';

import { SheetType } from '../../../models/sheet';
import { FetchedResourceType, Species } from '../../../models/resource';

const CharacterGameplayPage = () => {
  const { setModal, setSlideOver } = useActions();

  const species = useResource(FetchedResourceType.Species) as Species[];

  const charSheet = useSelector(selectCurrentCharacter)!;

  const charSpecies = getSpecies(charSheet.speciesId, species);

  const equippedWeapons = useSelector(selectEquippedWeapons);
  const equippedWearables = useSelector(selectEquippedWearables);
  const equippedConsumables = useSelector(selectEquippedConsumables);
  const equippedUsables = useSelector(selectEquippedUsables);

  const speedAdjustment = useSelector(selectSpeedAdjustment);
  const shieldValue = useSelector(selectShieldValue);
  const augmentationPoints = useSelector(selectAugmentationPoints);
  const modifiers = useSelector(selectModifiers);

  return (
    <SheetPageContent title="Gameplay" columns={3}>
      {/* Left column */}
      <div className="grid grid-cols-2 gap-4 md:col-span-4 lg:col-span-2">
        {/* Welcome panel */}
        <SheetPagePanel colSpan={2}>
          <div className="pb-6 sm:flex sm:items-center sm:justify-between">
            <div className="sm:flex sm:space-x-5">
              <div className="mt-4 text-center sm:mt-0 sm:pt-1 sm:text-left">
                <p className="text-xl font-bold text-gray-900 sm:text-2xl">{charSheet.characterName}</p>
                <div className="text-sm font-medium text-gray-500">
                  {charSpecies ? <NewlineText>{charSpecies.name + ' Activated Ability: ' + charSpecies.abilities.activated}</NewlineText> : 'Loading...'}
                </div>
              </div>
            </div>
            <div className="flex flex-col justify-center mt-5 ml-5 space-y-2 shrink-0 sm:mt-0">
              <Button onClick={() => setSlideOver({ type: SlideOverTypes.rollDice })}>Roll Dice</Button>
            </div>
          </div>

          <h3 className="flex items-center text-lg font-medium text-gray-900">
            Modifiers
            <span title="Edit manually" onClick={() => setModal({ type: ModalTypes.editModifiers, data: { entityType: 'characters', entity: charSheet } })}>
              <PencilIcon className="ml-2 mr-2 shrink-0 self-center justify-self-end h-4 w-4 cursor-pointer text-base border border-gray-900 text-gray-900 p-0.5 rounded-full" aria-hidden="true" />
            </span>
          </h3>
          {modifiers.length ? (
            <div className="space-y-1 columns-4">
              {modifiers.map(({ modifier, amount }) => (
                <p key={modifier + '_' + amount} className="text-sm">
                  {displayModifier({ modifier, amount })}
                </p>
              ))}
            </div>
          ) : (
            <div>
              <p className="text-sm">You do not have any modifiers.</p>
            </div>
          )}
        </SheetPagePanel>

        {/* Stats */}
        <SheetPagePanel colSpan={2}>
          <Stats
            stats={[
              { name: 'Strength', ...charSheet.strength },
              { name: 'Agility', ...charSheet.agility },
              { name: 'Persona', ...charSheet.persona },
              { name: 'Aptitude', ...charSheet.aptitude },
            ]}
            experience={charSheet.experience}
          />
          <div className="mt-8">
            <div className="mx-2">
              <h3 className="text-lg font-medium text-center text-gray-900 md:text-left">Basic Info</h3>
            </div>

            <dl className="grid grid-cols-2 mt-4 md:grid-cols-4 gap-y-4">
              {/* Shield Value */}
              <div className="flex flex-col justify-between mx-2 border border-gray-100 rounded-md md:border-0">
                <div className="flex flex-col items-center py-3 rounded-md bg-gray-50">
                  {/* <InformationCircleIcon className="self-center w-8 h-8 p-1 ml-2 mr-2 text-base text-gray-900 cursor-pointer shrink-0 justify-self-end" aria-hidden="true" /> */}
                  <h4 className="flex items-center uppercase text-md">Shield Value</h4>
                  <p className="text-lg font-bold">{charSheet.shieldValue + shieldValue}</p>
                </div>
              </div>

              {/* Movement Speed */}
              <div className="flex flex-col justify-between mx-2 border border-gray-100 rounded-md md:border-0">
                <div className="flex flex-col items-center py-3 rounded-md bg-gray-50">
                  {/* <InformationCircleIcon className="self-center w-8 h-8 p-1 ml-2 mr-2 text-base text-gray-900 cursor-pointer shrink-0 justify-self-end" aria-hidden="true" /> */}
                  <h4 className="flex items-center uppercase text-md">Movement Speed</h4>
                  <p className="text-lg font-bold">{charSheet.speed + speedAdjustment}</p>
                </div>
              </div>

              {/* Milestones */}
              <div className="flex flex-col justify-between mx-2 border border-gray-100 rounded-md md:border-0">
                <div className="flex flex-col items-center py-3 rounded-md bg-gray-50">
                  {/* <InformationCircleIcon className="self-center w-8 h-8 p-1 ml-2 mr-2 text-base text-gray-900 cursor-pointer shrink-0 justify-self-end" aria-hidden="true" /> */}
                  <h4 className="flex items-center uppercase text-md">
                    Milestones
                    <span title="Edit manually" onClick={() => setModal({ type: ModalTypes.editMilestones, data: { entityType: 'characters', entity: charSheet } })}>
                      <PencilIcon
                        className="ml-2 mr-2 shrink-0 self-center justify-self-end h-4 w-4 cursor-pointer text-base border border-gray-900 text-gray-900 p-0.5 rounded-full"
                        aria-hidden="true"
                      />
                    </span>
                  </h4>
                  <p className="text-lg font-bold">{charSheet.milestones}</p>
                </div>
              </div>

              {/* Mortality */}
              <div className="flex flex-col justify-between mx-2 border border-gray-100 rounded-md md:border-0">
                <div className="flex flex-col items-center w-full py-3 rounded-md bg-gray-50">
                  {/* <InformationCircleIcon className="self-center w-8 h-8 p-1 ml-2 mr-2 text-base text-gray-900 cursor-pointer shrink-0 justify-self-end" aria-hidden="true" /> */}
                  <h4 className="flex items-center uppercase text-md">
                    Mortality
                    <span title="Edit manually" onClick={() => setModal({ type: ModalTypes.editMortality, data: { entityType: 'characters', entity: charSheet } })}>
                      <PencilIcon
                        className="ml-2 mr-2 shrink-0 self-center justify-self-end h-4 w-4 cursor-pointer text-base border border-gray-900 text-gray-900 p-0.5 rounded-full"
                        aria-hidden="true"
                      />
                    </span>
                  </h4>
                  <p className="text-lg font-bold">{charSheet.mortality}</p>
                </div>
              </div>
            </dl>
          </div>
          <Conditions conditions={charSheet.conditions} />
        </SheetPagePanel>
      </div>

      {/* Right column */}
      <div className="grid grid-cols-1 gap-4 md:col-span-4 lg:col-span-1 md:grid-cols-2 lg:grid-cols-1">
        {/* Actions */}
        <SheetPagePanel classes="md:col-span-2 lg:col-span-1">
          <Button onClick={() => setModal({ type: ModalTypes.reachMilestone, data: { entityType: 'characters', entity: charSheet } })}>Reach Milestone</Button>
          <Button onClick={() => setModal({ type: ModalTypes.takeARest, data: { entityType: 'characters', entity: charSheet } })} classes="mt-2">
            Take a Rest
          </Button>
          <Button onClick={() => setSlideOver({ type: SlideOverTypes.manageCharacter })} classes="mt-2">
            Manage Character
          </Button>
        </SheetPagePanel>

        {/* Health */}
        <SheetPagePanel>
          <div className="flex flex-col items-center justify-between text-5xl font-semibold text-gray-900">
            <h5 className="text-xl font-normal">Current Health</h5>
            <span className={classNames(charSheet.currentHp >= charSheet.maxHp / 2 ? 'text-green-800' : '', charSheet.currentHp >= charSheet.maxHp / 4 ? 'text-yellow-800' : 'text-red-800')}>
              {charSheet.currentHp} / {charSheet.maxHp}
            </span>
            <span className="text-sm font-medium text-center text-gray-500 uppercase">{getHealthMessage(charSheet.currentHp, charSheet.maxHp)}</span>
          </div>

          <div className="mt-6">
            <Button onClick={() => setModal({ type: ModalTypes.takeDamage, data: { entityType: 'characters', entity: charSheet } })}>Take Damage</Button>
            <Button onClick={() => setModal({ type: ModalTypes.healDamage, data: { entityType: 'characters', entity: charSheet } })} classes="mt-2">
              Heal Damage
            </Button>
          </div>
        </SheetPagePanel>

        {/* Wallet */}
        <SheetPagePanel>
          <div className="flex flex-col items-center justify-between text-5xl font-semibold">
            <h5 className="text-xl font-normal">Wallet</h5>
            <span>{charSheet.wallet}</span>
            <span className="text-sm font-medium text-gray-500 uppercase">{getWalletMessage(charSheet.wallet)}</span>
          </div>
          <div className="mt-6">
            <Button onClick={() => setModal({ type: ModalTypes.receiveMoney, data: { entityType: 'characters', entity: charSheet } })}>Receive Money</Button>
            <Button onClick={() => setModal({ type: ModalTypes.payMoney, data: { entityType: 'characters', entity: charSheet } })} classes="mt-2">
              Pay Money
            </Button>
          </div>
        </SheetPagePanel>
      </div>

      <div className="space-y-4">
        {/* Equipped Weapons */}
        <SheetPagePanel title="Equipped Weapons">
          <div className="flow-root mt-2">
            <ListContainer
              list={equippedWeapons}
              button={{
                click: () => setSlideOver({ type: SlideOverTypes.manageEquippedBelongings, data: { entityType: 'characters', entityId: charSheet._id, belongingType: 'weapons' } }),
                text: 'Manage equipped Weapons',
              }}
              empty={{
                heading: 'No Equipped Weapons',
                message: 'Get started by equipping your first one now',
                button: {
                  click: () => setSlideOver({ type: SlideOverTypes.manageEquippedBelongings, data: { entityType: 'characters', entityId: charSheet._id, belongingType: 'weapons' } }),
                  text: 'Equip Weapon',
                },
              }}
            >
              {equippedWeapons.map(weapon => (
                <DisplayWeapon key={weapon._id} weapon={weapon} sheetType={SheetType.characters} condensed="view" listItem />
              ))}
            </ListContainer>
          </div>
        </SheetPagePanel>

        {/* Equipped Wearables */}
        <SheetPagePanel title="Equipped Wearables">
          <div className="flow-root mt-2">
            <ListContainer
              list={equippedWearables}
              button={{
                click: () =>
                  setSlideOver({
                    type: SlideOverTypes.manageEquippedBelongings,
                    data: { entityType: 'characters', entityId: charSheet._id, belongingType: 'wearables' },
                  }),
                text: 'Manage equipped Wearables',
              }}
              empty={{
                heading: 'No Equipped Wearables',
                message: 'Get started by equipping your first one now',
                button: {
                  click: () =>
                    setSlideOver({
                      type: SlideOverTypes.manageEquippedBelongings,
                      data: { entityType: 'characters', entityId: charSheet._id, belongingType: 'wearables' },
                    }),
                  text: 'Equip Wearable',
                },
              }}
            >
              {equippedWearables.map(wearable => (
                <DisplayWearable key={wearable._id} wearable={wearable} sheetType={SheetType.characters} condensed="view" listItem />
              ))}
            </ListContainer>
          </div>
        </SheetPagePanel>
      </div>

      <div className="space-y-4">
        {/* Equipped Consumables */}
        <SheetPagePanel title="Equipped Consumables">
          <div className="flow-root mt-2">
            <ListContainer
              list={equippedConsumables}
              button={{
                click: () => setSlideOver({ type: SlideOverTypes.manageEquippedBelongings, data: { entityType: 'characters', entityId: charSheet._id, belongingType: 'consumables' } }),
                text: 'Manage equipped Consumables',
              }}
              empty={{
                heading: 'No Equipped Consumables',
                message: 'Get started by equipping your first one now',
                button: {
                  click: () => setSlideOver({ type: SlideOverTypes.manageEquippedBelongings, data: { entityType: 'characters', entityId: charSheet._id, belongingType: 'consumables' } }),
                  text: 'Equip Consumable',
                },
              }}
            >
              {equippedConsumables.map(consumable => (
                <DisplayConsumable key={consumable._id} consumable={consumable} sheetType={SheetType.characters} condensed="view" listItem />
              ))}
            </ListContainer>
          </div>
        </SheetPagePanel>

        {/* Equipped Usables */}
        <SheetPagePanel title="Equipped Usables">
          <div className="flow-root mt-2">
            <ListContainer
              list={equippedUsables}
              button={{
                click: () => setSlideOver({ type: SlideOverTypes.manageEquippedBelongings, data: { entityType: 'characters', entityId: charSheet._id, belongingType: 'usables' } }),
                text: 'Manage equipped Usables',
              }}
              empty={{
                heading: 'No Equipped Usables',
                message: 'Get started by equipping your first one now',
                button: {
                  click: () => setSlideOver({ type: SlideOverTypes.manageEquippedBelongings, data: { entityType: 'characters', entityId: charSheet._id, belongingType: 'usables' } }),
                  text: 'Equip Usable',
                },
              }}
            >
              {equippedUsables.map(usable => (
                <DisplayUsable key={usable._id} usable={usable} sheetType={SheetType.characters} condensed="view" listItem />
              ))}
            </ListContainer>
          </div>
        </SheetPagePanel>
      </div>

      {/* Augmentations */}
      <SheetPagePanel>
        <div className="flex flex-wrap justify-between md:space-y-2 lg:space-y-0">
          <h2 className="text-base font-medium text-gray-900">Augmentations</h2>
          <Chip color={augmentationPoints < 0 ? ChipColor.red : augmentationPoints === 0 ? ChipColor.yellow : ChipColor.green}>Augmentation Points: {augmentationPoints}</Chip>
        </div>
        <div className="flow-root mt-6">
          <ListContainer
            list={charSheet.augmentations}
            button={{
              click: () =>
                setSlideOver({
                  type: SlideOverTypes.purchaseAugmentation,
                  data: { sheetType: 'characters', sheetId: charSheet._id, entityType: 'characters', entity: charSheet, augmentations: charSheet.augmentations },
                }),
              text: 'Purchase a new Augmentation',
            }}
            empty={{
              heading: 'No Augmentations',
              message: 'Get started by purchasing your first one now',
              button: {
                click: () =>
                  setSlideOver({
                    type: SlideOverTypes.purchaseAugmentation,
                    data: { sheetType: 'characters', sheetId: charSheet._id, entityType: 'characters', entity: charSheet, augmentations: charSheet.augmentations },
                  }),
                text: 'Purchase Augmentation',
              },
            }}
          >
            {charSheet.augmentations.map(aug => (
              <DisplayAugmentation key={aug._id} aug={aug} />
            ))}
          </ListContainer>
        </div>
      </SheetPagePanel>
    </SheetPageContent>
  );
};

export default CharacterGameplayPage;
