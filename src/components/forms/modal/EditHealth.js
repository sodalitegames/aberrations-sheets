import { useState } from 'react';
import { useDispatch } from 'react-redux';

import { updateSheetStart, updateSheetResourceStart } from '../../../redux/sheet/sheet.actions';

import { ModalForm } from '../Modal';

import Input from '../elements/Input';

const EditHealth = ({ data }) => {
  const dispatch = useDispatch();

  const [currentHp, setCurrentHp] = useState(data.entity.currentHp);
  const [maxHp, setMaxHp] = useState(data.entity.maxHp);

  const submitHandler = async e => {
    e.preventDefault();

    switch (data.type) {
      case 'character':
        dispatch(
          updateSheetStart(
            'characters',
            data.entity._id,
            { currentHp: +currentHp, maxHp: +maxHp },
            { modal: true, notification: { status: 'success', heading: 'Health Updated', message: `You have successfully updated your currentHp to ${currentHp} and maxHp to ${maxHp}.` } }
          )
        );
        return;
      case 'player':
        dispatch(
          updateSheetStart(
            'characters',
            data.entity._id,
            { currentHp: +currentHp, maxHp: +maxHp },
            {
              forPlayer: true,
              modal: true,
              notification: { status: 'success', heading: 'Health Updated', message: `You have successfully updated your player's currentHp to ${currentHp} and maxHp to ${maxHp}.` },
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
            { currentHp: +currentHp, maxHp: +maxHp },
            { modal: true, notification: { status: 'success', heading: 'Health Updated', message: `You have successfully updated your npc's currentHp to ${currentHp} and maxHp to ${maxHp}.` } }
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
            { currentHp: +currentHp, maxHp: +maxHp },
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
