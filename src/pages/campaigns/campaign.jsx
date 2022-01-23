import { useSelector, useDispatch } from 'react-redux';

import { Disclosure } from '@headlessui/react';
import { ChevronDownIcon } from '@heroicons/react/outline';

import { selectCurrentCampaign, selectActiveSession, selectFutureSessions, selectCompletedSessions } from '../../redux/campaign/campaign.selectors';

import { setSlideOver } from '../../redux/app/app.actions';

import SlideOverTypes from '../../utils/SlideOverTypes';
import classNames from '../../utils/classNames';

import SheetPageContent from '../../layouts/components/sheet/SheetPageContent';

import PanelSection from '../../components/sheets/PanelSection';
import InfoList from '../../components/shared/data/InfoList';
import { ButtonPanel } from '../../components/shared/data/ListItem';
import ListContainer from '../../components/shared/data/ListContainer';
import Button from '../../components/shared/Button';

import DisplayLog from '../../components/sheets/display/DisplayLog';
import SessionDetails from '../../components/campaigns/SessionDetails';

const CampaignCampaignPage = () => {
  const dispatch = useDispatch();

  const campSheet = useSelector(selectCurrentCampaign);
  const activeSession = useSelector(selectActiveSession);
  const futureSessions = useSelector(selectFutureSessions);
  const completedSessions = useSelector(selectCompletedSessions);

  return (
    <SheetPageContent title="Campaign" columns={4}>
      <div className="space-y-4">
        {/* Campaign Overview */}
        <PanelSection title="Campaign Overview">
          <div className="flow-root">
            <InfoList list={[campSheet.overview]} />
            <ButtonPanel editable={{ type: SlideOverTypes.campOverviewForm }} />
          </div>
        </PanelSection>

        {/* Campaign Details */}
        <PanelSection title="Campaign Details">
          <div className="flow-root">
            <InfoList list={[campSheet.details]} />
            <ButtonPanel editable={{ type: SlideOverTypes.campDetailsForm }} />
          </div>
        </PanelSection>
      </div>

      <div className="grid grid-cols-1 md:col-span-2 space-y-4">
        {/* Session Planning */}
        <PanelSection>
          <div className="sm:flex sm:items-center sm:justify-between py-2">
            <div className="sm:flex sm:space-x-5">
              <div className="mt-4 text-center sm:mt-0 sm:text-left">
                <p className="text-xl font-bold text-gray-900 sm:text-2xl">Session Planning</p>
              </div>
            </div>
            <div className="ml-5 mt-5 flex flex-col shrink-0 justify-center sm:mt-0 space-y-2">
              <Button onClick={() => dispatch(setSlideOver({ type: SlideOverTypes.newSession }))} disabled>
                Create New Session
              </Button>
            </div>
          </div>
        </PanelSection>

        {/* Active Session */}
        <PanelSection title="Active Session">
          <div className="flow-root">
            {activeSession ? (
              <dl className="space-y-6 divide-y divide-gray-200">
                <Disclosure as="div" key={activeSession.name} className="pt-6">
                  {({ open }) => (
                    <>
                      <dt className="text-lg">
                        <Disclosure.Button className="text-left w-full flex justify-between items-start text-gray-400">
                          <span className="font-medium text-gray-900">{activeSession.name}</span>
                          <span className="ml-6 h-7 flex items-center">
                            <ChevronDownIcon className={classNames(open ? '-rotate-180' : 'rotate-0', 'h-6 w-6 transform')} aria-hidden="true" />
                          </span>
                        </Disclosure.Button>
                      </dt>
                      <Disclosure.Panel as="dd" className="mt-2 pr-12">
                        <SessionDetails session={activeSession} />
                      </Disclosure.Panel>
                    </>
                  )}
                </Disclosure>
              </dl>
            ) : null}
          </div>
        </PanelSection>

        {/* Future Sessions */}
        <PanelSection title="Future Sessions">
          <div className="flow-root">
            <dl className="space-y-6 divide-y divide-gray-200">
              {futureSessions.map(session => (
                <Disclosure as="div" key={session.name} className="pt-6">
                  {({ open }) => (
                    <>
                      <dt className="text-lg">
                        <Disclosure.Button className="text-left w-full flex justify-between items-start text-gray-400">
                          <span className="font-medium text-gray-900">{session.name}</span>
                          <span className="ml-6 h-7 flex items-center">
                            <ChevronDownIcon className={classNames(open ? '-rotate-180' : 'rotate-0', 'h-6 w-6 transform')} aria-hidden="true" />
                          </span>
                        </Disclosure.Button>
                      </dt>
                      <Disclosure.Panel as="dd" className="mt-2 pr-12">
                        <SessionDetails session={session} />
                      </Disclosure.Panel>
                    </>
                  )}
                </Disclosure>
              ))}
            </dl>
          </div>
        </PanelSection>

        {/* Completed Sessions */}
        <PanelSection title="Completed Sessions">
          <div className="flow-root">
            <dl className="space-y-6 divide-y divide-gray-200">
              {completedSessions.map(session => (
                <Disclosure as="div" key={session.name} className="pt-6">
                  {({ open }) => (
                    <>
                      <dt className="text-lg">
                        <Disclosure.Button className="text-left w-full flex justify-between items-start text-gray-400">
                          <span className="font-medium text-gray-900">{session.name}</span>
                          <span className="ml-6 h-7 flex items-center">
                            <ChevronDownIcon className={classNames(open ? '-rotate-180' : 'rotate-0', 'h-6 w-6 transform')} aria-hidden="true" />
                          </span>
                        </Disclosure.Button>
                      </dt>
                      <Disclosure.Panel as="dd" className="mt-2 pr-12">
                        <SessionDetails session={session} />
                      </Disclosure.Panel>
                    </>
                  )}
                </Disclosure>
              ))}
            </dl>
          </div>
        </PanelSection>
      </div>

      {/* Captain's Logs */}
      <PanelSection title="Captain's Logs">
        <div className="flow-root mt-2">
          <ListContainer
            list={campSheet.captainsLogs}
            button={{ click: () => dispatch(setSlideOver({ type: SlideOverTypes.logForm, data: { sheetType: 'campaigns' } })), text: `Add a new Captain's Log` }}
            empty={{
              heading: `No Captain's Logs`,
              message: 'Get started by creating your first one now',
              button: { click: () => dispatch(setSlideOver({ type: SlideOverTypes.logForm, data: { sheetType: 'campaigns' } })), text: `New Captain's Log` },
            }}
          >
            {campSheet.captainsLogs.map(log => (
              <DisplayLog key={log._id} log={log} sheetType="campaigns" />
            ))}
          </ListContainer>
        </div>
      </PanelSection>
    </SheetPageContent>
  );
};

export default CampaignCampaignPage;
