import { useState } from 'react';
import { Switch, RadioGroup } from '@headlessui/react';

import classNames from '../../utils/classNames';

import PageContent from '../../layouts/components/home/PageContent';
import PagePanel from '../../layouts/components/home/PagePanel';

import Notice from '../../components/shared/Notice';

const colors = [
  { name: 'Pink', bgColor: 'bg-pink-500', selectedColor: 'ring-pink-500' },
  { name: 'Purple', bgColor: 'bg-purple-500', selectedColor: 'ring-purple-500' },
  { name: 'Blue', bgColor: 'bg-blue-500', selectedColor: 'ring-blue-500' },
  { name: 'Green', bgColor: 'bg-green-500', selectedColor: 'ring-green-500' },
  { name: 'Yellow', bgColor: 'bg-yellow-500', selectedColor: 'ring-yellow-500' },
];

const SettingsPage = () => {
  const [darkMode, setDarkMode] = useState(true);
  const [selectedColor, setSelectedColor] = useState(colors[1]);

  return (
    <PageContent heading="Settings">
      <Notice status="warn" heading="Under Construction" message="This page is under construction and does not work right now." />
      <PagePanel heading="Application" subheading="Manage application settings like dark mode and color themes.">
        <dl className="divide-y divide-gray-200">
          <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4">
            <dt className="text-sm font-medium text-gray-500">Color Theme</dt>
            <dd className="mt-1 flex text-sm text-gray-900 sm:mt-0 sm:col-span-2 justify-end">
              <RadioGroup value={selectedColor} onChange={setSelectedColor}>
                <div className="flex items-center space-x-3">
                  {colors.map(color => (
                    <RadioGroup.Option
                      key={color.name}
                      value={color}
                      className={({ active, checked }) =>
                        classNames(
                          color.selectedColor,
                          active && checked ? 'ring ring-offset-1' : '',
                          !active && checked ? 'ring-2' : '',
                          '-m-0.5 relative p-0.5 rounded-full flex items-center justify-center cursor-pointer focus:outline-none'
                        )
                      }
                    >
                      <RadioGroup.Label as="p" className="sr-only">
                        {color.name}
                      </RadioGroup.Label>
                      <span aria-hidden="true" className={classNames(color.bgColor, 'h-8 w-8 border border-black border-opacity-10 rounded-full')} />
                    </RadioGroup.Option>
                  ))}
                </div>
              </RadioGroup>
            </dd>
          </div>

          <Switch.Group as="div" className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:pt-5">
            <Switch.Label as="dt" className="text-sm font-medium text-gray-500" passive>
              Dark Mode
            </Switch.Label>
            <dd className="mt-1 flex text-sm text-gray-900 sm:mt-0 sm:col-span-2">
              <Switch
                checked={darkMode}
                onChange={setDarkMode}
                className={classNames(
                  darkMode ? 'bg-purple-600' : 'bg-gray-200',
                  'relative inline-flex flex-shrink-0 h-6 w-11 border-2 border-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 sm:ml-auto'
                )}
              >
                <span
                  aria-hidden="true"
                  className={classNames(darkMode ? 'translate-x-5' : 'translate-x-0', 'inline-block h-5 w-5 rounded-full bg-white shadow transform ring-0 transition ease-in-out duration-200')}
                />
              </Switch>
            </dd>
          </Switch.Group>
        </dl>
      </PagePanel>
    </PageContent>
  );
};

export default SettingsPage;
