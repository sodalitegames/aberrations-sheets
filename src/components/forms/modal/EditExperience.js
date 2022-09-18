import { useState } from 'react';
import { useDispatch } from 'react-redux';

import { updateSheetResourceStart, updateSheetStart } from '../../../redux/sheet/sheet.actions';

import { ModalForm } from '../Modal';

import Input from '../elements/Input';

const EditExperience = ({ data }) => {
  const dispatch = useDispatch();

  const [experience, setExperience] = useState(data.entity.experience);

  const submitHandler = async e => {
    e.preventDefault();

    switch (data.type) {
      case 'character':
        dispatch(
          updateSheetStart(
            'characters',
            data.entity._id,
            { experience },
            { modal: true, notification: { status: 'success', heading: 'Experience Updated', message: `You have successfully updated your spent experience to ${experience}.` } }
          )
        );
        return;
      case 'player':
        dispatch(
          updateSheetStart(
            'characters',
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
      case 'npc':
        dispatch(
          updateSheetResourceStart(
            'campaigns',
            data.entity.sheetId,
            'npcs',
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
