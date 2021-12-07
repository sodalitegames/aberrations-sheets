import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { selectCurrentCharacter } from '../../../../redux/character/character.selectors';

import { setModal } from '../../../../redux/app/app.actions';
import { updateSheetStart } from '../../../../redux/sheet/sheet.actions';

import { ModalForm } from '../../../../layouts/components/app/Modal';

import Input from '../../../shared/Input';

const Mortality = () => {
  const dispatch = useDispatch();

  const charSheet = useSelector(selectCurrentCharacter);

  const [mortality, setMortality] = useState(0);

  useEffect(() => {
    if (charSheet) {
      setMortality(charSheet.mortality);
    }
  }, [charSheet]);

  const submitHandler = async e => {
    e.preventDefault();

    dispatch(updateSheetStart('characters', charSheet._id, { mortality: +mortality }));

    dispatch(setModal(null));
  };

  return (
    <ModalForm title="Edit Mortality" submitText={`Save changes`} submitHandler={submitHandler}>
      <Input label="Mortality" name="mortality" type="number" value={mortality} changeHandler={setMortality} />
    </ModalForm>
  );
};

export default Mortality;
