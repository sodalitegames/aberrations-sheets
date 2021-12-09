import { useSelector } from 'react-redux';

import { selectCurrentCampaign } from '../../redux/campaign/campaign.selectors';

import SheetPageContent from '../../layouts/components/sheet/SheetPageContent';

import PanelSection from '../../components/shared/PanelSection';

import StatsTracker from '../../components/campaigns/StatsTracker';

const CampaignStatsTrackerPage = () => {
  const campSheet = useSelector(selectCurrentCampaign);

  return (
    <SheetPageContent title="Stats Tracker" columns={1}>
      <PanelSection title="Stats Tracker">
        <div className="flow-root mt-2">
          <StatsTracker list={[...campSheet.players, ...campSheet.npcs]} />
        </div>
      </PanelSection>
    </SheetPageContent>
  );
};

export default CampaignStatsTrackerPage;
