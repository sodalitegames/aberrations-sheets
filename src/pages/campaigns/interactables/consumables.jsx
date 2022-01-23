import { useSelector, useDispatch } from 'react-redux';

import { selectCurrentCampaign } from '../../../redux/campaign/campaign.selectors';

import { setSlideOver } from '../../../redux/app/app.actions';

import SlideOverTypes from '../../../utils/SlideOverTypes';

import SheetPageContent from '../../../layouts/components/sheet/SheetPageContent';

import PanelSection from '../../../components/shared/PanelSection';
import ListContainer from '../../../components/shared/ListContainer';

import Consumable from '../../../components/characters/display/Consumable';

const CampaignConsumablesPage = () => {
  const dispatch = useDispatch();
  const campSheet = useSelector(selectCurrentCampaign);

  return (
    <SheetPageContent title="Consumables" columns={4}>
      {/* All Consumables */}
      <PanelSection title="Manage Consumables">
        <div className="flow-root mt-2">
          <ListContainer
            list={campSheet.consumables}
            button={{ click: () => dispatch(setSlideOver({ type: SlideOverTypes.consumableForm, data: { sheetType: 'campaigns' } })), text: 'Add a new Consumable' }}
            empty={{
              heading: 'No Consumables',
              message: 'This feature is coming soon...',
              // button: { click: () => dispatch(setSlideOver({ type: SlideOverTypes.consumableForm, data: {sheetType: 'campaigns'} })), text: 'New Consumable' },
            }}
          >
            {campSheet.consumables.map(consumable => (
              <Consumable key={consumable._id} consumable={consumable} />
            ))}
          </ListContainer>
        </div>
      </PanelSection>

      {/* Selected Consumable */}
      <PanelSection title="Selected Consumable" colSpan={3}>
        {JSON.stringify(campSheet.consumables)}
      </PanelSection>
    </SheetPageContent>
  );
};

export default CampaignConsumablesPage;
