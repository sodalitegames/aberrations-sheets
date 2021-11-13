import { useSetRecoilState } from 'recoil';

import { CheckIcon } from '@heroicons/react/outline';
import { ArrowSmDownIcon, ArrowSmUpIcon, PencilIcon } from '@heroicons/react/solid';

import { modalState } from '../../recoil/app/app.atoms';

import ModalTypes from '../../utils/ModalTypes';

import Chip from '../shared/Chip';

const Stats = ({ stats, power, generalExhaustion }) => {
  const setModal = useSetRecoilState(modalState);

  return (
    <div>
      <div className="flex justify-between mx-2">
        <h3 className="text-lg font-medium text-gray-900">Stats</h3>
        {/* Chips */}
        <div className="space-x-2">
          {generalExhaustion ? (
            <Chip color="red" editable={{ type: ModalTypes.editGeneralExhaustion }}>
              {generalExhaustion} General Exhaustion
            </Chip>
          ) : (
            <Chip color="green" editable={{ type: ModalTypes.editGeneralExhaustion }}>
              {generalExhaustion} General Exhaustion
            </Chip>
          )}
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
                <div className="flex flex-col items-center flex-shrink-0 items-start text-5xl font-semibold text-gray-900 relative">
                  <h5 className="font-normal text-xl flex items-center">
                    {stat.name}
                    <span title="Edit manually" onClick={() => setModal({ type: ModalTypes.editStat, id: stat.name })}>
                      <PencilIcon
                        className="ml-2 mr-2 flex-shrink-0 self-center justify-self-end h-4 w-4 cursor-pointer text-base border border-gray-900 text-gray-900 p-0.5 rounded-full"
                        aria-hidden="true"
                      />
                    </span>
                  </h5>
                  {stat.exhaustion || generalExhaustion ? (
                    <span>
                      <span className="text-red-800 line-through text-3xl absolute top-9 left-12">{stat.points + stat.modifier}</span>{' '}
                      {stat.points + stat.modifier - stat.exhaustion - generalExhaustion}
                    </span>
                  ) : (
                    stat.points + stat.modifier
                  )}
                  <span className="text-sm font-medium text-gray-500">
                    {stat.points} NAT &amp; {stat.modifier} MOD
                  </span>
                </div>

                <div className="flex flex-col mt-4 space-y-2">
                  {/* Experience */}
                  {stat.experience >= stat.points ? (
                    <Chip editable={{ type: ModalTypes.editStatsExperience, id: stat.name }} color="green">
                      <CheckIcon className="-ml-1 mr-0.5 flex-shrink-0 self-center h-5 w-5 text-green-800 invisible" aria-hidden="true" />
                      {stat.experience} / {stat.points} Experience
                    </Chip>
                  ) : (
                    <Chip editable={{ type: ModalTypes.editStatsExperience, id: stat.name }} color="yellow">
                      <ArrowSmUpIcon className="-ml-1 mr-0.5 flex-shrink-0 self-center h-5 w-5 text-yellow-800 invisible" aria-hidden="true" />
                      {stat.experience} / {stat.points} Experience
                    </Chip>
                  )}
                  {/* Exhaustion */}
                  {stat.exhaustion ? (
                    <Chip editable={{ type: ModalTypes.editStatsExhaustion, id: stat.name }} color="red">
                      <ArrowSmDownIcon className="-ml-1 mr-0.5 flex-shrink-0 self-center h-5 w-5 text-red-800 invisible" aria-hidden="true" />
                      {stat.exhaustion} Exhaustion
                    </Chip>
                  ) : (
                    <Chip editable={{ type: ModalTypes.editStatsExhaustion, id: stat.name }} color="green">
                      <CheckIcon className="-ml-1 mr-0.5 flex-shrink-0 self-center h-5 w-5 text-green-800 invisible" aria-hidden="true" />
                      {stat.exhaustion} Exhaustion
                    </Chip>
                  )}
                </div>
              </dd>
            </div>

            {/* Passive Stat */}
            <div className="bg-gray-50 flex flex-col items-center rounded-md py-3">
              {stat.passive ? (
                <>
                  <h4 className="text-sm uppercase">{stat.passive.name}</h4>
                  <p className="font-bold text-lg">{stat.passive.value}</p>
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
