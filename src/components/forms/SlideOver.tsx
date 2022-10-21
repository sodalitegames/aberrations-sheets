import { FormEventHandler, Fragment } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { useSelector } from 'react-redux';
import { Formik, Form, FormikHelpers } from 'formik';

import { XIcon } from '@heroicons/react/outline';

import { selectSlideOver } from '../../redux/app/app.selectors';
import { selectResourceError } from '../../redux/resource/resource.selectors';
import { selectCharacterError } from '../../redux/character/character.selectors';
import { selectCampaignError } from '../../redux/campaign/campaign.selectors';

import { useActions } from '../../hooks/useActions';

import classNames from '../../utils/classNames';
import SlideOverTypes from '../../utils/SlideOverTypes';
import { formatValidationErrors } from '../../utils/helpers/errors';

import { NestedModal } from './Modal';

import Notice, { NoticeStatus } from '../Notice';

import NewCharacter from './slide-over/NewCharacter';
import NewCampaign from './slide-over/NewCampaign';

// Character Sheet
import ManageCharacter from './slide-over/ManageCharacter';
import RollDice from './slide-over/RollDice';
import ManageEquippedBelongings from './slide-over/ManageEquippedBelongings';
import PurchaseAugmentation from './slide-over/PurchaseAugmentation';

// Campaign Sheet
import ManageCampaign from './slide-over/ManageCampaign';
import CombatForm from './slide-over/CombatForm';
import CampOverview from './slide-over/CampOverview';
import CampDetails from './slide-over/CampDetails';
import ManageInvites from './slide-over/ManageInvites';
import SessionForm from './slide-over/SessionForm';
import NpcForm from './slide-over/NpcForm';
import CreatureForm from './slide-over/CreatureForm';
import EnvironmentForm from './slide-over/EnvironmentForm';
import ManageAssignedBelongings from './slide-over/ManageAssignedBelongings';

// Shared
import LogForm from './slide-over/LogForm';
import NewWeaponForm from './slide-over/NewWeaponForm';
import EditWeaponForm from './slide-over/EditWeaponForm';
import WearableForm from './slide-over/WearableForm';
import ConsumableForm from './slide-over/ConsumableForm';
import UsableForm from './slide-over/UsableForm';
import NewTransactionForm from './slide-over/NewTransactionForm';
import EditDescription from './slide-over/EditDescription';
import EditBackground from './slide-over/EditBackground';

interface SlideOverFormProps {
  title: string;
  description: string;
  submitText?: string;
  cancelText?: string;
  submitDisabled?: boolean;
  initialValues?: any;
  validationSchema?: any;
  submitHandler: FormEventHandler<HTMLFormElement> | ((values: any, actions: FormikHelpers<any>) => void | Promise<any>);
  formik?: boolean;
}

interface SlideOverContainerProps {
  title: string;
  description: string;
  cancelText?: string;
}

export const SlideOverForm: React.FC<SlideOverFormProps> = ({ title, description, submitText, cancelText, submitDisabled, initialValues, validationSchema, submitHandler, formik, children }) => {
  const { closeSlideOver } = useActions();

  const characterError = useSelector(selectCharacterError);
  const campaignError = useSelector(selectCampaignError);
  const resourceError = useSelector(selectResourceError);

  if (formik) {
    return (
      <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={submitHandler} enableReinitialize={true}>
        {({ values, errors, isSubmitting }) => (
          <Form className="flex flex-col h-full overflow-y-scroll bg-white shadow-xl">
            <div className="flex-1">
              {/* Header */}
              <div className="px-4 py-6 bg-gray-50 sm:px-6">
                <div className="flex items-start justify-between space-x-3">
                  <div className="space-y-1">
                    <Dialog.Title className="text-lg font-medium text-gray-900">{title}</Dialog.Title>
                    <p className="text-sm text-gray-500">{description}</p>
                  </div>
                  {/* Close button */}
                  <div className="flex items-center h-7">
                    <button type="button" className="text-gray-400 hover:text-gray-500" onClick={() => closeSlideOver()}>
                      <span className="sr-only">Close panel</span>
                      <XIcon className="w-6 h-6" aria-hidden="true" />
                    </button>
                  </div>
                </div>
              </div>

              {/* Divider container */}
              <div className="py-6 space-y-6 sm:py-0 sm:space-y-0 sm:divide-y sm:divide-gray-200">
                {/* Form content */}
                {children}
                {JSON.stringify({ values, errors })}
              </div>
            </div>

            {characterError ? <Notice status={characterError.status} heading={characterError.err._message} message={formatValidationErrors(characterError.err.errors)} /> : null}
            {campaignError ? <Notice status={campaignError.status} heading={campaignError.err._message} message={formatValidationErrors(campaignError.err.errors)} /> : null}
            {resourceError ? <Notice status={NoticeStatus.Error} heading={resourceError.heading} message="An error occured fetching additional resource data. Please try again later." /> : null}

            {/* Action buttons */}
            <div className="px-4 py-5 border-t border-gray-200 shrink-0 sm:px-6">
              <div className="flex justify-end space-x-3">
                <button
                  type="button"
                  className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-dark"
                  onClick={() => closeSlideOver()}
                >
                  {cancelText || 'Cancel'}
                </button>
                <button
                  type="submit"
                  className={classNames(
                    submitDisabled ? 'bg-gray-200 text-gray-400 cursor-default' : 'text-white bg-dark hover:bg-dark-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-dark-200',
                    'inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md'
                  )}
                  disabled={isSubmitting || submitDisabled}
                >
                  {submitText}
                </button>
              </div>
            </div>
          </Form>
        )}
      </Formik>
    );
  }

  return (
    <form onSubmit={submitHandler as FormEventHandler<HTMLFormElement>} className="flex flex-col h-full overflow-y-scroll bg-white shadow-xl">
      <div className="flex-1">
        {/* Header */}
        <div className="px-4 py-6 bg-gray-50 sm:px-6">
          <div className="flex items-start justify-between space-x-3">
            <div className="space-y-1">
              <Dialog.Title className="text-lg font-medium text-gray-900">{title}</Dialog.Title>
              <p className="text-sm text-gray-500">{description}</p>
            </div>
            {/* Close button */}
            <div className="flex items-center h-7">
              <button type="button" className="text-gray-400 hover:text-gray-500" onClick={() => closeSlideOver()}>
                <span className="sr-only">Close panel</span>
                <XIcon className="w-6 h-6" aria-hidden="true" />
              </button>
            </div>
          </div>
        </div>

        {/* Divider container */}
        <div className="py-6 space-y-6 sm:py-0 sm:space-y-0 sm:divide-y sm:divide-gray-200">
          {/* Form content */}
          {children}
        </div>
      </div>

      {characterError ? <Notice status={characterError.status} heading={characterError.err._message} message={formatValidationErrors(characterError.err.errors)} /> : null}
      {campaignError ? <Notice status={campaignError.status} heading={campaignError.err._message} message={formatValidationErrors(campaignError.err.errors)} /> : null}
      {resourceError ? <Notice status={NoticeStatus.Error} heading={resourceError.heading} message="An error occured fetching additional resource data. Please try again later." /> : null}

      {/* Action buttons */}
      <div className="px-4 py-5 border-t border-gray-200 shrink-0 sm:px-6">
        <div className="flex justify-end space-x-3">
          <button
            type="button"
            className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-dark"
            onClick={() => closeSlideOver()}
          >
            {cancelText || 'Cancel'}
          </button>
          <button
            type="submit"
            className={classNames(
              submitDisabled ? 'bg-gray-200 text-gray-400 cursor-default' : 'text-white bg-dark hover:bg-dark-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-dark-200',
              'inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md'
            )}
            disabled={submitDisabled}
          >
            {submitText}
          </button>
        </div>
      </div>
    </form>
  );
};

export const SlideOverContainer: React.FC<SlideOverContainerProps> = ({ title, description, cancelText, children }) => {
  const { closeSlideOver } = useActions();

  return (
    <div className="flex flex-col h-full overflow-y-scroll bg-white shadow-xl">
      <div className="flex-1">
        {/* Header */}
        <div className="px-4 py-6 bg-gray-50 sm:px-6">
          <div className="flex items-start justify-between space-x-3">
            <div className="space-y-1">
              <Dialog.Title className="text-lg font-medium text-gray-900">{title}</Dialog.Title>
              <p className="text-sm text-gray-500">{description}</p>
            </div>
            {/* Close button */}
            <div className="flex items-center h-7">
              <button type="button" className="text-gray-400 hover:text-gray-500" onClick={() => closeSlideOver()}>
                <span className="sr-only">Close panel</span>
                <XIcon className="w-6 h-6" aria-hidden="true" />
              </button>
            </div>
          </div>
        </div>

        {/* Divider container */}
        <div className="py-6 space-y-6 sm:py-0 sm:space-y-0 sm:divide-y sm:divide-gray-200">
          {/* Form content */}
          {children}
        </div>
      </div>

      {/* Action buttons */}
      <div className="px-4 py-5 border-t border-gray-200 shrink-0 sm:px-6">
        <div className="flex justify-end space-x-3">
          <button
            type="button"
            className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-dark"
            onClick={() => closeSlideOver()}
          >
            {cancelText || 'Cancel'}
          </button>
        </div>
      </div>
    </div>
  );
};

const SlideOver: React.FC = () => {
  const { closeSlideOver } = useActions();

  const slideOver = useSelector(selectSlideOver);

  return (
    <Transition.Root show={!!slideOver?.show} as={Fragment}>
      <Dialog as="div" className="fixed inset-0 overflow-hidden" onClose={() => closeSlideOver()}>
        <div className="absolute inset-0 overflow-hidden">
          <Dialog.Overlay className="absolute inset-0" />
          <div className="fixed inset-y-0 right-0 flex max-w-full pl-10 sm:pl-16">
            <Transition.Child
              as={Fragment}
              enter="transform transition ease-in-out duration-500 sm:duration-700"
              enterFrom="translate-x-full"
              enterTo="translate-x-0"
              leave="transform transition ease-in-out duration-500 sm:duration-700"
              leaveFrom="translate-x-0"
              leaveTo="translate-x-full"
            >
              <div className="w-screen max-w-2xl">
                {/* Forms */}
                {slideOver && slideOver.type === SlideOverTypes.newCharacter ? <NewCharacter /> : null}
                {slideOver && slideOver.type === SlideOverTypes.newCampaign ? <NewCampaign /> : null}
                {/* Character Sheet */}
                {slideOver && slideOver.type === SlideOverTypes.manageCharacter ? <ManageCharacter /> : null}
                {/* Campaign Sheet */}
                {slideOver && slideOver.type === SlideOverTypes.manageCampaign ? <ManageCampaign /> : null}
                {slideOver && slideOver.type === SlideOverTypes.combatForm ? <CombatForm id={slideOver.id} /> : null}
                {slideOver && slideOver.type === SlideOverTypes.campOverviewForm ? <CampOverview /> : null}
                {slideOver && slideOver.type === SlideOverTypes.campDetailsForm ? <CampDetails /> : null}
                {slideOver && slideOver.type === SlideOverTypes.manageSentInvites ? <ManageInvites /> : null}
                {slideOver && slideOver.type === SlideOverTypes.sessionForm ? <SessionForm id={slideOver.id} /> : null}
                {slideOver && slideOver.type === SlideOverTypes.npcForm ? <NpcForm id={slideOver.id} /> : null}
                {slideOver && slideOver.type === SlideOverTypes.creatureForm ? <CreatureForm id={slideOver.id} /> : null}
                {slideOver && slideOver.type === SlideOverTypes.environmentForm ? <EnvironmentForm id={slideOver.id} /> : null}
                {slideOver && slideOver.type === SlideOverTypes.manageAssignedBelongings ? <ManageAssignedBelongings data={slideOver.data} /> : null}
                {/* Shared */}
                {slideOver && slideOver.type === SlideOverTypes.rollDice ? <RollDice data={slideOver.data} /> : null}
                {slideOver && slideOver.type === SlideOverTypes.manageEquippedBelongings ? <ManageEquippedBelongings data={slideOver.data} /> : null}
                {slideOver && slideOver.type === SlideOverTypes.purchaseAugmentation ? <PurchaseAugmentation data={slideOver.data} /> : null}
                {slideOver && slideOver.type === SlideOverTypes.editDescriptionForm ? <EditDescription data={slideOver.data} /> : null}
                {slideOver && slideOver.type === SlideOverTypes.editBackgroundForm ? <EditBackground data={slideOver.data} /> : null}
                {slideOver && slideOver.type === SlideOverTypes.newWeaponForm ? <NewWeaponForm data={slideOver.data} /> : null}
                {slideOver && slideOver.type === SlideOverTypes.editWeaponForm ? <EditWeaponForm id={slideOver.id} data={slideOver.data} /> : null}
                {slideOver && slideOver.type === SlideOverTypes.wearableForm ? <WearableForm id={slideOver.id} data={slideOver.data} /> : null}
                {slideOver && slideOver.type === SlideOverTypes.consumableForm ? <ConsumableForm id={slideOver.id} data={slideOver.data} /> : null}
                {slideOver && slideOver.type === SlideOverTypes.usableForm ? <UsableForm id={slideOver.id!} data={slideOver.data} /> : null}
                {slideOver && slideOver.type === SlideOverTypes.logForm ? <LogForm id={slideOver.id} data={slideOver.data} /> : null}
                {slideOver && slideOver.type === SlideOverTypes.newTransactionForm ? <NewTransactionForm data={slideOver.data} /> : null}
              </div>
            </Transition.Child>
          </div>
        </div>

        {/* Nested Modal */}
        <NestedModal />
      </Dialog>
    </Transition.Root>
  );
};

export default SlideOver;
