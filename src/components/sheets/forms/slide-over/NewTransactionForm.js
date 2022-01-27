import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { selectCurrentCharacter } from '../../../../redux/character/character.selectors';
import { selectCurrentCampaign } from '../../../../redux/campaign/campaign.selectors';

import { createSheetResourceStart } from '../../../../redux/sheet/sheet.actions';

import { getBelongingType, getBelongingTypeCapitalized } from '../../../../utils/displayBelongings';

import { SlideOverForm } from '../../../../layouts/components/app/SlideOver';

import Input from '../../../shared/form/Input';
import Select from '../../../shared/form/Select';
import TextArea from '../../../shared/form/TextArea';
import Row from '../../../shared/form/Row';
import Notice from '../../../shared/Notice';

import { DisplayTransactionDocument } from '../../display/DisplayTransaction';

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

      const newRecipientList = charSheet.campaign
        ? charSheet.campaign.players.filter(player => player._id !== charSheet._id).map(player => ({ name: player.characterName, id: player._id, sheetType: 'characters' }))
        : [];

      if (charSheet.campaign) newRecipientList.push({ name: charSheet.campaign.ccNickname || charSheet.campaign.ccName, id: charSheet.campaign._id, sheetType: 'campaigns' });

      setRecipientList(newRecipientList);
    }

    if (data.sheetType === 'campaigns') {
      setSenderName(campSheet.ccNickname || campSheet.ccName);

      const newRecipientList = campSheet.players.map(player => ({ name: player.characterName, id: player._id, sheetType: 'characters' }));
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
        {
          sheetType: data.sheetType,
          senderName,
          recipientName: recipientInfo.name,
          receivingSheetId: recipientInfo.id,
          receivingSheetType: recipientInfo.sheetType,
          message,
          sellPrice,
          document: data.document,
          documentType: data.documentType,
        },
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
    <SlideOverForm title="Create a New Transaction" description="Fill out the information below to create your new transaction." submitText="Create transaction" submitHandler={submitHandler}>
      <Input slideOver label="Sender Name" name="senderName" type="text" value={senderName} changeHandler={setSenderName} required />
      <Select slideOver label="Recipient" name="recipientId" options={recipientList} changeHandler={selectRecipient} required />
      <Input slideOver label="Sell Price (Opt.)" name="sellPrice" type="number" min="0" value={sellPrice} changeHandler={setSellPrice} />
      <TextArea slideOver label="Message (Opt.)" name="message" rows={4} value={message} changeHandler={setMessage} />

      {/* Display Document Being Sent */}
      {data.document ? (
        <Row slideOver label={`${data.documentType === 'wallet' ? 'Amount' : getBelongingTypeCapitalized(data.documentType)} Being Sent`} name="document">
          <DisplayTransactionDocument document={data.document} documentType={data.documentType} sheetType={data.sheetType} />
        </Row>
      ) : (
        <Row slideOver label="Document Being Sent" name="document">
          <p>No document to be sent was provided</p>
        </Row>
      )}

      {data.document.equipped ? (
        <Notice
          noIcon
          status="warn"
          message={
            data.documentType === 'wearables'
              ? `If sent and accepted, transferring this wearable will unequip it from your person, and will remove any modifiers it may be adding to your stats.`
              : `If sent and accepted, transferring this ${getBelongingType(data.documentType)} will unequip it from your person.`
          }
        />
      ) : null}
    </SlideOverForm>
  );
};

export default NewTransactionForm;
