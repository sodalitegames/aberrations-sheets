/* This example requires Tailwind CSS v2.0+ */
import { Fragment } from 'react';
import { Menu, Transition } from '@headlessui/react';
import { ChevronDownIcon } from '@heroicons/react/solid';

import classNames from '../utils/classNames';

const DropdownButton = ({ actions }) => {
  return (
    <span className="relative inline-flex rounded-md shadow-sm">
      <button
        type="button"
        className="relative z-10 inline-flex items-center px-4 py-2 text-sm font-medium text-gray-700 bg-red-200 border border-gray-300 rounded-l-md hover:bg-gray-50 focus:z-10 focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500"
      >
        Actions
      </button>
      <Menu as="span" className="relative block -ml-px">
        <Menu.Button className="relative z-10 inline-flex items-center px-2 py-2 text-sm font-medium text-gray-500 bg-red-200 border border-gray-300 rounded-r-md hover:bg-gray-50 focus:z-10 focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500">
          <span className="sr-only">Open options</span>
          <ChevronDownIcon className="w-5 h-5" aria-hidden="true" />
        </Menu.Button>
        <Transition
          as={Fragment}
          enter="transition ease-out duration-100"
          enterFrom="transform opacity-0 scale-95"
          enterTo="transform opacity-100 scale-100"
          leave="transition ease-in duration-75"
          leaveFrom="transform opacity-100 scale-100"
          leaveTo="transform opacity-0 scale-95"
        >
          <Menu.Items className="absolute right-0 z-50 w-56 mt-2 -mr-1 origin-top-right bg-blue-200 rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
            <div className="py-1">
              {actions.map(item => (
                <Menu.Item key={item.name}>
                  {({ active }) => (
                    <a href={item.href} className={classNames(active ? 'bg-gray-100 text-gray-900' : 'text-gray-700', 'block px-4 py-2 text-sm')}>
                      {item.name}
                    </a>
                  )}
                </Menu.Item>
              ))}
            </div>
          </Menu.Items>
        </Transition>
      </Menu>
    </span>
  );
};

export default DropdownButton;
