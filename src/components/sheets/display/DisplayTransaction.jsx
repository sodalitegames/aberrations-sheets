import { Fragment } from 'react';
import { useDispatch } from 'react-redux';

import { setModal } from '../../../redux/app/app.actions';

import ModalTypes from '../../../utils/ModalTypes';
import { getTransactionHeading } from '../../../utils/messages';
import classNames from '../../../utils/classNames';

import DisplayWeapon from './DisplayWeapon';
import DisplayWearable from './DisplayWearable';
import DisplayConsumable from './DisplayConsumable';
import DisplayUsable from './DisplayUsable';

export const DisplayTransactionDocument = ({ document, documentType, sheetType }) => {
  return (
    <>
      {documentType === 'weapons' ? (
        <DisplayWeapon weapon={document} sheetType={sheetType} />
      ) : documentType === 'wearables' ? (
        <DisplayWearable wearable={document} sheetType={sheetType} />
      ) : documentType === 'consumables' ? (
        <DisplayConsumable consumable={document} sheetType={sheetType} />
      ) : documentType === 'usables' ? (
        <DisplayUsable usable={document} sheetType={sheetType} />
      ) : documentType === 'wallet' ? (
        JSON.stringify(document)
      ) : (
        <p>No document type was provided</p>
      )}
    </>
  );
};

const DisplayTransaction = ({ transaction, sheetType, sent, resolved }) => {
  const dispatch = useDispatch();

  return (
    <div className="w-full bg-white rounded-lg pointer-events-auto ring-1 ring-black ring-opacity-5 overflow-hidden">
      <div className="p-4">
        <div className="flex items-start">
          <div>
            <p className={classNames('text-sm font-medium', resolved ? 'text-gray-500' : 'text-gray-900')}>{getTransactionHeading(transaction, sent)}</p>
            {/* {transaction.message ? <p className="mt-1 text-sm text-gray-500">{transaction.message}</p> : null} */}

            {resolved ? (
              <Fragment>
                {sent ? (
                  <div className="mt-3 flex space-x-7">
                    <button
                      type="button"
                      className="bg-white rounded-md text-sm font-medium text-gray-500 hover:text-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-600"
                      onClick={() =>
                        dispatch(
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
                        )
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
                  <div className="mt-3 flex space-x-7">
                    <button
                      type="button"
                      className="bg-white rounded-md text-sm font-medium text-gray-700 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
                      onClick={() => dispatch(setModal({ type: ModalTypes.manageTransaction, id: transaction._id, data: { transaction, sent, sheetType, status: 'Revoked' } }))}
                    >
                      Revoke
                    </button>
                    <button
                      type="button"
                      className="bg-white rounded-md text-sm font-medium text-red-600 hover:text-red-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                      onClick={() =>
                        dispatch(
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
                        )
                      }
                    >
                      Delete
                    </button>
                  </div>
                ) : (
                  <div className="mt-3 flex space-x-7">
                    <button
                      type="button"
                      className="bg-white rounded-md text-sm font-medium text-green-600 hover:text-green-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                      onClick={() => dispatch(setModal({ type: ModalTypes.manageTransaction, id: transaction._id, data: { transaction, sent, sheetType, status: 'Accepted' } }))}
                    >
                      Accept
                    </button>
                    <button
                      type="button"
                      className="bg-white rounded-md text-sm font-medium text-gray-700 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
                      onClick={() => dispatch(setModal({ type: ModalTypes.manageTransaction, id: transaction._id, data: { transaction, sent, sheetType, status: 'Declined' } }))}
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
