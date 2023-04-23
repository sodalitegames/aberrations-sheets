import { Disclosure } from '@headlessui/react';
import { ChevronDownIcon } from '@heroicons/react/outline';

import { useActions } from '../../hooks/useActions';

import classNames from '../../utils/classNames';
import SlideOverTypes from '../../utils/SlideOverTypes';
import ModalTypes from '../../utils/ModalTypes';
import { formatDate } from '../../utils/helpers/dates';

import Button from '../Button';
import NewlineText from '../NewlineText';

const Sessions = ({ sessions, status }) => {
  const { setSlideOver, setModal } = useActions();

  return (
    <dl className="space-y-6 divide-y divide-gray-200">
      {sessions.map(session => (
        <Disclosure as="div" key={session._id} className="pt-6">
          {({ open }) => (
            <>
              <dt className="text-lg">
                <Disclosure.Button className="flex items-start justify-between w-full text-left text-gray-400">
                  <span className="font-medium text-gray-900">
                    {session.name}{' '}
                    <span className="ml-2 text-sm font-base">{status === 'completed' ? `Played on: ${formatDate(session.datePlayed)}` : `Planned for: ${formatDate(session.dateScheduled)}`}</span>
                  </span>
                  <span className="flex items-center ml-6 h-7">
                    <ChevronDownIcon className={classNames(open ? '-rotate-180' : 'rotate-0', 'h-6 w-6 transform')} aria-hidden="true" />
                  </span>
                </Disclosure.Button>
              </dt>
              <Disclosure.Panel as="dd" className="mt-2">
                <div className="flex justify-between pt-4">
                  <NewlineText>{session.content}</NewlineText>
                  <span className="space-y-2">
                    <Button onClick={() => setSlideOver({ type: SlideOverTypes.sessionForm, id: session._id })}>Edit</Button>
                    <Button
                      alert
                      onClick={() =>
                        setModal({
                          type: ModalTypes.deleteResource,
                          id: session._id,
                          data: {
                            sheetType: 'campaigns',
                            resourceType: 'sessions',
                            title: `Are you sure you want to delete this session?`,
                            submitText: `Yes, delete this session`,
                            notification: {
                              heading: 'Session Deleted',
                              message: `You have successfully deleted session '${session.name}'.`,
                            },
                          },
                        })
                      }
                    >
                      Delete
                    </Button>
                  </span>
                </div>
              </Disclosure.Panel>
            </>
          )}
        </Disclosure>
      ))}
    </dl>
  );
};

export default Sessions;
