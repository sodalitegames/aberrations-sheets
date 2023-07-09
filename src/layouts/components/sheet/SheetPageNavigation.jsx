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
    { name: 'Combat', href: 'combat' },
    { name: 'Character', href: 'character' },
    { name: 'Belongings', href: 'belongings' },
    { name: 'Notes', href: 'notes' },
    //{ name: 'Resources', href: 'resources' },
  ],
  campaigns: [
    { name: 'Campaign', href: 'campaign' },
    { name: 'Combat', href: 'combat' },
    { name: 'Players', href: 'players' },
    { name: 'Npcs', href: 'npcs' },
    { name: 'Creatures', href: 'creatures' },
    { name: 'Belongings', href: 'belongings' },
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
    <Menu as="div" className="relative ml-4 shrink-0">
      <div>
        <Menu.Button className="flex text-sm bg-white rounded-full ring-2 ring-white ring-opacity-20 focus:outline-none focus:ring-opacity-100">
          <span className="sr-only">Open overflow menu</span>
          <span className="inline-block w-8 h-8 overflow-hidden bg-gray-100 rounded-full">
            <svg className="w-full h-full text-gray-800" fill="currentColor" viewBox="0 0 24 24">
              <path d="M24 20.993V24H0v-2.996A14.977 14.977 0 0112.004 15c4.904 0 9.26 2.354 11.996 5.993zM16.002 8.999a4 4 0 11-8 0 4 4 0 018 0z" />
            </svg>
          </span>
        </Menu.Button>
      </div>
      <Transition as={Fragment} leave="transition ease-in duration-75" leaveFrom="transform opacity-100 scale-100" leaveTo="transform opacity-0 scale-95">
        <Menu.Items className="absolute z-40 w-48 py-1 mt-2 origin-top-right bg-white rounded-md shadow-lg -right-2 ring-1 ring-black ring-opacity-5 focus:outline-none">
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
      <Popover.Button className="inline-flex items-center justify-center p-2 text-gray-200 bg-transparent rounded-md hover:text-white hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-white">
        <span className="sr-only">Open main menu</span>
        {open ? <XIcon className="block w-6 h-6" aria-hidden="true" /> : <MenuIcon className="block w-6 h-6" aria-hidden="true" />}
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
          <Popover.Overlay className="fixed inset-0 z-20 bg-black/25" />
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
          <Popover.Panel focus className="absolute inset-x-0 top-0 z-30 w-full max-w-3xl p-2 mx-auto transition origin-top transform">
            <div className="bg-white divide-y divide-gray-200 rounded-lg shadow-lg ring-1 ring-black ring-opacity-5">
              <div className="pt-3 pb-2">
                <div className="flex items-center justify-between px-4">
                  <div>
                    <Link to={`/${type}`}>
                      <h3 className="text-xl uppercase font-display">{title}</h3>
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
                      <XIcon className="w-6 h-6" aria-hidden="true" />
                    </Popover.Button>
                  </div>
                </div>
                <div className="px-2 mt-3 space-y-1">
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
                    <span className="inline-block w-8 h-8 overflow-hidden bg-gray-100 rounded-full">
                      <svg className="w-full h-full text-gray-800" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M24 20.993V24H0v-2.996A14.977 14.977 0 0112.004 15c4.904 0 9.26 2.354 11.996 5.993zM16.002 8.999a4 4 0 11-8 0 4 4 0 018 0z" />
                      </svg>
                    </span>
                  </div>
                  <div className="flex-1 min-w-0 ml-3">
                    <div className="text-base font-medium text-gray-800 truncate">{currentUser.name}</div>
                    <div className="text-sm font-medium text-gray-500 truncate">{currentUser.email}</div>
                  </div>
                  {/* <button
                    type="button"
                    className="p-1 ml-auto text-gray-400 bg-white rounded-full shrink-0 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-500"
                  >
                    <span className="sr-only">View notifications</span>
                    <BellIcon className="w-6 h-6" aria-hidden="true" />
                  </button> */}
                </div>
                <div className="px-2 mt-3 space-y-1">
                  {secondaryNavigation.map(item => (
                    <Link key={item.name} to={item.href} className="block px-3 py-2 text-base font-medium text-gray-900 rounded-md hover:bg-gray-100 hover:text-gray-800">
                      {item.name}
                    </Link>
                  ))}
                  <button className="block px-3 py-2 text-base font-medium text-gray-900 rounded-md hover:bg-gray-100 hover:text-gray-800" onClick={() => dispatch(signOutStart())}>
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
