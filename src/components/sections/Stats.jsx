import { useSelector } from 'react-redux';

import { PencilIcon } from '@heroicons/react/solid';

import { useActions } from '../../hooks/useActions';

import { selectCurrentCharacter } from '../../redux/character/character.selectors';

import ModalTypes from '../../utils/ModalTypes';
import SlideOverTypes from '../../utils/SlideOverTypes';

import Button from '../Button';
import Chip from '../Chip';

const Stats = ({ stats, experience }) => {
  const { setModal, setSlideOver } = useActions();
  const charSheet = useSelector(selectCurrentCharacter);
  return (
    <div>
      <div className="flex flex-wrap justify-between mx-2 space-y-2">
        <h3 className="text-lg font-medium text-gray-900">Stats</h3>
        <Chip color={experience === 0 ? 'yellow' : 'green'} editable={{ type: ModalTypes.editExperience, data: { type: 'character', entity: charSheet } }}>
          Experience: {experience}
        </Chip>
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
                  D{stat.die}
                </div>

                <div className="flex flex-col mt-4 space-y-2">
                  <Button rounded classes="justify-center" onClick={() => setModal({ type: ModalTypes.upgradeStat, id: stat.name.toLowerCase(), data: { type: 'character', resource: charSheet } })}>
                    Upgrade
                  </Button>
                  <Button dark rounded classes="justify-center" onClick={() => setSlideOver({ type: SlideOverTypes.rollDice, data: { type: 'character', rollingStat: stat.name.toLowerCase() } })}>
                    Roll
                  </Button>
                </div>
              </dd>
            </div>
          </div>
        ))}
      </dl>
    </div>
  );
};

export default Stats;
