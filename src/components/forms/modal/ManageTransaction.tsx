import { useState, FormEvent } from 'react';
import { useDispatch } from 'react-redux';

import { updateSheetResourceStart } from '../../../redux/sheet/sheet.actions';

import { capitalize } from '../../../utils/helpers/strings';
import { ResourceType, getResourceLabel } from '../../../utils/helpers/resources';

import { ModalForm } from '../Modal';

import Select from '../elements/Select';
import Row from '../elements/Row';
import Detail from '../elements/Detail';
import Notice, { NoticeStatus } from '../../Notice';

import { DisplayTransactionDocument } from '../../display/DisplayTransaction';

import { Transaction, Wallet } from '../../../models/sheet/resources';
import { Belonging, SheetResourceType, SheetType } from '../../../models/sheet';

interface Props {
  data: {
    status: 'Accepted' | 'Declined' | 'Revoked';
    transaction: Transaction;
    sheetType: SheetType;
    sent: boolean;
  };
}

const ManageTransaction: React.FC<Props> = ({ data }) => {
  const dispatch = useDispatch();

  const [status, setStatus] = useState(data.status);

  const submitHandler = async (e: FormEvent) => {
    e.preventDefault();

    dispatch(
      updateSheetResourceStart(
        data.sheetType,
        data.sent ? data.transaction.sheetId : data.transaction.receivingSheetId,
        SheetResourceType.transactions,
        data.transaction._id,
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
              data.transaction.documentType === 'wallet' ? `${(data.transaction.document as Wallet).amount} Monies` : capitalize(getResourceLabel(ResourceType[data.transaction.documentType]))
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
        <Select label="Update Status" name="status" value={status} options={[{ name: 'Revoke', id: 'Revoked' }]} changeHandler={setStatus} required />
      ) : (
        <Select
          label="Update Status"
          name="status"
          value={status}
          options={[
            { name: 'Accept', id: 'Accepted' },
            { name: 'Decline', id: 'Declined' },
          ]}
          changeHandler={setStatus}
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
        <Row label={`${data.transaction.documentType === 'wallet' ? 'Amount' : capitalize(getResourceLabel(ResourceType[data.transaction.documentType]))} Being Offered`} name="document">
          <DisplayTransactionDocument document={data.transaction.document} documentType={data.transaction.documentType} sheetType={data.sheetType} />
        </Row>
      ) : (
        <Row label="Document Being Sent" name="document">
          <p>No document to be sent was provided</p>
        </Row>
      )}

      {data.sent && data.transaction.documentType !== 'wallet' && (data.transaction.document as Belonging).equipped ? (
        <Notice
          noIcon
          status={NoticeStatus.Warn}
          message={`If ${data.transaction.recipientName} accepts, transferring this ${getResourceLabel(ResourceType[data.transaction.documentType])} will also unequip it from your person.`}
        />
      ) : null}

      {status === 'Declined' || status === 'Revoked' ? (
        <Notice noIcon status={NoticeStatus.Error} message={`You will not be able to change your decision once you have ${status === 'Declined' ? 'declined' : 'revoked'} this transaction.`} />
      ) : null}
    </ModalForm>
  );
};

export default ManageTransaction;
