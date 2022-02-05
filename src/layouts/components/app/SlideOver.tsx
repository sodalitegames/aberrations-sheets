import { Fragment } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { useSelector, useDispatch } from 'react-redux';

import { XIcon } from '@heroicons/react/outline';

import { selectSlideOver } from '../../../redux/app/app.selectors';
import { selectResourceError } from '../../../redux/resource/resource.selectors';
import { selectCharacterError } from '../../../redux/character/character.selectors';
import { selectCampaignError } from '../../../redux/campaign/campaign.selectors';

import { setSlideOver } from '../../../redux/app/app.actions';

import classNames from '../../../utils/classNames';
import SlideOverTypes from '../../../utils/SlideOverTypes';
import { formatValidationErrors } from '../../../utils/validationErrors';

import { NestedModal } from './Modal';

import Notice, { NoticeStatus } from '../../../components/shared/Notice';

import NewCharacter from '../../../components/home/forms/slide-over/NewCharacter';
import NewCampaign from '../../../components/home/forms/slide-over/NewCampaign';

// Character Sheet
import ManageCharacter from '../../../components/characters/forms/slide-over/ManageCharacter';
import RollDice from '../../../components/characters/forms/slide-over/RollDice';
import ManageEquippedBelongings from '../../../components/characters/forms/slide-over/ManageEquippedBelongings';
import PurchaseAugmentation from '../../../components/characters/forms/slide-over/PurchaseAugmentation';
import CharDescription from '../../../components/characters/forms/slide-over/CharDescription';
import CharBackground from '../../../components/characters/forms/slide-over/CharBackground';

// Campaign Sheet
import ManageCampaign from '../../../components/campaigns/forms/slide-over/ManageCampaign';
import CampOverview from '../../../components/campaigns/forms/slide-over/CampOverview';
import CampDetails from '../../../components/campaigns/forms/slide-over/CampDetails';
import ManageInvites from '../../../components/campaigns/forms/slide-over/ManageInvites';
import NewSessionForm from '../../../components/campaigns/forms/slide-over/NewSessionForm';
import NpcForm from '../../../components/campaigns/forms/slide-over/NpcForm';
import CreatureForm from '../../../components/campaigns/forms/slide-over/CreatureForm';
import EnvironmentForm from '../../../components/campaigns/forms/slide-over/EnvironmentForm';

// Shared
import LogForm from '../../../components/sheets/forms/slide-over/LogForm';
import NewWeaponForm from '../../../components/sheets/forms/slide-over/NewWeaponForm';
import EditWeaponForm from '../../../components/sheets/forms/slide-over/EditWeaponForm';
import WearableForm from '../../../components/sheets/forms/slide-over/WearableForm';
import ConsumableForm from '../../../components/sheets/forms/slide-over/ConsumableForm';
import UsableForm from '../../../components/sheets/forms/slide-over/UsableForm';
import NewTransactionForm from '../../../components/sheets/forms/slide-over/NewTransactionForm';

interface SlideOverFormProps {
  title: string;
  description: string;
  submitText?: string;
  cancelText?: string;
  submitDisabled?: boolean;
  submitHandler: (event: React.FormEvent<HTMLFormElement>) => Promise<void>;
}

interface SlideOverContainerProps {
  title: string;
  description: string;
  cancelText?: string;
}

export const SlideOverForm: React.FC<SlideOverFormProps> = ({ title, description, submitText, cancelText, submitDisabled, submitHandler, children }) => {
  const dispatch = useDispatch();

  const characterError = useSelector(selectCharacterError);
  const campaignError = useSelector(selectCampaignError);
  const resourceError = useSelector(selectResourceError);

  return (
    <form onSubmit={submitHandler} className="h-full flex flex-col bg-white shadow-xl overflow-y-scroll">
      <div className="flex-1">
        {/* Header */}
        <div className="px-4 py-6 bg-gray-50 sm:px-6">
          <div className="flex items-start justify-between space-x-3">
            <div className="space-y-1">
              <Dialog.Title className="text-lg font-medium text-gray-900">{title}</Dialog.Title>
              <p className="text-sm text-gray-500">{description}</p>
            </div>
            {/* Close button */}
            <div className="h-7 flex items-center">
              <button type="button" className="text-gray-400 hover:text-gray-500" onClick={() => dispatch(setSlideOver(null))}>
                <span className="sr-only">Close panel</span>
                <XIcon className="h-6 w-6" aria-hidden="true" />
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
      <div className="shrink-0 px-4 border-t border-gray-200 py-5 sm:px-6">
        <div className="space-x-3 flex justify-end">
          <button
            type="button"
            className="bg-white py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-dark"
            onClick={() => dispatch(setSlideOver(null))}
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
  const dispatch = useDispatch();

  return (
    <div className="h-full flex flex-col bg-white shadow-xl overflow-y-scroll">
      <div className="flex-1">
        {/* Header */}
        <div className="px-4 py-6 bg-gray-50 sm:px-6">
          <div className="flex items-start justify-between space-x-3">
            <div className="space-y-1">
              <Dialog.Title className="text-lg font-medium text-gray-900">{title}</Dialog.Title>
              <p className="text-sm text-gray-500">{description}</p>
            </div>
            {/* Close button */}
            <div className="h-7 flex items-center">
              <button type="button" className="text-gray-400 hover:text-gray-500" onClick={() => dispatch(setSlideOver(null))}>
                <span className="sr-only">Close panel</span>
                <XIcon className="h-6 w-6" aria-hidden="true" />
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
      <div className="shrink-0 px-4 border-t border-gray-200 py-5 sm:px-6">
        <div className="space-x-3 flex justify-end">
          <button
            type="button"
            className="bg-white py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-dark"
            onClick={() => dispatch(setSlideOver(null))}
          >
            {cancelText || 'Cancel'}
          </button>
        </div>
      </div>
    </div>
  );
};

const SlideOver: React.FC = () => {
  const dispatch = useDispatch();
  const slideOver = useSelector(selectSlideOver);

  return (
    <Transition.Root show={!!slideOver} as={Fragment}>
      <Dialog as="div" className="fixed inset-0 overflow-hidden" onClose={() => dispatch(setSlideOver(null))}>
        <div className="absolute inset-0 overflow-hidden">
          <Dialog.Overlay className="absolute inset-0" />
          <div className="fixed inset-y-0 right-0 pl-10 max-w-full flex sm:pl-16">
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
                {slideOver && slideOver.type === SlideOverTypes.rollDice ? <RollDice /> : null}
                {slideOver && slideOver.type === SlideOverTypes.manageEquippedBelongings ? <ManageEquippedBelongings data={slideOver.data} /> : null}
                {slideOver && slideOver.type === SlideOverTypes.purchaseAugmentation ? <PurchaseAugmentation /> : null}
                {slideOver && slideOver.type === SlideOverTypes.charDescriptionForm ? <CharDescription /> : null}
                {slideOver && slideOver.type === SlideOverTypes.charBackgroundForm ? <CharBackground /> : null}
                {/* Campaign Sheet */}
                {slideOver && slideOver.type === SlideOverTypes.manageCampaign ? <ManageCampaign /> : null}
                {slideOver && slideOver.type === SlideOverTypes.campOverviewForm ? <CampOverview /> : null}
                {slideOver && slideOver.type === SlideOverTypes.campDetailsForm ? <CampDetails /> : null}
                {slideOver && slideOver.type === SlideOverTypes.manageSentInvites ? <ManageInvites /> : null}
                {slideOver && slideOver.type === SlideOverTypes.newSessionForm ? <NewSessionForm id={slideOver.id} data={slideOver.data} /> : null}
                {slideOver && slideOver.type === SlideOverTypes.npcForm ? <NpcForm id={slideOver.id} /> : null}
                {slideOver && slideOver.type === SlideOverTypes.creatureForm ? <CreatureForm id={slideOver.id} /> : null}
                {slideOver && slideOver.type === SlideOverTypes.environmentForm ? <EnvironmentForm id={slideOver.id} /> : null}
                {/* Shared */}
                {slideOver && slideOver.type === SlideOverTypes.newWeaponForm ? <NewWeaponForm data={slideOver.data} /> : null}
                {slideOver && slideOver.type === SlideOverTypes.editWeaponForm ? <EditWeaponForm id={slideOver.id} data={slideOver.data} /> : null}
                {slideOver && slideOver.type === SlideOverTypes.wearableForm ? <WearableForm id={slideOver.id} data={slideOver.data} /> : null}
                {slideOver && slideOver.type === SlideOverTypes.consumableForm ? <ConsumableForm id={slideOver.id} data={slideOver.data} /> : null}
                {slideOver && slideOver.type === SlideOverTypes.usableForm ? <UsableForm id={slideOver.id} data={slideOver.data} /> : null}
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
