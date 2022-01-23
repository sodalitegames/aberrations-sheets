import { useSelector, useDispatch } from 'react-redux';

import { selectCurrentCampaign } from '../../../redux/campaign/campaign.selectors';

import { setSlideOver } from '../../../redux/app/app.actions';

import SlideOverTypes from '../../../utils/SlideOverTypes';

import SheetPageContent from '../../../layouts/components/sheet/SheetPageContent';

import PanelSection from '../../../components/sheets/PanelSection';
import ListContainer from '../../../components/shared/data/ListContainer';

const CampaignEnvironmentsPage = () => {
  const dispatch = useDispatch();
  const campSheet = useSelector(selectCurrentCampaign);

  return (
    <SheetPageContent title="Npcs" columns={4}>
      {/* All Environments */}
      <PanelSection title="Manage Environments">
        <div className="flow-root mt-2">
          <ListContainer
            list={campSheet.environments}
            button={{ click: () => dispatch(setSlideOver({ type: SlideOverTypes.environmentForm })), text: 'Add a new Environment' }}
            empty={{
              heading: 'No Environments',
              message: 'This feature is coming soon...',
              // button: { click: () => dispatch(setSlideOver({ type: SlideOverTypes.environmentForm })), text: 'New Environment' },
            }}
          >
            {campSheet.environments.map(environment => (
              <div>{environment._id}</div>
            ))}
          </ListContainer>
        </div>
      </PanelSection>

      {/* Selected Environment */}
      <PanelSection title="Selected Environment" colSpan={3}>
        {JSON.stringify(campSheet.environments)}
      </PanelSection>
    </SheetPageContent>
  );
};

export default CampaignEnvironmentsPage;
