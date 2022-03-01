import { useSelector } from 'react-redux';

import { PencilIcon } from '@heroicons/react/solid';

import { selectCurrentCharacter } from '../../redux/character/character.selectors';

import ModalTypes from '../../utils/ModalTypes';
import { useActions } from '../../hooks/useActions';

const Conditions = ({ conditions }) => {
  const { setModal } = useActions();

  const charSheet = useSelector(selectCurrentCharacter);

  return (
    <div className="mt-8">
      <div className="mx-2">
        <h3 className="text-lg font-medium text-center text-gray-900 md:text-left">Conditions</h3>
      </div>

      <dl className="grid grid-cols-2 mt-4 md:grid-cols-4 gap-y-4">
        {/* Slowed */}
        <div className="flex flex-col justify-between mx-2 border border-gray-100 rounded-md md:border-0">
          <div className="flex flex-col items-center py-3 rounded-md bg-gray-50">
            <h4 className="flex items-center uppercase text-md" title="Reduce your movement speed and shield value by this amount">
              Slowed
              <span title="Edit manually" onClick={() => setModal({ type: ModalTypes.editCondition, id: 'slowed', data: { type: 'character', resource: charSheet } })}>
                <PencilIcon className="ml-2 mr-2 shrink-0 self-center justify-self-end h-4 w-4 cursor-pointer text-base border border-gray-900 text-gray-900 p-0.5 rounded-full" aria-hidden="true" />
              </span>
            </h4>
            <p className="text-lg font-bold">{conditions.slowed}</p>
          </div>
        </div>

        {/* Agony */}
        <div className="flex flex-col justify-between mx-2 border border-gray-100 rounded-md md:border-0">
          <div className="flex flex-col items-center py-3 rounded-md bg-gray-50">
            <h4 className="flex items-center uppercase text-md" title="Take this much damage at the start of each of your turns">
              Agony
              <span title="Edit manually" onClick={() => setModal({ type: ModalTypes.editCondition, id: 'agony', data: { type: 'character', resource: charSheet } })}>
                <PencilIcon className="ml-2 mr-2 shrink-0 self-center justify-self-end h-4 w-4 cursor-pointer text-base border border-gray-900 text-gray-900 p-0.5 rounded-full" aria-hidden="true" />
              </span>
            </h4>
            <p className="text-lg font-bold">{conditions.agony}</p>
          </div>
        </div>

        {/* Injured */}
        <div className="flex flex-col justify-between mx-2 border border-gray-100 rounded-md md:border-0">
          <div className="flex flex-col items-center py-3 rounded-md bg-gray-50">
            <h4 className="flex items-center uppercase text-md" title="Take this much disadvantage on all Fortitude and Agility tests">
              Injured
              <span title="Edit manually" onClick={() => setModal({ type: ModalTypes.editCondition, id: 'injured', data: { type: 'character', resource: charSheet } })}>
                <PencilIcon className="ml-2 mr-2 shrink-0 self-center justify-self-end h-4 w-4 cursor-pointer text-base border border-gray-900 text-gray-900 p-0.5 rounded-full" aria-hidden="true" />
              </span>
            </h4>
            <p className="text-lg font-bold">{conditions.injured}</p>
          </div>
        </div>

        {/* Disturbed */}
        <div className="flex flex-col justify-between mx-2 border border-gray-100 rounded-md md:border-0">
          <div className="flex flex-col items-center py-3 rounded-md bg-gray-50">
            <h4 className="flex items-center uppercase text-md" title="Take this much disadvantage on all Persona and Aptitude tests">
              Disturbed
              <span title="Edit manually" onClick={() => setModal({ type: ModalTypes.editCondition, id: 'disturbed', data: { type: 'character', resource: charSheet } })}>
                <PencilIcon className="ml-2 mr-2 shrink-0 self-center justify-self-end h-4 w-4 cursor-pointer text-base border border-gray-900 text-gray-900 p-0.5 rounded-full" aria-hidden="true" />
              </span>
            </h4>
            <p className="text-lg font-bold">{conditions.disturbed}</p>
          </div>
        </div>
      </dl>
    </div>
  );
};

export default Conditions;
