import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { selectCurrentCharacter } from '../../../../redux/character/character.selectors';

import { updateSheetStart } from '../../../../redux/sheet/sheet.actions';

import { ModalForm } from '../../../../layouts/components/app/Modal';

import Input from '../../../shared/form/Input';

const TakeDamage = () => {
  const dispatch = useDispatch();

  const charSheet = useSelector(selectCurrentCharacter);

  const [damage, setDamage] = useState(0);

  const submitHandler = async e => {
    e.preventDefault();

    dispatch(updateSheetStart('characters', charSheet._id, { currentHp: charSheet.currentHp - +damage }, { modal: true }));
  };

  return (
    <ModalForm title="Take Damage" submitText={`Take ${damage} Damage`} submitHandler={submitHandler}>
      <Input label="How much damage?" name="damage" type="number" value={damage} changeHandler={setDamage} />
    </ModalForm>
  );
};

export default TakeDamage;
