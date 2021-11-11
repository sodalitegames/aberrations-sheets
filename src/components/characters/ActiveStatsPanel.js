import { ArrowSmDownIcon, ArrowSmUpIcon } from '@heroicons/react/solid';

import Chip from './Chip';

const ActiveStatsPanel = ({ stats, generalExhaustion }) => {
  return (
    <div>
      {/* <div className="flex justify-between">
        <h3 className="text-lg leading-6 font-medium text-gray-900">Active Stats</h3>
        <Chip color={generalExhaustion ? 'red' : 'green'}>{generalExhaustion} General Exhaustion</Chip>
      </div> */}
      <dl className="mt-2 grid grid-cols-1 rounded-lg bg-white overflow-hidden shadow divide-y divide-gray-200 md:grid-cols-4 md:divide-y-0 md:divide-x md:divide-y">
        {stats.map(stat => (
          <div key={stat.name} className="px-4 py-5 sm:p-6">
            {/* <dt className="text-base font-normal text-gray-900">{stat.name}</dt> */}
            <dd className="mt-1 flex flex-col justify-between items-top md:block lg:flex">
              <div className="flex flex-col items-center flex-shrink-0 items-start text-5xl font-semibold text-gray-900 relative">
                <h5 className="font-normal text-xl">{stat.name}</h5>
                {stat.exhaustion || generalExhaustion ? (
                  <span>
                    <span className="text-red-800 line-through text-3xl absolute top-8 left-9">{stat.points + stat.modifier}</span> {stat.points + stat.modifier - stat.exhaustion - generalExhaustion}
                  </span>
                ) : (
                  stat.points + stat.modifier
                )}
                <span className="ml-2 text-sm font-medium text-gray-500">
                  {stat.points} NAT &amp; {stat.modifier} MOD
                </span>
              </div>

              <div className="flex flex-col mt-4">
                {stat.experience ? (
                  <Chip color={stat.experience >= stat.points ? 'green' : 'yellow'}>
                    {stat.experience} / {stat.points} Experience
                  </Chip>
                ) : null}

                {stat.exhaustion ? (
                  <Chip color="red" classes="mt-2">
                    <ArrowSmDownIcon className="-ml-1 mr-0.5 flex-shrink-0 self-center h-5 w-5 text-red-500" aria-hidden="true" />
                    {stat.exhaustion} Exhaustion
                  </Chip>
                ) : null}
              </div>
            </dd>
          </div>
        ))}
      </dl>
    </div>
  );
};

export default ActiveStatsPanel;
