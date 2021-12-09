import { useSelector } from 'react-redux';

import { selectCurrentCampaign } from '../../redux/campaign/campaign.selectors';

import SheetPageContent from '../../layouts/components/sheet/SheetPageContent';

import PanelSection from '../../components/shared/PanelSection';

const CampaignGameplayPage = () => {
  const campSheet = useSelector(selectCurrentCampaign);

  return (
    <SheetPageContent title="Gameplay" columns={4}>
      <div className="space-y-4">
        <PanelSection title="Active Players">
          <div className="flow-root">active players</div>
        </PanelSection>

        <PanelSection title="Memos">
          <div className="flow-root">{JSON.stringify(campSheet.memos)}</div>
        </PanelSection>
      </div>

      <PanelSection colSpan={2} title="Active Session">
        <div className="flow-root">{JSON.stringify(campSheet.sessions[0])}</div>
      </PanelSection>

      <PanelSection title="Active Interactables">
        <div className="flow-root mt-2">active interactables</div>
      </PanelSection>
    </SheetPageContent>
  );
};

export default CampaignGameplayPage;
