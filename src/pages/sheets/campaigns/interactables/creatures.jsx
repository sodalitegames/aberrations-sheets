import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { CheckCircleIcon } from '@heroicons/react/outline';

import { selectCurrentCampaign } from '../../../../redux/campaign/campaign.selectors';

import { setModal, setSlideOver } from '../../../../redux/app/app.actions';
import { updateSheetResourceStart } from '../../../../redux/sheet/sheet.actions';

import SlideOverTypes from '../../../../utils/SlideOverTypes';
import ModalTypes from '../../../../utils/ModalTypes';
import classNames from '../../../../utils/classNames';

import SheetPageContent from '../../../../layouts/components/sheet/SheetPageContent';

import SheetPagePanel from '../../../../layouts/components/sheet/SheetPagePanel';
import ListContainer from '../../../../components/data/ListContainer';

import Button from '../../../../components/Button';

import DisplayCreature from '../../../../components/display/DisplayCreature';

const CampaignCreaturesPage = () => {
  const dispatch = useDispatch();
  const campSheet = useSelector(selectCurrentCampaign);

  const [creature, setCreature] = useState(null);
  const [id, setId] = useState(null);

  useEffect(() => {
    if (id) {
      setCreature(campSheet.creatures.find(crea => crea._id === id));
      return;
    }

    setCreature(campSheet.creatures[0]);
    setId(campSheet.creatures[0]?._id);
  }, [id, campSheet]);

  return (
    <SheetPageContent title="Npcs" columns={4}>
      {/* All Creatures */}
      <SheetPagePanel title="Manage Creatures">
        <div className="flow-root mt-2">
          <ListContainer
            list={campSheet.creatures}
            button={{ click: () => dispatch(setSlideOver({ type: SlideOverTypes.creatureForm })), text: 'Add a new Creature' }}
            empty={{
              heading: 'No Creatures',
              message: 'Get started by creating your first one now',
              button: { click: () => dispatch(setSlideOver({ type: SlideOverTypes.creatureForm })), text: 'New Creature' },
            }}
          >
            {campSheet.creatures.map(creature => (
              <div
                key={creature._id}
                className={classNames('flex justify-between items-center px-2 cursor-pointer', id === creature._id ? 'bg-gray-100' : 'hover:bg-gray-50')}
                onClick={() => setId(creature._id)}
              >
                <DisplayCreature key={creature._id} creature={creature} condensed listItem />
                {creature.active ? (
                  <div className="ml-2 shrink-0" title="Active">
                    <CheckCircleIcon className="w-6 h-6 text-green-600" aria-hidden="true" />
                  </div>
                ) : null}
              </div>
            ))}
          </ListContainer>
        </div>
      </SheetPagePanel>

      {/* Selected Creature */}
      <SheetPagePanel title="Selected Creature" colSpan={3}>
        {creature ? (
          <div className="grid grid-cols-3 gap-8 divide-x divide-gray-200">
            <div className="col-span-2">
              <DisplayCreature creature={creature} />
            </div>

            <div className="col-span-1 pl-8 space-y-4">
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
              <Button onClick={() => dispatch(setSlideOver({ type: SlideOverTypes.creatureForm, id: creature._id }))}>Edit</Button>
              <Button
                alert
                onClick={() =>
                  dispatch(
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
                  )
                }
              >
                Delete
              </Button>
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
