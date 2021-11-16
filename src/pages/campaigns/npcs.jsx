import { useRecoilValue } from 'recoil';

import { campSheetState } from '../../recoil/campaign/campaign.atoms';

import SheetPageContent from '../../layouts/components/sheet/SheetPageContent';

import PanelSection from '../../components/shared/PanelSection';
import Button from '../../components/shared/Button';

const CampaignNpcsPage = () => {
  const campSheet = useRecoilValue(campSheetState);

  return (
    <SheetPageContent title="Npcs" columns={4}>
      <PanelSection title="Manage Npcs">
        <div className="flow-root mt-2">
          <div className="mb-6">
            <Button>Create new Npc</Button>
          </div>
        </div>
      </PanelSection>
      <PanelSection title="Selected Npc" colSpan={3}>
        {JSON.stringify(campSheet.npcs)}
      </PanelSection>
    </SheetPageContent>
  );
};

export default CampaignNpcsPage;
