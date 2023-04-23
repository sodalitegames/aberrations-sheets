import { Fragment } from 'react';

import { useActions } from '../../hooks/useActions';

import ModalTypes from '../../utils/ModalTypes';
import { getTransactionHeading } from '../../utils/helpers/messages';
import classNames from '../../utils/classNames';

import DisplayWeapon from './DisplayWeapon';
import DisplayWearable from './DisplayWearable';
import DisplayConsumable from './DisplayConsumable';
import DisplayUsable from './DisplayUsable';

import { Consumable, Transaction, TransactionDocument, TransactionDocumentType, Usable, Wallet, Weapon, Wearable } from '../../models/sheet/resources';
import { SheetType } from '../../models/sheet';

interface DisplayTransactionDocumentProps {
  sheetType: SheetType;
  document: TransactionDocument;
  documentType: TransactionDocumentType;
}

export const DisplayTransactionDocument: React.FC<DisplayTransactionDocumentProps> = ({ document, documentType, sheetType }) => {
  return (
    <>
      {documentType === 'weapons' ? (
        <DisplayWeapon weapon={document as Weapon} sheetType={sheetType} />
      ) : documentType === 'wearables' ? (
        <DisplayWearable wearable={document as Wearable} sheetType={sheetType} />
      ) : documentType === 'consumables' ? (
        <DisplayConsumable consumable={document as Consumable} sheetType={sheetType} />
      ) : documentType === 'usables' ? (
        <DisplayUsable usable={document as Usable} sheetType={sheetType} />
      ) : documentType === 'wallet' ? (
        <p className="mb-4 text-sm text-gray-900">{(document as Wallet).amount} monies</p>
      ) : (
        <p>No document type was provided</p>
      )}
    </>
  );
};

interface DisplayTransactionProps {
  transaction: Transaction;
  sheetType: SheetType;
  sent: boolean;
  resolved: boolean;
}

const DisplayTransaction: React.FC<DisplayTransactionProps> = ({ transaction, sheetType, sent, resolved }) => {
  const { setModal } = useActions();

  return (
    <div className="w-full overflow-hidden bg-white rounded-lg pointer-events-auto ring-1 ring-black ring-opacity-5">
      <div className="p-4">
        <div className="flex items-start">
          <div>
            <p className={classNames('text-sm font-medium', resolved ? 'text-gray-500' : 'text-gray-900')}>{getTransactionHeading(transaction, sent)}</p>
            {/* {transaction.message ? <p className="mt-1 text-sm text-gray-500">{transaction.message}</p> : null} */}

            {resolved ? (
              <Fragment>
                {sent ? (
                  <div className="flex mt-3 space-x-7">
                    <button
                      type="button"
                      className="text-sm font-medium text-gray-500 bg-white rounded-md hover:text-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-600"
                      onClick={() =>
                        setModal({
                          type: ModalTypes.deleteResource,
                          id: transaction._id,
                          data: {
                            sheetType: sheetType,
                            resourceType: 'transactions',
                            title: `Are you sure you want to delete this resolved transaction with ${transaction.recipientName}?`,
                            submitText: `Yes, delete resolved transaction with ${transaction.recipientName}`,
                            notification: { heading: 'Resolved Transaction Deleted', message: `You have successfully deleted your resolved transaction with ${transaction.recipientName}.` },
                          },
                        })
                      }
                    >
                      Delete
                    </button>
                  </div>
                ) : null}
              </Fragment>
            ) : (
              <Fragment>
                {sent ? (
                  <div className="flex mt-3 space-x-7">
                    <button
                      type="button"
                      className="text-sm font-medium text-gray-700 bg-white rounded-md hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
                      onClick={() => setModal({ type: ModalTypes.manageTransaction, id: transaction._id, data: { transaction, sent, sheetType, status: 'Revoked' } })}
                    >
                      Revoke
                    </button>
                    <button
                      type="button"
                      className="text-sm font-medium text-red-600 bg-white rounded-md hover:text-red-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                      onClick={() =>
                        setModal({
                          type: ModalTypes.deleteResource,
                          id: transaction._id,
                          data: {
                            sheetType: sheetType,
                            resourceType: 'transactions',
                            title: `Are you sure you want to delete this transaction with ${transaction.recipientName}?`,
                            submitText: `Yes, delete transaction with ${transaction.recipientName}`,
                            notification: { heading: 'Transaction Deleted', message: `You have successfully deleted your transaction with ${transaction.recipientName}.` },
                          },
                        })
                      }
                    >
                      Delete
                    </button>
                  </div>
                ) : (
                  <div className="flex mt-3 space-x-7">
                    <button
                      type="button"
                      className="text-sm font-medium text-green-600 bg-white rounded-md hover:text-green-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                      onClick={() => setModal({ type: ModalTypes.manageTransaction, id: transaction._id, data: { transaction, sent, sheetType, status: 'Accepted' } })}
                    >
                      Accept
                    </button>
                    <button
                      type="button"
                      className="text-sm font-medium text-gray-700 bg-white rounded-md hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
                      onClick={() => setModal({ type: ModalTypes.manageTransaction, id: transaction._id, data: { transaction, sent, sheetType, status: 'Declined' } })}
                    >
                      Decline
                    </button>
                  </div>
                )}
              </Fragment>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DisplayTransaction;
