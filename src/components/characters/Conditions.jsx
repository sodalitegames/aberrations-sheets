import { useDispatch } from 'react-redux';

import { PencilIcon } from '@heroicons/react/solid';

import { setModal } from '../../redux/app/app.actions';

import ModalTypes from '../../utils/ModalTypes';

const Conditions = ({ conditions }) => {
  const dispatch = useDispatch();

  return (
    <div className="mt-8">
      <div className="mx-2">
        <h3 className="text-lg text-center md:text-left font-medium text-gray-900">Conditions</h3>
      </div>

      <dl className="mt-4 grid grid-cols-2 md:grid-cols-4 gap-y-4">
        {/* Slowed */}
        <div className="flex flex-col justify-between mx-2 rounded-md border border-gray-100 md:border-0">
          <div className="bg-gray-50 flex flex-col items-center rounded-md py-3">
            <h4 className="text-md uppercase flex items-center" title="Reduce your movement speed and dodge value by this amount">
              Slowed
              <span title="Edit manually" onClick={() => dispatch(setModal({ type: ModalTypes.editCondition, id: 'slowed' }))}>
                <PencilIcon className="ml-2 mr-2 shrink-0 self-center justify-self-end h-4 w-4 cursor-pointer text-base border border-gray-900 text-gray-900 p-0.5 rounded-full" aria-hidden="true" />
              </span>
            </h4>
            <p className="font-bold text-lg">{conditions.slowed}</p>
          </div>
        </div>

        {/* Agony */}
        <div className="flex flex-col justify-between mx-2 rounded-md border border-gray-100 md:border-0">
          <div className="bg-gray-50 flex flex-col items-center rounded-md py-3">
            <h4 className="text-md uppercase flex items-center" title="Take this much damage at the start of each of your turns">
              Agony
              <span title="Edit manually" onClick={() => dispatch(setModal({ type: ModalTypes.editCondition, id: 'agony' }))}>
                <PencilIcon className="ml-2 mr-2 shrink-0 self-center justify-self-end h-4 w-4 cursor-pointer text-base border border-gray-900 text-gray-900 p-0.5 rounded-full" aria-hidden="true" />
              </span>
            </h4>
            <p className="font-bold text-lg">{conditions.agony}</p>
          </div>
        </div>

        {/* Injured */}
        <div className="flex flex-col justify-between mx-2 rounded-md border border-gray-100 md:border-0">
          <div className="bg-gray-50 flex flex-col items-center rounded-md py-3">
            <h4 className="text-md uppercase flex items-center" title="Take this much disadvantage on all Fortitude and Agility tests">
              Injured
              <span title="Edit manually" onClick={() => dispatch(setModal({ type: ModalTypes.editCondition, id: 'injured' }))}>
                <PencilIcon className="ml-2 mr-2 shrink-0 self-center justify-self-end h-4 w-4 cursor-pointer text-base border border-gray-900 text-gray-900 p-0.5 rounded-full" aria-hidden="true" />
              </span>
            </h4>
            <p className="font-bold text-lg">{conditions.injured}</p>
          </div>
        </div>

        {/* Disturbed */}
        <div className="flex flex-col justify-between mx-2 rounded-md border border-gray-100 md:border-0">
          <div className="bg-gray-50 flex flex-col items-center rounded-md py-3">
            <h4 className="text-md uppercase flex items-center" title="Take this much disadvantage on all Persona and Aptitude tests">
              Disturbed
              <span title="Edit manually" onClick={() => dispatch(setModal({ type: ModalTypes.editCondition, id: 'disturbed' }))}>
                <PencilIcon className="ml-2 mr-2 shrink-0 self-center justify-self-end h-4 w-4 cursor-pointer text-base border border-gray-900 text-gray-900 p-0.5 rounded-full" aria-hidden="true" />
              </span>
            </h4>
            <p className="font-bold text-lg">{conditions.disturbed}</p>
          </div>
        </div>
      </dl>
    </div>
  );
};

export default Conditions;
