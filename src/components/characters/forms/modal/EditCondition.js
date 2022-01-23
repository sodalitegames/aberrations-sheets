import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { selectCurrentCharacter } from '../../../../redux/character/character.selectors';

import { updateSheetStart } from '../../../../redux/sheet/sheet.actions';

import { capitalize } from '../../../../utils/strings';

import { ModalForm } from '../../../../layouts/components/app/Modal';

import Input from '../../../shared/Input';

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

    dispatch(updateSheetStart('characters', charSheet._id, { conditions: { ...charSheet.conditions, [id]: points } }));
  };

  return (
    <ModalForm title={`Edit ${capitalize(id)} Condition`} submitText={`Save changes`} submitHandler={submitHandler}>
      <Input label={`${capitalize(id)} Points`} name={id} type="number" value={points} changeHandler={setPoints} />
    </ModalForm>
  );
};

export default EditCondition;
