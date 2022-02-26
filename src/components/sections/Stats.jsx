import { useSelector } from 'react-redux';

import { PencilIcon } from '@heroicons/react/solid';

import { useActions } from '../../hooks/useActions';

import { selectCurrentCharacter } from '../../redux/character/character.selectors';

import ModalTypes from '../../utils/ModalTypes';

import Chip from '../Chip';

const Stats = ({ stats, power, mortality, slowed }) => {
  const { setModal } = useActions();
  const charSheet = useSelector(selectCurrentCharacter);
  return (
    <div>
      <div className="flex flex-wrap justify-between mx-2 space-y-2">
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

      <dl className="grid grid-cols-1 gap-4 mt-4 sm:grid-cols-2 md:grid-cols-4">
        {stats.map(stat => (
          <div key={stat.name} className="flex flex-col justify-between px-2 pb-2 border border-gray-200 rounded-md shadow-sm md:border-gray-50 lg:border-0 md:shadow-none">
            {/* Active Stat */}
            <div className="py-4">
              <dd className="flex flex-col justify-between mt-1 items-top md:block lg:flex">
                <div className="flex flex-col items-center text-5xl font-semibold text-gray-900 shrink-0">
                  <h5 className="flex items-center text-xl font-normal">
                    {stat.name}
                    <span title="Edit manually" onClick={() => setModal({ type: ModalTypes.editStat, id: stat.name.toLowerCase(), data: { type: 'character', resource: charSheet } })}>
                      <PencilIcon
                        className="ml-2 mr-2 shrink-0 self-center justify-self-end h-4 w-4 cursor-pointer text-base border border-gray-900 text-gray-900 p-0.5 rounded-full"
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
            <div className="flex flex-col items-center py-3 border border-gray-100 rounded-md bg-gray-50 md:border-0">
              {stat.passive ? (
                <>
                  <h4 className="text-sm uppercase">{stat.passive.name}</h4>
                  <p className="text-lg font-bold">
                    {/* Subtract Slowed from total if current passive stat is Dodge Value */}
                    {stat.passive.name === 'Dodge Value' && slowed ? (
                      <span className="relative">
                        <span className="absolute text-red-900 line-through -left-4">{stat.passive.value}</span>
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
