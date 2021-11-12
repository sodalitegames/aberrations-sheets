import { useState } from 'react';
import { Dialog } from '@headlessui/react';
import { useRecoilState } from 'recoil';

import { ExclamationIcon } from '@heroicons/react/outline';

import { charSheetState } from '../../../recoil/character/character.atoms';

import { updateCharSheet } from '../../../apis/sheets.api';

const TakeDamage = ({ setModal }) => {
  const [damage, setDamage] = useState(0);

  const [charSheet, setCharSheet] = useRecoilState(charSheetState);

  const submitHandler = async e => {
    e.preventDefault();

    const response = await updateCharSheet(charSheet._id, { currentHp: charSheet.currentHp - damage });

    setCharSheet(oldCharSheet => {
      return { ...oldCharSheet, currentHp: response.data.data.sheet.currentHp };
    });

    setModal(null);
  };

  return (
    <form onSubmit={submitHandler}>
      <div className="sm:flex sm:items-start">
        <div className="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
          <ExclamationIcon className="h-6 w-6 text-red-600" aria-hidden="true" />
        </div>
        <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
          <Dialog.Title as="h3" className="text-lg leading-6 font-medium text-gray-900">
            Take Damage
          </Dialog.Title>
          <div className="mt-2">
            <p className="text-sm text-gray-500">How much damage?</p>
          </div>
          <div className="mt-2">
            <input type="number" name="damage" value={damage} onChange={e => setDamage(e.target.value)} />
          </div>
        </div>
      </div>
      <div className="mt-5 sm:mt-4 sm:flex sm:flex-row-reverse">
        <button
          type="submit"
          className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm"
        >
          Take {damage} Damage
        </button>
        <button
          type="button"
          className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:w-auto sm:text-sm"
          onClick={() => setModal(null)}
        >
          Cancel
        </button>
      </div>
    </form>
  );
};

export default TakeDamage;
