import { Fragment } from 'react';

import { Popover, Transition, Tab } from '@headlessui/react';
import { ChatAltIcon } from '@heroicons/react/outline';

import classNames from '../../../utils/classNames';

import DisplayTransaction from '../../../components/sheets/display/DisplayTransaction';

const SheetPageTransactions = ({ transactions, type }) => {
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
        <ChatAltIcon className="h-6 w-6" aria-hidden="true" />
        {transactions.sent.length || transactions.received.length ? (
          <span className="absolute top-1 right-0 rounded-full bg-red-600/95 text-white flex justify-center items-center w-3 h-3 leading-none"></span>
        ) : null}
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
        <Popover.Panel className="absolute z-10 w-72 px-4 mt-3 transform -translate-x-1/2 left-1/2 sm:px-0 lg:max-w-3xl">
          <div className="overflow-y-scroll hide-scrollbar max-h-screen rounded-lg shadow-lg ring-1 ring-black ring-opacity-5">
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
                    <Tab.Panel className={classNames('bg-white rounded-xl p-3', 'focus:outline-none focus:ring-2 ring-offset-2 ring-white ring-opacity-60')}>
                      {transactions.received.length ? (
                        <Fragment>
                          {transactions.received.map(transaction => (
                            <DisplayTransaction key={transaction._id} transaction={transaction} condensed />
                          ))}

                          {/* Show Resolved Button */}
                          <div className="mt-4 flow-root px-2 py-2 transition duration-150 ease-in-out rounded-md hover:bg-gray-100 text-gray-400 hover:text-gray-500 focus:outline-none focus-visible:ring focus-visible:ring-orange-500 focus-visible:ring-opacity-50">
                            <span className="flex items-center justify-center">
                              <button className="text-sm font-medium cursor-pointer">Show resolved</button>
                            </span>
                          </div>
                        </Fragment>
                      ) : (
                        <div className="flow-root px-2 py-2 transition duration-150 ease-in-out rounded-md">
                          <span className="flex items-center justify-center text-sm font-medium text-gray-400">No received transactions</span>
                        </div>
                      )}
                    </Tab.Panel>

                    {/* Transactions Sent Panel */}
                    <Tab.Panel className={classNames('bg-white rounded-xl p-3', 'focus:outline-none focus:ring-2 ring-offset-2 ring-white ring-opacity-60 space-y-6')}>
                      {transactions.sent.length ? (
                        <Fragment>
                          {transactions.sent.map(transaction => (
                            <DisplayTransaction key={transaction._id} transaction={transaction} sent={true} condensed />
                          ))}

                          {/* Show Resolved Button */}
                          <div className="mt-4 flow-root px-2 py-2 transition duration-150 ease-in-out rounded-md hover:bg-gray-100 text-gray-400 hover:text-gray-500 focus:outline-none focus-visible:ring focus-visible:ring-orange-500 focus-visible:ring-opacity-50">
                            <span className="flex items-center justify-center">
                              <button className="text-sm font-medium cursor-pointer">Show resolved</button>
                            </span>
                          </div>
                        </Fragment>
                      ) : (
                        <div className="flow-root px-2 py-2 transition duration-150 ease-in-out rounded-md">
                          <span className="flex items-center justify-center text-sm font-medium text-gray-400">No sent transactions</span>
                        </div>
                      )}
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
