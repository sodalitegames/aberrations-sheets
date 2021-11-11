import { ArrowSmDownIcon, ArrowSmUpIcon } from '@heroicons/react/solid';
import classNames from '../../utils/classNames';
import Button from './Button';

import Chip from './Chip';

const PassiveStatsPanel = ({ currentHp, maxHp, dodgeValue, wallet }) => {
  return (
    <div>
      <h3 className="text-lg leading-6 font-medium text-gray-900">Passive Stats</h3>
      <dl className="mt-5 grid grid-cols-1 rounded-lg bg-white overflow-hidden shadow divide-y divide-gray-200 md:grid-cols-4 md:divide-y-0 md:divide-x md:divide-y">
        {/* Health */}
        <div className="px-4 py-5 sm:p-6">
          <dd className="mt-1 flex flex-col justify-between items-top md:block lg:flex">
            <div className="flex flex-col items-center flex-shrink-0 items-start text-5xl font-semibold text-gray-900 relative">
              <h5 className="font-normal text-xl">Health</h5>
              <span className={classNames(currentHp >= maxHp / 2 ? 'text-green-600' : '', currentHp >= maxHp / 4 ? 'text-yellow-600' : 'text-red-600')}>
                {currentHp} / {maxHp}
              </span>
              <span className="ml-2 text-sm font-medium text-gray-500">FORTITUDE * 5</span>
            </div>

            <div className="mt-4">
              <Button>Take Damage</Button>
              <Button classes="mt-2">Heal Damage</Button>
            </div>
          </dd>
        </div>

        {/* Dodge Value */}
        <div className="px-4 py-5 sm:p-6">
          <dd className="mt-1 flex flex-col justify-between items-top md:block lg:flex">
            <div className="flex flex-col items-center flex-shrink-0 items-start text-5xl font-semibold text-gray-900 relative">
              <h5 className="font-normal text-xl">Dodge Value</h5>
              <span>{dodgeValue}</span>
              <span className="ml-2 text-sm font-medium text-gray-500">AGILITY / 3 (ROUNDED DOWN)</span>
            </div>
          </dd>
        </div>

        {/* Speed */}
        <div className="px-4 py-5 sm:p-6">
          <dd className="mt-1 flex flex-col justify-between items-top md:block lg:flex">
            <div className="flex flex-col items-center flex-shrink-0 items-start text-5xl font-semibold text-gray-900 relative">
              <h5 className="font-normal text-xl">Speed</h5>
              <span>5</span>
              <span className="ml-2 text-sm font-medium text-gray-500">STANDARD BASE SPEED</span>
            </div>
          </dd>
        </div>

        {/* Wallet */}
        <div className="px-4 py-5 sm:p-6">
          <dd className="mt-1 flex flex-col justify-between items-top md:block lg:flex">
            <div className="flex flex-col items-center flex-shrink-0 items-start text-5xl font-semibold text-gray-900 relative">
              <h5 className="font-normal text-xl">Wallet</h5>
              <span>{wallet}</span>
              <span className="ml-2 text-sm font-medium text-gray-500">CASH ON YOUR PERSON</span>
            </div>

            <div className="mt-4">
              <Button>Recieve Money</Button>
              <Button classes="mt-2">Pay Money</Button>
            </div>
          </dd>
        </div>
      </dl>
    </div>
  );
};

export default PassiveStatsPanel;
