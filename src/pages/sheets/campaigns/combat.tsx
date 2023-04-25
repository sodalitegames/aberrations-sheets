import { Fragment } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useSearchParams } from 'react-router-dom';

import { selectCombats, selectPotentialCombatants, selectCurrentCampaign } from '../../../redux/campaign/campaign.selectors';

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
import DisplayNpc from '../../../components/display/DisplayNpc';
import DisplayCreature from '../../../components/display/DisplayCreature';

interface CombatantEntity extends Combatant {
  doc: (Player | Npc | Creature) | null;
}

const createOption = (combat: Combat) => {
  return { id: combat._id, title: combat.description, href: `?id=${combat._id}`, description: combat.combatants.map(combatant => combatant.name).join(', ') };
};

const getType = (type: CombatantType): EntityType | undefined => {
  switch (type) {
    case 'players':
      return EntityType.players;
    case 'npcs':
      return EntityType.npcs;
    case 'creatures':
      return EntityType.creatures;
    default:
      break;
  }
};

const CampaignCombatPage = () => {
  const dispatch = useDispatch();
  const [searchParams, setSearchParams] = useSearchParams();

  const campSheet = useSelector(selectCurrentCampaign)!;
  const combats = useSelector(selectCombats);
  const potentialCombatants = useSelector(selectPotentialCombatants);

  const { setSlideOver, setModal } = useActions();

  const species = useResource(FetchedResourceType.Species) as Species[];

  const combatId = searchParams.get('combat');
  const entityId = searchParams.get('combatant');

  const combat = combats.find(comb => comb._id === combatId) || combats[0];

  const combatants: CombatantEntity[] = combat.combatants.map(comba => {
    const entity = potentialCombatants.find(ent => ent._id === comba._id);
    console.log('combatants mapped');
    return {
      ...comba,
      doc: entity ? entity : null,
    };
  });

  const entity: CombatantEntity = combatants.find(ent => ent._id === entityId) || combatants[0];

  const endTurn = (entId: string) => {
    const index = combatants.findIndex(comb => comb._id === entId);

    if (index + 1 === combatants.length) {
      setEntity(combatants[0]._id);
      return;
    }

    setEntity(combatants[index + 1]._id);
  };

  const setCombat = (id: string) => {
    // @ts-expect-error
    setSearchParams({ ...Object.fromEntries([...searchParams]), combat: id });
  };

  const setEntity = (id: string) => {
    // @ts-expect-error
    setSearchParams({ ...Object.fromEntries([...searchParams]), combatant: id });
  };

  const leaveCombat = (entId: string) => {
    dispatch(
      updateSheetResourceStart(
        SheetType.campaigns,
        combat.sheetId,
        SheetResourceType.combats,
        combat._id,
        { combatants: combat.combatants.filter(com => com._id !== entId) },
        {
          notification: {
            status: 'success',
            heading: `${(entity.doc as Npc | Creature).name || (entity.doc as Player).characterName} Left Combat`,
            message: `You have successfully taken ${(entity.doc as Npc | Creature).name || (entity.doc as Player).characterName} out of combat.`,
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
                {combatants.map((ent, index) => (
                  <div key={ent._id} className={classNames('hover:shadow-sm rounded-md cursor-pointer bg-white')} onClick={() => setEntity(ent._id)}>
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
            {entity ? (
              <div className="grid grid-cols-3 gap-8 divide-x divide-gray-200">
                <div className="col-span-2">
                  {entity.type === 'players' ? (
                    <DisplayPlayer player={entity.doc as Player} species={species} />
                  ) : entity.type === 'npcs' ? (
                    <DisplayNpc npc={entity.doc as Npc} species={species} />
                  ) : entity.type === 'creatures' ? (
                    <DisplayCreature creature={entity.doc as Creature} />
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
                  <InteractableActions type={getType(entity.type)!} entity={entity.doc!} />

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
                <Button dark onClick={() => setSlideOver({ type: SlideOverTypes.combatForm, data: { sheetId: campSheet._id } })}>
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
