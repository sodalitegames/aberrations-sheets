import { Fragment } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { Dialog, Transition } from '@headlessui/react';

import { CogIcon, HomeIcon, QuestionMarkCircleIcon, UserCircleIcon, ShieldCheckIcon, UserGroupIcon, UserIcon, SupportIcon, XIcon } from '@heroicons/react/outline';

import { signOutStart } from '../../../redux/user/user.actions';

import classNames from '../../../utils/classNames';

const navigation = [
  { name: 'Home', href: '', icon: HomeIcon },
  { name: 'Characters', href: 'characters', icon: UserIcon },
  { name: 'Campaigns', href: 'campaigns', icon: UserGroupIcon },
  { name: 'About', href: 'about', icon: QuestionMarkCircleIcon },
];
const secondaryNavigation = [
  { name: 'Profile', href: 'profile', icon: UserCircleIcon },
  { name: 'Settings', href: 'settings', icon: CogIcon },
  { name: 'Help', href: 'help', icon: SupportIcon },
  { name: 'Privacy', href: 'privacy', icon: ShieldCheckIcon },
];

const Navigation = () => {
  const dispatch = useDispatch();

  const logoutHandler = () => {
    dispatch(signOutStart());
  };

  return (
    <nav className="mt-5 flex-1 flex flex-col justify-between overflow-y-auto" aria-label="Sidebar">
      <div className="divide-y divide-primary-fade">
        <div className="px-2 space-y-1">
          {navigation.map(item => (
            <NavLink
              key={item.name}
              to={item.href}
              className={({ isActive }) =>
                classNames(
                  isActive ? 'bg-primary-light text-white' : 'text-gray-200 hover:text-white hover:bg-primary-light',
                  'group flex items-center px-2 py-2 text-sm leading-6 font-medium rounded-md'
                )
              }
            >
              <item.icon className="mr-4 flex-shrink-0 h-6 w-6 text-gray-100 group-hover:text-white" aria-hidden="true" />
              {item.name}
            </NavLink>
          ))}
        </div>
        <div className="mt-6 pt-6">
          <div className="px-2 space-y-1">
            {secondaryNavigation.map(item => (
              <NavLink
                key={item.name}
                to={item.href}
                className={({ isActive }) =>
                  classNames(
                    isActive ? 'bg-primary-light text-white' : 'text-gray-200 hover:text-white hover:bg-primary-light',
                    'group flex items-center px-2 py-2 text-sm leading-6 font-medium rounded-md'
                  )
                }
              >
                <item.icon className="mr-4 h-6 w-6 text-gray-200" aria-hidden="true" />
                {item.name}
              </NavLink>
            ))}
          </div>
        </div>
      </div>
      <div className="px-4 py-4">
        <button
          className="w-full flex justify-center items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-300 hover:bg-primary-fade hover:text-white hover:border-primary"
          onClick={logoutHandler}
        >
          Logout
        </button>
      </div>
    </nav>
  );
};

const PageNavigation = ({ sidebarOpen, setSidebarOpen }) => {
  return (
    <>
      <Transition.Root show={sidebarOpen} as={Fragment}>
        <Dialog as="div" className="fixed inset-0 flex z-40 lg:hidden" onClose={setSidebarOpen}>
          <Transition.Child
            as={Fragment}
            enter="transition-opacity ease-linear duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="transition-opacity ease-linear duration-300"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Dialog.Overlay className="fixed inset-0 bg-gray-700 bg-opacity-75" />
          </Transition.Child>
          <Transition.Child
            as={Fragment}
            enter="transition ease-in-out duration-300 transform"
            enterFrom="-translate-x-full"
            enterTo="translate-x-0"
            leave="transition ease-in-out duration-300 transform"
            leaveFrom="translate-x-0"
            leaveTo="-translate-x-full"
          >
            <div className="relative flex-1 flex flex-col max-w-xs w-full pt-5 pb-4 bg-primary">
              <Transition.Child as={Fragment} enter="ease-in-out duration-300" enterFrom="opacity-0" enterTo="opacity-100" leave="ease-in-out duration-300" leaveFrom="opacity-100" leaveTo="opacity-0">
                <div className="absolute top-0 right-0 -mr-12 pt-2">
                  <button
                    type="button"
                    className="ml-1 flex items-center justify-center h-10 w-10 rounded-full focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
                    onClick={() => setSidebarOpen(false)}
                  >
                    <span className="sr-only">Close sidebar</span>
                    <XIcon className="h-6 w-6 text-white" aria-hidden="true" />
                  </button>
                </div>
              </Transition.Child>
              <div className="flex-shrink-0 flex items-center px-4">
                <Link to="/">
                  <h3 className="text-lg font-display uppercase text-white">Aberrations RPG</h3>
                </Link>
              </div>
              <Navigation />
            </div>
          </Transition.Child>
          <div className="flex-shrink-0 w-14" aria-hidden="true">
            {/* Dummy element to force sidebar to shrink to fit close icon */}
          </div>
        </Dialog>
      </Transition.Root>

      {/* Static sidebar for desktop */}
      <aside className="hidden lg:flex lg:w-64 lg:flex-col lg:fixed lg:inset-y-0">
        {/* Sidebar component, swap this element with another sidebar if you like */}
        <div className="flex flex-col flex-grow bg-primary pt-5 pb-4 overflow-y-auto">
          <div className="flex items-center flex-shrink-0 px-4">
            <Link to="/">
              <h3 className="text-lg font-display uppercase text-white">Aberrations RPG</h3>
            </Link>
          </div>
          <Navigation />
        </div>
      </aside>
    </>
  );
};

export default PageNavigation;
