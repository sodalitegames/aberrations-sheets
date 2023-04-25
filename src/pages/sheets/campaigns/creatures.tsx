import { useSelector, useDispatch } from 'react-redux';
import { useSearchParams } from 'react-router-dom';

import { selectCurrentCampaign, selectCreatures, selectArchivedCreatures } from '../../../redux/campaign/campaign.selectors';

import { updateSheetResourceStart } from '../../../redux/sheet/sheet.actions';

import { useActions } from '../../../hooks/useActions';

import SlideOverTypes from '../../../utils/SlideOverTypes';
import ModalTypes from '../../../utils/ModalTypes';

import Button from '../../../components/Button';

import InteractablesPageContent from '../../../components/content/InteractablesPageContent';

import InteractableActions from '../../../components/content/InteractableActions';
import DisplayCreature from '../../../components/display/DisplayCreature';

import { EntityType, InteractableType, SheetResourceType, SheetType } from '../../../models/sheet';

const CampaignCreaturesPage = () => {
  const dispatch = useDispatch();
  const [searchParams] = useSearchParams();
  const { setModal, setSlideOver } = useActions();

  const campSheet = useSelector(selectCurrentCampaign)!;

  const creatures = useSelector(selectCreatures);
  const archivedCreatures = useSelector(selectArchivedCreatures);

  const show = searchParams.get('show');
  const id = searchParams.get('id');

  const list = show === 'archived' ? archivedCreatures : creatures;
  const creature = list.find(crea => crea._id === id) || list[0];

  const Display = creature ? () => <DisplayCreature creature={creature} /> : null;
  const Actions = creature
    ? () => (
        <>
          {/* Edit */}
          <div className="pb-4 mb-4 border-b border-gray-200">
            <Button onClick={() => setSlideOver({ type: SlideOverTypes.creatureForm, data: { sheetId: campSheet._id, creature } })}>Edit</Button>
          </div>

          {/* Creature Actions */}
          <InteractableActions type={EntityType.creatures} entity={creature} />

          {/* Activate or Deactivate */}
          {!creature.archived && (
            <div className="pt-4 mt-4 border-t border-gray-200">
              <Button
                dark={creature.active}
                onClick={() =>
                  dispatch(
                    updateSheetResourceStart(
                      SheetType.campaigns,
                      campSheet._id,
                      SheetResourceType.creatures,
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
                    SheetResourceType.creatures,
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
                    data: {
                      sheetType: 'campaigns',
                      resourceType: 'creatures',
                      resource: creature,
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
        </>
      )
    : null;

  return (
    <InteractablesPageContent
      sheetType={SheetType.campaigns}
      sheetId={campSheet._id}
      show={show}
      id={creature?._id}
      list={list}
      type={InteractableType.creatures}
      label="Creature"
      interactable={creature}
      Display={Display}
      Actions={Actions}
    />
  );
};

export default CampaignCreaturesPage;
