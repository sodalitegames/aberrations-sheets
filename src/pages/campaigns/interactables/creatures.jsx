import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { CheckCircleIcon } from '@heroicons/react/outline';

import { selectCurrentCampaign } from '../../../redux/campaign/campaign.selectors';

import { setModal, setSlideOver } from '../../../redux/app/app.actions';

import SlideOverTypes from '../../../utils/SlideOverTypes';
import ModalTypes from '../../../utils/ModalTypes';
import classNames from '../../../utils/classNames';

import SheetPageContent from '../../../layouts/components/sheet/SheetPageContent';

import PanelSection from '../../../components/sheets/PanelSection';
import ListContainer from '../../../components/shared/data/ListContainer';

import Button from '../../../components/shared/Button';

// import DisplayCreature from '../../../components/campaigns/display/DisplayCreature';

const CampaignCreaturesPage = () => {
  const dispatch = useDispatch();
  const campSheet = useSelector(selectCurrentCampaign);

  const [creature, setCreature] = useState(campSheet.creatures[0]);

  console.log(creature);

  return (
    <SheetPageContent title="Npcs" columns={4}>
      {/* All Creatures */}
      <PanelSection title="Manage Creatures">
        <div className="flow-root mt-2">
          <ListContainer
            list={campSheet.creatures}
            button={{ click: () => dispatch(setSlideOver({ type: SlideOverTypes.creatureForm })), text: 'Add a new Creature' }}
            empty={{
              heading: 'No Creatures',
              message: 'This feature is coming soon...',
              // button: { click: () => dispatch(setSlideOver({ type: SlideOverTypes.creatureForm })), text: 'New Creature' },
            }}
          >
            {campSheet.creatures.map(creature => (
              <div
                key={creature._id}
                className={classNames('flex justify-between items-center hover:bg-gray-50 px-2 cursor-pointer', creature.equipped ? '' : '')}
                onClick={() => setCreature(creature)}
              >
                {/* <DisplayCreature key={creature._id} creature={creature} condensed listItem /> */}
                {creature.equipped ? (
                  <div className="shrink-0 ml-2" title="Equipped">
                    <CheckCircleIcon className="h-6 w-6 text-green-600" aria-hidden="true" />
                  </div>
                ) : null}
              </div>
            ))}
          </ListContainer>
        </div>
      </PanelSection>

      {/* Selected Creature */}
      <PanelSection title="Selected Creature" colSpan={3}>
        {creature ? (
          <div className="grid gap-8 grid-cols-3 divide-x divide-gray-200">
            <div className="col-span-2">{/* <DisplayCreature creature={creature} /> */}</div>

            <div className="col-span-1 space-y-4 pl-8">
              <Button>{creature.active ? 'Deactivate' : 'Activate'}</Button>
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
                        equipped: creature.equipped,
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
      </PanelSection>
    </SheetPageContent>
  );
};

export default CampaignCreaturesPage;
