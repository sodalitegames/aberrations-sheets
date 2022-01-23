import { useSelector, useDispatch } from 'react-redux';

import { selectCurrentCampaign } from '../../../redux/campaign/campaign.selectors';

import { setSlideOver } from '../../../redux/app/app.actions';

import SlideOverTypes from '../../../utils/SlideOverTypes';

import SheetPageContent from '../../../layouts/components/sheet/SheetPageContent';

import PanelSection from '../../../components/shared/PanelSection';
import ListContainer from '../../../components/shared/ListContainer';

import Usable from '../../../components/characters/display/Usable';

const CampaignUsablesPage = () => {
  const dispatch = useDispatch();
  const campSheet = useSelector(selectCurrentCampaign);

  return (
    <SheetPageContent title="Usables" columns={4}>
      {/* All Usables */}
      <PanelSection title="Manage Usables">
        <div className="flow-root mt-2">
          <ListContainer
            list={campSheet.usables}
            button={{ click: () => dispatch(setSlideOver({ type: SlideOverTypes.usableForm, data: { sheetType: 'campaigns' } })), text: 'Add a new Usable' }}
            empty={{
              heading: 'No Usables',
              message: 'This feature is coming soon...',
              // button: { click: () => dispatch(setSlideOver({ type: SlideOverTypes.usableForm, data: {sheetType: 'campaigns'} })), text: 'New Usable' },
            }}
          >
            {campSheet.usables.map(usable => (
              <Usable key={usable._id} usable={usable} />
            ))}
          </ListContainer>
        </div>
      </PanelSection>

      {/* Selected Usable */}
      <PanelSection title="Selected Usable" colSpan={3}>
        {JSON.stringify(campSheet.usables)}
      </PanelSection>
    </SheetPageContent>
  );
};

export default CampaignUsablesPage;
