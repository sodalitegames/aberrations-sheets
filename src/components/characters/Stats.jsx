import { useDispatch } from 'react-redux';

import { PencilIcon } from '@heroicons/react/solid';

import { setModal } from '../../redux/app/app.actions';

import ModalTypes from '../../utils/ModalTypes';

import Chip from '../shared/Chip';

const Stats = ({ stats, power, mortality, slowed }) => {
  const dispatch = useDispatch();

  return (
    <div>
      <div className="flex justify-between mx-2">
        <h3 className="text-lg font-medium text-gray-900">Stats</h3>
        {/* Chips */}
        <div className="space-x-2">
          {/* Mortality */}
          <Chip color={mortality >= stats[0].points ? 'red' : mortality >= stats[0].points / 2 ? 'yellow' : 'green'} editable={{ type: ModalTypes.editMortality }}>
            {mortality} Mortality
          </Chip>
          {/* Power */}
          <Chip color="green">{power} Power</Chip>
        </div>
        {/* End Chips */}
      </div>

      <dl className="mt-4 grid grid-cols-1 md:grid-cols-4">
        {stats.map(stat => (
          <div key={stat.name} className="flex flex-col justify-between px-2">
            {/* Active Stat */}
            <div className="py-4">
              <dd className="mt-1 flex flex-col justify-between items-top md:block lg:flex">
                <div className="flex flex-col items-center flex-shrink-0 items-start text-5xl font-semibold text-gray-900">
                  <h5 className="font-normal text-xl flex items-center">
                    {stat.name}
                    <span title="Edit manually" onClick={() => dispatch(setModal({ type: ModalTypes.editStat, id: stat.name.toLowerCase() }))}>
                      <PencilIcon
                        className="ml-2 mr-2 flex-shrink-0 self-center justify-self-end h-4 w-4 cursor-pointer text-base border border-gray-900 text-gray-900 p-0.5 rounded-full"
                        aria-hidden="true"
                      />
                    </span>
                  </h5>
                  {stat.points + stat.modifier}
                  <span className="text-sm font-medium text-gray-500">
                    {stat.points} NAT &amp; {stat.modifier} MOD
                  </span>
                </div>

                <div className="flex flex-col mt-4 space-y-2">
                  {/* Experience */}
                  {stat.experience ? (
                    <Chip color={stat.experience >= stat.points ? 'green' : 'yellow'}>
                      {stat.experience} / {stat.points} Experience
                    </Chip>
                  ) : (
                    <Chip color="gray">No Experience</Chip>
                  )}
                  {/* Temporary Advantage */}
                  {stat.advantage ? <Chip color={stat.advantage < 0 ? 'red' : 'green'}>{stat.advantage} Advantage</Chip> : <Chip color="gray">No Advantage</Chip>}
                </div>
              </dd>
            </div>

            {/* Passive Stat */}
            <div className="bg-gray-50 flex flex-col items-center rounded-md py-3">
              {stat.passive ? (
                <>
                  <h4 className="text-sm uppercase">{stat.passive.name}</h4>
                  <p className="font-bold text-lg">
                    {/* Subtract Slowed from total if current passive stat is Dodge Value */}
                    {stat.passive.name === 'Dodge Value' ? (
                      <span className="relative">
                        <span className="absolute -left-4 line-through text-red-900">{stat.passive.value}</span>
                        {stat.passive.value - slowed}
                      </span>
                    ) : (
                      stat.passive.value
                    )}
                  </p>
                  <p className="text-xs font-medium text-gray-500 uppercase">{stat.passive.calc}</p>
                </>
              ) : (
                <h4 className="text-xs font-medium text-gray-500 uppercase">No passive stat</h4>
              )}
            </div>
          </div>
        ))}
      </dl>
    </div>
  );
};

export default Stats;
