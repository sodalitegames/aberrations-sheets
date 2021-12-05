import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { selectCurrentCharacter } from '../../../../redux/character/character.selectors';

import { setModal } from '../../../../redux/app/app.actions';
import { updateSheetStart } from '../../../../redux/sheet/sheet.actions';

import { ModalForm } from '../../../../layouts/components/app/Modal';

import Input from '../../../shared/Input';

const HealDamage = () => {
  const dispatch = useDispatch();

  const charSheet = useSelector(selectCurrentCharacter);

  const [damage, setDamage] = useState(0);

  const submitHandler = async e => {
    e.preventDefault();

    dispatch(updateSheetStart('characters', charSheet._id, { currentHp: charSheet.currentHp + +damage }));

    dispatch(setModal(null));
  };

  return (
    <ModalForm title="Heal Damage" submitText={`Heal ${damage} Damage`} submitHandler={submitHandler}>
      <Input label="How much damage?" name="damage" type="number" value={damage} changeHandler={setDamage} />
    </ModalForm>
  );
};

export default HealDamage;
