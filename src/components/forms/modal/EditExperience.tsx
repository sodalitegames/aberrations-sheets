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

const EditExperience: React.VFC<Props> = ({ data }) => {
  const dispatch = useDispatch();

  const [experience, setExperience] = useState(data.entity.experience);

  const submitHandler = async (e: React.FormEvent) => {
    e.preventDefault();

    switch (data.entityType) {
      case 'characters':
        dispatch(
          updateSheetStart(
            SheetType.characters,
            data.entity._id,
            { experience },
            { modal: true, notification: { status: 'success', heading: 'Experience Updated', message: `You have successfully updated your spent experience to ${experience}.` } }
          )
        );
        return;
      case 'players':
        dispatch(
          updateSheetStart(
            SheetType.characters,
            data.entity._id,
            { experience },
            {
              forPlayer: true,
              modal: true,
              notification: { status: 'success', heading: 'Experience Updated', message: `You have successfully updated your player's spent experience to ${experience}.` },
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
            { experience },
            { modal: true, notification: { status: 'success', heading: 'Experience Updated', message: `You have successfully updated your spent experience to ${experience}.` } }
          )
        );
        return;
      default:
        return;
    }
  };

  return (
    <ModalForm title="Edit Experience" submitText={`Save changes`} submitDisabled={data.entity.experience === experience} submitHandler={submitHandler}>
      <Input label="Experience" name="experience" type="number" value={experience} changeHandler={setExperience} />
    </ModalForm>
  );
};

export default EditExperience;
