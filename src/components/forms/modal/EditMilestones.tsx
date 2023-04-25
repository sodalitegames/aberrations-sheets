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

const EditMilestones: React.VFC<Props> = ({ data }) => {
  const dispatch = useDispatch();

  const [milestones, setMilestones] = useState(data.entity.milestones);

  const submitHandler = async (e: React.FormEvent) => {
    e.preventDefault();

    switch (data.entityType) {
      case 'characters':
        dispatch(
          updateSheetStart(
            SheetType.characters,
            data.entity._id,
            { milestones },
            { modal: true, notification: { status: 'success', heading: 'Milestones Updated', message: `You have successfully updated your spent milestones to ${milestones}.` } }
          )
        );
        return;
      case 'players':
        dispatch(
          updateSheetStart(
            SheetType.characters,
            data.entity._id,
            { milestones },
            {
              forPlayer: true,
              modal: true,
              notification: { status: 'success', heading: 'Milestones Updated', message: `You have successfully updated your player's spent milestones to ${milestones}.` },
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
            { milestones },
            { modal: true, notification: { status: 'success', heading: 'Milestones Updated', message: `You have successfully updated your spent milestones to ${milestones}.` } }
          )
        );
        return;
      default:
        return;
    }
  };

  return (
    <ModalForm title="Edit Milestones" submitText={`Save changes`} submitDisabled={data.entity.milestones === milestones} submitHandler={submitHandler}>
      <Input label="Milestones" name="milestones" type="number" value={milestones} changeHandler={setMilestones} />
    </ModalForm>
  );
};

export default EditMilestones;
