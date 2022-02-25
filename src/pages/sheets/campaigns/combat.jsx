import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { selectCurrentCampaign, selectCombatants } from '../../../redux/campaign/campaign.selectors';

import { useActions } from '../../../hooks/useActions';

import { updateSheetResourceStart, updateSheetStart } from '../../../redux/sheet/sheet.actions';

import { useResource } from '../../../hooks/useResource';

import { ResourceType } from '../../../models/enums';

import SheetPageContent from '../../../layouts/components/sheet/SheetPageContent';
import SheetPagePanel from '../../../layouts/components/sheet/SheetPagePanel';

import CombatCard from '../../../components/CombatCard';
import Button from '../../../components/Button';

import classNames from '../../../utils/classNames';
import SlideOverTypes from '../../../utils/SlideOverTypes';

import DisplayPlayer from '../../../components/display/DisplayPlayer';
import DisplayNpc from '../../../components/display/DisplayNpc';
import DisplayCreature from '../../../components/display/DisplayCreature';

const CampaignCombatPage = () => {
  const dispatch = useDispatch();

  const campSheet = useSelector(selectCurrentCampaign);
  const combatants = useSelector(selectCombatants);

  const { setSlideOver } = useActions();

  const species = useResource(ResourceType.Species);

  const [entity, setEntity] = useState(combatants.length ? combatants[0] : null);
  const [id, setId] = useState(combatants.length ? combatants[0]._id : null);

  useEffect(() => {
    if (combatants.length) {
      if (id) {
        setEntity(combatants.find(comba => comba._id === id));
        return;
      }

      setEntity(combatants[0]);
      setId(combatants[0]._id);
    }
  }, [id, combatants]);

  const endTurn = entId => {
    const activeCombatants = combatants.filter(comb => comb.active);
    const index = activeCombatants.findIndex(comb => comb._id === entId);

    if (index + 1 === activeCombatants.length) {
      setId(activeCombatants[0]._id);
      return;
    }

    setId(activeCombatants[index + 1]._id);
  };

  return (
    <SheetPageContent title="Stats Tracker" columns={3}>
      <div className="space-y-4">
        <SheetPagePanel title="In Combat (Active)">
          <div className="space-y-4">
            {combatants
              .filter(ent => ent.active)
              .map((ent, index) => (
                <div key={ent._id} className={classNames('hover:shadow-sm rounded-md cursor-pointer')} onClick={() => setId(ent._id)}>
                  <CombatCard entity={ent} index={index} active={entity._id === ent._id} inCombat />
                </div>
              ))}
          </div>
        </SheetPagePanel>

        <SheetPagePanel title="Out of Combat (Inactive)">
          <div className="space-y-4">
            {combatants
              .filter(entity => !entity.active)
              .map((entity, index) => (
                <CombatCard key={index} entity={entity} index={index} />
              ))}
          </div>
        </SheetPagePanel>
      </div>

      <SheetPagePanel title="Active Combatant" colSpan={2}>
        {entity ? (
          <div className="grid grid-cols-3 gap-8 divide-x divide-gray-200">
            <div className="col-span-2">
              {entity.type === 'Player' ? (
                <DisplayPlayer player={entity} species={species} />
              ) : entity.type === 'Npc' ? (
                <DisplayNpc npc={entity} species={species} />
              ) : entity.type === 'Creature' ? (
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

              {/* Attack */}
              <Button disabled>Attack</Button>

              {/* Roll */}
              <Button onClick={() => setSlideOver({ type: SlideOverTypes.rollDice })}>Roll</Button>

              {/* Leave Combat */}
              <div className="pt-4 mt-4 border-t border-gray-200">
                {entity.type === 'Player' ? (
                  <Button
                    alert
                    onClick={() =>
                      dispatch(
                        updateSheetStart(
                          'characters',
                          entity._id,
                          { active: !entity.active },
                          {
                            notification: {
                              status: 'success',
                              heading: `${entity.type} Left Combat`,
                              message: `You have successfully taken ${entity.characterName} out of combat.`,
                            },
                          }
                        )
                      )
                    }
                  >
                    Leave Combat
                  </Button>
                ) : (
                  <Button
                    alert
                    onClick={() =>
                      dispatch(
                        updateSheetResourceStart(
                          'campaigns',
                          campSheet._id,
                          entity.type === 'Npc' ? 'npcs' : 'creatures',
                          entity._id,
                          { active: !entity.active },
                          {
                            notification: {
                              status: 'success',
                              heading: `${entity.type} Left Combat`,
                              message: `You have successfully taken ${entity.name || entity.characterName} out of combat.`,
                            },
                          }
                        )
                      )
                    }
                  >
                    Leave Combat
                  </Button>
                )}
              </div>
            </div>
          </div>
        ) : (
          <p className="text-sm italic text-gray-400">Please create or select a combatant to get started.</p>
        )}
      </SheetPagePanel>
    </SheetPageContent>
  );
};

export default CampaignCombatPage;
