import { useState } from 'react';
import { useDispatch } from 'react-redux';

import { updateSheetResourceStart, updateSheetStart } from '../../../redux/sheet/sheet.actions';

import { ModalForm } from '../Modal';

import Input from '../elements/Input';
import Notice from '../../Notice';

const EditSpentUpgradePoints = ({ data }) => {
  const dispatch = useDispatch();

  const [spentUpgradePoints, setSpentUpgradePoints] = useState(data.entity.spentUpgradePoints);

  const submitHandler = async e => {
    e.preventDefault();

    switch (data.type) {
      case 'character':
        dispatch(
          updateSheetStart(
            'characters',
            data.entity._id,
            { spentUpgradePoints },
            { modal: true, notification: { status: 'success', heading: 'Upgrade Points Updated', message: `You have successfully updated your spent upgrade points to ${spentUpgradePoints}.` } }
          )
        );
        return;
      case 'player':
        dispatch(
          updateSheetStart(
            'characters',
            data.entity._id,
            { spentUpgradePoints },
            {
              modal: true,
              notification: { status: 'success', heading: 'Upgrade Points Updated', message: `You have successfully updated your player's spent upgrade points to ${spentUpgradePoints}.` },
            }
          )
        );
        return;
      case 'npc':
        dispatch(
          updateSheetResourceStart(
            'campaigns',
            data.entity.sheetId,
            'npcs',
            data.entity._id,
            { spentUpgradePoints },
            { modal: true, notification: { status: 'success', heading: 'Upgrade Points Updated', message: `You have successfully updated your spent upgrade points to ${spentUpgradePoints}.` } }
          )
        );
        return;
      default:
        return;
    }
  };

  return (
    <ModalForm title="Edit Spent Upgrade Points" submitText={`Save changes`} submitDisabled={data.entity.spentUpgradePoints === spentUpgradePoints} submitHandler={submitHandler}>
      <Input label="Spent Upgrade Points" name="spentUpgradePoints" type="number" value={spentUpgradePoints} changeHandler={setSpentUpgradePoints} />
      <Notice status="info" message={`You will have ${+data.entity.power - spentUpgradePoints - 12} Upgrade Points after saving your changes.`} />
    </ModalForm>
  );
};

export default EditSpentUpgradePoints;
