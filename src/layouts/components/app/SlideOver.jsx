import { Fragment, useState } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { useRecoilState } from 'recoil';

import { XIcon } from '@heroicons/react/outline';
import { LinkIcon, PlusSmIcon, QuestionMarkCircleIcon } from '@heroicons/react/solid';

import { slideOverState } from '../../../recoil/app/app.atoms';

import AugmentationForm from '../../../components/characters/forms/AugmentationForm';
import CharacterLogForm from '../../../components/characters/forms/CharacterLogForm';

export default function SlideOver() {
  const [slideOver, setSlideOver] = useRecoilState(slideOverState);

  if (!slideOver) {
    return null;
  }

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
                {slideOver.type === 'AUGMENTATION_FORM' ? <AugmentationForm setSlideOver={setSlideOver} /> : null}
                {slideOver.type === 'CHARACTER_LOG_FORM' ? <CharacterLogForm setSlideOver={setSlideOver} id={slideOver.id} /> : null}
              </div>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
}
