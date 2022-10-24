import { Fragment, useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useSearchParams } from 'react-router-dom';

import { selectCombats, selectPotentialCombatants } from '../../../redux/campaign/campaign.selectors';

import { useActions } from '../../../hooks/useActions';

import { updateSheetResourceStart } from '../../../redux/sheet/sheet.actions';

import { useResource } from '../../../hooks/useResource';

import { ResourceType } from '../../../models/enums';

import SheetPageContent from '../../../layouts/components/sheet/SheetPageContent';
import SheetPagePanel from '../../../layouts/components/sheet/SheetPagePanel';

import CombatCard from '../../../components/CombatCard';
import Button from '../../../components/Button';
import SelectButton from '../../../components/SelectButton';

import InteractableActions from '../../../components/sections/InteractableActions';

import classNames from '../../../utils/classNames';
import SlideOverTypes from '../../../utils/SlideOverTypes';
import ModalTypes from '../../../utils/ModalTypes';

import DisplayPlayer from '../../../components/display/DisplayPlayer';
import DisplayNpc from '../../../components/display/DisplayNpc';
import DisplayCreature from '../../../components/display/DisplayCreature';

const CampaignCombatPage = () => {
  const dispatch = useDispatch();
  const [searchParams] = useSearchParams();

  const combats = useSelector(selectCombats);
  const potentialCombatants = useSelector(selectPotentialCombatants);

  const { setSlideOver, setModal } = useActions();

  const species = useResource(ResourceType.Species);

  const [combatants, setCombatants] = useState([]);

  const [combatOptions, setCombatOptions] = useState([]);

  const [combat, setCombat] = useState(null);
  const [entity, setEntity] = useState(null);

  useEffect(() => {
    if (combats.length) {
      setCombatOptions(
        combats.map(combat => ({
          ...combat,
          title: combat.description,
          href: `?id=${combat._id}`,
          description: combat.combatants.map(combatant => combatant.name).join(', '),
        }))
      );
    } else {
      setCombatOptions([]);
    }
  }, [combats]);

  useEffect(() => {
    if (combatOptions.length) {
      const id = searchParams.get('id');
      setCombat(id ? combatOptions.find(combat => combat._id === id) : combatOptions[0]);
      setEntity(null);
    } else {
      setCombat(null);
      setEntity(null);
    }
  }, [combatOptions, searchParams]);

  useEffect(() => {
    if (potentialCombatants.length && combat) {
      const combatants = combat.combatants
        .map(comba => {
          const entity = potentialCombatants.find(ent => ent._id === comba._id);

          if (entity) {
            return {
              ...entity,
              ...comba,
            };
          }

          return null;
        })
        .filter(comba => comba);

      setCombatants(combatants);
    }
  }, [potentialCombatants, combat]);

  useEffect(() => {
    if (combat && combatants.length) {
      if (!entity) {
        // const currentTurn = combatants.find(combatant => combatant._id === combat.activeTurn);
        // setEntity(currentTurn);
        setEntity(combatants[0]);
      }
    }
  }, [combatants, combat, entity]);

  const endTurn = entId => {
    const index = combatants.findIndex(comb => comb._id === entId);

    if (index + 1 === combatants.length) {
      setEntity(combatants[0]);
      return;
    }

    setEntity(combatants[index + 1]);
  };

  const leaveCombat = entId => {
    dispatch(
      updateSheetResourceStart(
        'campaigns',
        combat.sheetId,
        'combats',
        combat._id,
        { combatants: combat.combatants.filter(com => com._id !== entId) },
        {
          notification: {
            status: 'success',
            heading: `${entity.name || entity.characterName} Left Combat`,
            message: `You have successfully taken ${entity.name || entity.characterName} out of combat.`,
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
                {combatOptions.length && <SelectButton value={combatOptions.find(comb => comb._id === searchParams.get('id')) || combatOptions[0]} onChange={setCombat} options={combatOptions} />}
              </div>
            </SheetPagePanel>

            <SheetPagePanel>
              <div className="flex flex-wrap justify-between md:space-y-2 lg:space-y-0">
                <h2 className="text-base font-medium text-gray-900">In Combat</h2>
                <Button rounded onClick={() => setSlideOver({ type: SlideOverTypes.combatForm, id: combat._id })}>
                  Edit Combat
                </Button>
              </div>
              <div className="mt-6 space-y-4">
                {combatants.map((ent, index) => (
                  <div key={ent._id} className={classNames('hover:shadow-sm rounded-md cursor-pointer bg-white')} onClick={() => setEntity(ent)}>
                    <CombatCard entity={ent} index={index} active={entity?._id === ent._id} inCombat />
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
                    id: combat._id,
                    data: {
                      sheetType: 'campaigns',
                      resourceType: 'combats',
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
            {entity ? (
              <div className="grid grid-cols-3 gap-8 divide-x divide-gray-200">
                <div className="col-span-2">
                  {entity.type === 'players' ? (
                    <DisplayPlayer player={entity} species={species} />
                  ) : entity.type === 'npcs' ? (
                    <DisplayNpc npc={entity} species={species} />
                  ) : entity.type === 'creatures' ? (
                    <DisplayCreature creature={entity} />
                  ) : null}
                </div>

                <div className="col-span-1 pl-8 space-y-4">
                  {/* End Turn */}
                  <div className="pb-4 mb-4 border-b border-gray-200">
                    <Button dark onClick={() => endTurn(entity._id)}>
                      End Turn
                    </Button>
                  </div>

                  {/* Actions */}
                  {entity.type === 'players' ? (
                    <InteractableActions type="player" id={{ prop: 'playerId', value: entity._id }} />
                  ) : entity.type === 'npcs' ? (
                    <InteractableActions type="npc" id={{ prop: 'npcId', value: entity._id }} />
                  ) : entity.type === 'creatures' ? (
                    <InteractableActions type="creature" id={{ prop: 'creatureId', value: entity._id }} />
                  ) : null}

                  {/* Leave Combat */}
                  <div className="pt-4 mt-4 border-t border-gray-200">
                    <Button alert onClick={() => leaveCombat(entity._id)}>
                      Leave Combat
                    </Button>
                  </div>
                </div>
              </div>
            ) : (
              <p className="text-sm italic text-gray-400">Please create or select a combatant to get started.</p>
            )}
          </SheetPagePanel>
        </Fragment>
      ) : (
        <Fragment>
          <SheetPagePanel colSpan={3}>
            <div className="items-center justify-between px-2 py-8 sm:flex">
              <div className="items-center sm:flex">
                <div>
                  <h1 className="text-4xl font-extrabold tracking-tight text-gray-900 sm:text-5xl">No Combats</h1>
                  <p className="mt-1 text-base text-gray-500">You do not have any combats. Create one to get started.</p>
                </div>
              </div>
              <div className="space-x-3 sm:pl-6">
                <Button dark onClick={() => setSlideOver({ type: SlideOverTypes.combatForm })}>
                  Create Combat
                </Button>
              </div>
            </div>
          </SheetPagePanel>
        </Fragment>
      )}
    </SheetPageContent>
  );
};

export default CampaignCombatPage;
