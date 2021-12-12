import { useSelector, useDispatch } from 'react-redux';

import { selectCurrentCampaign } from '../../redux/campaign/campaign.selectors';

import { setSlideOver } from '../../redux/app/app.actions';

import SlideOverTypes from '../../utils/SlideOverTypes';

import SheetPageContent from '../../layouts/components/sheet/SheetPageContent';

import PanelSection from '../../components/shared/PanelSection';
import InfoList from '../../components/shared/InfoList';
import { ButtonPanel } from '../../components/shared/ListItem';
import ListContainer from '../../components/shared/ListContainer';

import CaptainsLog from '../../components/campaigns/display/CaptainsLog';

const CampaignCampaignPage = () => {
  const dispatch = useDispatch();

  const campSheet = useSelector(selectCurrentCampaign);

  return (
    <SheetPageContent title="Campaign" columns={4}>
      <div className="space-y-4">
        <PanelSection title="Campaign Overview">
          <div className="flow-root">
            <InfoList list={[campSheet.overview]} />
            <ButtonPanel editable={{ type: SlideOverTypes.campOverviewForm }} />
          </div>
        </PanelSection>

        <PanelSection title="Campaign Details">
          <div className="flow-root">
            <InfoList list={[campSheet.details]} />
            <ButtonPanel editable={{ type: SlideOverTypes.campDetailsForm }} />
          </div>
        </PanelSection>
      </div>

      <PanelSection colSpan={2} title="Past and Future Sessions">
        <div className="flow-root">{JSON.stringify(campSheet.sessions)}</div>
      </PanelSection>

      <PanelSection title="Captain's Logs">
        <div className="flow-root mt-2">
          <ListContainer
            list={campSheet.captainsLogs}
            button={{ click: () => dispatch(setSlideOver({ type: SlideOverTypes.captainsLogForm })), text: `Add a new Captain's Log` }}
            empty={{
              heading: `No Captain's Logs`,
              message: 'Get started by creating your first one now',
              button: { click: () => dispatch(setSlideOver({ type: SlideOverTypes.captainsLogForm })), text: `New Captain's Log` },
            }}
          >
            {campSheet.captainsLogs.map(log => (
              <CaptainsLog key={log._id} log={log} />
            ))}
          </ListContainer>
        </div>
      </PanelSection>
    </SheetPageContent>
  );
};

export default CampaignCampaignPage;
