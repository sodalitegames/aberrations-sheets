import { useEffect, useState } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { useRecoilState } from 'recoil';

import { XIcon } from '@heroicons/react/outline';
import { LinkIcon, PlusSmIcon, QuestionMarkCircleIcon } from '@heroicons/react/solid';

import { charSheetState } from '../../../recoil/character/character.atoms';
import { createNewResource } from '../../../apis/sheets.api';

const CharacterLogForm = ({ setSlideOver, id }) => {
  const [charSheet, setCharSheet] = useRecoilState(charSheetState);

  const [date, setDate] = useState('');
  const [content, setContent] = useState('');

  useEffect(() => {
    if (id && charSheet) {
      setDate(new Date(charSheet.characterLogs.find(log => log._id === id).date));
      setContent(charSheet.characterLogs.find(log => log._id === id).content);
    }
  }, [id, charSheet]);

  const submitHandler = async e => {
    e.preventDefault();

    const response = await createNewResource('logs', charSheet._id, { date, content });

    console.log(response.data.data);

    setCharSheet(oldCharSheet => {
      console.log(oldCharSheet);
      return { ...oldCharSheet, characterLogs: [response.data.data.doc, ...oldCharSheet.characterLogs] };
    });

    setSlideOver(null);
  };

  return (
    <form onSubmit={submitHandler} className="h-full flex flex-col bg-white shadow-xl overflow-y-scroll">
      <div className="flex-1">
        {/* Header */}
        <div className="px-4 py-6 bg-gray-50 sm:px-6">
          <div className="flex items-start justify-between space-x-3">
            <div className="space-y-1">
              <Dialog.Title className="text-lg font-medium text-gray-900">New Character Log</Dialog.Title>
              <p className="text-sm text-gray-500">Get started by filling in the information below to create your new character log.</p>
            </div>
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
          {/* Project name */}
          <div className="space-y-1 px-4 sm:space-y-0 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6 sm:py-5">
            <div>
              <label htmlFor="project-name" className="block text-sm font-medium text-gray-900 sm:mt-px sm:pt-2">
                Date
              </label>
            </div>
            <div className="sm:col-span-2">
              <input
                type="date"
                name="date"
                id="date"
                className="block w-full shadow-sm sm:text-sm focus:ring-indigo-500 focus:border-indigo-500 border-gray-300 rounded-md"
                value={date}
                onChange={e => setDate(e.target.value)}
              />
            </div>
          </div>

          {/* Project description */}
          <div className="space-y-1 px-4 sm:space-y-0 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6 sm:py-5">
            <div>
              <label htmlFor="content" className="block text-sm font-medium text-gray-900 sm:mt-px sm:pt-2">
                What happened?
              </label>
            </div>
            <div className="sm:col-span-2">
              <textarea
                id="content"
                name="content"
                rows={3}
                className="block w-full shadow-sm sm:text-sm focus:ring-indigo-500 focus:border-indigo-500 border border-gray-300 rounded-md"
                value={content}
                onChange={e => setContent(e.target.value)}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Action buttons */}
      <div className="flex-shrink-0 px-4 border-t border-gray-200 py-5 sm:px-6">
        <div className="space-x-3 flex justify-end">
          <button
            type="button"
            className="bg-white py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            onClick={() => setSlideOver(null)}
          >
            Cancel
          </button>
          <button
            type="submit"
            className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Create
          </button>
        </div>
      </div>
    </form>
  );
};

export default CharacterLogForm;
