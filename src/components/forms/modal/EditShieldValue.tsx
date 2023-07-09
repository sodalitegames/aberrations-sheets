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

const EditShieldValue: React.VFC<Props> = ({ data }) => {
  const dispatch = useDispatch();

  const [shieldValue, setShieldValue] = useState(data.entity.shieldValue);

  const submitHandler = async (e: React.FormEvent) => {
    e.preventDefault();

    switch (data.entityType) {
      case 'characters':
        dispatch(
          updateSheetStart(
            SheetType.characters,
            data.entity._id,
            { shieldValue },
            { modal: true, notification: { status: 'success', heading: 'Shield Value Updated', message: `You have successfully updated your shieldValue to ${shieldValue}.` } }
          )
        );
        return;
      case 'players':
        dispatch(
          updateSheetStart(
            SheetType.characters,
            data.entity._id,
            { shieldValue },
            {
              forPlayer: true,
              modal: true,
              notification: { status: 'success', heading: 'Shield Value Updated', message: `You have successfully updated your player's shieldValue to ${shieldValue}.` },
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
            { shieldValue },
            { modal: true, notification: { status: 'success', heading: 'Shield Value Updated', message: `You have successfully updated your npc's shieldValue to ${shieldValue}.` } }
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
            { shieldValue },
            { modal: true, notification: { status: 'success', heading: 'Shield Value Updated', message: `You have successfully updated your creature's shieldValue to ${shieldValue}.` } }
          )
        );
        return;
      default:
        return;
    }
  };

  return (
    <ModalForm title="Edit Shield Value" submitText={`Save changes`} submitDisabled={data.entity.shieldValue === shieldValue} submitHandler={submitHandler}>
      <Input label="Shield Value" name="shieldValue" type="number" value={shieldValue} changeHandler={setShieldValue} />
    </ModalForm>
  );
};

export default EditShieldValue;
