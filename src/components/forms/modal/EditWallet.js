import { useState } from 'react';
import { useDispatch } from 'react-redux';

import { updateSheetStart, updateSheetResourceStart } from '../../../redux/sheet/sheet.actions';

import { ModalForm } from '../Modal';

import Input from '../elements/Input';

const EditWallet = ({ data }) => {
  const dispatch = useDispatch();

  const [wallet, setWallet] = useState(data.entity.wallet);

  const submitHandler = async e => {
    e.preventDefault();

    switch (data.type) {
      case 'character':
        dispatch(
          updateSheetStart(
            'characters',
            data.entity._id,
            { wallet: +wallet },
            { modal: true, notification: { status: 'success', heading: 'Wallet Updated', message: `You have successfully updated your wallet to ${wallet}.` } }
          )
        );
        return;
      case 'player':
        dispatch(
          updateSheetStart(
            'characters',
            data.entity._id,
            { wallet: +wallet },
            { modal: true, notification: { status: 'success', heading: 'Wallet Updated', message: `You have successfully updated your player's wallet to ${wallet}.` } }
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
            { wallet: +wallet },
            { modal: true, notification: { status: 'success', heading: 'Wallet Updated', message: `You have successfully updated your npc's wallet to ${wallet}.` } }
          )
        );
        return;
      default:
        return;
    }
  };

  return (
    <ModalForm title="Edit Wallet" submitText={`Save changes`} submitHandler={submitHandler}>
      <Input label="Wallet" name="wallet" type="number" value={wallet} changeHandler={setWallet} />
    </ModalForm>
  );
};

export default EditWallet;
