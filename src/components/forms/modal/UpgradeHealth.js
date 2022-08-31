import { useState } from 'react';
import { useDispatch } from 'react-redux';

import { updateSheetResourceStart, updateSheetStart } from '../../../redux/sheet/sheet.actions';

import { ModalForm } from '../Modal';

import Input from '../elements/Input';
import Detail from '../elements/Detail';

const UpgradeHealth = ({ data }) => {
  const dispatch = useDispatch();

  const [amount, setAmount] = useState(0);

  const submitHandler = async e => {
    e.preventDefault();

    if (data.entity.experience < amount) {
      alert('You do not have enough experience to upgrade your health that much.');
      return;
    }

    switch (data.type) {
      case 'character':
        dispatch(
          updateSheetStart(
            'characters',
            data.entity._id,
            { experience: data.entity.experience - +amount, currentHp: data.entity.currentHp + +amount, maxHp: data.entity.maxHp + +amount },
            { modal: true, notification: { status: 'success', heading: 'Health Upgraded', message: `You have successfully upgraded your health by ${amount}.` } }
          )
        );
        return;
      case 'player':
        dispatch(
          updateSheetStart(
            'characters',
            data.entity._id,
            { experience: data.entity.experience - +amount, currentHp: data.entity.currentHp + +amount, maxHp: data.entity.maxHp + +amount },
            {
              forPlayer: true,
              modal: true,
              notification: { status: 'success', heading: 'Health Upgraded', message: `You have successfully upgraded your player's health by ${amount}.` },
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
            { experience: data.entity.experience - +amount, currentHp: data.entity.currentHp + +amount, maxHp: data.entity.maxHp + +amount },
            { modal: true, notification: { status: 'success', heading: 'Health Upgraded', message: `You have successfully upgraded your health by ${amount}.` } }
          )
        );
        return;
      default:
        return;
    }
  };

  return (
    <ModalForm title="Upgrade Health" submitText={`Spend ${amount} experience to upgrade health by ${amount}`} submitDisabled={!amount} submitHandler={submitHandler}>
      <Detail label="Experience" detail={data.entity.experience} />
      <Input label="How much?" name="amount" type="number" value={amount} changeHandler={setAmount} />
    </ModalForm>
  );
};

export default UpgradeHealth;
