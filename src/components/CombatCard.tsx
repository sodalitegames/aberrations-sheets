import { ShieldCheckIcon, LightningBoltIcon } from '@heroicons/react/solid';

import classNames from '../utils/classNames';
import { ResourceType, getResourceLabel } from '../utils/helpers/resources';
import { capitalize } from '../utils/helpers/strings';

import { CombatantEntity } from '../pages/sheets/campaigns/combat';

interface Props {
  combatant: CombatantEntity;
  active: boolean;
}

const CombatCard: React.FC<Props> = ({ combatant, active }) => {
  // const getPositive = () => {
  //   let status = false;

  //   if (combatant.fortitude.advantage > 0 || combatant.agility.advantage > 0 || combatant.persona.advantage > 0 || combatant.aptitude.advantage > 0) {
  //     status = true;
  //   }

  //   return status;
  // };

  // const getNegative = () => {
  //   let status = false;

  //   if (combatant.fortitude.advantage < 0 || combatant.agility.advantage < 0 || combatant.persona.advantage < 0 || combatant.aptitude.advantage < 0) {
  //     status = true;
  //   }

  //   return status;
  // };

  if (!combatant.entity) {
    return (
      <div className={classNames('col-span-1 divide-y divide-gray-200 rounded-lg shadow', active ? 'border-2 border-gray-300' : '')}>
        <div className="flex items-center justify-between w-full p-6 space-x-6">
          <div className="flex-1 truncate">
            <div className="flex items-center space-x-3">
              <h3 className="text-sm font-medium text-gray-900 truncate">
                {combatant.name} / {capitalize(getResourceLabel(ResourceType[combatant.type]))}
              </h3>
            </div>
            <p className="mt-1 text-sm text-gray-500 truncate">[DELETED]</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={classNames('col-span-1 divide-y divide-gray-200 rounded-lg shadow', active ? 'border-2 border-gray-300' : '')}>
      <div className="flex items-center justify-between w-full p-6 space-x-6">
        <div className="flex-1 truncate">
          <div className="flex items-center space-x-3">
            <h3 className="text-sm font-medium text-gray-900 truncate">
              {combatant.name} / {capitalize(getResourceLabel(ResourceType[combatant.type]))}
            </h3>
            <span className="flex-shrink-0 inline-block px-2 py-0.5 text-green-800 text-xs font-medium bg-green-100 rounded-full">
              {combatant.entity.currentHp} / {combatant.entity.maxHp} Health
            </span>
          </div>
          <p className="mt-1 text-sm text-gray-500 truncate">
            STR D{combatant.entity.strength.die} / AGL D{combatant.entity.agility.die} / PER D{combatant.entity.persona.die} / APT D{combatant.entity.aptitude.die}
          </p>
        </div>
        <div className="flex items-center justify-center">
          {/* {getNegative() ? <ChevronDoubleDownIcon className="w-5 h-5 text-red-400" aria-hidden="true" /> : null}
          {getPositive() ? <ChevronDoubleUpIcon className="w-5 h-5 text-green-400" aria-hidden="true" /> : null} */}
        </div>
      </div>
      <div>
        <div className="flex -mt-px divide-x divide-gray-200">
          <div className="flex flex-1 w-0">
            <div className="relative inline-flex items-center justify-center flex-1 w-0 py-3 -mr-px text-sm font-medium text-gray-700 border border-transparent rounded-bl-lg hover:text-gray-500">
              <ShieldCheckIcon className="w-5 h-5 text-gray-400" aria-hidden="true" />
              <span className="ml-3">SV: {combatant.entity.shieldValue}</span>
            </div>
          </div>
          <div className="flex flex-1 w-0 -ml-px">
            <div className="relative inline-flex items-center justify-center flex-1 w-0 py-3 text-sm font-medium text-gray-700 border border-transparent rounded-br-lg hover:text-gray-500">
              <LightningBoltIcon className="w-5 h-5 text-gray-400" aria-hidden="true" />
              <span className="ml-3">IN: {combatant.initiative}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CombatCard;
