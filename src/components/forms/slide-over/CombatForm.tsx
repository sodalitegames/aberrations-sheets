import { FormEvent, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

import { PotentialCombatant, selectPotentialCombatants } from '../../../redux/campaign/campaign.selectors';

import { createSheetResourceStart, updateSheetResourceStart } from '../../../redux/sheet/sheet.actions';

import { SlideOverForm } from '../SlideOver';
import Button from '../../Button';
import Heading from '../../Heading';
import Input from '../elements/Input';

import { Combat, Combatant, Creature, Npc, Player } from '../../../models/sheet/resources';
import { SheetResourceType, SheetType } from '../../../models/sheet';

const calculateInitiative = (entity: PotentialCombatant) => {
  const die = entity.agility.die > entity.persona.die ? entity.agility.die : entity.persona.die;
  const roll = Math.ceil(Math.random() * die);
  return roll;
};

const createCombatant = (potential: PotentialCombatant): Combatant => {
  return { name: (potential as Player).characterName || (potential as Npc | Creature).name, _id: potential._id, type: potential.combatantType, initiative: calculateInitiative(potential) };
};

interface Props {
  data: {
    sheetId: string;
    combat?: Combat;
  };
}

const StartCombat: React.FC<Props> = ({ data }) => {
  const dispatch = useDispatch();

  const potentialCombatants = useSelector(selectPotentialCombatants);

  const [description, setDescription] = useState(data.combat ? data.combat.description : '');

  const [combatants, setCombatants] = useState(data.combat ? data.combat.combatants : []);
  const [nonCombatants, setNonCombatants] = useState<Combatant[]>(
    potentialCombatants
      .filter(combatant => combatant.active)
      .map(createCombatant)
      .filter(comba => {
        if (!data.combat) return true;
        return !data.combat.combatants.map(({ _id }) => _id).includes(comba._id);
      })
  );

  const enterCombat = (entity: Combatant) => {
    const combatant = nonCombatants.find(ent => ent._id === entity._id);

    if (combatant) {
      setCombatants([...combatants, combatant]);
      setNonCombatants(nonCombatants.filter(ent => ent._id !== combatant._id));
    }
  };

  const leaveCombat = (entity: Combatant) => {
    const combatant = combatants.find(ent => ent._id === entity._id);

    if (combatant) {
      setCombatants(combatants.filter(ent => ent._id !== combatant._id));
      setNonCombatants([...nonCombatants, combatant]);
    }
  };

  const onDragEnd = (result: any) => {
    if (!result.destination) {
      return;
    }

    const newCombatants = [...combatants];
    const [removed] = newCombatants.splice(result.source.index, 1);
    newCombatants.splice(result.destination.index, 0, removed);

    setCombatants(newCombatants);
  };

  const submitHandler = async (e: FormEvent) => {
    e.preventDefault();

    if (data.combat) {
      dispatch(
        updateSheetResourceStart(
          SheetType.campaigns,
          data.sheetId,
          SheetResourceType.combats,
          data.combat._id,
          { description, combatants },
          { slideOver: true, notification: { status: 'success', heading: 'Combat Updated', message: 'You have successfully updated combat.' } }
        )
      );

      return;
    }

    dispatch(
      createSheetResourceStart(
        SheetType.campaigns,
        data.sheetId,
        SheetResourceType.combats,
        { description, combatants, activeTurn: combatants[0]._id },
        { slideOver: true, notification: { status: 'success', heading: 'Combat Started', message: 'You have successfully started combat.' } }
      )
    );
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <SlideOverForm
        title={data.combat ? 'Edit Combat' : 'Start Combat'}
        description={`Select combatants and drag to reorder, then press ${data.combat ? 'Update Combat' : 'Start Combat'} when ready.`}
        submitText={data.combat ? 'Update Combat' : 'Start Combat'}
        submitHandler={submitHandler}
      >
        <Input slideOver label="Short Description (Name)" name="description" type="text" value={description} changeHandler={setDescription} required />
        <div className="m-6">
          <Heading>In Combat</Heading>
          <Droppable droppableId="combatants">
            {provided => (
              <div className="space-y-4" {...provided.droppableProps} ref={provided.innerRef}>
                {combatants.map((ent, index) => (
                  <Draggable key={ent._id} draggableId={ent._id} index={index}>
                    {provided => (
                      <div ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
                        <div className="flex items-center justify-between w-full p-4 space-x-6 bg-white rounded-lg shadow">
                          <div className="flex-1 truncate">
                            <div className="flex items-center justify-between">
                              <h3 className="text-sm font-medium text-gray-900 truncate">
                                {ent.name} ({ent.type})
                              </h3>{' '}
                              <p className="text-sm font-medium">Initiative: {ent.initiative}</p>
                            </div>
                          </div>
                          <Button dark rounded onClick={() => leaveCombat(ent)}>
                            Leave combat
                          </Button>
                        </div>
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
                        {ent.name} ({ent.type})
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
