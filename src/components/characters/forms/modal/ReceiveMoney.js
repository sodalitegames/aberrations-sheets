import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { selectCurrentCharacter } from '../../../../redux/character/character.selectors';

import { updateSheetStart } from '../../../../redux/sheet/sheet.actions';

import { ModalForm } from '../../../../layouts/components/app/Modal';

import Input from '../../../shared/form/Input';

const ReceiveMoney = () => {
  const dispatch = useDispatch();

  const charSheet = useSelector(selectCurrentCharacter);

  const [amount, setAmount] = useState(0);

  const submitHandler = async e => {
    e.preventDefault();

    dispatch(updateSheetStart('characters', charSheet._id, { wallet: charSheet.wallet + +amount }, { modal: true }));
  };

  return (
    <ModalForm title="Receive Money" submitText={`Receive ${amount} monies`} submitHandler={submitHandler}>
      <Input label="How much money?" name="amount" type="number" value={amount} changeHandler={setAmount} />
    </ModalForm>
  );
};

export default ReceiveMoney;
