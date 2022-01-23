import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { selectCurrentCharacter } from '../../../../redux/character/character.selectors';

import { updateSheetStart } from '../../../../redux/sheet/sheet.actions';

import { ModalForm } from '../../../../layouts/components/app/Modal';

import Input from '../../../shared/form/Input';

const PayMoney = () => {
  const dispatch = useDispatch();

  const charSheet = useSelector(selectCurrentCharacter);

  const [amount, setAmount] = useState(0);

  const submitHandler = async e => {
    e.preventDefault();

    dispatch(updateSheetStart('characters', charSheet._id, { wallet: charSheet.wallet - +amount }));
  };

  return (
    <ModalForm title="Pay Money" submitText={`Pay ${amount} monies`} submitHandler={submitHandler}>
      <Input label="How much money?" name="amount" type="number" value={amount} changeHandler={setAmount} />
    </ModalForm>
  );
};

export default PayMoney;
