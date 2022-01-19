import { Fragment, useState } from 'react';
// import { useSelector } from 'react-redux';
import { NavLink, Outlet } from 'react-router-dom';

import { Listbox, Transition } from '@headlessui/react';
import { CheckIcon, ChevronDownIcon } from '@heroicons/react/solid';

// import { selectCurrentCampaign } from '../../redux/campaign/campaign.selectors';

import classNames from '../../utils/classNames';

import SheetPageContent from '../../layouts/components/sheet/SheetPageContent';

import PanelSection from '../../components/shared/PanelSection';

const tabs = [
  { name: 'Npcs', href: 'npcs', count: '1' },
  { name: 'Creatures', href: 'creatures', count: '2' },
  { name: 'Environments', href: 'environments', count: '12' },
  { name: 'Weapons', href: 'weapons', count: '52' },
  { name: 'Wearables', href: 'wearables', count: '6' },
  { name: 'Consumables', href: 'consumables', count: '4' },
  { name: 'Usables', href: 'usables', count: '0' },
];

const fakeSessions = [
  { title: 'Current', description: 'This job posting can be viewed by anyone who has the link.', current: true },
  { title: '10/12/22', description: 'This job posting will no longer be publicly accessible.', current: false },
  { title: '10/12/22', description: 'This job posting will no longer be publicly accessible.', current: false },
];

const CampaignInteractablesPage = () => {
  // const dispatch = useDispatch();

  // const campSheet = useSelector(selectCurrentCampaign);

  const [selected, setSelected] = useState(fakeSessions[0]);

  return (
    <div className="space-y-6">
      <SheetPageContent title="Interactables">
        {/* Tabs */}
        <PanelSection>
          <div className="flex justify-between items-center flex-wrap">
            <div className="sm:hidden">
              <label htmlFor="tabs" className="sr-only">
                Select a tab
              </label>
              {/* Use an "onChange" listener to redirect the user to the selected tab URL. */}
              <select
                id="tabs"
                name="tabs"
                className="block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
                defaultValue={tabs[0].name}
              >
                {tabs.map(tab => (
                  <option key={tab.name}>{tab.name}</option>
                ))}
              </select>
            </div>
            <div className="hidden sm:block">
              <div className="border-b border-gray-200">
                <nav className="-mb-px flex space-x-8 flex-wrap" aria-label="Tabs">
                  {tabs.map(tab => (
                    <NavLink
                      key={tab.name}
                      to={tab.href}
                      className={({ isActive }) =>
                        classNames(
                          isActive ? 'border-indigo-500 text-indigo-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-200',
                          'whitespace-nowrap flex py-4 px-1 border-b-2 font-medium text-sm'
                        )
                      }
                    >
                      {tab.name}
                      {tab.count ? (
                        <span
                          className={classNames(
                            tab.current ? 'bg-indigo-100 text-indigo-600' : 'bg-gray-100 text-gray-900',
                            'hidden ml-3 py-0.5 px-2.5 rounded-full text-xs font-medium md:inline-block'
                          )}
                        >
                          {tab.count}
                        </span>
                      ) : null}
                    </NavLink>
                  ))}
                </nav>
              </div>
            </div>

            <Listbox value={selected} onChange={setSelected}>
              {({ open }) => (
                <>
                  <Listbox.Label className="sr-only">Change published status</Listbox.Label>
                  <div className="relative">
                    <div className="inline-flex shadow-sm rounded-md divide-x divide-indigo-600">
                      <div className="relative z-0 inline-flex shadow-sm rounded-md divide-x divide-indigo-600">
                        <div className="relative inline-flex items-center bg-indigo-500 py-2 pl-3 pr-4 border border-transparent rounded-l-md shadow-sm text-white">
                          <CheckIcon className="h-5 w-5" aria-hidden="true" />
                          <p className="ml-2.5 text-sm font-medium">{selected.title}</p>
                        </div>
                        <Listbox.Button className="relative inline-flex items-center bg-indigo-500 p-2 rounded-l-none rounded-r-md text-sm font-medium text-white hover:bg-indigo-600 focus:outline-none focus:z-10 focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-50 focus:ring-indigo-500">
                          <span className="sr-only">Change published status</span>
                          <ChevronDownIcon className="h-5 w-5 text-white" aria-hidden="true" />
                        </Listbox.Button>
                      </div>
                    </div>

                    <Transition show={open} as={Fragment} leave="transition ease-in duration-100" leaveFrom="opacity-100" leaveTo="opacity-0">
                      <Listbox.Options className="origin-top-right absolute z-10 right-0 mt-2 w-72 rounded-md shadow-lg overflow-hidden bg-white divide-y divide-gray-200 ring-1 ring-black ring-opacity-5 focus:outline-none">
                        {fakeSessions.map(option => (
                          <Listbox.Option
                            key={option.title}
                            className={({ active }) => classNames(active ? 'text-white bg-indigo-500' : 'text-gray-900', 'cursor-default select-none relative p-4 text-sm')}
                            value={option}
                          >
                            {({ selected, active }) => (
                              <div className="flex flex-col">
                                <div className="flex justify-between">
                                  <p className={selected ? 'font-semibold' : 'font-normal'}>{option.title}</p>
                                  {selected ? (
                                    <span className={active ? 'text-white' : 'text-indigo-500'}>
                                      <CheckIcon className="h-5 w-5" aria-hidden="true" />
                                    </span>
                                  ) : null}
                                </div>
                                <p className={classNames(active ? 'text-indigo-200' : 'text-gray-500', 'mt-2')}>{option.description}</p>
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
          </div>
        </PanelSection>
      </SheetPageContent>

      {/* Outlet for Subpages */}
      <Outlet />
      {/* End Outlet for Subpages */}
    </div>
  );
};

export default CampaignInteractablesPage;
