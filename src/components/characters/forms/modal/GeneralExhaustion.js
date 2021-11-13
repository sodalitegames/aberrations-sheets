import { useState, useEffect } from 'react';
import { useRecoilState, useSetRecoilState } from 'recoil';

import { modalState } from '../../../../recoil/app/app.atoms';
import { charSheetState } from '../../../../recoil/character/character.atoms';

import { updateSheet } from '../../../../apis/sheets.api';

import { ModalForm } from '../../../../layouts/components/app/Modal';

import Input from '../../../shared/Input';

const GeneralExhaustion = () => {
  const [generalExhaustion, setGeneralExhaustion] = useState(0);

  const [charSheet, setCharSheet] = useRecoilState(charSheetState);
  const setModal = useSetRecoilState(modalState);

  useEffect(() => {
    if (charSheet) {
      setGeneralExhaustion(charSheet.generalExhaustion);
    }
  }, [charSheet]);

  const submitHandler = async e => {
    e.preventDefault();

    const response = await updateSheet('characters', charSheet._id, { generalExhaustion });

    setCharSheet(oldCharSheet => {
      return { ...oldCharSheet, generalExhaustion: response.data.data.sheet.generalExhaustion };
    });

    setModal(null);
  };

  return (
    <ModalForm title="Edit General Exhaustion" submitText={`Save changes`} submitHandler={submitHandler}>
      <Input label="General Exhaustion" name="generalExhaustion" type="number" value={generalExhaustion} changeHandler={setGeneralExhaustion} />
    </ModalForm>
  );
};

export default GeneralExhaustion;
