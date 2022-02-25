import { Fragment } from 'react';
import { Menu, Transition } from '@headlessui/react';
import { ChevronDownIcon } from '@heroicons/react/solid';

import classNames from '../utils/classNames';

import Button from './Button';

const Heading = ({ edit, children }) => {
  return (
    <h3 className="flex items-center justify-between mt-8 mb-4 text-lg font-semibold text-gray-800 border-b border-gray-200">
      {children}
      {edit &&
        (edit.menu ? (
          <Menu as="div" className="relative inline-block text-left">
            <div>
              <Menu.Button className="inline-flex justify-center w-full px-4 py-1 my-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-full shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-gray-900">
                {edit.text || 'Edit'}
                <ChevronDownIcon className="w-5 h-5 ml-2 -mr-1" aria-hidden="true" />
              </Menu.Button>
            </div>

            <Transition
              as={Fragment}
              enter="transition ease-out duration-100"
              enterFrom="transform opacity-0 scale-95"
              enterTo="transform opacity-100 scale-100"
              leave="transition ease-in duration-75"
              leaveFrom="transform opacity-100 scale-100"
              leaveTo="transform opacity-0 scale-95"
            >
              <Menu.Items className="absolute right-0 w-56 mt-2 origin-top-right bg-white rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                <div className="py-1">
                  {edit.menu.map((item, index) => {
                    return (
                      <Menu.Item>
                        {({ active }) => (
                          <button key={index} onClick={item.click} className={classNames(active ? 'bg-gray-100 text-gray-900' : 'text-gray-700', 'block px-4 py-2 text-sm w-full text-left')}>
                            {item.text}
                          </button>
                        )}
                      </Menu.Item>
                    );
                  })}
                </div>
              </Menu.Items>
            </Transition>
          </Menu>
        ) : (
          <div className="relative inline-block text-left">
            <Button
              onClick={edit.click}
              classes="inline-flex justify-center w-full px-4 py-1 my-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-full shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-gray-900"
            >
              {edit.text || 'Edit'}
            </Button>
          </div>
        ))}
    </h3>
  );
};

export default Heading;
