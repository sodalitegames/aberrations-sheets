import { ArrowSmDownIcon, ArrowSmUpIcon } from '@heroicons/react/solid';
import classNames from '../../utils/classNames';
import Button from './Button';

import Chip from './Chip';

const PassiveStatsPanel = ({ currentHp, maxHp, dodgeValue, wallet }) => {
  return (
    <div>
      {/* <h3 className="text-lg leading-6 font-medium text-gray-900">Passive Stats</h3> */}
      <dl className="mt-5 rounded-lg bg-white overflow-hidden shadow divide-y divide-gray-200 md:divide-y-0 md:divide-x md:divide-y flex flex-col">
        {/* Passive stats */}
        {/* <div className="space-y-2"> */}
        {/* <div className="flex justify-between">
            <dl className="p-5">
              <dt className="text-sm font-medium text-gray-500 truncate">Health</dt>
              <dd>
                <div className="text-lg font-medium text-gray-900">15 / 15</div>
              </dd>
            </dl>

            <div className="bg-gray-50 px-5 py-3 flex flex-col justify-around">
              <button className="text-sm font-medium text-cyan-700 hover:text-cyan-900">Take Damage</button>
              <button className="text-sm font-medium text-cyan-700 hover:text-cyan-900">Heal HP</button>
            </div>
          </div> */}

        {/* <div className="flex justify-between">
            <dl className="p-5">
              <dt className="text-sm font-medium text-gray-500 truncate">Dodge Value</dt>
              <dd>
                <div className="text-lg font-medium text-gray-900">3</div>
              </dd>
            </dl>

            <div className="bg-gray-50 px-5 py-3 flex flex-col justify-around">
              <button className="text-sm font-medium text-cyan-700 hover:text-cyan-900">Adjust DV</button>
              <button className="text-sm font-medium text-cyan-700 hover:text-cyan-900">Reset DV</button>
            </div>
          </div>
        </div> */}
        {/* End passive stats */}

        {/* <div className="bg-white overflow-hidden shadow rounded-lg flex justify-between">
          <div className="p-5">
            <dl>
              <dt className="text-sm font-medium text-gray-500 truncate">Health</dt>
              <dd>
                <div className="text-lg font-medium text-gray-900">15 / 15</div>
              </dd>
            </dl>
          </div>
          <div className="bg-gray-50 px-5 py-3 flex flex-col justify-around">
            <button className="text-sm font-medium text-cyan-700 hover:text-cyan-900">Take Damage</button>
            <button className="text-sm font-medium text-cyan-700 hover:text-cyan-900">Heal Damage</button>
          </div>
        </div> */}

        {/* Health */}

        {/* Dodge Value */}
        {/* <div className="px-4 py-5 sm:p-6">
          <dd className="mt-1 flex flex-col justify-between items-top md:block lg:flex">
            <div className="flex flex-col items-center flex-shrink-0 items-start text-5xl font-semibold text-gray-900 relative">
              <h5 className="font-normal text-xl">Dodge Value</h5>
              <span>{dodgeValue}</span>
              <span className="ml-2 text-sm font-medium text-gray-500">AGILITY / 3 (ROUNDED DOWN)</span>
            </div>
          </dd>
        </div> */}
      </dl>

      <div className="flex justify-between mt-8 rounded-lg bg-white overflow-hidden shadow ">
        <dl className="p-5">
          <dt className="text-sm font-medium text-gray-500 truncate">Species Ability</dt>
          <dd>
            <div className="text-sm font-normal text-gray-900">Here is the fake speice ability that I am typin gion akfjr asdf</div>
          </dd>
        </dl>

        {/* <div className="bg-gray-50 px-5 py-3 flex-shrink-0 flex flex-col justify-around">
          <button className="text-sm font-medium text-cyan-700 hover:text-cyan-900">Use Ability</button>
        </div> */}
      </div>

      <div className="flex justify-between mt-8 rounded-lg bg-white overflow-hidden shadow ">
        <dl className="p-5">
          <dt className="text-sm font-medium text-gray-500 truncate">Wallet</dt>
          <dd>
            <div className="text-lg font-medium text-gray-900">{wallet}</div>
          </dd>
        </dl>

        <div className="bg-gray-50 px-5 py-3 flex flex-col justify-around">
          <button className="text-sm font-medium text-cyan-700 hover:text-cyan-900">Recieve Money</button>
          <button className="text-sm font-medium text-cyan-700 hover:text-cyan-900">Pay Money</button>
        </div>
      </div>

      {/* Speed */}
      {/* <div className="px-4 py-5 sm:p-6">
          <dd className="mt-1 flex flex-col justify-between items-top md:block lg:flex">
            <div className="flex flex-col items-center flex-shrink-0 items-start text-5xl font-semibold text-gray-900 relative">
              <h5 className="font-normal text-xl">Speed</h5>
              <span>5</span>
              <span className="ml-2 text-sm font-medium text-gray-500">STANDARD BASE SPEED</span>
            </div>
          </dd>
        </div> */}

      {/* Wallet */}
      {/* <div className="px-4 py-5 sm:p-6">
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
        </div> */}
    </div>
  );
};

export default PassiveStatsPanel;
