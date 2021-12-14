import { Fragment } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { useSelector, useDispatch } from 'react-redux';

import { XIcon, ExclamationIcon } from '@heroicons/react/outline';

import { selectModal } from '../../../redux/app/app.selectors';

import { setModal } from '../../../redux/app/app.actions';

import classNames from '../../../utils/classNames';
import ModalTypes from '../../../utils/ModalTypes';

// Character Sheet
import DeleteCharacter from '../../../components/characters/forms/modal/DeleteCharacter';
import TakeARest from '../../../components/characters/forms/modal/TakeARest';
import TakeDamage from '../../../components/characters/forms/modal/TakeDamage';
import HealDamage from '../../../components/characters/forms/modal/HealDamage';
import RecieveMoney from '../../../components/characters/forms/modal/RecieveMoney';
import PayMoney from '../../../components/characters/forms/modal/PayMoney';
import UpgradePoints from '../../../components/characters/forms/modal/UpgradePoints';
import Mortality from '../../../components/characters/forms/modal/Mortality';
import EditStat from '../../../components/characters/forms/modal/EditStat';
import EditCondition from '../../../components/characters/forms/modal/EditCondition';
import DeleteCharResource from '../../../components/characters/forms/modal/DeleteCharResource';
import DisplayBelonging from '../../../components/characters/forms/modal/DisplayBelonging';
import AcceptInvite from '../../../components/characters/forms/modal/AcceptInvite';
import DeclineInvite from '../../../components/characters/forms/modal/DeclineInvite';
import LeaveCampaign from '../../../components/characters/forms/modal/LeaveCampaign';

// Campaign Sheet
import SendInvite from '../../../components/campaigns/forms/modal/SendInvite';
import DeleteCampResource from '../../../components/campaigns/forms/modal/DeleteCampResource';

export const ModalForm = ({ type, title, submitText, cancelText, submitHandler, children }) => {
  const dispatch = useDispatch();

  return (
    <form onSubmit={submitHandler}>
      <div>
        {/* Icon */}
        {type === 'alert' ? (
          <div className="mx-auto shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
            <ExclamationIcon className="h-6 w-6 text-red-600" aria-hidden="true" />
          </div>
        ) : null}
        <div className="mt-2 flex flex-col px-4 mr-6">
          {/* Title */}
          <Dialog.Title as="h3" className="text-lg leading-6 font-medium text-gray-900">
            {title}
          </Dialog.Title>
          {/* Form body */}
          <fieldset className="mb-4">{children}</fieldset>
        </div>
      </div>

      {/* Action buttons panel */}
      <div className="mt-5 sm:mt-4 sm:flex sm:flex-row-reverse">
        <button
          type="submit"
          className={classNames(
            type === 'alert' ? 'bg-red-700 hover:bg-red-800 focus:ring-red-500' : 'bg-dark hover:bg-dark-400 focus:ring-dark-200',
            'w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 text-base font-medium text-white focus:outline-none focus:ring-2 focus:ring-offset-2 sm:ml-3 sm:w-auto sm:text-sm'
          )}
        >
          {submitText}
        </button>
        <button
          type="button"
          className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-800 sm:mt-0 sm:w-auto sm:text-sm"
          onClick={() => dispatch(setModal(null))}
        >
          {cancelText || 'Cancel'}
        </button>
      </div>
    </form>
  );
};

export const ModalContainer = ({ title, buttonText, children }) => {
  const dispatch = useDispatch();

  return (
    <div>
      <div className="flex">
        <div className="mt-2 flex flex-col px-4 mr-6">
          {/* Title */}
          <Dialog.Title as="h3" className="text-lg leading-6 font-medium text-gray-900">
            {title}
          </Dialog.Title>
          {/* Modal body */}
          <div className="mb-4">{children}</div>
        </div>
      </div>

      {/* Action buttons panel */}
      <div className="mt-5 sm:mt-4 sm:flex sm:flex-row-reverse">
        <button
          type="button"
          className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-800 sm:mt-0 sm:w-auto sm:text-sm"
          onClick={() => dispatch(setModal(null))}
        >
          {buttonText || 'Done'}
        </button>
      </div>
    </div>
  );
};

const Modal = () => {
  const dispatch = useDispatch();
  const modal = useSelector(selectModal);

  return (
    <Transition.Root show={!!modal} as={Fragment}>
      <Dialog as="div" className="fixed z-10 inset-0 overflow-y-auto" onClose={() => dispatch(setModal(null))}>
        <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
          <Transition.Child as={Fragment} enter="ease-out duration-300" enterFrom="opacity-0" enterTo="opacity-100" leave="ease-in duration-200" leaveFrom="opacity-100" leaveTo="opacity-0">
            <Dialog.Overlay className="fixed inset-0 bg-gray-500/75 transition-opacity" />
          </Transition.Child>
          {/* This element is to trick the browser into centering the modal contents. */}
          <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">
            &#8203;
          </span>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            enterTo="opacity-100 translate-y-0 sm:scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 translate-y-0 sm:scale-100"
            leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
          >
            <div className="inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full sm:p-6">
              {/* Close button */}
              <div className="hidden sm:block absolute top-0 right-0 pt-4 pr-4">
                <button
                  type="button"
                  className="bg-white rounded-md text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-dark"
                  onClick={() => dispatch(setModal(null))}
                >
                  <span className="sr-only">Close</span>
                  <XIcon className="h-6 w-6" aria-hidden="true" />
                </button>
              </div>
              {/* Forms */}
              {/* Character Sheet */}
              {modal && modal.type === ModalTypes.deleteCharacter ? <DeleteCharacter /> : null}
              {modal && modal.type === ModalTypes.takeARest ? <TakeARest /> : null}
              {modal && modal.type === ModalTypes.displayBelonging ? <DisplayBelonging id={modal.id} data={modal.data} /> : null}
              {modal && modal.type === ModalTypes.takeDamage ? <TakeDamage /> : null}
              {modal && modal.type === ModalTypes.healDamage ? <HealDamage /> : null}
              {modal && modal.type === ModalTypes.recieveMoney ? <RecieveMoney /> : null}
              {modal && modal.type === ModalTypes.payMoney ? <PayMoney /> : null}
              {modal && modal.type === ModalTypes.editUpgradePoints ? <UpgradePoints /> : null}
              {modal && modal.type === ModalTypes.editMortality ? <Mortality /> : null}
              {modal && modal.type === ModalTypes.editStat ? <EditStat id={modal.id} /> : null}
              {modal && modal.type === ModalTypes.editCondition ? <EditCondition id={modal.id} /> : null}
              {modal && modal.type === ModalTypes.deleteCharResource ? <DeleteCharResource id={modal.id} data={modal.data} /> : null}
              {modal && modal.type === ModalTypes.acceptInvite ? <AcceptInvite id={modal.id} /> : null}
              {modal && modal.type === ModalTypes.declineInvite ? <DeclineInvite id={modal.id} /> : null}
              {modal && modal.type === ModalTypes.leaveCampaign ? <LeaveCampaign /> : null}
              {/* Campaign Sheet */}
              {modal && modal.type === ModalTypes.sendInvite ? <SendInvite /> : null}
              {modal && modal.type === ModalTypes.deleteCampResource ? <DeleteCampResource id={modal.id} data={modal.data} /> : null}
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition.Root>
  );
};

export default Modal;
