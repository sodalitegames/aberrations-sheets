import { useState } from 'react';
import { useRecoilState, useSetRecoilState } from 'recoil';

import { modalState } from '../../../../recoil/app/app.atoms';
import { charSheetState } from '../../../../recoil/character/character.atoms';

import { updateSheet } from '../../../../apis/sheets.api';

import { ModalForm } from '../../../../layouts/components/app/Modal';

import Input from '../../../shared/Input';

const HealDamage = () => {
  const [damage, setDamage] = useState(0);

  const [charSheet, setCharSheet] = useRecoilState(charSheetState);
  const setModal = useSetRecoilState(modalState);

  const submitHandler = async e => {
    e.preventDefault();

    const response = await updateSheet('characters', charSheet._id, { currentHp: charSheet.currentHp + +damage });

    setCharSheet(oldCharSheet => {
      return { ...oldCharSheet, currentHp: response.data.data.sheet.currentHp };
    });

    setModal(null);
  };

  return (
    <ModalForm title="Heal Damage" submitText={`Heal ${damage} Damage`} submitHandler={submitHandler}>
      <Input label="How much damage?" name="damage" type="number" value={damage} changeHandler={setDamage} />
    </ModalForm>
  );
};

export default HealDamage;
