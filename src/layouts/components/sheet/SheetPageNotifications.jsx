import { Fragment } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { Popover, Transition } from '@headlessui/react';
import { BellIcon, CheckCircleIcon } from '@heroicons/react/outline';

import { selectAllNotifications, selectNotifications } from '../../../redux/app/app.selectors';

import { useActions } from '../../../hooks/useActions';

import classNames from '../../../utils/classNames';

const SheetPageNotifications = ({ type }) => {
  const dispatch = useDispatch();
  const { dismissNotification, clearAllNotifications } = useActions();

  const allNotifications = useSelector(selectAllNotifications);
  const unreadNotifications = useSelector(selectNotifications);

  return (
    <Popover className="relative">
      <Popover.Button
        className={classNames(
          type === 'characters' ? 'text-gray-200' : '',
          type === 'campaigns' ? 'text-gray-200' : '',
          'relative shrink-0 p-3 rounded-full hover:text-white hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-white'
        )}
      >
        <span className="sr-only">View notifications</span>
        <BellIcon className="w-6 h-6" aria-hidden="true" />
        {unreadNotifications.length ? <span className="absolute flex items-center justify-center w-3 h-3 leading-none text-white rounded-full top-1 right-1 bg-red-600/95"></span> : null}
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
              {allNotifications.map(not => (
                <div key={not._id} className={classNames('flex m-2 mb-1 p-2 rounded-lg', !not.dismissed ? 'bg-gray-50 hover:bg-gray-100 cursor-pointer' : '')} onClick={() => dismissNotification(not)}>
                  <div className="shrink-0">
                    <CheckCircleIcon className={classNames('h-6 w-6', not.dismissed ? 'text-gray-400' : 'text-green-400')} aria-hidden="true" />
                  </div>
                  <div className="ml-3 flex-1 pt-0.5">
                    <p className={classNames('text-sm font-medium', not.dismissed ? 'text-gray-400' : 'text-gray-900')}>{not.heading}</p>
                    <p className={classNames('mt-1 text-sm', not.dismissed ? 'text-gray-400' : 'text-gray-500')}>{not.message}</p>
                  </div>
                </div>
              ))}
              <div className="p-2 bg-gray-50">
                {allNotifications.length ? (
                  <div className="flow-root px-2 py-2 transition duration-150 ease-in-out rounded-md hover:bg-gray-100 focus:outline-none focus-visible:ring focus-visible:ring-orange-500 focus-visible:ring-opacity-50">
                    <span className="flex items-center justify-center">
                      <button className="text-sm font-medium text-gray-600 cursor-pointer" onClick={() => clearAllNotifications()}>
                        Clear all notifications
                      </button>
                    </span>
                  </div>
                ) : (
                  <div className="flow-root px-2 py-2 transition duration-150 ease-in-out rounded-md">
                    <span className="flex items-center justify-center text-sm font-medium text-gray-400">No notifications</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </Popover.Panel>
      </Transition>
    </Popover>
  );
};

export default SheetPageNotifications;
