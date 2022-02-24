import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { selectCurrentCharacter } from '../../../redux/character/character.selectors';
import { selectCurrentCampaign } from '../../../redux/campaign/campaign.selectors';

import { updateSheetResourceStart } from '../../../redux/sheet/sheet.actions';

import { getBelongingType, getBelongingTypeCapitalized } from '../../../utils/helpers/belongings';

import { ModalForm } from '../Modal';

import Select from '../elements/Select';
import Row from '../elements/Row';
import Detail from '../elements/Detail';
import Notice from '../../Notice';

import { DisplayTransactionDocument } from '../../display/DisplayTransaction';

const ManageTransaction = ({ id, data }) => {
  const dispatch = useDispatch();

  const charSheet = useSelector(selectCurrentCharacter);
  const campSheet = useSelector(selectCurrentCampaign);

  const [status, setStatus] = useState('');

  useEffect(() => {
    // Set the status based on the button that opened this modal
    setStatus(data.status);
  }, [data.status]);

  const selectStatus = e => {
    if (!e.target.value) return setStatus('');
    setStatus(e.target.value);
  };

  const submitHandler = async e => {
    e.preventDefault();

    const sheetId = data.sheetType === 'characters' ? charSheet._id : campSheet._id;

    dispatch(
      updateSheetResourceStart(
        data.sheetType,
        sheetId,
        'transactions',
        id,
        { status: status },
        {
          modal: true,
          notification: {
            status: status === 'Declined' || status === 'Revoked' ? 'alert' : 'success',
            heading: 'Transaction Status Updated',
            message: `You have successfully ${status.toLowerCase()} your transaction with ${data.sent ? data.transaction.recipientName : data.transaction.senderName}.`,
          },
        }
      )
    );
  };

  return (
    <ModalForm
      title={
        status === 'Accepted'
          ? 'Accept Transaction'
          : status === 'Declined'
          ? 'Are you sure you want to decline this transaction?'
          : status === 'Revoked'
          ? 'Are you sure you want to revoke this transaction?'
          : 'Manage Transaction'
      }
      submitText={
        status === 'Accepted'
          ? `${data.transaction.sellPrice ? 'Purchase' : 'Accept'} ${
              data.transaction.documentType === 'wallet' ? `${data.transaction.document.amount} Monies` : getBelongingTypeCapitalized(data.transaction.documentType)
            } ${data.transaction.sellPrice ? `for ${data.transaction.sellPrice} Monies` : ''}`
          : status === 'Declined'
          ? 'Yes, I want to decline this transaction'
          : status === 'Revoked'
          ? 'Yes, I want to revoke this transaction'
          : 'Update Transaction Status'
      }
      submitHandler={submitHandler}
      submitDisabled={!status}
    >
      {data.sent ? (
        <Select label="Update Status" name="status" value={status} options={[{ name: 'Revoke', id: 'Revoked' }]} changeHandler={selectStatus} required />
      ) : (
        <Select
          label="Update Status"
          name="status"
          value={status}
          options={[
            { name: 'Accept', id: 'Accepted' },
            { name: 'Decline', id: 'Declined' },
          ]}
          changeHandler={selectStatus}
          required
        />
      )}

      {/* Transaction Details */}
      {!data.sent ? <Detail label="Sender Name" detail={data.transaction.senderName} /> : null}
      {data.sent ? <Detail label="Recipient Name" detail={data.transaction.recipientName} /> : null}
      {data.transaction.sellPrice ? <Detail label="Amount You Will Pay" detail={data.transaction.sellPrice} /> : null}
      {data.transaction.message ? <Detail label={data.sent ? `Message to Recipient` : 'Message From Sender'} detail={data.transaction.message} /> : null}

      {/* Display Document Being Sent */}
      {data.transaction.document ? (
        <Row label={`${data.transaction.documentType === 'wallet' ? 'Amount' : getBelongingTypeCapitalized(data.transaction.documentType)} Being Offered`} name="document">
          <DisplayTransactionDocument document={data.transaction.document} documentType={data.transaction.documentType} sheetType={data.sheetType} />
        </Row>
      ) : (
        <Row label="Document Being Sent" name="document">
          <p>No document to be sent was provided</p>
        </Row>
      )}

      {data.sent && data.transaction.document.equipped ? (
        <Notice
          noIcon
          status="warn"
          message={
            data.transaction.documentType === 'wearables'
              ? `If ${data.transaction.recipientName} accepts, transferring this wearable will also unequip it from your person, and will remove any modifiers it may be adding to your stats.`
              : `If ${data.transaction.recipientName} accepts, transferring this ${getBelongingType(data.transaction.documentType)} will also unequip it from your person.`
          }
        />
      ) : null}

      {status === 'Declined' || status === 'Revoked' ? (
        <Notice noIcon status="error" message={`You will not be able to change your decision once you have ${status === 'Declined' ? 'declined' : 'revoked'} this transaction.`} />
      ) : null}
    </ModalForm>
  );
};

export default ManageTransaction;
