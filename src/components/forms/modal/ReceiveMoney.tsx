import { FormEvent, useState } from 'react';
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

const ReceiveMoney: React.FC<Props> = ({ data }) => {
  const dispatch = useDispatch();

  const [amount, setAmount] = useState(0);

  const submitHandler = async (e: FormEvent) => {
    e.preventDefault();

    switch (data.entityType) {
      case 'players':
        dispatch(
          updateSheetStart(
            SheetType.characters,
            data.entity._id,
            { wallet: data.entity.wallet + +amount },
            { forPlayer: true, modal: true, notification: { status: 'success', heading: 'Money Received', message: `You have successfully received ${amount} monies.` } }
          )
        );
        return;
      case 'characters':
        dispatch(
          updateSheetStart(
            SheetType.characters,
            data.entity._id,
            { wallet: data.entity.wallet + +amount },
            { modal: true, notification: { status: 'success', heading: 'Money Received', message: `You have successfully received ${amount} monies.` } }
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
            { wallet: data.entity.wallet + +amount },
            { modal: true, notification: { status: 'success', heading: 'Money Received', message: `You have successfully received ${amount} monies.` } }
          )
        );
        return;
      default:
        return;
    }
  };

  return (
    <ModalForm title="Receive Money" submitText={`Receive ${amount} monies`} submitHandler={submitHandler}>
      <Input label="How much money?" name="amount" type="number" value={amount} changeHandler={setAmount} />
    </ModalForm>
  );
};

export default ReceiveMoney;
