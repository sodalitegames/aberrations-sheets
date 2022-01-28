import { Fragment } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import { Popover, Menu, Transition } from '@headlessui/react';
import { MenuIcon, XIcon } from '@heroicons/react/outline';

import { selectCurrentUser } from '../../../redux/user/user.selectors';

import { signOutStart } from '../../../redux/user/user.actions';

import classNames from '../../../utils/classNames';

const navigation = {
  characters: [
    { name: 'Gameplay', href: 'gameplay' },
    { name: 'Character', href: 'character' },
    { name: 'Inventory', href: 'inventory' },
    { name: 'Notes', href: 'notes' },
    //{ name: 'Resources', href: 'resources' },
  ],
  campaigns: [
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

export const DesktopNavigation = ({ type }) => {
  return (
    <div className="w-full py-5 mb-8 lg:border-t lg:border-white lg:border-opacity-20">
      <div className="lg:grid lg:grid-cols-3 lg:gap-8 lg:items-center">
        {/* Primary navigation */}
        <div className="hidden lg:block lg:col-span-2">
          <nav className="flex space-x-4">
            {navigation[type].map(item => (
              <NavLink
                key={item.name}
                to={item.href}
                className={({ isActive }) => classNames(isActive ? 'text-white bg-white/10' : 'text-gray-300', 'text-sm font-medium rounded-md px-3 py-2 hover:bg-white/10 hover:text-white min-w-max')}
              >
                {item.name}
              </NavLink>
            ))}
          </nav>
        </div>
      </div>
    </div>
  );
};

export const SecondaryNavigationDropdown = () => {
  const dispatch = useDispatch();

  return (
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
  );
};

export const MobileMenuButton = ({ open }) => {
  return (
    <div className="absolute right-0 shrink-0 lg:hidden">
      <Popover.Button className="bg-transparent p-2 rounded-md inline-flex items-center justify-center text-gray-200 hover:text-white hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-white">
        <span className="sr-only">Open main menu</span>
        {open ? <XIcon className="block h-6 w-6" aria-hidden="true" /> : <MenuIcon className="block h-6 w-6" aria-hidden="true" />}
      </Popover.Button>
    </div>
  );
};

export const MobileNavigation = ({ title, type }) => {
  const dispatch = useDispatch();

  const currentUser = useSelector(selectCurrentUser);

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
                    <Link to={`/${type}`}>
                      <h3 className="text-xl font-display uppercase">{title}</h3>
                    </Link>
                  </div>
                  <div className="-mr-2">
                    <Popover.Button
                      className={classNames(
                        type === 'characters' ? 'focus:ring-accent2' : '',
                        type === 'campaigns' ? 'focus:ring-accent1' : '',
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
                    <div className="text-base font-medium text-gray-800 truncate">{currentUser.name}</div>
                    <div className="text-sm font-medium text-gray-500 truncate">{currentUser.email}</div>
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
