import { useState } from 'react';
import { useDispatch } from 'react-redux';

import { updateSheetStart, updateSheetResourceStart } from '../../../redux/sheet/sheet.actions';

import { ModalForm } from '../Modal';

import Input from '../elements/Input';

import { correctCurrentHp } from '../../../utils/functions/updateHealth';

import { Entity, EntityType, SheetResourceType, SheetType } from '../../../models/sheet';
import { Creature, Npc } from '../../../models/sheet/resources';

interface Props {
  data: {
    entityType: EntityType;
    entity: Entity;
  };
}

const EditHealth: React.VFC<Props> = ({ data }) => {
  const dispatch = useDispatch();

  const [currentHp, setCurrentHp] = useState(data.entity.currentHp);
  const [maxHp, setMaxHp] = useState(data.entity.maxHp);

  const submitHandler = async (e: React.FormEvent) => {
    e.preventDefault();

    switch (data.entityType) {
      case 'characters':
        dispatch(
          updateSheetStart(
            SheetType.characters,
            data.entity._id,
            { currentHp: correctCurrentHp(+currentHp, +maxHp), maxHp: +maxHp },
            { modal: true, notification: { status: 'success', heading: 'Health Updated', message: `You have successfully updated your currentHp to ${currentHp} and maxHp to ${maxHp}.` } }
          )
        );
        return;
      case 'players':
        dispatch(
          updateSheetStart(
            SheetType.characters,
            data.entity._id,
            { currentHp: correctCurrentHp(+currentHp, +maxHp), maxHp: +maxHp },
            {
              forPlayer: true,
              modal: true,
              notification: { status: 'success', heading: 'Health Updated', message: `You have successfully updated your player's currentHp to ${currentHp} and maxHp to ${maxHp}.` },
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
            { currentHp: correctCurrentHp(+currentHp, +maxHp), maxHp: +maxHp },
            { modal: true, notification: { status: 'success', heading: 'Health Updated', message: `You have successfully updated your npc's currentHp to ${currentHp} and maxHp to ${maxHp}.` } }
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
            { currentHp: correctCurrentHp(+currentHp, +maxHp), maxHp: +maxHp },
            {
              modal: true,
              notification: { status: 'success', heading: 'currentHp Updated', message: `You have successfully updated your creature's currentHp to ${currentHp} and maxHp to ${maxHp}.` },
            }
          )
        );
        return;
      default:
        return;
    }
  };

  return (
    <ModalForm title="Edit Health" submitText={`Save changes`} submitHandler={submitHandler}>
      <Input label="Current Health" name="currentHp" type="number" value={currentHp} changeHandler={setCurrentHp} />
      <Input label="Max Health" name="maxHp" type="number" value={maxHp} changeHandler={setMaxHp} />
    </ModalForm>
  );
};

export default EditHealth;
