import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { selectCurrentCharacter } from '../../../../redux/character/character.selectors';

import { updateSheetStart } from '../../../../redux/sheet/sheet.actions';

import { ModalForm } from '../../../../layouts/components/app/Modal';

import Input from '../../../shared/form/Input';

const UpgradePoints = () => {
  const dispatch = useDispatch();

  const charSheet = useSelector(selectCurrentCharacter);

  const [upgradePoints, setUpgradePoints] = useState(0);

  useEffect(() => {
    if (charSheet) {
      setUpgradePoints(charSheet.upgradePoints);
    }
  }, [charSheet]);

  const submitHandler = async e => {
    e.preventDefault();

    dispatch(updateSheetStart('characters', charSheet._id, { upgradePoints }));
  };

  return (
    <ModalForm title="Edit Upgrade Points" submitText={`Save changes`} submitHandler={submitHandler}>
      <Input label="Upgrade Points" name="upgradePoints" type="number" value={upgradePoints} changeHandler={setUpgradePoints} />
    </ModalForm>
  );
};

export default UpgradePoints;
