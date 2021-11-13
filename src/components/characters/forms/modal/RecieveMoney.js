import { useState } from 'react';
import { useRecoilState, useSetRecoilState } from 'recoil';

import { modalState } from '../../../../recoil/app/app.atoms';
import { charSheetState } from '../../../../recoil/character/character.atoms';

import { updateSheet } from '../../../../apis/sheets.api';

import { ModalForm } from '../../../../layouts/components/app/Modal';

import Input from '../../../shared/Input';

const RecieveMoney = () => {
  const [amount, setAmount] = useState(0);

  const [charSheet, setCharSheet] = useRecoilState(charSheetState);
  const setModal = useSetRecoilState(modalState);

  const submitHandler = async e => {
    e.preventDefault();

    const response = await updateSheet('characters', charSheet._id, { wallet: charSheet.wallet + +amount });

    setCharSheet(oldCharSheet => {
      return { ...oldCharSheet, wallet: response.data.data.sheet.wallet };
    });

    setModal(null);
  };

  return (
    <ModalForm title="Recieve Money" submitText={`Recieve ${amount} monies`} submitHandler={submitHandler}>
      <Input label="How much money?" name="amount" type="number" value={amount} changeHandler={setAmount} />
    </ModalForm>
  );
};

export default RecieveMoney;
