import { Fragment } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import { selectAllNotifications } from '../../../redux/app/app.selectors';
import { selectCurrentUser } from '../../../redux/user/user.selectors';

import { dismissNotification } from '../../../redux/app/app.actions';
import { signOutStart } from '../../../redux/user/user.actions';

import { Menu, Popover, Transition, Tab } from '@headlessui/react';
import { MenuIcon, BellIcon, ChatAltIcon, XIcon, CheckCircleIcon } from '@heroicons/react/outline';

import classNames from '../../../utils/classNames';
import { getTransactionHeading } from '../../../utils/messages';

const navigation = {
  character: [
    { name: 'Gameplay', href: 'gameplay' },
    { name: 'Character', href: 'character' },
    { name: 'Inventory', href: 'inventory' },
    { name: 'Notes', href: 'notes' },
    //{ name: 'Resources', href: 'resources' },
  ],
  campaign: [
    { name: 'Gameplay', href: 'gameplay' },
    { name: 'Combat', href: 'combat' },
    { name: 'Campaign', href: 'campaign' },
    { name: 'Players', href: 'players' },
    { name: 'Interactables', href: 'interactables' },
    { name: 'Notes', href: 'notes' },
    //{ name: 'Resources', href: 'resources' },
  ],
};
const secondaryNavigation = [
  { name: 'Home', href: '/' },
  { name: 'Profile', href: '/profile' },
  { name: 'Settings', href: '/settings' },
];

const MobileNavigation = ({ title, type, user }) => {
  const dispatch = useDispatch();

  return (
    <Transition.Root as={Fragment}>
      <div className="lg:hidden">
        <Transition.Child as={Fragment} enter="duration-150 ease-out" enterFrom="opacity-0" enterTo="opacity-100" leave="duration-150 ease-in" leaveFrom="opacity-100" leaveTo="opacity-0">
          <Popover.Overlay className="z-20 fixed inset-0 bg-black/25" />
        </Transition.Child>

        <Transition.Child
          as={Fragment}
          enter="duration-150 ease-out"
          enterFrom="opacity-0 scale-95"
          enterTo="opacity-100 scale-100"
          leave="duration-150 ease-in"
          leaveFrom="opacity-100 scale-100"
          leaveTo="opacity-0 scale-95"
        >
          <Popover.Panel focus className="z-30 absolute top-0 inset-x-0 max-w-3xl mx-auto w-full p-2 transition transform origin-top">
            <div className="rounded-lg shadow-lg ring-1 ring-black ring-opacity-5 bg-white divide-y divide-gray-200">
              <div className="pt-3 pb-2">
                <div className="flex items-center justify-between px-4">
                  <div>
                    <Link to={`/${type}s`}>
                      <h3 className="text-xl font-display uppercase">{title}</h3>
                    </Link>
                  </div>
                  <div className="-mr-2">
                    <Popover.Button
                      className={classNames(
                        type === 'character' ? 'focus:ring-accent2' : '',
                        type === 'campaign' ? 'focus:ring-accent1' : '',
                        'bg-white rounded-md p-2 inline-flex items-center justify-center text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset'
                      )}
                    >
                      <span className="sr-only">Close menu</span>
                      <XIcon className="h-6 w-6" aria-hidden="true" />
                    </Popover.Button>
                  </div>
                </div>
                <div className="mt-3 px-2 space-y-1">
                  {navigation[type].map(item => (
                    <NavLink
                      key={item.name}
                      to={item.href}
                      className={({ isActive }) =>
                        classNames(isActive ? 'text-gray-800 bg-gray-50' : '', 'block rounded-md px-3 py-2 text-base text-gray-900 font-medium hover:bg-gray-100 hover:text-gray-800')
                      }
                    >
                      {item.name}
                    </NavLink>
                  ))}
                </div>
              </div>
              <div className="pt-4 pb-2">
                <div className="flex items-center px-5">
                  <div className="shrink-0">
                    <span className="inline-block h-8 w-8 rounded-full overflow-hidden bg-gray-100">
                      <svg className="h-full w-full text-gray-800" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M24 20.993V24H0v-2.996A14.977 14.977 0 0112.004 15c4.904 0 9.26 2.354 11.996 5.993zM16.002 8.999a4 4 0 11-8 0 4 4 0 018 0z" />
                      </svg>
                    </span>
                  </div>
                  <div className="ml-3 min-w-0 flex-1">
                    <div className="text-base font-medium text-gray-800 truncate">{user.name}</div>
                    <div className="text-sm font-medium text-gray-500 truncate">{user.email}</div>
                  </div>
                  {/* <button
                    type="button"
                    className="ml-auto shrink-0 bg-white p-1 text-gray-400 rounded-full hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-500"
                  >
                    <span className="sr-only">View notifications</span>
                    <BellIcon className="h-6 w-6" aria-hidden="true" />
                  </button> */}
                </div>
                <div className="mt-3 px-2 space-y-1">
                  {secondaryNavigation.map(item => (
                    <Link key={item.name} to={item.href} className="block rounded-md px-3 py-2 text-base text-gray-900 font-medium hover:bg-gray-100 hover:text-gray-800">
                      {item.name}
                    </Link>
                  ))}
                  <button className="block rounded-md px-3 py-2 text-base text-gray-900 font-medium hover:bg-gray-100 hover:text-gray-800" onClick={() => dispatch(signOutStart())}>
                    Log out
                  </button>
                </div>
              </div>
            </div>
          </Popover.Panel>
        </Transition.Child>
      </div>
    </Transition.Root>
  );
};

const Transaction = ({ transaction, sent }) => {
  return (
    <div className="w-full bg-white rounded-lg pointer-events-auto ring-1 ring-black ring-opacity-5 overflow-hidden">
      <div className="p-4">
        <div className="flex items-start">
          <div>
            <p className="text-sm font-medium text-gray-900">{getTransactionHeading(transaction, sent)}</p>
            {transaction.message ? <p className="mt-1 text-sm text-gray-500">{transaction.message}</p> : null}
            {sent ? (
              <div className="mt-3 flex space-x-7">
                <button type="button" className="bg-white rounded-md text-sm font-medium text-gray-700 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500">
                  Revoke
                </button>
                <button type="button" className="bg-white rounded-md text-sm font-medium text-red-600 hover:text-red-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500">
                  Delete
                </button>
              </div>
            ) : (
              <div className="mt-3 flex space-x-7">
                <button type="button" className="bg-white rounded-md text-sm font-medium text-green-600 hover:text-green-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500">
                  Accept
                </button>
                <button type="button" className="bg-white rounded-md text-sm font-medium text-gray-700 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500">
                  Decline
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

const RightSectionOnDesktop = ({ transactions, type }) => {
  const dispatch = useDispatch();

  const notifications = useSelector(selectAllNotifications);

  return (
    <div className="hidden lg:ml-4 lg:flex lg:items-center lg:py-5 lg:pr-0.5">
      {/* Transactions dropdown */}
      <Popover className="relative mr-1">
        <Popover.Button
          className={classNames(
            type === 'character' ? 'text-gray-200' : '',
            type === 'campaign' ? 'text-gray-200' : '',
            'relative shrink-0 p-3 rounded-full hover:text-white hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-white'
          )}
        >
          <span className="sr-only">View transactions</span>
          <ChatAltIcon className="h-6 w-6" aria-hidden="true" />
          {/* <span className="absolute top-1 right-1 rounded-full bg-red-600/95 text-white flex justify-center items-center w-3 h-3 leading-none"></span> */}
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
                      {['Sent', 'Received'].map((tab, index) => (
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
                      {/* Transactions Sent Panel */}
                      <Tab.Panel className={classNames('bg-white rounded-xl p-3', 'focus:outline-none focus:ring-2 ring-offset-2 ring-white ring-opacity-60 space-y-6')}>
                        {transactions.sent.map(transaction => (
                          <Transaction key={transaction._id} transaction={transaction} sent={true} />
                        ))}
                      </Tab.Panel>

                      {/* Transactions Received Panel */}
                      <Tab.Panel className={classNames('bg-white rounded-xl p-3', 'focus:outline-none focus:ring-2 ring-offset-2 ring-white ring-opacity-60')}>
                        {transactions.received.map(transaction => (
                          <Transaction key={transaction._id} transaction={transaction} />
                        ))}
                      </Tab.Panel>
                    </Tab.Panels>
                  </Tab.Group>
                  <div className="p-2 bg-gray-50">
                    <div className="flow-root px-2 py-2 transition duration-150 ease-in-out rounded-md hover:bg-gray-100 focus:outline-none focus-visible:ring focus-visible:ring-orange-500 focus-visible:ring-opacity-50">
                      <span className="flex items-center justify-center">
                        <button className="text-sm font-medium text-gray-600 cursor-pointer">Show resolved</button>
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Popover.Panel>
        </Transition>
      </Popover>

      {/* Notifications dropdown */}
      <Popover className="relative">
        <Popover.Button
          className={classNames(
            type === 'character' ? 'text-gray-200' : '',
            type === 'campaign' ? 'text-gray-200' : '',
            'relative shrink-0 p-3 rounded-full hover:text-white hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-white'
          )}
        >
          <span className="sr-only">View notifications</span>
          <BellIcon className="h-6 w-6" aria-hidden="true" />
          {/* <span className="absolute top-1 right-1 rounded-full bg-red-600/95 text-white flex justify-center items-center w-3 h-3 leading-none"></span> */}
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
                {notifications.map(not => (
                  <div
                    key={not._id}
                    className={classNames('flex m-2 mb-1 p-2 rounded-lg', !not.dismissed ? 'bg-gray-50 hover:bg-gray-100 cursor-pointer' : '')}
                    onClick={() => dispatch(dismissNotification(not))}
                  >
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
                  {notifications.length ? (
                    <div className="flow-root px-2 py-2 transition duration-150 ease-in-out rounded-md hover:bg-gray-100 focus:outline-none focus-visible:ring focus-visible:ring-orange-500 focus-visible:ring-opacity-50">
                      <span className="flex items-center justify-center">
                        <button className="text-sm font-medium text-gray-600 cursor-pointer">Mark all as read</button>
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

      {/* Secondary navigation dropdown */}
      <Menu as="div" className="ml-4 relative shrink-0">
        <div>
          <Menu.Button className="bg-white rounded-full flex text-sm ring-2 ring-white ring-opacity-20 focus:outline-none focus:ring-opacity-100">
            <span className="sr-only">Open overflow menu</span>
            <span className="inline-block h-8 w-8 rounded-full overflow-hidden bg-gray-100">
              <svg className="h-full w-full text-gray-800" fill="currentColor" viewBox="0 0 24 24">
                <path d="M24 20.993V24H0v-2.996A14.977 14.977 0 0112.004 15c4.904 0 9.26 2.354 11.996 5.993zM16.002 8.999a4 4 0 11-8 0 4 4 0 018 0z" />
              </svg>
            </span>
          </Menu.Button>
        </div>
        <Transition as={Fragment} leave="transition ease-in duration-75" leaveFrom="transform opacity-100 scale-100" leaveTo="transform opacity-0 scale-95">
          <Menu.Items className="origin-top-right z-40 absolute -right-2 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
            {secondaryNavigation.map(item => (
              <Menu.Item key={item.name}>
                {() => (
                  <Link to={item.href} className="block px-4 py-2 text-sm text-gray-700">
                    {item.name}
                  </Link>
                )}
              </Menu.Item>
            ))}
            <Menu.Item>
              <button className="block px-4 py-2 text-sm text-gray-700" onClick={() => dispatch(signOutStart())}>
                Log out
              </button>
            </Menu.Item>
          </Menu.Items>
        </Transition>
      </Menu>
    </div>
  );
};

const SheetPageHeader = ({ title, transactions, type }) => {
  const currentUser = useSelector(selectCurrentUser);
  return (
    <Popover
      as="header"
      className={classNames(type === 'character' ? 'bg-gradient-to-r from-accent2-deep to-accent2-dark' : '', type === 'campaign' ? 'bg-gradient-to-r from-accent1-deep to-accent1-dark' : '', 'pb-24')}
    >
      {({ open }) => (
        <>
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:max-w-7xl lg:px-8">
            <div className="relative flex flex-wrap items-center justify-center lg:justify-between pt-4 pb-8 lg:py-0">
              {/* Logo */}
              <div className="absolute left-0 py-5 shrink-0 lg:static">
                <Link to={`/${type}s`}>
                  <span className="sr-only">{title}</span>
                  <h3 className="text-xl font-display uppercase text-white">{title}</h3>
                </Link>
              </div>

              {/* Right section on desktop */}
              <RightSectionOnDesktop transactions={transactions || { received: [], sent: [] }} type={type} />

              {/* Desktop navigation */}
              <div className="w-full py-5 mb-8 lg:border-t lg:border-white lg:border-opacity-20">
                <div className="lg:grid lg:grid-cols-3 lg:gap-8 lg:items-center">
                  {/* Primary navigation */}
                  <div className="hidden lg:block lg:col-span-2">
                    <nav className="flex space-x-4">
                      {navigation[type].map(item => (
                        <NavLink
                          key={item.name}
                          to={item.href}
                          className={({ isActive }) =>
                            classNames(isActive ? 'text-white bg-white/10' : 'text-gray-300', 'text-sm font-medium rounded-md px-3 py-2 hover:bg-white/10 hover:text-white min-w-max')
                          }
                        >
                          {item.name}
                        </NavLink>
                      ))}
                    </nav>
                  </div>
                </div>
              </div>

              {/* Mobile Menu button */}
              <div className="absolute right-0 shrink-0 lg:hidden">
                <Popover.Button className="bg-transparent p-2 rounded-md inline-flex items-center justify-center text-gray-200 hover:text-white hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-white">
                  <span className="sr-only">Open main menu</span>
                  {open ? <XIcon className="block h-6 w-6" aria-hidden="true" /> : <MenuIcon className="block h-6 w-6" aria-hidden="true" />}
                </Popover.Button>
              </div>
            </div>
          </div>

          {/* Mobile navigation */}
          <MobileNavigation title={title} type={type} user={currentUser} />
        </>
      )}
    </Popover>
  );
};

export default SheetPageHeader;
