import { useSelector } from 'react-redux';

import { selectCurrentCampaign } from '../../redux/campaign/campaign.selectors';

import SheetPageContent from '../../layouts/components/sheet/SheetPageContent';

import PanelSection from '../../components/shared/PanelSection';
import Button from '../../components/shared/Button';

const CampaignNpcsPage = () => {
  const campSheet = useSelector(selectCurrentCampaign);

  return (
    <SheetPageContent title="Npcs" columns={4}>
      {/* All Npcs */}
      <PanelSection title="Manage Npcs">
        <div className="flow-root mt-2">
          <div className="mb-6">
            <Button>Create new Npc</Button>
          </div>
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
