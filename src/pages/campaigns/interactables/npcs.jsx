import { useSelector, useDispatch } from 'react-redux';

import { selectCurrentCampaign } from '../../../redux/campaign/campaign.selectors';

import { setSlideOver } from '../../../redux/app/app.actions';

import SlideOverTypes from '../../../utils/SlideOverTypes';

import SheetPageContent from '../../../layouts/components/sheet/SheetPageContent';

import PanelSection from '../../../components/sheets/PanelSection';
import ListContainer from '../../../components/shared/data/ListContainer';

const CampaignNpcsPage = () => {
  const dispatch = useDispatch();
  const campSheet = useSelector(selectCurrentCampaign);

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
              <div>{npc._id}</div>
            ))}
          </ListContainer>
        </div>
      </PanelSection>

      {/* Selected Npc */}
      <PanelSection title="Selected Npc" colSpan={3}>
        {JSON.stringify(campSheet.npcs)}
      </PanelSection>
    </SheetPageContent>
  );
};

export default CampaignNpcsPage;
