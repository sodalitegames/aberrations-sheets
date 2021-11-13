import { Fragment } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { useRecoilState, useSetRecoilState } from 'recoil';

import { XIcon } from '@heroicons/react/outline';

import { slideOverState } from '../../../recoil/app/app.atoms';

import SlideOverTypes from '../../../utils/SlideOverTypes';

import PurchaseAugmentation from '../../../components/characters/forms/slide-over/PurchaseAugmentation';
import CharDescription from '../../../components/characters/forms/slide-over/CharDescription';
import CharBackground from '../../../components/characters/forms/slide-over/CharBackground';
import CharacterLog from '../../../components/characters/forms/slide-over/CharacterLog';

export const SlideOverForm = ({ title, description, submitText, submitHandler, children }) => {
  const setSlideOver = useSetRecoilState(slideOverState);

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
              <button type="button" className="text-gray-400 hover:text-gray-500" onClick={() => setSlideOver(null)}>
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
      <div className="flex-shrink-0 px-4 border-t border-gray-200 py-5 sm:px-6">
        <div className="space-x-3 flex justify-end">
          <button
            type="button"
            className="bg-white py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-dark"
            onClick={() => setSlideOver(null)}
          >
            Cancel
          </button>
          <button
            type="submit"
            className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-dark hover:bg-dark-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-dark-200"
          >
            {submitText}
          </button>
        </div>
      </div>
    </form>
  );
};

const SlideOver = () => {
  const [slideOver, setSlideOver] = useRecoilState(slideOverState);

  return (
    <Transition.Root show={!!slideOver} as={Fragment}>
      <Dialog as="div" className="fixed inset-0 overflow-hidden" onClose={setSlideOver}>
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
                {slideOver && slideOver.type === SlideOverTypes.rollDice ? 'Not built yet' : null}
                {slideOver && slideOver.type === SlideOverTypes.manageEquippedBelongings ? 'Not built yet' : null}
                {slideOver && slideOver.type === SlideOverTypes.manageEquippedWeapons ? 'Not built yet' : null}
                {slideOver && slideOver.type === SlideOverTypes.manageEquippedWearables ? 'Not built yet' : null}
                {slideOver && slideOver.type === SlideOverTypes.manageEquippedConsumables ? 'Not built yet' : null}
                {slideOver && slideOver.type === SlideOverTypes.manageEquippedUsables ? 'Not built yet' : null}
                {slideOver && slideOver.type === SlideOverTypes.purchaseAugmentation ? <PurchaseAugmentation /> : null}
                {slideOver && slideOver.type === SlideOverTypes.weaponForm ? 'Not built yet' : null}
                {slideOver && slideOver.type === SlideOverTypes.wearableForm ? 'Not built yet' : null}
                {slideOver && slideOver.type === SlideOverTypes.consumableForm ? 'Not built yet' : null}
                {slideOver && slideOver.type === SlideOverTypes.usableForm ? 'Not built yet' : null}
                {slideOver && slideOver.type === SlideOverTypes.charDescriptionForm ? <CharDescription /> : null}
                {slideOver && slideOver.type === SlideOverTypes.charBackgroundForm ? <CharBackground /> : null}
                {slideOver && slideOver.type === SlideOverTypes.charLogForm ? <CharacterLog id={slideOver.id} /> : null}
              </div>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
};

export default SlideOver;
