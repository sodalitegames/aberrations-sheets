import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { CheckCircleIcon } from '@heroicons/react/outline';

import { selectCurrentCampaign } from '../../../redux/campaign/campaign.selectors';

import { setModal, setSlideOver } from '../../../redux/app/app.actions';
import { updateSheetResourceStart } from '../../../redux/sheet/sheet.actions';

import SlideOverTypes from '../../../utils/SlideOverTypes';
import ModalTypes from '../../../utils/ModalTypes';
import classNames from '../../../utils/classNames';

import SheetPageContent from '../../../layouts/components/sheet/SheetPageContent';

import PanelSection from '../../../components/sheets/PanelSection';
import ListContainer from '../../../components/shared/data/ListContainer';

import Button from '../../../components/shared/Button';

import DisplayEnvironment from '../../../components/campaigns/display/DisplayEnvironment';

const CampaignEnvironmentsPage = () => {
  const dispatch = useDispatch();
  const campSheet = useSelector(selectCurrentCampaign);

  const [environment, setEnvironment] = useState(null);
  const [id, setId] = useState(null);

  useEffect(() => {
    if (id) {
      setEnvironment(campSheet.environments.find(envir => envir._id === id));
      return;
    }

    setEnvironment(campSheet.environments[0]);
  }, [id, campSheet]);

  console.log(environment);

  return (
    <SheetPageContent title="Npcs" columns={4}>
      {/* All Environments */}
      <PanelSection title="Manage Environments">
        <div className="flow-root mt-2">
          <ListContainer
            list={campSheet.environments}
            button={{ click: () => dispatch(setSlideOver({ type: SlideOverTypes.environmentForm })), text: 'Add a new Environment' }}
            empty={{
              heading: 'No Environments',
              message: 'Get started by creating your first one now',
              button: { click: () => dispatch(setSlideOver({ type: SlideOverTypes.environmentForm })), text: 'New Environment' },
            }}
          >
            {campSheet.environments.map(environment => (
              <div key={environment._id} className={classNames('flex justify-between items-center hover:bg-gray-50 px-2 cursor-pointer')} onClick={() => setId(environment._id)}>
                <DisplayEnvironment key={environment._id} environment={environment} condensed listItem />
                {environment.active ? (
                  <div className="shrink-0 ml-2" title="Active">
                    <CheckCircleIcon className="h-6 w-6 text-green-600" aria-hidden="true" />
                  </div>
                ) : null}
              </div>
            ))}
          </ListContainer>
        </div>
      </PanelSection>

      {/* Selected Environment */}
      <PanelSection title="Selected Environment" colSpan={3}>
        {environment ? (
          <div className="grid gap-8 grid-cols-3 divide-x divide-gray-200">
            <div className="col-span-2">
              <DisplayEnvironment environment={environment} />
            </div>

            <div className="col-span-1 space-y-4 pl-8">
              <Button onClick={() => dispatch(updateSheetResourceStart('campaigns', campSheet._id, 'environments', environment._id, { active: !environment.active }))}>
                {environment.active ? 'Deactivate' : 'Activate'}
              </Button>
              <Button onClick={() => dispatch(setSlideOver({ type: SlideOverTypes.environmentForm, id: environment._id }))}>Edit</Button>
              <Button
                alert
                onClick={() =>
                  dispatch(
                    setModal({
                      type: ModalTypes.deleteResource,
                      id: environment._id,
                      data: {
                        sheetType: 'campaigns',
                        resourceType: 'environments',
                        title: `Are you sure you want to delete ${environment.name}?`,
                        submitText: `Yes, delete ${environment.name}`,
                      },
                    })
                  )
                }
              >
                Delete
              </Button>
            </div>
          </div>
        ) : (
          <p className="text-sm italic text-gray-400">Please create or select an environment to get started.</p>
        )}
      </PanelSection>
    </SheetPageContent>
  );
};

export default CampaignEnvironmentsPage;
