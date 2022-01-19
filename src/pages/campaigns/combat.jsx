import { useSelector } from 'react-redux';

import { selectCurrentCampaign } from '../../redux/campaign/campaign.selectors';

import SheetPageContent from '../../layouts/components/sheet/SheetPageContent';

import PanelSection from '../../components/shared/PanelSection';

import StatsTracker from '../../components/campaigns/StatsTracker';

const CampaignCombatPage = () => {
  const campSheet = useSelector(selectCurrentCampaign);

  return (
    <SheetPageContent title="Stats Tracker" columns={1}>
      {/* Stats Tracker */}
      <PanelSection>
        <StatsTracker list={[...campSheet.players, ...campSheet.npcs]} />
      </PanelSection>
    </SheetPageContent>
  );
};

export default CampaignCombatPage;
