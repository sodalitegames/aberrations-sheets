import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { selectCurrentCharacter } from '../../../redux/character/character.selectors';
import { selectCurrentCampaign } from '../../../redux/campaign/campaign.selectors';

import { updateSheetStart, createSheetResourceStart, updateSheetResourceStart } from '../../../redux/sheet/sheet.actions';

import { ModalForm } from '../Modal';

import Input from '../elements/Input';
import Select from '../elements/Select';
import TextArea from '../elements/TextArea';

const PayMoney = ({ data: { type, playerId, npcId } }) => {
  const dispatch = useDispatch();

  const charSheet = useSelector(selectCurrentCharacter);
  const campSheet = useSelector(selectCurrentCampaign);

  const [senderName, setSenderName] = useState('');
  const [recipientId, setRecipientId] = useState('');
  const [amount, setAmount] = useState(0);
  const [message, setMessage] = useState('');

  const [recipientList, setRecipientList] = useState([]);

  const [sheet, setSheet] = useState(null);

  useEffect(() => {
    switch (type) {
      case 'character':
        setSheet(charSheet);
        return;
      case 'player':
        const player = campSheet.players.find(player => player._id === playerId);
        setSheet(player);
        return;
      case 'npc':
        const npc = campSheet.npcs.find(npc => npc._id === npcId);
        setSheet(npc);
        return;
      default:
        return;
    }
  }, [charSheet, campSheet, type, playerId, npcId]);

  useEffect(() => {
    if (sheet) {
      setSenderName(sheet.characterName || sheet.name);

      let newRecipientList = [];

      switch (type) {
        case 'character':
          newRecipientList = charSheet.campaign
            ? charSheet.campaign.players.filter(player => player._id !== charSheet._id).map(player => ({ name: player.characterName, id: player._id, sheetType: 'characters' }))
            : [];

          if (charSheet.campaign) newRecipientList.push({ name: `${charSheet.campaign.ccNickname || charSheet.campaign.ccName} (CC)`, id: charSheet.campaign._id, sheetType: 'campaigns' });
          break;
        case 'player':
        case 'npc':
          newRecipientList = campSheet.players.map(player => ({ name: player.characterName, id: player._id, sheetType: 'characters' }));

          newRecipientList.push({ name: `${campSheet.ccNickname || campSheet.ccName} (CC)`, id: campSheet._id, sheetType: 'campaigns' });

          break;
        default:
          break;
      }

      newRecipientList.push({ name: 'None', id: '' });

      setRecipientList(newRecipientList);
    }
  }, [campSheet, sheet, type, charSheet]);

  const selectRecipient = e => {
    if (!e.target.value) return setRecipientId('');
    setRecipientId(e.target.value);
  };

  const submitHandler = async e => {
    e.preventDefault();

    if (recipientId) {
      if (!senderName) return alert('Must provide a senderName');

      const recipientInfo = recipientList.find(recip => recip.id === recipientId);

      switch (type) {
        case 'player':
          dispatch(
            createSheetResourceStart(
              'characters',
              sheet._id,
              'transactions',
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
        case 'character':
          dispatch(
            createSheetResourceStart(
              'characters',
              charSheet._id,
              'transactions',
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
        case 'npc':
          dispatch(
            createSheetResourceStart(
              'campaigns',
              campSheet._id,
              'transactions',
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

    switch (type) {
      case 'player':
        dispatch(
          updateSheetStart(
            'characters',
            sheet._id,
            { wallet: sheet.wallet - +amount },
            { modal: true, notification: { status: 'success', heading: 'Money Paid', message: `You have successfully paid ${amount} monies.` } }
          )
        );
        return;
      case 'character':
        dispatch(
          updateSheetStart(
            'characters',
            charSheet._id,
            { wallet: charSheet.wallet - +amount },
            { modal: true, notification: { status: 'success', heading: 'Money Paid', message: `You have successfully paid ${amount} monies.` } }
          )
        );
        return;
      case 'npc':
        dispatch(
          updateSheetResourceStart(
            'campaigns',
            campSheet._id,
            'npcs',
            npcId,
            { wallet: sheet.wallet - +amount },
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
      <Select label="Recipient (Opt.)" name="recipientId" options={recipientList} changeHandler={selectRecipient} />
      <Input label="How much money?" name="amount" type="number" value={amount} changeHandler={setAmount} />
      {recipientId ? <TextArea label="Message (Opt.)" name="message" rows={4} value={message} changeHandler={setMessage} /> : null}
    </ModalForm>
  );
};

export default PayMoney;
