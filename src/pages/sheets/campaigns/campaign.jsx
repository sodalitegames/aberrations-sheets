import { useSelector } from 'react-redux';

import { Disclosure } from '@headlessui/react';
import { ChevronDownIcon } from '@heroicons/react/outline';

import { selectCurrentCampaign, selectActiveSession, selectFutureSessions, selectCompletedSessions } from '../../../redux/campaign/campaign.selectors';

import { useActions } from '../../../hooks/useActions';

import SlideOverTypes from '../../../utils/SlideOverTypes';
import classNames from '../../../utils/classNames';

import SheetPageContent from '../../../layouts/components/sheet/SheetPageContent';

import SheetPagePanel from '../../../layouts/components/sheet/SheetPagePanel';
import InfoList from '../../../components/data/InfoList';
import { ButtonPanel } from '../../../components/data/ListItem';
import ListContainer from '../../../components/data/ListContainer';
import Button from '../../../components/Button';

import DisplayLog from '../../../components/display/DisplayLog';
import EditSession from '../../../components/sections/EditSession';

const CampaignCampaignPage = () => {
  const { setSlideOver } = useActions();

  const campSheet = useSelector(selectCurrentCampaign);
  const activeSession = useSelector(selectActiveSession);
  const futureSessions = useSelector(selectFutureSessions);
  const completedSessions = useSelector(selectCompletedSessions);

  return (
    <SheetPageContent title="Campaign" columns={4}>
      <div className="space-y-4">
        {/* Actions */}
        <SheetPagePanel title="Actions">
          <Button onClick={() => setSlideOver({ type: SlideOverTypes.manageCampaign })} classes="mt-2">
            Roll Dice
          </Button>
          <Button onClick={() => setSlideOver({ type: SlideOverTypes.manageCampaign })} classes="mt-2">
            Manage Campaign
          </Button>
          <Button onClick={() => setSlideOver({ type: SlideOverTypes.manageCampaign })} classes="mt-2">
            Start Combat
          </Button>
        </SheetPagePanel>

        {/* Campaign Overview */}
        <SheetPagePanel title="Campaign Overview">
          <div className="flow-root">
            <InfoList list={[campSheet.overview]} />
            <ButtonPanel editable={{ type: SlideOverTypes.campOverviewForm }} />
          </div>
        </SheetPagePanel>

        {/* Campaign Details */}
        <SheetPagePanel title="Campaign Details">
          <div className="flow-root">
            <InfoList list={[campSheet.details]} />
            <ButtonPanel editable={{ type: SlideOverTypes.campDetailsForm }} />
          </div>
        </SheetPagePanel>
      </div>

      <div className="grid grid-cols-1 space-y-4 md:col-span-2">
        {/* Session Planning */}
        <SheetPagePanel>
          <div className="py-2 sm:flex sm:items-center sm:justify-between">
            <div className="sm:flex sm:space-x-5">
              <div className="mt-4 text-center sm:mt-0 sm:text-left">
                <p className="text-xl font-bold text-gray-900 sm:text-2xl">Session Planning</p>
              </div>
            </div>
            <div className="flex flex-col justify-center mt-5 ml-5 space-y-2 shrink-0 sm:mt-0">
              <Button onClick={() => setSlideOver({ type: SlideOverTypes.newSessionForm })} disabled>
                Create New Session
              </Button>
            </div>
          </div>
        </SheetPagePanel>

        {/* Active Session */}
        <SheetPagePanel title="Active Session">
          <div className="flow-root">
            {activeSession ? (
              <dl className="space-y-6 divide-y divide-gray-200">
                <Disclosure as="div" key={activeSession.name} className="pt-6">
                  {({ open }) => (
                    <>
                      <dt className="text-lg">
                        <Disclosure.Button className="flex items-start justify-between w-full text-left text-gray-400">
                          <span className="font-medium text-gray-900">{activeSession.name}</span>
                          <span className="flex items-center ml-6 h-7">
                            <ChevronDownIcon className={classNames(open ? '-rotate-180' : 'rotate-0', 'h-6 w-6 transform')} aria-hidden="true" />
                          </span>
                        </Disclosure.Button>
                      </dt>
                      <Disclosure.Panel as="dd" className="pr-12 mt-2">
                        <EditSession session={activeSession} />
                      </Disclosure.Panel>
                    </>
                  )}
                </Disclosure>
              </dl>
            ) : null}
          </div>
        </SheetPagePanel>

        {/* Future Sessions */}
        <SheetPagePanel title="Future Sessions">
          <div className="flow-root">
            <dl className="space-y-6 divide-y divide-gray-200">
              {futureSessions.map(session => (
                <Disclosure as="div" key={session.name} className="pt-6">
                  {({ open }) => (
                    <>
                      <dt className="text-lg">
                        <Disclosure.Button className="flex items-start justify-between w-full text-left text-gray-400">
                          <span className="font-medium text-gray-900">{session.name}</span>
                          <span className="flex items-center ml-6 h-7">
                            <ChevronDownIcon className={classNames(open ? '-rotate-180' : 'rotate-0', 'h-6 w-6 transform')} aria-hidden="true" />
                          </span>
                        </Disclosure.Button>
                      </dt>
                      <Disclosure.Panel as="dd" className="pr-12 mt-2">
                        <EditSession session={session} />
                      </Disclosure.Panel>
                    </>
                  )}
                </Disclosure>
              ))}
            </dl>
          </div>
        </SheetPagePanel>

        {/* Completed Sessions */}
        <SheetPagePanel title="Completed Sessions">
          <div className="flow-root">
            <dl className="space-y-6 divide-y divide-gray-200">
              {completedSessions.map(session => (
                <Disclosure as="div" key={session.name} className="pt-6">
                  {({ open }) => (
                    <>
                      <dt className="text-lg">
                        <Disclosure.Button className="flex items-start justify-between w-full text-left text-gray-400">
                          <span className="font-medium text-gray-900">{session.name}</span>
                          <span className="flex items-center ml-6 h-7">
                            <ChevronDownIcon className={classNames(open ? '-rotate-180' : 'rotate-0', 'h-6 w-6 transform')} aria-hidden="true" />
                          </span>
                        </Disclosure.Button>
                      </dt>
                      <Disclosure.Panel as="dd" className="pr-12 mt-2">
                        <EditSession session={session} />
                      </Disclosure.Panel>
                    </>
                  )}
                </Disclosure>
              ))}
            </dl>
          </div>
        </SheetPagePanel>
      </div>

      {/* Captain's Logs */}
      <SheetPagePanel title="Captain's Logs">
        <div className="flow-root mt-2">
          <ListContainer
            list={campSheet.captainsLogs}
            button={{ click: () => setSlideOver({ type: SlideOverTypes.logForm, data: { sheetType: 'campaigns' } }), text: `Add a new Captain's Log` }}
            empty={{
              heading: `No Captain's Logs`,
              message: 'Get started by creating your first one now',
              button: { click: () => setSlideOver({ type: SlideOverTypes.logForm, data: { sheetType: 'campaigns' } }), text: `New Captain's Log` },
            }}
          >
            {campSheet.captainsLogs.map(log => (
              <DisplayLog key={log._id} log={log} sheetType="campaigns" />
            ))}
          </ListContainer>
        </div>
      </SheetPagePanel>
    </SheetPageContent>
  );
};

export default CampaignCampaignPage;
