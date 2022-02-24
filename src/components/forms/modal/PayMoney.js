import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { selectCurrentCharacter } from '../../../redux/character/character.selectors';

import { updateSheetStart, createSheetResourceStart } from '../../../redux/sheet/sheet.actions';

import { ModalForm } from '../Modal';

import Input from '../elements/Input';
import Select from '../elements/Select';
import TextArea from '../elements/TextArea';

const PayMoney = () => {
  const dispatch = useDispatch();

  const charSheet = useSelector(selectCurrentCharacter);

  const [senderName, setSenderName] = useState('');
  const [recipientId, setRecipientId] = useState('');
  const [amount, setAmount] = useState(0);
  const [message, setMessage] = useState('');

  const [recipientList, setRecipientList] = useState([]);

  useEffect(() => {
    setSenderName(charSheet.characterName);

    const newRecipientList = charSheet.campaign
      ? charSheet.campaign.players.filter(player => player._id !== charSheet._id).map(player => ({ name: player.characterName, id: player._id, sheetType: 'characters' }))
      : [];

    if (charSheet.campaign) newRecipientList.push({ name: charSheet.campaign.ccNickname || charSheet.campaign.ccName, id: charSheet.campaign._id, sheetType: 'campaigns' });

    newRecipientList.push({ name: 'None', id: '' });

    setRecipientList(newRecipientList);
  }, [charSheet]);

  const selectRecipient = e => {
    if (!e.target.value) return setRecipientId('');
    setRecipientId(e.target.value);
  };

  const submitHandler = async e => {
    e.preventDefault();

    if (recipientId) {
      if (!senderName) return alert('Must provide a senderName');

      const recipientInfo = recipientList.find(recip => recip.id === recipientId);

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
    }

    dispatch(
      updateSheetStart(
        'characters',
        charSheet._id,
        { wallet: charSheet.wallet - +amount },
        { modal: true, notification: { status: 'success', heading: 'Money Paid', message: `You have successfully paid ${amount} monies.` } }
      )
    );
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
