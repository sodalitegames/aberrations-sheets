import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { selectCurrentCharacter } from '../../../../redux/character/character.selectors';

import { setModal } from '../../../../redux/app/app.actions';
import { updateSheetStart } from '../../../../redux/sheet/sheet.actions';

import { ModalForm } from '../../../../layouts/components/app/Modal';

import Input from '../../../shared/Input';

const PayMoney = () => {
  const dispatch = useDispatch();

  const charSheet = useSelector(selectCurrentCharacter);

  const [amount, setAmount] = useState(0);

  const submitHandler = async e => {
    e.preventDefault();

    dispatch(updateSheetStart('characters', charSheet._id, { wallet: charSheet.wallet - +amount }));

    dispatch(setModal(null));
  };

  return (
    <ModalForm title="Pay Money" submitText={`Pay ${amount} monies`} submitHandler={submitHandler}>
      <Input label="How much money?" name="amount" type="number" value={amount} changeHandler={setAmount} />
    </ModalForm>
  );
};

export default PayMoney;
