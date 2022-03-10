import { useState } from 'react';
import { useDispatch } from 'react-redux';

import { updateSheetStart, updateSheetResourceStart } from '../../../redux/sheet/sheet.actions';

import { ModalForm } from '../Modal';

import Input from '../elements/Input';

const EditHealth = ({ data }) => {
  const dispatch = useDispatch();

  const [currentHp, setHealth] = useState(data.entity.currentHp);

  const submitHandler = async e => {
    e.preventDefault();

    switch (data.type) {
      case 'character':
        dispatch(
          updateSheetStart(
            'characters',
            data.entity._id,
            { currentHp: +currentHp },
            { modal: true, notification: { status: 'success', heading: 'currentHp Updated', message: `You have successfully updated your currentHp to ${currentHp}.` } }
          )
        );
        return;
      case 'player':
        dispatch(
          updateSheetStart(
            'characters',
            data.entity._id,
            { currentHp: +currentHp },
            { forPlayer: true, modal: true, notification: { status: 'success', heading: 'currentHp Updated', message: `You have successfully updated your player's currentHp to ${currentHp}.` } }
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
            { currentHp: +currentHp },
            { modal: true, notification: { status: 'success', heading: 'currentHp Updated', message: `You have successfully updated your npc's currentHp to ${currentHp}.` } }
          )
        );
        return;
      case 'creature':
        dispatch(
          updateSheetResourceStart(
            'campaigns',
            data.entity.sheetId,
            'creatures',
            data.entity._id,
            { currentHp: +currentHp },
            { modal: true, notification: { status: 'success', heading: 'currentHp Updated', message: `You have successfully updated your creature's currentHp to ${currentHp}.` } }
          )
        );
        return;
      default:
        return;
    }
  };

  return (
    <ModalForm title="Edit Health" submitText={`Save changes`} submitHandler={submitHandler}>
      <Input label="Health" name="currentHp" type="number" value={currentHp} changeHandler={setHealth} />
    </ModalForm>
  );
};

export default EditHealth;
