import { NavLink, useLocation } from 'react-router-dom';

import classNames from '../utils/classNames';

const TabsNavigation = ({ tabs }) => {
  const { search } = useLocation();

  return (
    <>
      <div>
        <div>
          <nav className="flex flex-wrap -mb-px space-x-4" aria-label="Tabs">
            {tabs.map(tab => (
              <NavLink
                key={tab.name}
                to={tab.href + search}
                className={({ isActive }) =>
                  classNames(isActive ? 'bg-gray-800 text-white' : 'text-gray-500 hover:text-gray-700 hover:bg-gray-200', 'whitespace-nowrap flex py-3 px-3 font-medium text-sm rounded-lg my-2 group')
                }
              >
                {tab.name}
                {tab.count !== undefined ? (
                  <span className={classNames(false ? 'bg-gray-900 text-white' : 'bg-gray-100 text-gray-900', 'hidden ml-3 py-0.5 px-2.5 rounded-full text-xs font-medium md:inline-block')}>
                    {tab.count}
                  </span>
                ) : null}
              </NavLink>
            ))}
          </nav>
        </div>
      </div>
    </>
  );
};

export default TabsNavigation;
