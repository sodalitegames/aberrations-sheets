import { useSelector } from 'react-redux';

import { selectCurrentCampaign } from '../../../redux/campaign/campaign.selectors';

import SheetPageContent from '../../../layouts/components/sheet/SheetPageContent';

import SheetPagePanel from '../../../layouts/components/sheet/SheetPagePanel';

import StatsTracker from '../../../components/sections/StatsTracker';

const CampaignCombatPage = () => {
  const campSheet = useSelector(selectCurrentCampaign);

  return (
    <SheetPageContent title="Stats Tracker" columns={1}>
      {/* Stats Tracker */}
      <SheetPagePanel title="Players">
        <StatsTracker list={campSheet.players} />
      </SheetPagePanel>

      <SheetPagePanel title="Npcs">
        <StatsTracker list={campSheet.npcs} />
      </SheetPagePanel>
    </SheetPageContent>
  );
};

export default CampaignCombatPage;
