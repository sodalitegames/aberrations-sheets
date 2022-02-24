import { Fragment } from 'react';

import { Transition } from '@headlessui/react';
import { CheckCircleIcon } from '@heroicons/react/outline';
import { XIcon } from '@heroicons/react/solid';

import { useAppActions } from '../../../hooks/useAppActions';

import { Notification } from '../../../models/interfaces/app';

interface NotificationsProps {
  notifications: Notification[];
}

const Notifications: React.VFC<NotificationsProps> = ({ notifications }) => {
  const { dismissNotification } = useAppActions();

  return (
    <>
      {/* Global notification live region, render this permanently at the end of the document */}
      <div aria-live="assertive" className="fixed inset-0 flex items-end px-4 py-6 pointer-events-none sm:p-6 sm:items-end">
        <div className="flex flex-col items-center w-full space-y-4 sm:items-start">
          {/* Notification panel, dynamically insert this into the live region when it needs to be displayed */}
          {notifications.map((not, index) => (
            <Transition
              key={index}
              show={!not.dismissed}
              as={Fragment}
              enter="transform ease-out duration-300 transition"
              enterFrom="translate-y-2 opacity-0 sm:translate-y-0 sm:translate-x-2"
              enterTo="translate-y-0 opacity-100 sm:translate-x-0"
              leave="transition ease-in duration-100"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <div className="w-full max-w-sm overflow-hidden bg-white rounded-lg shadow-lg pointer-events-auto ring-1 ring-black ring-opacity-5">
                {!not.dismissed ? (
                  <div className="p-4">
                    <div className="flex items-start">
                      <div className="shrink-0">
                        <CheckCircleIcon className="w-6 h-6 text-green-400" aria-hidden="true" />
                      </div>
                      <div className="ml-3 w-0 flex-1 pt-0.5">
                        <p className="text-sm font-medium text-gray-900">{not.heading}</p>
                        <p className="mt-1 text-sm text-gray-500">{not.message}</p>
                      </div>
                      <div className="flex ml-4 shrink-0">
                        <button
                          className="inline-flex text-gray-400 bg-white rounded-md hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                          onClick={() => dismissNotification(not)}
                        >
                          <span className="sr-only">Close</span>
                          <XIcon className="w-5 h-5" aria-hidden="true" />
                        </button>
                      </div>
                    </div>
                  </div>
                ) : null}
              </div>
            </Transition>
          ))}
        </div>
      </div>
    </>
  );
};

export default Notifications;
