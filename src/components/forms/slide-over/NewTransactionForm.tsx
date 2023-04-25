import { FormEvent, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';

import { createSheetResourceStart } from '../../../redux/sheet/sheet.actions';

import { getBelongingType, getBelongingTypeCapitalized } from '../../../utils/helpers/belongings';
import { getRecipientList } from '../../../utils/functions/getRecipientList';

import { SlideOverForm } from '../SlideOver';

import Input from '../elements/Input';
import Select from '../elements/Select';
import TextArea from '../elements/TextArea';
import Row from '../elements/Row';
import Notice, { NoticeStatus } from '../../Notice';

import { DisplayTransactionDocument } from '../../display/DisplayTransaction';

import { Belonging, BelongingType, CampaignSheet, CharacterSheet, Sheet, SheetResourceType, SheetType } from '../../../models/sheet';
import { TransactionDocument, TransactionDocumentType, Wallet, Weapon } from '../../../models/sheet/resources';

interface Props {
  data: {
    sheetType: SheetType;
    sheet: Sheet;
    documentType: TransactionDocumentType;
    document: TransactionDocument;
  };
}

const NewTransactionForm: React.FC<Props> = ({ data }) => {
  const dispatch = useDispatch();

  const [senderName, setSenderName] = useState('');
  const [recipientId, setRecipientId] = useState('');
  const [sellPrice, setSellPrice] = useState(0);
  const [message, setMessage] = useState('');

  const recipientList = getRecipientList(data.sheetType, data.sheet);

  useEffect(() => {
    if (data.sheetType === 'characters') {
      setSenderName((data.sheet as CharacterSheet).characterName);
      return;
    }

    if (data.sheetType === 'campaigns') {
      const { ccNickname, ccName } = data.sheet as CampaignSheet;
      setSenderName(ccNickname || ccName);
      return;
    }
  }, [data.sheetType, data.sheet]);

  const submitHandler = async (e: FormEvent) => {
    e.preventDefault();

    if (!senderName) return alert('Must provide a senderName');
    if (!recipientId) return alert('Must provide a recipientId');

    // Other checks
    if (!data.documentType) return alert('Must provide a documentType');
    if (!data.document) return alert('Must provide a document');

    const recipientInfo = recipientList.find(recip => recip.id === recipientId);

    if (!recipientInfo) return alert('You must choose a recipient!');

    dispatch(
      createSheetResourceStart(
        data.sheetType,
        data.sheet._id,
        SheetResourceType.transactions,
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
            message: `You have successfully offered ${
              data.documentType === 'wallet' ? `${(data.document as Wallet).amount} monies` : `your ${(data.document as Weapon).nickname || (data.document as Belonging).name}`
            } to ${recipientInfo.name}.`,
          },
        }
      )
    );
  };

  return (
    <SlideOverForm title="Create a New Transaction" description="Fill out the information below to create your new transaction." submitText="Create transaction" submitHandler={submitHandler}>
      <Input slideOver label="Sender Name" name="senderName" type="text" value={senderName} changeHandler={setSenderName} required />
      <Select slideOver label="Recipient" name="recipientId" options={recipientList} value={recipientId} changeHandler={setRecipientId} required />
      <Input slideOver label="Sell Price (Opt.)" name="sellPrice" type="number" min="0" value={sellPrice} changeHandler={setSellPrice} />
      <TextArea slideOver label="Message (Opt.)" name="message" rows={4} value={message} changeHandler={setMessage} />

      {/* Display Document Being Sent */}
      {data.document ? (
        <Row slideOver label={`${data.documentType === 'wallet' ? 'Amount' : getBelongingTypeCapitalized(data.documentType as unknown as BelongingType)} Being Sent`} name="document">
          <DisplayTransactionDocument document={data.document} documentType={data.documentType} sheetType={data.sheetType} />
        </Row>
      ) : (
        <Row slideOver label="Document Being Sent" name="document">
          <p>No document to be sent was provided</p>
        </Row>
      )}

      {(data.document as Belonging).equipped ? (
        <Notice
          noIcon
          status={NoticeStatus.Warn}
          message={`If sent and accepted, transferring this ${getBelongingType(data.documentType as unknown as BelongingType)} will unequip it from your person.`}
        />
      ) : null}
    </SlideOverForm>
  );
};

export default NewTransactionForm;
