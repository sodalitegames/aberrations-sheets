import { useSelector, useDispatch } from 'react-redux';

import { selectCurrentCampaign } from '../../../redux/campaign/campaign.selectors';

import { setSlideOver } from '../../../redux/app/app.actions';

import SlideOverTypes from '../../../utils/SlideOverTypes';

import SheetPageContent from '../../../layouts/components/sheet/SheetPageContent';

import PanelSection from '../../../components/shared/PanelSection';
import ListContainer from '../../../components/shared/ListContainer';

const CampaignCreaturesPage = () => {
  const dispatch = useDispatch();
  const campSheet = useSelector(selectCurrentCampaign);

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
              <div>{creature._id}</div>
            ))}
          </ListContainer>
        </div>
      </PanelSection>

      {/* Selected Creature */}
      <PanelSection title="Selected Creature" colSpan={3}>
        {JSON.stringify(campSheet.creatures)}
      </PanelSection>
    </SheetPageContent>
  );
};

export default CampaignCreaturesPage;
