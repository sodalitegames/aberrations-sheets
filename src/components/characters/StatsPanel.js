import { ArrowSmDownIcon, ArrowSmUpIcon } from '@heroicons/react/solid';

import classNames from '../../utils/classNames';

const StatsPanel = ({ stats }) => {
  return (
    <div>
      <h3 className="text-lg leading-6 font-medium text-gray-900">Active Stats</h3>
      <dl className="mt-5 grid grid-cols-1 rounded-lg bg-white overflow-hidden shadow divide-y divide-gray-200 md:grid-cols-2 md:divide-y-0 md:divide-x md:divide-y">
        {stats.map(stat => (
          <div key={stat.name} className="px-4 py-5 sm:p-6">
            <dt className="text-base font-normal text-gray-900">{stat.name}</dt>
            <dd className="mt-1 flex justify-between items-baseline md:block lg:flex bg-blue-300">
              <div className="flex bg-gray-200 items-center flex-shrink-0 items-start text-5xl font-semibold text-gray-900">
                {stat.exhaustion ? (
                  <span>
                    <span className="text-red-800 line-through text-xl">{stat.points + stat.modifier}</span> {stat.points + stat.modifier - stat.exhaustion}
                  </span>
                ) : (
                  stat.points + stat.modifier
                )}
                <span className="ml-2 text-sm font-medium text-gray-500">
                  {stat.points} NAT + {stat.modifier} MOD
                </span>
              </div>

              <div className="flex flex-col">
                {stat.experience ? (
                  <div
                    className={classNames(
                      stat.experience >= stat.points ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800',
                      'inline-flex items-start px-2.5 py-0.5 rounded-full text-sm font-medium mt-0'
                    )}
                  >
                    {stat.experience} / {stat.points} Experience
                  </div>
                ) : null}

                {stat.exhaustion ? (
                  <div className={classNames('bg-red-100 text-red-800', 'inline-flex items-baseline px-2.5 py-0.5 rounded-full text-sm font-medium md:mt-2 lg:mt-2')}>
                    <ArrowSmDownIcon className="-ml-1 mr-0.5 flex-shrink-0 self-center h-5 w-5 text-red-500" aria-hidden="true" />
                    {stat.exhaustion} Exhaustion
                  </div>
                ) : null}
              </div>
            </dd>
          </div>
        ))}
      </dl>
    </div>
  );
};

export default StatsPanel;
