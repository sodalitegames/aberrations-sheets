import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { selectCurrentCharacter } from '../../../../redux/character/character.selectors';

import { setModal } from '../../../../redux/app/app.actions';
import { updateSheetStart } from '../../../../redux/sheet/sheet.actions';

import { ModalForm } from '../../../../layouts/components/app/Modal';

import Input from '../../../shared/Input';

const GeneralExhaustion = () => {
  const dispatch = useDispatch();

  const charSheet = useSelector(selectCurrentCharacter);

  const [generalExhaustion, setGeneralExhaustion] = useState(0);

  useEffect(() => {
    if (charSheet) {
      setGeneralExhaustion(charSheet.generalExhaustion);
    }
  }, [charSheet]);

  const submitHandler = async e => {
    e.preventDefault();

    dispatch(updateSheetStart('characters', charSheet._id, { generalExhaustion }));

    dispatch(setModal(null));
  };

  return (
    <ModalForm title="Edit General Exhaustion" submitText={`Save changes`} submitHandler={submitHandler}>
      <Input label="General Exhaustion" name="generalExhaustion" type="number" value={generalExhaustion} changeHandler={setGeneralExhaustion} />
    </ModalForm>
  );
};

export default GeneralExhaustion;
