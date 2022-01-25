import { Fragment } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { useSelector, useDispatch } from 'react-redux';

import { XIcon, ExclamationIcon } from '@heroicons/react/outline';

import { selectModal, selectNestedModal } from '../../../redux/app/app.selectors';
import { selectResourceError } from '../../../redux/resource/resource.selectors';
import { selectCharacterError } from '../../../redux/character/character.selectors';
import { selectCampaignError } from '../../../redux/campaign/campaign.selectors';

import { setModal, setNestedModal } from '../../../redux/app/app.actions';

import classNames from '../../../utils/classNames';
import ModalTypes from '../../../utils/ModalTypes';
import { formatValidationErrors } from '../../../utils/validationErrors';

import Notice from '../../../components/shared/Notice';

// Character Sheet
import TakeARest from '../../../components/characters/forms/modal/TakeARest';
import TakeDamage from '../../../components/characters/forms/modal/TakeDamage';
import HealDamage from '../../../components/characters/forms/modal/HealDamage';
import ReceiveMoney from '../../../components/characters/forms/modal/ReceiveMoney';
import PayMoney from '../../../components/characters/forms/modal/PayMoney';
import UpgradePoints from '../../../components/characters/forms/modal/UpgradePoints';
import Mortality from '../../../components/characters/forms/modal/Mortality';
import EditStat from '../../../components/characters/forms/modal/EditStat';
import EditCondition from '../../../components/characters/forms/modal/EditCondition';
import ErrorEquippingBelonging from '../../../components/characters/forms/modal/ErrorEquippingBelonging';

// Campaign Sheet
import SendInvite from '../../../components/campaigns/forms/modal/SendInvite';
import AssignBelonging from '../../../components/campaigns/forms/modal/AssignBelonging';

// Shared
import DeleteSheet from '../../../components/sheets/forms/modal/DeleteSheet';
import ShowBelonging from '../../../components/sheets/forms/modal/ShowBelonging';
import DeleteResource from '../../../components/sheets/forms/modal/DeleteResource';
import UpdateInviteStatus from '../../../components/sheets/forms/modal/UpdateInviteStatus';
import UpdateTransactionStatus from '../../../components/sheets/forms/modal/UpdateTransactionStatus';
import RemoveCharacterFromCampaign from '../../../components/sheets/forms/modal/RemoveCharacterFromCampaign';

export const ModalForm = ({ type, title, submitText, cancelText, submitHandler, submitDisabled, children, nested }) => {
  const dispatch = useDispatch();

  const characterError = useSelector(selectCharacterError);
  const campaignError = useSelector(selectCampaignError);
  const resourceError = useSelector(selectResourceError);

  return (
    <form onSubmit={submitHandler}>
      <div>
        {/* Icon */}
        {type === 'alert' ? (
          <div className="mx-4 shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-red-100 sm:h-10 sm:w-10">
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

      {characterError ? <Notice status={characterError.status} heading={characterError.err._message} message={formatValidationErrors(characterError.err.errors)} /> : null}
      {campaignError ? <Notice status={campaignError.status} heading={campaignError.err._message} message={formatValidationErrors(campaignError.err.errors)} /> : null}
      {resourceError ? <Notice status="error" heading={resourceError.statusText} message="An error occured fetching additional resource data. Please try again later." /> : null}

      {/* Action buttons panel */}
      <div className="mt-5 sm:mt-4 sm:flex sm:flex-row-reverse">
        <button
          type="submit"
          className={classNames(
            submitDisabled ? 'bg-gray-200 text-gray-400 cursor-default' : type === 'alert' ? 'bg-red-700 hover:bg-red-800 focus:ring-red-500' : 'bg-dark hover:bg-dark-400 focus:ring-dark-200',
            'w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 text-base font-medium text-white focus:outline-none focus:ring-2 focus:ring-offset-2 sm:ml-3 sm:w-auto sm:text-sm'
          )}
          disabled={submitDisabled}
        >
          {submitText}
        </button>
        <button
          type="button"
          className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-800 sm:mt-0 sm:w-auto sm:text-sm"
          onClick={nested ? () => dispatch(setNestedModal(null)) : () => dispatch(setModal(null))}
        >
          {cancelText || 'Cancel'}
        </button>
      </div>
    </form>
  );
};

export const ModalContainer = ({ title, buttonText, children, nested }) => {
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
          onClick={nested ? () => dispatch(setNestedModal(null)) : () => dispatch(setModal(null))}
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
    <Transition.Root show={!!modal?.modal} as={Fragment}>
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
              <ModalForms modal={modal} />
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition.Root>
  );
};

export default Modal;

export const NestedModal = () => {
  const dispatch = useDispatch();
  const nestedModal = useSelector(selectNestedModal);

  return (
    <Transition.Root show={!!nestedModal} as={Fragment}>
      <Dialog as="div" className="fixed z-10 inset-0 overflow-y-auto" onClose={() => dispatch(setNestedModal(null))}>
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
                  onClick={() => dispatch(setNestedModal(null))}
                >
                  <span className="sr-only">Close</span>
                  <XIcon className="h-6 w-6" aria-hidden="true" />
                </button>
              </div>
              {/* Forms */}
              <ModalForms modal={nestedModal} nested />
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition.Root>
  );
};

const ModalForms = ({ modal, nested }) => {
  return (
    <Fragment>
      {/* Character Sheet */}
      {modal && modal.type === ModalTypes.takeARest ? <TakeARest nested={nested} /> : null}
      {modal && modal.type === ModalTypes.takeDamage ? <TakeDamage nested={nested} /> : null}
      {modal && modal.type === ModalTypes.healDamage ? <HealDamage nested={nested} /> : null}
      {modal && modal.type === ModalTypes.receiveMoney ? <ReceiveMoney nested={nested} /> : null}
      {modal && modal.type === ModalTypes.payMoney ? <PayMoney nested={nested} /> : null}
      {modal && modal.type === ModalTypes.editUpgradePoints ? <UpgradePoints nested={nested} /> : null}
      {modal && modal.type === ModalTypes.editMortality ? <Mortality nested={nested} /> : null}
      {modal && modal.type === ModalTypes.editStat ? <EditStat id={modal.id} nested={nested} /> : null}
      {modal && modal.type === ModalTypes.editCondition ? <EditCondition id={modal.id} nested={nested} /> : null}
      {modal && modal.type === ModalTypes.errorEquippingBelonging ? <ErrorEquippingBelonging id={modal.id} data={modal.data} nested={nested} /> : null}
      {/* Campaign Sheet */}
      {modal && modal.type === ModalTypes.sendInvite ? <SendInvite nested={nested} /> : null}
      {modal && modal.type === ModalTypes.assignBelonging ? <AssignBelonging id={modal.id} data={modal.data} nested={nested} /> : null}
      {/* Shared */}
      {modal && modal.type === ModalTypes.deleteSheet ? <DeleteSheet data={modal.data} nested={nested} /> : null}
      {modal && modal.type === ModalTypes.showBelonging ? <ShowBelonging id={modal.id} data={modal.data} nested={nested} /> : null}
      {modal && modal.type === ModalTypes.deleteResource ? <DeleteResource id={modal.id} data={modal.data} nested={nested} /> : null}
      {modal && modal.type === ModalTypes.updateInviteStatus ? <UpdateInviteStatus id={modal.id} data={modal.data} nested={nested} /> : null}
      {modal && modal.type === ModalTypes.updateTransactionStatus ? <UpdateTransactionStatus id={modal.id} data={modal.data} /> : null}
      {modal && modal.type === ModalTypes.removeCharacterFromCampaign ? <RemoveCharacterFromCampaign data={modal.data} nested={nested} /> : null}
    </Fragment>
  );
};
