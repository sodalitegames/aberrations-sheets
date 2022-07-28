import { Fragment } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { useSelector } from 'react-redux';

import { XIcon, ExclamationIcon } from '@heroicons/react/outline';

import { selectModal, selectNestedModal } from '../../redux/app/app.selectors';
import { selectResourceError } from '../../redux/resource/resource.selectors';
import { selectCharacterError } from '../../redux/character/character.selectors';
import { selectCampaignError } from '../../redux/campaign/campaign.selectors';

import { useActions } from '../../hooks/useActions';

import classNames from '../../utils/classNames';
import ModalTypes from '../../utils/ModalTypes';
import { formatValidationErrors } from '../../utils/helpers/errors';

import { Modal as IModal } from '../../models/interfaces/app';
import { Stat, Condition } from '../../models/enums';

import Notice, { NoticeStatus } from '../Notice';

// Character Sheet
import TakeARest from './modal/TakeARest';
import TakeDamage from './modal/TakeDamage';
import HealDamage from './modal/HealDamage';
import ReceiveMoney from './modal/ReceiveMoney';
import PayMoney from './modal/PayMoney';
import ErrorEquippingBelonging from './modal/ErrorEquippingBelonging';

// Campaign Sheet
import SendInvite from './modal/SendInvite';
import AssignBelonging from './modal/AssignBelonging';

// Shared
import DeleteSheet from './modal/DeleteSheet';
import ShowBelonging from './modal/ShowBelonging';
import DeleteResource from './modal/DeleteResource';
import UpdateInviteStatus from './modal/UpdateInviteStatus';
import ManageTransaction from './modal/ManageTransaction';
import RemoveCharacterFromCampaign from './modal/RemoveCharacterFromCampaign';
import EditExperience from './modal/EditExperience';
import EditMortality from './modal/EditMortality';
import EditStat from './modal/EditStat';
import UpgradeStat from './modal/UpgradeStat';
import EditCondition from './modal/EditCondition';
import EditHealth from './modal/EditHealth';
import UpgradeHealth from './modal/UpgradeHealth';
import EditWallet from './modal/EditWallet';

interface ModalFormProps {
  title: string;
  submitText?: string;
  cancelText?: string;
  submitDisabled?: boolean;
  submitHandler: (event: React.FormEvent<HTMLFormElement>) => Promise<void>;
  nested?: boolean;
  type?: 'alert';
}

interface ModalContainerProps {
  title: string;
  buttonText?: string;
  nested?: boolean;
}

const ModalForms: React.VFC<{ modal: IModal; nested?: boolean }> = ({ modal, nested }) => {
  return (
    <Fragment>
      {/* Character Sheet */}
      {modal && modal.type === ModalTypes.errorEquippingBelonging ? <ErrorEquippingBelonging data={modal.data} nested={nested} /> : null}
      {/* Campaign Sheet */}
      {modal && modal.type === ModalTypes.sendInvite ? <SendInvite /> : null}
      {modal && modal.type === ModalTypes.assignBelonging ? <AssignBelonging id={modal.id} data={modal.data} /> : null}
      {/* Shared */}
      {modal && modal.type === ModalTypes.takeARest ? <TakeARest data={modal.data} /> : null}
      {modal && modal.type === ModalTypes.takeDamage ? <TakeDamage data={modal.data} /> : null}
      {modal && modal.type === ModalTypes.healDamage ? <HealDamage data={modal.data} /> : null}
      {modal && modal.type === ModalTypes.receiveMoney ? <ReceiveMoney data={modal.data} /> : null}
      {modal && modal.type === ModalTypes.payMoney ? <PayMoney data={modal.data} /> : null}
      {modal && modal.type === ModalTypes.deleteSheet ? <DeleteSheet data={modal.data} nested={nested} /> : null}
      {modal && modal.type === ModalTypes.showBelonging ? <ShowBelonging id={modal.id} data={modal.data} nested={nested} /> : null}
      {modal && modal.type === ModalTypes.deleteResource ? <DeleteResource id={modal.id} data={modal.data} nested={nested} /> : null}
      {modal && modal.type === ModalTypes.updateInviteStatus ? <UpdateInviteStatus id={modal.id} data={modal.data} nested={nested} /> : null}
      {modal && modal.type === ModalTypes.manageTransaction ? <ManageTransaction id={modal.id} data={modal.data} /> : null}
      {modal && modal.type === ModalTypes.removeCharacterFromCampaign ? <RemoveCharacterFromCampaign data={modal.data} /> : null}
      {modal && modal.type === ModalTypes.editExperience ? <EditExperience data={modal.data} /> : null}
      {modal && modal.type === ModalTypes.editMortality ? <EditMortality data={modal.data} /> : null}
      {modal && modal.type === ModalTypes.editStat ? <EditStat id={modal.id as Stat} data={modal.data} /> : null}
      {modal && modal.type === ModalTypes.upgradeStat ? <UpgradeStat id={modal.id as Stat} data={modal.data} /> : null}
      {modal && modal.type === ModalTypes.editCondition ? <EditCondition id={modal.id as Condition} data={modal.data} /> : null}
      {modal && modal.type === ModalTypes.editHealth ? <EditHealth data={modal.data} /> : null}
      {modal && modal.type === ModalTypes.upgradeHealth ? <UpgradeHealth data={modal.data} /> : null}
      {modal && modal.type === ModalTypes.editWallet ? <EditWallet data={modal.data} /> : null}
    </Fragment>
  );
};

export const ModalForm: React.FC<ModalFormProps> = ({ type, title, submitText, cancelText, submitHandler, submitDisabled, children, nested }) => {
  const { closeModal, closeNestedModal } = useActions();

  const characterError = useSelector(selectCharacterError);
  const campaignError = useSelector(selectCampaignError);
  const resourceError = useSelector(selectResourceError);

  return (
    <form onSubmit={submitHandler}>
      <div>
        {/* Icon */}
        {type === 'alert' ? (
          <div className="flex items-center justify-center w-12 h-12 mx-4 bg-red-100 rounded-full shrink-0 sm:h-10 sm:w-10">
            <ExclamationIcon className="w-6 h-6 text-red-600" aria-hidden="true" />
          </div>
        ) : null}
        <div className="flex flex-col px-4 mt-2 mr-6">
          {/* Title */}
          <Dialog.Title as="h3" className="text-lg font-medium leading-6 text-gray-900">
            {title}
          </Dialog.Title>
          {/* Form body */}
          <fieldset className="mb-4">{children}</fieldset>
        </div>
      </div>

      {characterError ? <Notice status={characterError.status} heading={characterError.err._message} message={formatValidationErrors(characterError.err.errors)} /> : null}
      {campaignError ? <Notice status={campaignError.status} heading={campaignError.err._message} message={formatValidationErrors(campaignError.err.errors)} /> : null}
      {resourceError ? <Notice status={NoticeStatus.Error} heading={resourceError.heading} message="An error occured fetching additional resource data. Please try again later." /> : null}

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
          className="inline-flex justify-center w-full px-4 py-2 mt-3 text-base font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-800 sm:mt-0 sm:w-auto sm:text-sm"
          onClick={nested ? () => closeNestedModal() : () => closeModal()}
        >
          {cancelText || 'Cancel'}
        </button>
      </div>
    </form>
  );
};

export const ModalContainer: React.FC<ModalContainerProps> = ({ title, buttonText, children, nested }) => {
  const { closeModal, closeNestedModal } = useActions();

  return (
    <div>
      <div className="flex">
        <div className="flex flex-col px-4 mt-2 mr-6">
          {/* Title */}
          <Dialog.Title as="h3" className="text-lg font-medium leading-6 text-gray-900">
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
          className="inline-flex justify-center w-full px-4 py-2 mt-3 text-base font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-800 sm:mt-0 sm:w-auto sm:text-sm"
          onClick={nested ? () => closeNestedModal() : () => closeModal()}
        >
          {buttonText || 'Done'}
        </button>
      </div>
    </div>
  );
};

const Modal: React.VFC = () => {
  const { closeModal } = useActions();

  const modal = useSelector(selectModal);

  return (
    <Transition.Root show={!!modal?.show} as={Fragment}>
      <Dialog as="div" className="fixed inset-0 z-10 overflow-y-auto" onClose={() => closeModal()}>
        <div className="flex items-end justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0">
          <Transition.Child as={Fragment} enter="ease-out duration-300" enterFrom="opacity-0" enterTo="opacity-100" leave="ease-in duration-200" leaveFrom="opacity-100" leaveTo="opacity-0">
            <Dialog.Overlay className="fixed inset-0 transition-opacity bg-gray-500/75" />
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
            <div className="inline-block px-4 pt-5 pb-4 overflow-hidden text-left align-bottom transition-all transform bg-white rounded-lg shadow-xl sm:my-8 sm:align-middle sm:max-w-lg sm:w-full sm:p-6">
              {/* Close button */}
              <div className="absolute top-0 right-0 hidden pt-4 pr-4 sm:block">
                <button
                  type="button"
                  className="text-gray-400 bg-white rounded-md hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-dark"
                  onClick={() => closeModal()}
                >
                  <span className="sr-only">Close</span>
                  <XIcon className="w-6 h-6" aria-hidden="true" />
                </button>
              </div>
              {/* Forms */}
              {modal && <ModalForms modal={modal} />}
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition.Root>
  );
};

export default Modal;

export const NestedModal: React.VFC = () => {
  const { closeNestedModal } = useActions();

  const nestedModal = useSelector(selectNestedModal);

  return (
    <Transition.Root show={!!nestedModal?.show} as={Fragment}>
      <Dialog as="div" className="fixed inset-0 z-10 overflow-y-auto" onClose={() => closeNestedModal()}>
        <div className="flex items-end justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0">
          <Transition.Child as={Fragment} enter="ease-out duration-300" enterFrom="opacity-0" enterTo="opacity-100" leave="ease-in duration-200" leaveFrom="opacity-100" leaveTo="opacity-0">
            <Dialog.Overlay className="fixed inset-0 transition-opacity bg-gray-500/75" />
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
            <div className="inline-block px-4 pt-5 pb-4 overflow-hidden text-left align-bottom transition-all transform bg-white rounded-lg shadow-xl sm:my-8 sm:align-middle sm:max-w-lg sm:w-full sm:p-6">
              {/* Close button */}
              <div className="absolute top-0 right-0 hidden pt-4 pr-4 sm:block">
                <button
                  type="button"
                  className="text-gray-400 bg-white rounded-md hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-dark"
                  onClick={() => closeNestedModal()}
                >
                  <span className="sr-only">Close</span>
                  <XIcon className="w-6 h-6" aria-hidden="true" />
                </button>
              </div>
              {/* Forms */}
              {nestedModal && <ModalForms modal={nestedModal} nested />}
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition.Root>
  );
};
