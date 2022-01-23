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

// import DisplayNpc from '../../../components/campaigns/display/DisplayNpc';

const CampaignNpcsPage = () => {
  const dispatch = useDispatch();
  const campSheet = useSelector(selectCurrentCampaign);

  const [npc, setNpc] = useState(campSheet.npcs[0]);

  console.log(npc);

  return (
    <SheetPageContent title="Npcs" columns={4}>
      {/* All Npcs */}
      <PanelSection title="Manage Npcs">
        <div className="flow-root mt-2">
          <ListContainer
            list={campSheet.npcs}
            button={{ click: () => dispatch(setSlideOver({ type: SlideOverTypes.npcForm })), text: 'Add a new Npc' }}
            empty={{
              heading: 'No Npcs',
              message: 'This feature is coming soon...',
              // button: { click: () => dispatch(setSlideOver({ type: SlideOverTypes.npcForm })), text: 'New Npc' },
            }}
          >
            {campSheet.npcs.map(npc => (
              <div key={npc._id} className={classNames('flex justify-between items-center hover:bg-gray-50 px-2 cursor-pointer', npc.equipped ? '' : '')} onClick={() => setNpc(npc)}>
                {/* <DisplayNpc key={npc._id} npc={npc} condensed listItem /> */}
                {npc.equipped ? (
                  <div className="shrink-0 ml-2" title="Equipped">
                    <CheckCircleIcon className="h-6 w-6 text-green-600" aria-hidden="true" />
                  </div>
                ) : null}
              </div>
            ))}
          </ListContainer>
        </div>
      </PanelSection>

      {/* Selected Npc */}
      <PanelSection title="Selected Npc" colSpan={3}>
        {npc ? (
          <div className="grid gap-8 grid-cols-3 divide-x divide-gray-200">
            <div className="col-span-2">{/* <DisplayNpc npc={npc} /> */}</div>

            <div className="col-span-1 space-y-4 pl-8">
              <Button>{npc.active ? 'Deactivate' : 'Activate'}</Button>
              <Button onClick={() => dispatch(setSlideOver({ type: SlideOverTypes.npcForm, id: npc._id }))}>Edit</Button>
              <Button
                alert
                onClick={() =>
                  dispatch(
                    setModal({
                      type: ModalTypes.deleteResource,
                      id: npc._id,
                      data: {
                        sheetType: 'campaigns',
                        resourceType: 'npcs',
                        title: `Are you sure you want to delete ${npc.name}?`,
                        submitText: `Yes, delete ${npc.name}`,
                        equipped: npc.equipped,
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
          <p className="text-sm italic text-gray-400">Please create or select an npc to get started.</p>
        )}
      </PanelSection>
    </SheetPageContent>
  );
};

export default CampaignNpcsPage;
