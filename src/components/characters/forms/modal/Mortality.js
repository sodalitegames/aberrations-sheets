import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { selectCurrentCharacter } from '../../../../redux/character/character.selectors';

import { updateSheetStart } from '../../../../redux/sheet/sheet.actions';

import { ModalForm } from '../../../../layouts/components/app/Modal';

import Input from '../../../shared/form/Input';

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

    dispatch(
      updateSheetStart(
        'characters',
        charSheet._id,
        { mortality: +mortality },
        { modal: true, notification: { status: 'success', heading: 'Mortality Updated', message: `You have successfully updated your mortality to ${mortality}.` } }
      )
    );
  };

  return (
    <ModalForm title="Edit Mortality" submitText={`Save changes`} submitHandler={submitHandler}>
      <Input label="Mortality" name="mortality" type="number" value={mortality} changeHandler={setMortality} />
    </ModalForm>
  );
};

export default Mortality;
