import { Fragment, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useSearchParams } from 'react-router-dom';

import { selectCombats, selectCurrentCharacter } from '../../../redux/character/character.selectors';

import { useActions } from '../../../hooks/useActions';

import { updateSheetResourceStart } from '../../../redux/sheet/sheet.actions';

import { useResource } from '../../../hooks/useResource';

import { FetchedResourceType, Species } from '../../../models/resource';
import { Combat, Combatant, CombatantType, Creature, Npc, Player } from '../../../models/sheet/resources';
import { EntityType, SheetResourceType, SheetType } from '../../../models/sheet';

import SheetPageContent from '../../../layouts/components/sheet/SheetPageContent';
import SheetPagePanel from '../../../layouts/components/sheet/SheetPagePanel';

import CombatCard from '../../../components/CombatCard';
import Button from '../../../components/Button';
import SelectButton from '../../../components/SelectButton';

import InteractableActions from '../../../components/content/InteractableActions';

import classNames from '../../../utils/classNames';
import SlideOverTypes from '../../../utils/SlideOverTypes';
import ModalTypes from '../../../utils/ModalTypes';

import DisplayPlayer from '../../../components/display/DisplayPlayer';
import { capitalize } from '../../../utils/helpers/strings';
import { ResourceType, getResourceLabel } from '../../../utils/helpers/resources';

export interface CombatantEntity extends Combatant {
  entity: (Player | Npc | Creature) | null;
}

const createOption = (combat: Combat) => {
  return { id: combat._id, title: combat.description, href: `?id=${combat._id}`, description: combat.combatants.map(combatant => combatant.name).join(', ') };
};

const CharacterCombatPage = () => {
  const dispatch = useDispatch();
  const [searchParams, setSearchParams] = useSearchParams();

  const charSheet = useSelector(selectCurrentCharacter)!;
  const combats = useSelector(selectCombats);

  const { setSlideOver, setModal } = useActions();

  const species = useResource(FetchedResourceType.Species) as Species[];

  const combatId = searchParams.get('combat');

  const combat = combats.find(comb => comb._id === combatId) || combats[0];

  const endTurn = () => {
    const index = combat.combatants.findIndex(comb => comb._id === charSheet._id);

    let nextActiveTurn;

    if (index + 1 === combat.combatants.length) {
      nextActiveTurn = combat.combatants[0]._id;
    } else {
      nextActiveTurn = combat.combatants[index + 1]._id;
    }

    dispatch(
      updateSheetResourceStart(
        SheetType.characters,
        charSheet._id,
        SheetResourceType.combats,
        combat._id,
        { activeTurn: nextActiveTurn },
        {
          notification: {
            status: 'success',
            heading: `You Ended Your Turn`,
            message: `You have successfully ended your turn.`,
          },
        }
      )
    );
  };

  const setCombat = (id: string) => {
    // @ts-expect-error
    setSearchParams({ ...Object.fromEntries([...searchParams]), combat: id });
  };

  const leaveCombat = () => {
    dispatch(
      updateSheetResourceStart(
        SheetType.characters,
        charSheet._id,
        SheetResourceType.combats,
        combat._id,
        { combatants: combat.combatants.filter(com => com._id !== charSheet._id) },
        {
          notification: {
            status: 'success',
            heading: `You Left Combat`,
            message: `You have successfully taken yourself out of combat.`,
          },
        }
      )
    );
  };

  return (
    <SheetPageContent title="Combat" columns={3}>
      {combats.length ? (
        <Fragment>
          <div className="space-y-4">
            <SheetPagePanel title="Select Combat">
              <div className="flow-root w-full mt-2">
                <SelectButton value={createOption(combat)} onChange={setCombat} options={combats.map(createOption)} />
              </div>
            </SheetPagePanel>

            <SheetPagePanel>
              <div className="flex flex-wrap justify-between md:space-y-2 lg:space-y-0">
                <h2 className="text-base font-medium text-gray-900">In Combat</h2>
                <Button rounded onClick={() => setSlideOver({ type: SlideOverTypes.combatForm, data: { sheetId: combat.sheetId, combat } })}>
                  Edit Combat
                </Button>
              </div>
              <div className="mt-6 space-y-4">
                {combat.combatants.map(comba => (
                  <div key={comba._id} className={classNames('hover:shadow-sm rounded-md cursor-pointer bg-white')}>
                    <div className={classNames('col-span-1 divide-y divide-gray-200 rounded-lg shadow', comba._id === combat.activeTurn ? 'border-2 border-gray-300' : '')}>
                      <div className="flex items-center justify-between w-full p-6 space-x-6">
                        <div className="flex-1 truncate">
                          <div className="flex items-center space-x-3">
                            <h3 className="text-sm font-medium text-gray-900 truncate">
                              {comba.name} / {capitalize(getResourceLabel(ResourceType[comba.type]))} {comba._id === charSheet._id ? '(Me)' : ''}
                            </h3>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </SheetPagePanel>

            <SheetPagePanel>
              <Button
                alert
                onClick={() =>
                  setModal({
                    type: ModalTypes.deleteResource,
                    data: {
                      sheetType: 'campaigns',
                      resourceType: 'combats',
                      resource: combat,
                      title: `Are you sure you want to end this combat?`,
                      submitText: `Yes, end combat`,
                      notification: { heading: 'Combat Ended', message: `You have successfully ended combat.` },
                    },
                  })
                }
              >
                End Combat
              </Button>
            </SheetPagePanel>
          </div>

          <SheetPagePanel title="Active Combatant" colSpan={2}>
            {combat.activeTurn === charSheet._id && (
              <div className="flex justify-between px-4 py-2 my-4 bg-black rounded-md">
                <p className="text-white">It is currently your turn.</p>
                <Button rounded dark onClick={() => endTurn()}>
                  End Turn
                </Button>
              </div>
            )}
            <div className="grid grid-cols-3 gap-8 divide-x divide-gray-200">
              <div className="col-span-2">
                <DisplayPlayer player={charSheet as unknown as Player} species={species} />
              </div>

              <div className="col-span-1 pl-8 mt-4 space-y-4">
                {/* Actions */}
                <Button onClick={() => setSlideOver({ type: SlideOverTypes.rollDice })}>Roll Dice</Button>
                <Button onClick={() => setSlideOver({ type: SlideOverTypes.rollStat, data: { entityType: 'characters', entityId: charSheet._id } })}>Roll Stat</Button>
                <Button onClick={() => setModal({ type: ModalTypes.takeDamage, data: { entityType: 'characters', entity: charSheet } })}>Take Damage</Button>
                <Button onClick={() => setModal({ type: ModalTypes.healDamage, data: { entityType: 'characters', entity: charSheet } })}>Heal Damage</Button>
                <Button onClick={() => setModal({ type: ModalTypes.payMoney, data: { entityType: 'characters', entity: charSheet } })}>Pay Money</Button>
                <Button onClick={() => setModal({ type: ModalTypes.receiveMoney, data: { entityType: 'characters', entity: charSheet } })}>Recieve Money</Button>
                <Button onClick={() => setModal({ type: ModalTypes.takeARest, data: { entityType: 'characters', entity: charSheet } })}>Take A Rest</Button>
                <Button onClick={() => setModal({ type: ModalTypes.reachMilestone, data: { entityType: 'characters', entity: charSheet } })}>Reach Milestone</Button>

                {/* Leave Combat */}
                {combat.activeTurn === charSheet._id && (
                  <div className="pt-4 mt-4 border-t border-gray-200">
                    <Button alert onClick={() => leaveCombat()}>
                      Leave Combat
                    </Button>
                  </div>
                )}
              </div>
            </div>
          </SheetPagePanel>
        </Fragment>
      ) : (
        <Fragment>
          <SheetPagePanel colSpan={3}>
            <div className="items-center justify-between px-2 py-8 sm:flex">
              <div className="items-center sm:flex">
                <div>
                  <h1 className="text-4xl font-extrabold tracking-tight text-gray-900 sm:text-5xl">No Combats</h1>
                  <p className="mt-1 text-base text-gray-500">You are not part of any combats. When your Campaign Captain creates one, it will show up here.</p>
                </div>
              </div>
            </div>
          </SheetPagePanel>
        </Fragment>
      )}
    </SheetPageContent>
  );
};

export default CharacterCombatPage;
