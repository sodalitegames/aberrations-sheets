import { useState } from 'react';
import { useDispatch } from 'react-redux';

import { updateSheetResourceStart, updateSheetStart } from '../../../redux/sheet/sheet.actions';

import { ModalForm } from '../Modal';

import Input from '../elements/Input';

import { Entity, EntityType, SheetResourceType, SheetType } from '../../../models/sheet';
import { Creature, Npc } from '../../../models/sheet/resources';

interface Props {
  data: {
    entityType: EntityType;
    entity: Entity;
  };
}

const EditSpeed: React.VFC<Props> = ({ data }) => {
  const dispatch = useDispatch();

  const [speed, setSpeed] = useState(data.entity.speed);

  const submitHandler = async (e: React.FormEvent) => {
    e.preventDefault();

    switch (data.entityType) {
      case 'characters':
        dispatch(
          updateSheetStart(
            SheetType.characters,
            data.entity._id,
            { speed },
            { modal: true, notification: { status: 'success', heading: 'Speed Updated', message: `You have successfully updated your speed to ${speed}.` } }
          )
        );
        return;
      case 'players':
        dispatch(
          updateSheetStart(
            SheetType.characters,
            data.entity._id,
            { speed },
            {
              forPlayer: true,
              modal: true,
              notification: { status: 'success', heading: 'Speed Updated', message: `You have successfully updated your player's speed to ${speed}.` },
            }
          )
        );
        return;
      case 'npcs':
        dispatch(
          updateSheetResourceStart(
            SheetType.campaigns,
            (data.entity as Npc).sheetId,
            SheetResourceType.npcs,
            data.entity._id,
            { speed },
            { modal: true, notification: { status: 'success', heading: 'Speed Updated', message: `You have successfully updated your npc's speed to ${speed}.` } }
          )
        );
        return;
      case 'creatures':
        dispatch(
          updateSheetResourceStart(
            SheetType.campaigns,
            (data.entity as Creature).sheetId,
            SheetResourceType.creatures,
            data.entity._id,
            { speed },
            { modal: true, notification: { status: 'success', heading: 'Speed Updated', message: `You have successfully updated your creature's speed to ${speed}.` } }
          )
        );
        return;
      default:
        return;
    }
  };

  return (
    <ModalForm title="Edit Speed" submitText={`Save changes`} submitDisabled={data.entity.speed === speed} submitHandler={submitHandler}>
      <Input label="Speed" name="speed" type="number" value={speed} changeHandler={setSpeed} />
    </ModalForm>
  );
};

export default EditSpeed;
