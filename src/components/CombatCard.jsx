import { useDispatch, useSelector } from 'react-redux';

import { ShieldCheckIcon, LightningBoltIcon, ChevronDoubleDownIcon, ChevronDoubleUpIcon } from '@heroicons/react/solid';

import { selectCurrentCampaign } from '../redux/campaign/campaign.selectors';

import { updateSheetStart, updateSheetResourceStart } from '../redux/sheet/sheet.actions';

import classNames from '../utils/classNames';

import Button from './Button';

const CombatCard = ({ entity, active, index, inCombat }) => {
  const dispatch = useDispatch();

  const campSheet = useSelector(selectCurrentCampaign);

  const getPositive = () => {
    let status = false;

    if (entity.fortitude.advantage > 0 || entity.agility.advantage > 0 || entity.persona.advantage > 0 || entity.aptitude.advantage > 0) {
      status = true;
    }

    return status;
  };

  const getNegative = () => {
    let status = false;

    if (entity.fortitude.advantage < 0 || entity.agility.advantage < 0 || entity.persona.advantage < 0 || entity.aptitude.advantage < 0) {
      status = true;
    }

    return status;
  };

  if (!inCombat) {
    return (
      <div className="col-span-1 bg-white divide-y divide-gray-200 rounded-lg shadow">
        <div className="flex items-center justify-between w-full p-4 space-x-6">
          <div className="flex-1 truncate">
            <div className="flex items-center">
              <h3 className="text-sm font-medium text-gray-900 truncate">
                {entity.name || entity.characterName} ({entity.type})
              </h3>
            </div>
          </div>
          {entity.type === 'Player' ? (
            <Button
              rounded
              onClick={() =>
                dispatch(
                  updateSheetStart(
                    'characters',
                    entity._id,
                    { active: !entity.active },
                    {
                      notification: {
                        status: 'success',
                        heading: `${entity.type} Joined Combat`,
                        message: `You have successfully put ${entity.characterName} into combat.`,
                      },
                    }
                  )
                )
              }
            >
              Enter combat
            </Button>
          ) : (
            <Button
              rounded
              onClick={() =>
                dispatch(
                  updateSheetResourceStart(
                    'campaigns',
                    campSheet._id,
                    entity.type === 'Npc' ? 'npcs' : 'creatures',
                    entity._id,
                    { active: !entity.active },
                    {
                      notification: {
                        status: 'success',
                        heading: `${entity.type} Joined Combat`,
                        message: `You have successfully put ${entity.name || entity.characterName} into combat.`,
                      },
                    }
                  )
                )
              }
            >
              Enter combat
            </Button>
          )}
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
              {entity.name || entity.characterName} / {entity.type}
            </h3>
            <span className="flex-shrink-0 inline-block px-2 py-0.5 text-green-800 text-xs font-medium bg-green-100 rounded-full">
              {entity.currentHp} / {entity.maxHp} Health
            </span>
          </div>
          <p className="mt-1 text-sm text-gray-500 truncate">
            FOR {entity.fortitude.points + (entity.fortitude.modifier || 0)} / AGL {entity.agility.points + (entity.agility.modifier || 0)} / PER{' '}
            {entity.persona.points + (entity.persona.modifier || 0)} / APT {entity.aptitude.points + (entity.aptitude.modifier || 0)}
          </p>
        </div>
        <div className="flex items-center justify-center">
          {getNegative() ? <ChevronDoubleDownIcon className="w-5 h-5 text-red-400" aria-hidden="true" /> : null}
          {getPositive() ? <ChevronDoubleUpIcon className="w-5 h-5 text-green-400" aria-hidden="true" /> : null}
        </div>
      </div>
      <div>
        <div className="flex -mt-px divide-x divide-gray-200">
          <div className="flex flex-1 w-0">
            <div className="relative inline-flex items-center justify-center flex-1 w-0 py-3 -mr-px text-sm font-medium text-gray-700 border border-transparent rounded-bl-lg hover:text-gray-500">
              <ShieldCheckIcon className="w-5 h-5 text-gray-400" aria-hidden="true" />
              <span className="ml-3">DV: {entity.dodgeValue}</span>
            </div>
          </div>
          <div className="flex flex-1 w-0 -ml-px">
            <div className="relative inline-flex items-center justify-center flex-1 w-0 py-3 text-sm font-medium text-gray-700 border border-transparent rounded-br-lg hover:text-gray-500">
              <LightningBoltIcon className="w-5 h-5 text-gray-400" aria-hidden="true" />
              <span className="ml-3">IN: {entity.initiative}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CombatCard;
