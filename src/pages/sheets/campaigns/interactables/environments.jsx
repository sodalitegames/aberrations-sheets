import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useSearchParams } from 'react-router-dom';

import { selectCurrentCampaign, selectEnvironments, selectArchivedEnvironments } from '../../../../redux/campaign/campaign.selectors';

import { setModal, setSlideOver } from '../../../../redux/app/app.actions';
import { updateSheetResourceStart } from '../../../../redux/sheet/sheet.actions';

import SlideOverTypes from '../../../../utils/SlideOverTypes';
import ModalTypes from '../../../../utils/ModalTypes';

import SheetPageContent from '../../../../layouts/components/sheet/SheetPageContent';

import SheetPagePanel from '../../../../layouts/components/sheet/SheetPagePanel';
import ListInteractables, { ListInteractablesMessage } from '../../../../components/sections/ListInteractables';

import Button from '../../../../components/Button';

import DisplayEnvironment from '../../../../components/display/DisplayEnvironment';

const CampaignEnvironmentsPage = () => {
  const dispatch = useDispatch();
  const [searchParams] = useSearchParams();

  const campSheet = useSelector(selectCurrentCampaign);

  const environments = useSelector(selectEnvironments);
  const archivedEnvironments = useSelector(selectArchivedEnvironments);

  const [environment, setEnvironment] = useState(null);
  const [id, setId] = useState(null);

  const [environmentsList, setEnvironmentsList] = useState([]);

  useEffect(() => {
    // First, clear out currently selected
    setEnvironment(null);
    setId(null);

    switch (searchParams.get('show')) {
      case 'archived':
        setEnvironmentsList(archivedEnvironments);
        return;

      case 'active':
        setEnvironmentsList(environments.filter(envir => envir.active));
        return;

      case 'inactive':
        setEnvironmentsList(environments.filter(envir => !envir.active));
        return;

      default:
        setEnvironmentsList(environments);
        return;
    }
  }, [searchParams, archivedEnvironments, environments]);

  useEffect(() => {
    if (environmentsList.length) {
      if (id) {
        setEnvironment(environmentsList.find(envir => envir._id === id));
        return;
      }

      setEnvironment(environmentsList[0]);
      setId(environmentsList[0]._id);
    }
  }, [id, environmentsList]);

  return (
    <SheetPageContent title="Npcs" columns={4}>
      {/* Showing Archived Weapons Notice */}
      <ListInteractablesMessage show={searchParams.get('show')} interactableType="environments" />

      {/* Environments List */}
      <SheetPagePanel title="Manage Environments">
        <div className="flow-root mt-2">
          <ListInteractables sheetType="campaigns" interactableType="environments" id={id} setId={setId} interactablesList={environmentsList} label="Environment" show={searchParams.get('show')} />
        </div>
      </SheetPagePanel>

      {/* Selected Environment */}
      <SheetPagePanel title="Selected Environment" colSpan={3}>
        {environment ? (
          <div className="grid grid-cols-3 gap-8 divide-x divide-gray-200">
            <div className="col-span-2">
              <DisplayEnvironment environment={environment} />
            </div>

            <div className="col-span-1 pl-8 space-y-4">
              {/* Activate or Deactivate */}
              <Button
                dark={environment.active}
                onClick={() =>
                  dispatch(
                    updateSheetResourceStart(
                      'campaigns',
                      campSheet._id,
                      'environments',
                      environment._id,
                      { active: !environment.active },
                      {
                        notification: {
                          status: 'success',
                          heading: `Environment ${environment.active ? 'Deactivated' : 'Activated'}`,
                          message: `You have successfully ${environment.active ? 'deactivated' : 'activated'} ${environment.name}.`,
                        },
                      }
                    )
                  )
                }
              >
                {environment.active ? 'Deactivate' : 'Activate'}
              </Button>

              {/* Edit */}
              <Button onClick={() => dispatch(setSlideOver({ type: SlideOverTypes.environmentForm, id: environment._id }))}>Edit</Button>

              {/* Archive or Restore */}
              <Button
                onClick={() =>
                  dispatch(
                    updateSheetResourceStart(
                      'campaigns',
                      campSheet._id,
                      'environments',
                      environment._id,
                      { archived: !environment.archived, active: false },
                      {
                        notification: {
                          status: 'success',
                          heading: `Environment ${environment.archived ? 'Restored' : 'Archived'}`,
                          message: `You have successfully ${environment.archived ? 'restored' : 'archived'} ${environment.name}.`,
                        },
                      }
                    )
                  )
                }
              >
                {environment.archived ? 'Restore' : 'Archive'}
              </Button>

              {/* Delete */}
              {environment.archived ? (
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
                          notification: { heading: 'Environment Deleted', message: `You have successfully deleted ${environment.name}.` },
                        },
                      })
                    )
                  }
                >
                  Delete
                </Button>
              ) : null}
            </div>
          </div>
        ) : (
          <p className="text-sm italic text-gray-400">Please create or select an environment to get started.</p>
        )}
      </SheetPagePanel>
    </SheetPageContent>
  );
};

export default CampaignEnvironmentsPage;
