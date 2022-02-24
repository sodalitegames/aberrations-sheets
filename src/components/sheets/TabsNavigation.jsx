import { useSelector } from 'react-redux';
import { NavLink, useLocation, useSearchParams } from 'react-router-dom';

import { selectCurrentCharacter } from '../../redux/character/character.selectors';
import { selectCurrentCampaign } from '../../redux/campaign/campaign.selectors';

import classNames from '../../utils/classNames';

const TabsNavigation = ({ tabs, sheetType }) => {
  const { search } = useLocation();
  const [searchParams, setSearchParams] = useSearchParams();

  const charSheet = useSelector(selectCurrentCharacter);
  const campSheet = useSelector(selectCurrentCampaign);

  return (
    <>
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
          onChange={e => setSearchParams({ show: e.target.value })}
        >
          {tabs.map(tab => (
            <option key={tab.name} value={tab.href}>
              {tab.name}
            </option>
          ))}
        </select>
      </div>
      <div className="hidden sm:block">
        <div>
          <nav className="-mb-px flex space-x-4 flex-wrap" aria-label="Tabs">
            {tabs.map(tab => (
              <NavLink
                key={tab.name}
                to={tab.href + search}
                className={({ isActive }) =>
                  classNames(isActive ? 'bg-gray-800 text-white' : 'text-gray-500 hover:text-gray-700 hover:bg-gray-200', 'whitespace-nowrap flex py-3 px-3 font-medium text-sm rounded-lg my-2')
                }
              >
                {tab.name}
                <span className={classNames(tab.current ? 'bg-gray-800 text-white' : 'bg-gray-100 text-gray-900', 'hidden ml-3 py-0.5 px-2.5 rounded-full text-xs font-medium md:inline-block')}>
                  {sheetType === 'characters'
                    ? charSheet[tab.href]
                        .filter(el => (searchParams.get('show') === 'active' ? el.active === true : searchParams.get('show') === 'inactive' ? el.active === false : true))
                        .filter(el => (searchParams.get('show') === 'archived' ? el.archived : !el.archived)).length
                    : campSheet[tab.href]
                        .filter(el => (searchParams.get('show') === 'active' ? el.active === true : searchParams.get('show') === 'inactive' ? el.active === false : true))
                        .filter(el => (searchParams.get('show') === 'archived' ? el.archived : !el.archived)).length}
                </span>
              </NavLink>
            ))}
          </nav>
        </div>
      </div>
    </>
  );
};

export default TabsNavigation;
