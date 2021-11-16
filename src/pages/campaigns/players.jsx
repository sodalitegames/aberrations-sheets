import { useRecoilValue } from 'recoil';

import { campSheetState } from '../../recoil/campaign/campaign.atoms';

import SheetPageContent from '../../layouts/components/sheet/SheetPageContent';

import PanelSection from '../../components/shared/PanelSection';
import Button from '../../components/shared/Button';

const CampaignPlayersPage = () => {
  const campSheet = useRecoilValue(campSheetState);

  return (
    <SheetPageContent title="Players" columns={4}>
      <PanelSection title="Manage Players">
        <div className="flow-root mt-2">
          <div className="mb-6">
            <Button>Invite new Player</Button>
          </div>
        </div>
      </PanelSection>
      <PanelSection title="Selected Player" colSpan={3}>
        {JSON.stringify(campSheet.players)}
      </PanelSection>
    </SheetPageContent>
  );
};

export default CampaignPlayersPage;
