import { Fragment } from 'react';

import { Listbox, Transition } from '@headlessui/react';
import { CheckIcon, ChevronDownIcon } from '@heroicons/react/solid';

import classNames from '../utils/classNames';

export type Option = {
  id: string;
  title: string;
  description: string;
};

interface Props {
  value: Option;
  options: Option[];
  onChange: (id: string) => void;
}

const SelectButton: React.FC<Props> = ({ value, onChange, options }) => {
  return (
    <Listbox value={value.id} onChange={onChange}>
      {({ open }) => (
        <>
          <Listbox.Label className="sr-only">Change button status</Listbox.Label>
          <div className="relative">
            <div className="inline-flex divide-x divide-gray-600 rounded-md shadow-sm">
              <div className="relative z-0 inline-flex divide-x divide-gray-700 rounded-md shadow-sm">
                <div className="relative inline-flex items-center py-2 pl-3 pr-4 text-white bg-gray-800 border border-transparent shadow-sm rounded-l-md">
                  <CheckIcon className="w-5 h-5" aria-hidden="true" />
                  <p className="ml-2.5 text-sm font-medium">{value.title}</p>
                </div>
                <Listbox.Button className="relative inline-flex items-center p-2 text-sm font-medium text-white bg-gray-800 rounded-l-none rounded-r-md hover:bg-gray-700 focus:outline-none focus:z-10 focus:ring-2 focus:ring-offset-2 focus:ring-gray-800">
                  <span className="sr-only">Change button status</span>
                  <ChevronDownIcon className="w-5 h-5 text-white" aria-hidden="true" />
                </Listbox.Button>
              </div>
            </div>

            <Transition show={open} as={Fragment} leave="transition ease-in duration-100" leaveFrom="opacity-100" leaveTo="opacity-0">
              <Listbox.Options className="absolute right-0 z-10 mt-2 overflow-hidden origin-top-right bg-white divide-y divide-gray-200 rounded-md shadow-lg w-72 ring-1 ring-black ring-opacity-5 focus:outline-none">
                {options.map((option, index) => (
                  <Listbox.Option
                    key={index}
                    className={({ active }) => classNames(active ? 'text-gray-900 bg-gray-50' : 'text-gray-900', 'cursor-pointer select-none relative p-4 text-sm')}
                    value={option.id}
                  >
                    {({ selected, active }) => (
                      <div className="flex flex-col">
                        <div className="flex justify-between">
                          <p className={selected ? 'font-semibold' : 'font-normal'}>{option.title}</p>
                          {selected ? (
                            <span className={active ? 'text-gray-700' : 'text-gray-800'}>
                              <CheckIcon className="w-5 h-5" aria-hidden="true" />
                            </span>
                          ) : null}
                        </div>
                        <p className={classNames(active ? 'text-gray-800' : 'text-gray-500', 'mt-2')}>{option.description}</p>
                      </div>
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
