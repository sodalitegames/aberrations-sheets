import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { selectCurrentCharacter } from '../../../redux/character/character.selectors';

import { updateSheetStart } from '../../../redux/sheet/sheet.actions';

import { ModalForm } from '../Modal';

import Input from '../elements/Input';
import Notice from '../../Notice';

const SpentUpgradePoints = () => {
  const dispatch = useDispatch();

  const charSheet = useSelector(selectCurrentCharacter);

  const [spentUpgradePoints, setSpentUpgradePoints] = useState(0);

  useEffect(() => {
    if (charSheet) {
      setSpentUpgradePoints(charSheet.spentUpgradePoints);
    }
  }, [charSheet]);

  const submitHandler = async e => {
    e.preventDefault();

    dispatch(
      updateSheetStart(
        'characters',
        charSheet._id,
        { spentUpgradePoints },
        { modal: true, notification: { status: 'success', heading: 'Upgrade Points Updated', message: `You have successfully updated your spent upgrade points to ${spentUpgradePoints}.` } }
      )
    );
  };

  return (
    <ModalForm title="Edit Spent Upgrade Points" submitText={`Save changes`} submitDisabled={charSheet.spentUpgradePoints === spentUpgradePoints} submitHandler={submitHandler}>
      <Input label="Spent Upgrade Points" name="spentUpgradePoints" type="number" value={spentUpgradePoints} changeHandler={setSpentUpgradePoints} />
      <Notice status="info" message={`You will have ${+charSheet.power - spentUpgradePoints - 12} Upgrade Points after saving your changes.`} />
    </ModalForm>
  );
};

export default SpentUpgradePoints;
