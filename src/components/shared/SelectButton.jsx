import { Fragment } from 'react';
import { Link } from 'react-router-dom';

import { Listbox, Transition } from '@headlessui/react';
import { CheckIcon, ChevronDownIcon } from '@heroicons/react/solid';

import classNames from '../../utils/classNames';

const SelectButton = ({ value, onChange, options }) => {
  return (
    <Listbox value={value} onChange={onChange}>
      {({ open }) => (
        <>
          <Listbox.Label className="sr-only">Change button status</Listbox.Label>
          <div className="relative">
            <div className="inline-flex shadow-sm rounded-md divide-x divide-gray-600">
              <div className="relative z-0 inline-flex shadow-sm rounded-md divide-x divide-gray-700">
                <div className="relative inline-flex items-center bg-gray-800 py-2 pl-3 pr-4 border border-transparent rounded-l-md shadow-sm text-white">
                  <CheckIcon className="h-5 w-5" aria-hidden="true" />
                  <p className="ml-2.5 text-sm font-medium">{value.title}</p>
                </div>
                <Listbox.Button className="relative inline-flex items-center bg-gray-800 p-2 rounded-l-none rounded-r-md text-sm font-medium text-white hover:bg-gray-700 focus:outline-none focus:z-10 focus:ring-2 focus:ring-offset-2 focus:ring-gray-800">
                  <span className="sr-only">Change button status</span>
                  <ChevronDownIcon className="h-5 w-5 text-white" aria-hidden="true" />
                </Listbox.Button>
              </div>
            </div>

            <Transition show={open} as={Fragment} leave="transition ease-in duration-100" leaveFrom="opacity-100" leaveTo="opacity-0">
              <Listbox.Options className="origin-top-right absolute z-10 right-0 mt-2 w-72 rounded-md shadow-lg overflow-hidden bg-white divide-y divide-gray-200 ring-1 ring-black ring-opacity-5 focus:outline-none">
                {options.map((option, index) => (
                  <Listbox.Option
                    key={index}
                    className={({ active }) => classNames(active ? 'text-gray-900 bg-gray-50' : 'text-gray-900', 'cursor-pointer select-none relative p-4 text-sm')}
                    value={option}
                  >
                    {({ selected, active }) => (
                      <Link to={`?show=${option.href}`}>
                        <div className="flex flex-col">
                          <div className="flex justify-between">
                            <p className={selected ? 'font-semibold' : 'font-normal'}>{option.title}</p>
                            {selected ? (
                              <span className={active ? 'text-gray-700' : 'text-gray-800'}>
                                <CheckIcon className="h-5 w-5" aria-hidden="true" />
                              </span>
                            ) : null}
                          </div>
                          <p className={classNames(active ? 'text-gray-800' : 'text-gray-500', 'mt-2')}>{option.description}</p>
                        </div>
                      </Link>
                    )}
                  </Listbox.Option>
                ))}
              </Listbox.Options>
            </Transition>
          </div>
        </>
      )}
    </Listbox>
  );
};

export default SelectButton;
