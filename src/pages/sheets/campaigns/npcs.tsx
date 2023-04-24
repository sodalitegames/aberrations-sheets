import { useSelector, useDispatch } from 'react-redux';
import { useSearchParams } from 'react-router-dom';

import { selectCurrentCampaign, selectNpcs, selectArchivedNpcs } from '../../../redux/campaign/campaign.selectors';

import { useActions } from '../../../hooks/useActions';

import { updateSheetResourceStart } from '../../../redux/sheet/sheet.actions';

import { useResource } from '../../../hooks/useResource';

import SlideOverTypes from '../../../utils/SlideOverTypes';
import ModalTypes from '../../../utils/ModalTypes';
import { FetchedResourceType, Species } from '../../../models/resource';

import Button from '../../../components/Button';

import InteractablesPageContent from '../../../components/content/InteractablesPageContent';
import InteractableActions from '../../../components/content/InteractableActions';

import DisplayNpc from '../../../components/display/DisplayNpc';

import { InteractableType, SheetResourceType, SheetType } from '../../../models/sheet';

const CampaignNpcsPage = () => {
  const dispatch = useDispatch();
  const [searchParams] = useSearchParams();
  const { setModal, setSlideOver } = useActions();

  const campSheet = useSelector(selectCurrentCampaign)!;

  const npcs = useSelector(selectNpcs);
  const archivedNpcs = useSelector(selectArchivedNpcs);

  const species = useResource(FetchedResourceType.Species) as Species[];

  const show = searchParams.get('show');
  const id = searchParams.get('id');

  const list = show === 'archived' ? archivedNpcs : npcs;
  const npc = list.find(npc => npc._id === id) || list[0];

  const Display = () => <DisplayNpc npc={npc} species={species} />;
  const Actions = () => (
    <>
      {/* Edit */}
      <div className="pb-4 mb-4 border-b border-gray-200">
        <Button onClick={() => setSlideOver({ type: SlideOverTypes.npcForm, id: npc._id })}>Edit</Button>
      </div>

      {/* Npc Actions */}
      <InteractableActions type="npc" id={{ prop: 'npcId', value: npc._id }} entity={npc} />

      {/* Activate or Deactivate */}
      {!npc.archived && (
        <div className="pt-4 mt-4 border-t border-gray-200">
          <Button
            dark={npc.active}
            onClick={() =>
              dispatch(
                updateSheetResourceStart(
                  SheetType.campaigns,
                  campSheet._id,
                  SheetResourceType.npcs,
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
      <div className="pt-4 mt-4 space-y-4 border-t border-gray-200">
        <Button
          onClick={() =>
            dispatch(
              updateSheetResourceStart(
                SheetType.campaigns,
                campSheet._id,
                SheetResourceType.npcs,
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
    </>
  );

  return (
    <InteractablesPageContent
      sheetType={SheetType.campaigns}
      sheetId={campSheet._id}
      show={show}
      id={npc._id}
      list={list}
      type={InteractableType.npcs}
      label="Npc"
      interactable={npc}
      Display={Display}
      Actions={Actions}
    />
  );
};

export default CampaignNpcsPage;
