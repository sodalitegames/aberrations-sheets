import { useState } from 'react';
import { useDispatch } from 'react-redux';

import { updateSheetResourceStart, updateSheetStart } from '../../../redux/sheet/sheet.actions';

import { ModalForm } from '../Modal';

import Input from '../elements/Input';

const EditMilestones = ({ data }) => {
  const dispatch = useDispatch();

  const [milestones, setMilestones] = useState(data.entity.milestones);

  const submitHandler = async e => {
    e.preventDefault();

    switch (data.type) {
      case 'character':
        dispatch(
          updateSheetStart(
            'characters',
            data.entity._id,
            { milestones },
            { modal: true, notification: { status: 'success', heading: 'Milestones Updated', message: `You have successfully updated your spent milestones to ${milestones}.` } }
          )
        );
        return;
      case 'player':
        dispatch(
          updateSheetStart(
            'characters',
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
      case 'npc':
        dispatch(
          updateSheetResourceStart(
            'campaigns',
            data.entity.sheetId,
            'npcs',
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
