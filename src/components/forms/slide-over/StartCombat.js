import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

import { selectCurrentCampaign, selectPotentialCombatants } from '../../../redux/campaign/campaign.selectors';

import { createSheetResourceStart } from '../../../redux/sheet/sheet.actions';

import { SlideOverForm } from '../SlideOver';
import Button from '../../Button';
import Heading from '../../Heading';

const calculateInitiative = entity => {
  const die = entity.agility.die > entity.persona.die ? entity.agility.die : entity.persona.die;
  const roll = Math.ceil(Math.random() * die);
  return roll;
};

const StartCombat = () => {
  const dispatch = useDispatch();

  const campSheet = useSelector(selectCurrentCampaign);
  const potentialCombatants = useSelector(selectPotentialCombatants);

  const [combatants, setCombatants] = useState(
    potentialCombatants
      .map(comba => ({ name: comba.characterName || comba.name, _id: comba._id, active: comba.active, type: comba.type, initiative: calculateInitiative(comba), inCombat: comba.inCombat }))
      .filter(combatant => combatant.inCombat)
  );
  const [nonCombatants, setNonCombatants] = useState(
    potentialCombatants
      .map(comba => ({ name: comba.characterName || comba.name, _id: comba._id, active: comba.active, type: comba.type, initiative: calculateInitiative(comba), inCombat: comba.inCombat }))
      .filter(combatant => !combatant.inCombat)
  );

  const enterCombat = entity => {
    setCombatants([...combatants, { ...entity, inCombat: true }]);
    setNonCombatants(nonCombatants.filter(ent => ent._id !== entity._id));
  };

  const leaveCombat = entity => {
    setCombatants(combatants.filter(ent => ent._id !== entity._id));
    setNonCombatants([...nonCombatants, { ...entity, inCombat: false }]);
  };

  const onDragEnd = result => {
    if (!result.destination) {
      return;
    }

    const newCombatants = [...combatants];
    const [removed] = newCombatants.splice(result.source.index, 1);
    newCombatants.splice(result.destination.index, 0, removed);
    console.log(newCombatants);
    setCombatants(newCombatants);
  };

  const submitHandler = async e => {
    e.preventDefault();

    dispatch(
      createSheetResourceStart(
        'campaigns',
        campSheet._id,
        'combats',
        { combatants, activeTurn: combatants[0]._id },
        { slideOver: true, notification: { status: 'success', heading: 'Combat Started', message: 'You have successfully started combat.' } }
      )
    );
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <SlideOverForm title="Start Combat" description="Select combatants and drag to reorder, then press 'Start Combat' when ready." submitText="Start Combat" submitHandler={submitHandler}>
        <div className="m-6">
          <Heading>In Combat</Heading>
          <Droppable droppableId="combatants">
            {provided => (
              <div className="space-y-4" {...provided.droppableProps} ref={provided.innerRef}>
                {combatants
                  // .filter(ent => ent.active)
                  .map((ent, index) => (
                    <Draggable key={ent._id} draggableId={ent._id} index={index}>
                      {provided => (
                        <div ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
                          <div className="flex items-center justify-between w-full p-4 space-x-6 bg-white rounded-lg shadow">
                            <div className="flex-1 truncate">
                              <div className="flex items-center justify-between">
                                <h3 className="text-sm font-medium text-gray-900 truncate">
                                  {ent.name || ent.characterName} ({ent.type})
                                </h3>{' '}
                                <p className="text-sm font-medium">Initiative: {ent.initiative}</p>
                              </div>
                            </div>
                            <Button dark rounded onClick={() => leaveCombat(ent)}>
                              Leave combat
                            </Button>
                          </div>
                          {provided.placeholder}
                        </div>
                      )}
                    </Draggable>
                  ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>

          <Heading secondary="(only active players, npcs, and creatures are shown)">Out of Combat</Heading>
          <div className="space-y-4">
            {nonCombatants.map(ent => (
              <div key={ent._id} className="col-span-1 bg-white divide-y divide-gray-200 rounded-lg shadow">
                <div className="flex items-center justify-between w-full p-4 space-x-6">
                  <div className="flex-1 truncate">
                    <div className="flex items-center">
                      <h3 className="text-sm font-medium text-gray-900 truncate">
                        {ent.name || ent.characterName} ({ent.type})
                      </h3>
                    </div>
                  </div>
                  <Button rounded onClick={() => enterCombat(ent)}>
                    Enter combat
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </SlideOverForm>
    </DragDropContext>
  );
};

export default StartCombat;
