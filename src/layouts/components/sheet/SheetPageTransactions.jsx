import { Fragment, useState } from 'react';

import { Popover, Transition, Tab } from '@headlessui/react';
import { ChatAltIcon } from '@heroicons/react/outline';

import classNames from '../../../utils/classNames';

import DisplayTransaction from '../../../components/display/DisplayTransaction';

const TabPanelFooter = ({ showButton, buttonText, showMessage, messageText, buttonClick }) => {
  return showButton ? (
    <div className="flow-root px-2 py-2 mt-4 text-gray-400 transition duration-150 ease-in-out rounded-md hover:bg-gray-100 hover:text-gray-500 focus:outline-none focus-visible:ring focus-visible:ring-orange-500 focus-visible:ring-opacity-50">
      <span className="flex items-center justify-center">
        <button className="text-sm font-medium cursor-pointer" onClick={buttonClick}>
          {buttonText}
        </button>
      </span>
    </div>
  ) : showMessage ? (
    <div className="flow-root px-2 py-2 mt-4 text-gray-400 transition duration-150 ease-in-out rounded-md">
      <span className="flex items-center justify-center">
        <span className="text-sm font-medium">{messageText}</span>
      </span>
    </div>
  ) : null;
};

const TransactionsTabPanel = ({ pending, resolved, type, sent }) => {
  const [showResolved, setShowResolved] = useState(false);

  return (
    <Fragment>
      {pending.length || resolved.length ? (
        !showResolved ? (
          <Fragment>
            {/* Pending Transactions */}
            {pending.length ? (
              pending.map(transaction => <DisplayTransaction key={transaction._id} transaction={transaction} sheetType={type} sent={sent} />)
            ) : (
              <div className="flow-root px-2 py-2 transition duration-150 ease-in-out rounded-md">
                <span className="flex items-center justify-center text-sm font-medium text-gray-400">No pending transactions</span>
              </div>
            )}

            {/* Panel Footer */}
            <TabPanelFooter
              showButton={resolved.length}
              buttonText="Show resolved transactions"
              showMessage={!resolved.length}
              messageText="No resolved transactions"
              buttonClick={() => setShowResolved(true)}
            />
          </Fragment>
        ) : (
          <Fragment>
            {/* Resolved Transactions */}
            {resolved.length ? (
              resolved.map(transaction => <DisplayTransaction key={transaction._id} transaction={transaction} sheetType={type} sent={sent} resolved />)
            ) : (
              <div className="flow-root px-2 py-2 transition duration-150 ease-in-out rounded-md">
                <span className="flex items-center justify-center text-sm font-medium text-gray-400">No resolved transactions</span>
              </div>
            )}

            {/* Panel Footer */}
            <TabPanelFooter
              showButton={pending.length}
              buttonText="Show pending transactions"
              showMessage={!pending.length}
              messageText="No pending transactions"
              buttonClick={() => setShowResolved(false)}
            />
          </Fragment>
        )
      ) : (
        <div className="flow-root px-2 py-2 transition duration-150 ease-in-out rounded-md">
          <span className="flex items-center justify-center text-sm font-medium text-gray-400">No {sent ? 'sent' : 'received'} transactions</span>
        </div>
      )}
    </Fragment>
  );
};

const SheetPageTransactions = ({ pending, resolved, type }) => {
  return (
    <Popover className="relative mr-1">
      <Popover.Button
        className={classNames(
          type === 'characters' ? 'text-gray-200' : '',
          type === 'campaigns' ? 'text-gray-200' : '',
          'relative shrink-0 p-3 rounded-full hover:text-white hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-white'
        )}
      >
        <span className="sr-only">View transactions</span>
        <ChatAltIcon className="w-6 h-6" aria-hidden="true" />
        {/* Show notification if there are pending transactions the player has received, but not if there are pending transactions they have sent, because they can't do anything about those */}
        {pending.received.length ? <span className="absolute right-0 flex items-center justify-center w-3 h-3 leading-none text-white rounded-full top-1 bg-red-600/95"></span> : null}
      </Popover.Button>

      <Transition
        as={Fragment}
        enter="transition ease-out duration-200"
        enterFrom="opacity-0 translate-y-1"
        enterTo="opacity-100 translate-y-0"
        leave="transition ease-in duration-150"
        leaveFrom="opacity-100 translate-y-0"
        leaveTo="opacity-0 translate-y-1"
      >
        <Popover.Panel className="absolute z-10 px-4 mt-3 transform -translate-x-1/2 w-72 left-1/2 sm:px-0 lg:max-w-3xl">
          <div className="max-h-screen overflow-y-scroll rounded-lg shadow-lg hide-scrollbar ring-1 ring-black ring-opacity-5">
            <div className="relative flex flex-col bg-white">
              <div className="w-full max-w-md px-2 sm:px-0">
                <Tab.Group>
                  <Tab.List className="flex p-1 space-x-1 bg-gray-50">
                    {['Received', 'Sent'].map((tab, index) => (
                      <Tab
                        key={index}
                        className={({ selected }) =>
                          classNames(
                            'w-full py-2.5 text-sm leading-5 font-medium rounded-lg',
                            'focus:outline-none focus:ring-2 ring-offset-2 ring-offset-gray-900 ring-white ring-opacity-60',
                            selected ? 'bg-white shadow' : 'text-gray-500 hover:bg-white hover:text-gray-800'
                          )
                        }
                      >
                        {tab}
                      </Tab>
                    ))}
                  </Tab.List>
                  <Tab.Panels className="mt-2">
                    {/* Transactions Received Panel */}
                    <Tab.Panel className={classNames('bg-white rounded-xl p-3', 'focus:outline-none focus:ring-2 ring-offset-2 ring-white ring-opacity-60 space-y-4')}>
                      <TransactionsTabPanel pending={pending.received} resolved={resolved.received} type={type} />
                    </Tab.Panel>

                    {/* Transactions Sent Panel */}
                    <Tab.Panel className={classNames('bg-white rounded-xl p-3', 'focus:outline-none focus:ring-2 ring-offset-2 ring-white ring-opacity-60 space-y-4')}>
                      <TransactionsTabPanel pending={pending.sent} resolved={resolved.sent} type={type} sent={true} />
                    </Tab.Panel>
                  </Tab.Panels>
                </Tab.Group>
              </div>
            </div>
          </div>
        </Popover.Panel>
      </Transition>
    </Popover>
  );
};

export default SheetPageTransactions;
