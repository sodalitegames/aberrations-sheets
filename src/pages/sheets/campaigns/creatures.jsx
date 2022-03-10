import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useSearchParams } from 'react-router-dom';

import { selectCurrentCampaign, selectCreatures, selectArchivedCreatures } from '../../../redux/campaign/campaign.selectors';

import { updateSheetResourceStart } from '../../../redux/sheet/sheet.actions';

import { useActions } from '../../../hooks/useActions';

import SlideOverTypes from '../../../utils/SlideOverTypes';
import ModalTypes from '../../../utils/ModalTypes';

import SheetPageContent from '../../../layouts/components/sheet/SheetPageContent';

import SheetPagePanel from '../../../layouts/components/sheet/SheetPagePanel';
import ListInteractables, { ListInteractablesMessage } from '../../../components/sections/ListInteractables';

import Button from '../../../components/Button';

import DisplayCreature from '../../../components/display/DisplayCreature';

const CampaignCreaturesPage = () => {
  const dispatch = useDispatch();
  const [searchParams] = useSearchParams();
  const { setModal, setSlideOver } = useActions();

  const campSheet = useSelector(selectCurrentCampaign);

  const creatures = useSelector(selectCreatures);
  const archivedCreatures = useSelector(selectArchivedCreatures);

  const [creature, setCreature] = useState(null);
  const [id, setId] = useState(null);

  const [creaturesList, setCreaturesList] = useState([]);

  useEffect(() => {
    // First, clear out currently selected
    setCreature(null);
    setId(null);

    switch (searchParams.get('show')) {
      case 'archived':
        setCreaturesList(archivedCreatures);
        return;

      case 'active':
        setCreaturesList(creatures.filter(envir => envir.active));
        return;

      case 'inactive':
        setCreaturesList(creatures.filter(envir => !envir.active));
        return;

      default:
        setCreaturesList(creatures);
        return;
    }
  }, [searchParams, archivedCreatures, creatures]);

  useEffect(() => {
    if (creaturesList.length) {
      if (id) {
        setCreature(creaturesList.find(crea => crea._id === id));
        return;
      }

      setCreature(creaturesList[0]);
      setId(creaturesList[0]._id);
    }
  }, [id, creaturesList]);

  return (
    <SheetPageContent title="Creatures" columns={4}>
      {/* Creatures List */}
      <SheetPagePanel title="Manage Creatures">
        <div className="flow-root mt-2">
          <ListInteractables sheetType="campaigns" interactableType="creatures" id={id} setId={setId} interactablesList={creaturesList} label="Creature" show={searchParams.get('show')} />
        </div>
        {/* Showing Archived Creatures Notice */}
        <ListInteractablesMessage show={searchParams.get('show')} interactableType="creatures" />
      </SheetPagePanel>

      {/* Selected Creature */}
      <SheetPagePanel title="Selected Creature" colSpan={3}>
        {creature ? (
          <div className="grid grid-cols-3 gap-8 divide-x divide-gray-200">
            <div className="col-span-2">
              <DisplayCreature creature={creature} />
            </div>

            <div className="col-span-1 pl-8 space-y-4">
              {/* Activate or Deactivate */}
              {!creature.archived && (
                <Button
                  dark={creature.active}
                  onClick={() =>
                    dispatch(
                      updateSheetResourceStart(
                        'campaigns',
                        campSheet._id,
                        'creatures',
                        creature._id,
                        { active: !creature.active },
                        {
                          notification: {
                            status: 'success',
                            heading: `Creature ${creature.active ? 'Deactivated' : 'Activated'}`,
                            message: `You have successfully ${creature.active ? 'deactivated' : 'activated'} ${creature.name}.`,
                          },
                        }
                      )
                    )
                  }
                >
                  {creature.active ? 'Deactivate' : 'Activate'}
                </Button>
              )}

              {/* Edit */}
              <Button onClick={() => setSlideOver({ type: SlideOverTypes.creatureForm, id: creature._id })}>Edit</Button>

              {/* Archive or Restore */}
              <Button
                onClick={() =>
                  dispatch(
                    updateSheetResourceStart(
                      'campaigns',
                      campSheet._id,
                      'creatures',
                      creature._id,
                      { archived: !creature.archived, active: false },
                      {
                        notification: {
                          status: 'success',
                          heading: `Creature ${creature.archived ? 'Restored' : 'Archived'}`,
                          message: `You have successfully ${creature.archived ? 'restored' : 'archived'} ${creature.name}.`,
                        },
                      }
                    )
                  )
                }
              >
                {creature.archived ? 'Restore' : 'Archive'}
              </Button>

              {/* Delete */}
              {creature.archived ? (
                <Button
                  alert
                  onClick={() =>
                    setModal({
                      type: ModalTypes.deleteResource,
                      id: creature._id,
                      data: {
                        sheetType: 'campaigns',
                        resourceType: 'creatures',
                        title: `Are you sure you want to delete ${creature.name}?`,
                        submitText: `Yes, delete ${creature.name}`,
                        notification: { heading: 'Creature Deleted', message: `You have successfully deleted ${creature.name}.` },
                      },
                    })
                  }
                >
                  Delete
                </Button>
              ) : null}
            </div>
          </div>
        ) : (
          <p className="text-sm italic text-gray-400">Please create or select a creature to get started.</p>
        )}
      </SheetPagePanel>
    </SheetPageContent>
  );
};

export default CampaignCreaturesPage;
