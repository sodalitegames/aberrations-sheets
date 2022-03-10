import { useState } from 'react';
import { useDispatch } from 'react-redux';

import { updateSheetStart, updateSheetResourceStart } from '../../../redux/sheet/sheet.actions';

import { ModalForm } from '../Modal';

import Input from '../elements/Input';

const EditMortality = ({ data }) => {
  const dispatch = useDispatch();

  const [mortality, setMortality] = useState(data.entity.mortality);

  const submitHandler = async e => {
    e.preventDefault();

    switch (data.type) {
      case 'character':
        dispatch(
          updateSheetStart(
            'characters',
            data.entity._id,
            { mortality: +mortality },
            { modal: true, notification: { status: 'success', heading: 'Mortality Updated', message: `You have successfully updated your mortality to ${mortality}.` } }
          )
        );
        return;
      case 'player':
        dispatch(
          updateSheetStart(
            'characters',
            data.entity._id,
            { mortality: +mortality },
            { forPlayer: true, modal: true, notification: { status: 'success', heading: 'Mortality Updated', message: `You have successfully updated your player's mortality to ${mortality}.` } }
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
            { mortality: +mortality },
            { modal: true, notification: { status: 'success', heading: 'Mortality Updated', message: `You have successfully updated your npc's mortality to ${mortality}.` } }
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
            { mortality: +mortality },
            { modal: true, notification: { status: 'success', heading: 'Mortality Updated', message: `You have successfully updated your creature's mortality to ${mortality}.` } }
          )
        );
        return;
      default:
        return;
    }
  };

  return (
    <ModalForm title="Edit Mortality" submitText={`Save changes`} submitHandler={submitHandler}>
      <Input label="Mortality" name="mortality" type="number" value={mortality} changeHandler={setMortality} />
    </ModalForm>
  );
};

export default EditMortality;
