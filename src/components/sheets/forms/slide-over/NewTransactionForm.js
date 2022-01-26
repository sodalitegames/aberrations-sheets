import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { selectCurrentCharacter } from '../../../../redux/character/character.selectors';
import { selectCurrentCampaign } from '../../../../redux/campaign/campaign.selectors';

import { createSheetResourceStart } from '../../../../redux/sheet/sheet.actions';

import { SlideOverForm } from '../../../../layouts/components/app/SlideOver';

import Input from '../../../shared/form/Input';
import Select from '../../../shared/form/Select';
import TextArea from '../../../shared/form/TextArea';
import Row from '../../../shared/form/Row';

import DisplayWeapon from '../../display/DisplayWeapon';
import DisplayWearable from '../../display/DisplayWearable';
import DisplayConsumable from '../../display/DisplayConsumable';
import DisplayUsable from '../../display/DisplayUsable';
import Notice from '../../../shared/Notice';

const NewTransactionForm = ({ data }) => {
  const dispatch = useDispatch();

  const charSheet = useSelector(selectCurrentCharacter);
  const campSheet = useSelector(selectCurrentCampaign);

  const [senderName, setSenderName] = useState('');
  const [recipientId, setRecipientId] = useState('');
  const [sellPrice, setSellPrice] = useState(0);
  const [message, setMessage] = useState('');

  const [recipientList, setRecipientList] = useState([]);

  useEffect(() => {
    if (data.sheetType === 'characters') {
      setSenderName(charSheet.characterName);

      const newRecipientList = charSheet.campaign ? charSheet.campaign.players.filter(player => player._id !== charSheet._id).map(player => ({ name: player.characterName, id: player._id })) : [];

      if (charSheet.campaign) newRecipientList.push({ name: `${charSheet.campaign.ccNickname || charSheet.campaign.ccName} (CC)`, id: charSheet.campaign._id });

      setRecipientList(newRecipientList);
    }

    if (data.sheetType === 'campaigns') {
      setSenderName(campSheet.ccNickname || campSheet.ccName);

      const newRecipientList = campSheet.players.map(player => ({ name: player.characterName, id: player._id }));
      setRecipientList(newRecipientList);
    }
  }, [data.sheetType, campSheet, charSheet]);

  const selectRecipient = e => {
    if (!e.target.value) return setRecipientId('');
    setRecipientId(e.target.value);
  };

  const submitHandler = async e => {
    e.preventDefault();

    if (data.documentType === 'wearables' && data.document.equipped) return alert('You cannot offer this wearable to anybody until you have unequipped it.');

    if (!senderName) return alert('Must provide a senderName');
    if (!recipientId) return alert('Must provide a recipientId');

    // Other checks
    if (!data.documentType) return alert('Must provide a documentType');
    if (!data.document) return alert('Must provide a document');

    const sheetId = data.sheetType === 'campaigns' ? campSheet._id : charSheet._id;

    const recipientInfo = recipientList.find(recip => recip.id === recipientId);

    dispatch(
      createSheetResourceStart(
        data.sheetType,
        sheetId,
        'transactions',
        { senderName, recipientName: recipientInfo.name, receivingSheetId: recipientInfo.id, message, sellPrice, document: data.document, documentType: data.documentType },
        {
          slideOver: true,
          notification: {
            status: 'success',
            heading: 'Transaction Created',
            message: `You have successfully offered ${data.documentType === 'wallet' ? `${data.document.amount} monies` : `your ${data.document.nickname || data.document.name}`} to ${
              recipientInfo.name
            }.`,
          },
        }
      )
    );
  };

  return (
    <SlideOverForm title="Create a New Transaction" description="Fill out the information below to create your new transaction." submitText="Send transaction" submitHandler={submitHandler}>
      <Input slideOver label="Sender Name" name="senderName" type="text" value={senderName} changeHandler={setSenderName} required />
      <Select slideOver label="Recipient" name="recipientId" options={recipientList} changeHandler={selectRecipient} required />
      <Input slideOver label="Sell Price (Opt.)" name="sellPrice" type="number" min="0" value={sellPrice} changeHandler={setSellPrice} />
      <TextArea slideOver label="Message (Opt.)" name="message" rows={4} value={message} changeHandler={setMessage} />

      {/* Display Document Being Sent */}
      {data.document ? (
        <Row
          slideOver
          label={`${
            data.documentType === 'wallet'
              ? 'Amount'
              : data.documentType === 'weapons'
              ? 'Weapon'
              : data.documentType === 'wearables'
              ? 'Wearable'
              : data.documentType === 'consumables'
              ? 'Consumable'
              : data.documentType === 'usables'
              ? 'Usable'
              : 'Belonging'
          } Being Sent`}
          name="document"
        >
          {data.documentType === 'weapons' ? (
            <DisplayWeapon weapon={data.document} sheetType={data.sheetType} />
          ) : data.documentType === 'wearables' ? (
            <DisplayWearable wearable={data.document} sheetType={data.sheetType} />
          ) : data.documentType === 'consumables' ? (
            <DisplayConsumable consumable={data.document} sheetType={data.sheetType} />
          ) : data.documentType === 'usables' ? (
            <DisplayUsable usable={data.document} sheetType={data.sheetType} />
          ) : data.documentType === 'wallet' ? (
            JSON.stringify(data.document)
          ) : (
            <p>No document type was provided</p>
          )}
        </Row>
      ) : (
        <Row slideOver label="Document Being Sent" name="document">
          <p>No document to be sent was provided</p>
        </Row>
      )}
      {data.document.equipped ? (
        <Notice
          noIcon
          status="error"
          message={
            data.documentType === 'wearables'
              ? `If accepted, transferring this wearable will also unequip it, and will remove any modifiers it may be adding to your stats.`
              : `If accepted, transferring this ${
                  data.documentType === 'weapons' ? 'weapon' : data.documentType === 'consumables' ? 'consumable' : data.documentType === 'usables' ? 'usable' : 'belonging'
                } will also unequip it.`
          }
        />
      ) : null}
    </SlideOverForm>
  );
};

export default NewTransactionForm;
