import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useSearchParams } from 'react-router-dom';

import { selectCurrentCampaign, selectNpcs, selectArchivedNpcs } from '../../../redux/campaign/campaign.selectors';

import { useActions } from '../../../hooks/useActions';

import { updateSheetResourceStart } from '../../../redux/sheet/sheet.actions';

import { useResource } from '../../../hooks/useResource';

import SlideOverTypes from '../../../utils/SlideOverTypes';
import ModalTypes from '../../../utils/ModalTypes';
import { ResourceType } from '../../../models/enums';

import SheetPageContent from '../../../layouts/components/sheet/SheetPageContent';

import SheetPagePanel from '../../../layouts/components/sheet/SheetPagePanel';
import ListInteractables, { ListInteractablesMessage } from '../../../components/sections/ListInteractables';

import Button from '../../../components/Button';

import DisplayNpc from '../../../components/display/DisplayNpc';

const CampaignNpcsPage = () => {
  const dispatch = useDispatch();
  const [searchParams] = useSearchParams();
  const { setModal, setSlideOver } = useActions();

  const campSheet = useSelector(selectCurrentCampaign);

  const npcs = useSelector(selectNpcs);
  const archivedNpcs = useSelector(selectArchivedNpcs);

  const species = useResource(ResourceType.Species);

  const [npc, setNpc] = useState(null);
  const [id, setId] = useState(null);

  const [npcsList, setNpcsList] = useState([]);

  useEffect(() => {
    // First, clear out currently selected
    setNpc(null);
    setId(null);

    switch (searchParams.get('show')) {
      case 'archived':
        setNpcsList(archivedNpcs);
        return;

      case 'active':
        setNpcsList(npcs.filter(envir => envir.active));
        return;

      case 'inactive':
        setNpcsList(npcs.filter(envir => !envir.active));
        return;

      default:
        setNpcsList(npcs);
        return;
    }
  }, [searchParams, archivedNpcs, npcs]);

  useEffect(() => {
    if (npcsList.length) {
      if (id) {
        setNpc(npcsList.find(npc => npc._id === id));
        return;
      }

      setNpc(npcsList[0]);
      setId(npcsList[0]._id);
    }
  }, [id, npcsList]);

  return (
    <SheetPageContent title="Npcs" columns={4}>
      {/* Npcs List */}
      <SheetPagePanel title="Manage Npcs">
        <div className="flow-root mt-2">
          <ListInteractables sheetType="campaigns" interactableType="npcs" id={id} setId={setId} interactablesList={npcsList} label="Npc" show={searchParams.get('show')} />
        </div>
        {/* Showing Archived Npcs Notice */}
        <ListInteractablesMessage show={searchParams.get('show')} interactableType="npcs" />
      </SheetPagePanel>

      {/* Selected Npc */}
      <SheetPagePanel title="Selected Npc" colSpan={3}>
        {npc ? (
          <div className="grid grid-cols-3 gap-8 divide-x divide-gray-200">
            <div className="col-span-2">
              <DisplayNpc npc={npc} species={species} />
            </div>

            <div className="col-span-1 pl-8 space-y-4">
              {/* Edit */}
              <div className="pb-4 mb-4 border-b border-gray-200">
                <Button onClick={() => setSlideOver({ type: SlideOverTypes.npcForm, id: npc._id })}>Edit</Button>
              </div>

              {/* Npc Actions */}

              <Button onClick={() => setSlideOver({ type: SlideOverTypes.rollDice, data: { type: 'npc', npcId: npc._id } })}>Roll Dice</Button>

              <Button onClick={() => setModal({ type: ModalTypes.takeDamage, data: { type: 'npc', npcId: npc._id } })}>Take Damage</Button>

              <Button onClick={() => setModal({ type: ModalTypes.healDamage, data: { type: 'npc', npcId: npc._id } })}>Heal Damage</Button>

              <Button onClick={() => setModal({ type: ModalTypes.payMoney, data: { type: 'npc', npcId: npc._id } })}>Pay Money</Button>

              <Button onClick={() => setModal({ type: ModalTypes.receiveMoney, data: { type: 'npc', npcId: npc._id } })}>Recieve Money</Button>

              <Button onClick={() => setModal({ type: ModalTypes.takeARest, data: { type: 'npc', npcId: npc._id } })}>Take A Rest</Button>

              {/* Activate or Deactivate */}
              {!npc.archived && (
                <div className="pt-4 mt-4 border-t border-gray-200">
                  <Button
                    dark={npc.active}
                    onClick={() =>
                      dispatch(
                        updateSheetResourceStart(
                          'campaigns',
                          campSheet._id,
                          'npcs',
                          npc._id,
                          { active: !npc.active },
                          {
                            notification: {
                              status: 'success',
                              heading: `Npc ${npc.active ? 'Deactivated' : 'Activated'}`,
                              message: `You have successfully ${npc.active ? 'deactivated' : 'activated'} ${npc.name}.`,
                            },
                          }
                        )
                      )
                    }
                  >
                    {npc.active ? 'Deactivate' : 'Activate'}
                  </Button>
                </div>
              )}

              {/* Archive or Restore */}
              <div className="pt-4 mt-4 border-t border-gray-200">
                <Button
                  onClick={() =>
                    dispatch(
                      updateSheetResourceStart(
                        'campaigns',
                        campSheet._id,
                        'npcs',
                        npc._id,
                        { archived: !npc.archived, active: false },
                        {
                          notification: {
                            status: 'success',
                            heading: `Npc ${npc.archived ? 'Restored' : 'Archived'}`,
                            message: `You have successfully ${npc.archived ? 'restored' : 'archived'} ${npc.name}.`,
                          },
                        }
                      )
                    )
                  }
                >
                  {npc.archived ? 'Restore' : 'Archive'}
                </Button>

                {/* Delete */}
                {npc.archived ? (
                  <Button
                    alert
                    onClick={() =>
                      setModal({
                        type: ModalTypes.deleteResource,
                        id: npc._id,
                        data: {
                          sheetType: 'campaigns',
                          resourceType: 'npcs',
                          title: `Are you sure you want to delete ${npc.name}?`,
                          submitText: `Yes, delete ${npc.name}`,
                          notification: { heading: 'Npc Deleted', message: `You have successfully deleted ${npc.name}.` },
                        },
                      })
                    }
                  >
                    Delete
                  </Button>
                ) : null}
              </div>
            </div>
          </div>
        ) : (
          <p className="text-sm italic text-gray-400">Please create or select an npc to get started.</p>
        )}
      </SheetPagePanel>
    </SheetPageContent>
  );
};

export default CampaignNpcsPage;
