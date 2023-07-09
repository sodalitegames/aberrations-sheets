import { useState } from 'react';
import { useDispatch } from 'react-redux';

import { updateSheetResourceStart, updateSheetStart } from '../../../redux/sheet/sheet.actions';

import { ModalForm } from '../Modal';

import Input from '../elements/Input';

import { SheetEntity, SheetEntityType, SheetResourceType, SheetType } from '../../../models/sheet';
import { Npc } from '../../../models/sheet/resources';

interface Props {
  data: {
    entityType: SheetEntityType;
    entity: SheetEntity;
  };
}

const EditLevel: React.VFC<Props> = ({ data }) => {
  const dispatch = useDispatch();

  const [level, setLevel] = useState(data.entity.level);

  const submitHandler = async (e: React.FormEvent) => {
    e.preventDefault();

    switch (data.entityType) {
      case 'characters':
        dispatch(
          updateSheetStart(
            SheetType.characters,
            data.entity._id,
            { level },
            { modal: true, notification: { status: 'success', heading: 'Level Updated', message: `You have successfully updated your level to ${level}.` } }
          )
        );
        return;
      case 'players':
        dispatch(
          updateSheetStart(
            SheetType.characters,
            data.entity._id,
            { level },
            {
              forPlayer: true,
              modal: true,
              notification: { status: 'success', heading: 'Level Updated', message: `You have successfully updated your player's level to ${level}.` },
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
            { level },
            { modal: true, notification: { status: 'success', heading: 'Level Updated', message: `You have successfully updated your level to ${level}.` } }
          )
        );
        return;
      default:
        return;
    }
  };

  return (
    <ModalForm title="Edit Level" submitText={`Save changes`} submitDisabled={data.entity.level === level} submitHandler={submitHandler}>
      <Input label="Level" name="level" type="number" value={level} changeHandler={setLevel} />
    </ModalForm>
  );
};

export default EditLevel;
