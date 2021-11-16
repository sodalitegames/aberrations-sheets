import { useRecoilValue } from 'recoil';

import { campSheetState } from '../../recoil/campaign/campaign.atoms';

import SheetPageContent from '../../layouts/components/sheet/SheetPageContent';

import PanelSection from '../../components/shared/PanelSection';
import Button from '../../components/shared/Button';

const CampaignNotesPage = () => {
  const campSheet = useRecoilValue(campSheetState);

  return (
    <SheetPageContent title="Notes" columns={3}>
      <PanelSection title="All Notes">
        <div className="flow-root mt-2">
          <div className="mb-6">
            <Button>Create a new Note</Button>
          </div>
          {JSON.stringify(campSheet.notes)}
        </div>
      </PanelSection>
      <PanelSection title="Note Title" colSpan={2}></PanelSection>
    </SheetPageContent>
  );
};

export default CampaignNotesPage;
