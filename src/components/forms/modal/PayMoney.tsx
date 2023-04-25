import { FormEvent, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { selectCurrentCharacter } from '../../../redux/character/character.selectors';
import { selectCurrentCampaign } from '../../../redux/campaign/campaign.selectors';

import { updateSheetStart, createSheetResourceStart, updateSheetResourceStart } from '../../../redux/sheet/sheet.actions';

import { ModalForm } from '../Modal';

import Input from '../elements/Input';
import Select from '../elements/Select';
import TextArea from '../elements/TextArea';

import { getRecipientList } from '../../../utils/functions/getRecipientList';

import { SheetEntity, SheetEntityType, SheetResourceType, SheetType } from '../../../models/sheet';
import { Npc } from '../../../models/sheet/resources';

const getSheetType = (entityType: SheetEntityType) => {
  switch (entityType) {
    case 'characters':
      return SheetType.characters;
    case 'players':
    case 'npcs':
      return SheetType.campaigns;
    default:
      break;
  }
};

interface Props {
  data: {
    entityType: SheetEntityType;
    entity: SheetEntity;
  };
}

const PayMoney: React.FC<Props> = ({ data }) => {
  const dispatch = useDispatch();

  const charSheet = useSelector(selectCurrentCharacter);
  const campSheet = useSelector(selectCurrentCampaign);

  const sheet = {
    characters: charSheet,
    players: campSheet,
    npcs: campSheet,
  };

  const [senderName, setSenderName] = useState('');
  const [recipientId, setRecipientId] = useState('');
  const [amount, setAmount] = useState(0);
  const [message, setMessage] = useState('');

  const recipientList = getRecipientList(getSheetType(data.entityType)!, sheet[data.entityType]!);

  const submitHandler = async (e: FormEvent) => {
    e.preventDefault();

    if (recipientId) {
      if (!senderName) return alert('Must provide a senderName');

      const recipientInfo = recipientList.find(recip => recip.id === recipientId);

      if (!recipientInfo) return alert('You must choose a recipient!');

      switch (data.entityType) {
        case 'players':
          dispatch(
            createSheetResourceStart(
              SheetType.characters,
              data.entity._id,
              SheetResourceType.transactions,
              {
                sheetType: 'characters',
                senderName,
                recipientName: recipientInfo.name,
                receivingSheetId: recipientInfo.id,
                receivingSheetType: recipientInfo.sheetType,
                message,
                document: { amount },
                documentType: 'wallet',
              },
              {
                forPlayer: true,
                modal: true,
                notification: {
                  status: 'success',
                  heading: 'Transaction Created',
                  message: `You have successfully offered ${amount} monies to
                   ${recipientInfo.name}.`,
                },
              }
            )
          );
          return;
        case 'characters':
          dispatch(
            createSheetResourceStart(
              SheetType.characters,
              data.entity._id,
              SheetResourceType.transactions,
              {
                sheetType: 'characters',
                senderName,
                recipientName: recipientInfo.name,
                receivingSheetId: recipientInfo.id,
                receivingSheetType: recipientInfo.sheetType,
                message,
                document: { amount },
                documentType: 'wallet',
              },
              {
                modal: true,
                notification: {
                  status: 'success',
                  heading: 'Transaction Created',
                  message: `You have successfully offered ${amount} monies to
                   ${recipientInfo.name}.`,
                },
              }
            )
          );
          return;
        case 'npcs':
          dispatch(
            createSheetResourceStart(
              SheetType.campaigns,
              (data.entity as Npc).sheetId,
              SheetResourceType.transactions,
              {
                sheetType: 'campaigns',
                senderName,
                recipientName: recipientInfo.name,
                receivingSheetId: recipientInfo.id,
                receivingSheetType: recipientInfo.sheetType,
                message,
                document: { amount },
                documentType: 'wallet',
              },
              {
                modal: true,
                notification: {
                  status: 'success',
                  heading: 'Transaction Created',
                  message: `You have successfully offered ${amount} monies to
                   ${recipientInfo.name}.`,
                },
              }
            )
          );
          return;
        default:
          return;
      }
    }

    switch (data.entityType) {
      case 'players':
        dispatch(
          updateSheetStart(
            SheetType.characters,
            data.entity._id,
            { wallet: data.entity.wallet - +amount },
            { modal: true, notification: { status: 'success', heading: 'Money Paid', message: `You have successfully paid ${amount} monies.` } }
          )
        );
        return;
      case 'characters':
        dispatch(
          updateSheetStart(
            SheetType.characters,
            data.entity._id,
            { wallet: data.entity.wallet - +amount },
            { modal: true, notification: { status: 'success', heading: 'Money Paid', message: `You have successfully paid ${amount} monies.` } }
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
            { wallet: data.entity.wallet - +amount },
            { modal: true, notification: { status: 'success', heading: 'Money Paid', message: `You have successfully paid ${amount} monies.` } }
          )
        );
        return;
      default:
        return;
    }
  };

  return (
    <ModalForm title="Pay Money" submitText={`Pay ${amount} monies`} submitHandler={submitHandler}>
      {recipientId ? <Input label="Sender Name" name="senderName" type="text" value={senderName} changeHandler={setSenderName} required /> : null}
      <Select label="Recipient (Opt.)" name="recipientId" options={recipientList} value={recipientId} changeHandler={setRecipientId} />
      <Input label="How much money?" name="amount" type="number" value={amount} changeHandler={setAmount} />
      {recipientId ? <TextArea label="Message (Opt.)" name="message" rows={4} value={message} changeHandler={setMessage} /> : null}
    </ModalForm>
  );
};

export default PayMoney;
