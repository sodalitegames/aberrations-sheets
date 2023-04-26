import { useState } from 'react';
import { useDispatch } from 'react-redux';

import { updateSheetStart, updateSheetResourceStart } from '../../../redux/sheet/sheet.actions';

import { ModalForm } from '../Modal';

import Input from '../elements/Input';

import { SheetEntity, SheetEntityType, SheetResourceType, SheetType } from '../../../models/sheet';
import { Npc } from '../../../models/sheet/resources';

interface Props {
  data: {
    entityType: SheetEntityType;
    entity: SheetEntity;
  };
}

const EditWallet: React.VFC<Props> = ({ data }) => {
  const dispatch = useDispatch();

  const [wallet, setWallet] = useState(data.entity.wallet);

  const submitHandler = async (e: React.FormEvent) => {
    e.preventDefault();

    switch (data.entityType) {
      case 'characters':
        dispatch(
          updateSheetStart(
            SheetType.characters,
            data.entity._id,
            { wallet: +wallet },
            { modal: true, notification: { status: 'success', heading: 'Wallet Updated', message: `You have successfully updated your wallet to ${wallet}.` } }
          )
        );
        return;
      case 'players':
        dispatch(
          updateSheetStart(
            SheetType.characters,
            data.entity._id,
            { wallet: +wallet },
            { forPlayer: true, modal: true, notification: { status: 'success', heading: 'Wallet Updated', message: `You have successfully updated your player's wallet to ${wallet}.` } }
          )
        );
        return;
      case 'npcs':
        dispatch(
          updateSheetResourceStart(
            SheetType.campaigns,
            (data.entity as Npc).sheetId,
            SheetResourceType.npcs,
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
