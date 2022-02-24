import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { selectCurrentCharacter } from '../../../redux/character/character.selectors';

import { updateSheetStart } from '../../../redux/sheet/sheet.actions';

import { capitalize } from '../../../utils/helpers/strings';

import { ModalForm } from '../Modal';

import Input from '../elements/Input';

const EditCondition = ({ id }) => {
  const dispatch = useDispatch();

  const charSheet = useSelector(selectCurrentCharacter);

  const [points, setPoints] = useState(0);

  useEffect(() => {
    if (charSheet) {
      setPoints(charSheet.conditions[id]);
    }
  }, [charSheet, id]);

  const submitHandler = async e => {
    e.preventDefault();

    dispatch(
      updateSheetStart(
        'characters',
        charSheet._id,
        { conditions: { ...charSheet.conditions, [id]: points } },
        { modal: true, notification: { status: 'success', heading: 'Conditions Updated', message: `You have successfully updated your ${id.toLowerCase()} condition.` } }
      )
    );
  };

  return (
    <ModalForm title={`Edit ${capitalize(id)} Condition`} submitText={`Save changes`} submitHandler={submitHandler}>
      <Input label={`${capitalize(id)} Points`} name={id} type="number" value={points} changeHandler={setPoints} />
    </ModalForm>
  );
};

export default EditCondition;