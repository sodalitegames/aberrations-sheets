import { useSelector } from 'react-redux';

import { selectCurrentCampaign, selectActiveSession } from '../../redux/campaign/campaign.selectors';

import SheetPageContent from '../../layouts/components/sheet/SheetPageContent';

import PanelSection from '../../components/sheets/PanelSection';

const CampaignGameplayPage = () => {
  const campSheet = useSelector(selectCurrentCampaign);
  const activeSession = useSelector(selectActiveSession);

  return (
    <SheetPageContent title="Gameplay" columns={4}>
      <div className="space-y-4">
        {/* Active Players */}
        <PanelSection title="Active Players">
          <div className="flow-root">active players</div>
        </PanelSection>

        {/* Memos */}
        <PanelSection title="Memos">
          <div className="flow-root">{JSON.stringify(campSheet.memos)}</div>
        </PanelSection>
      </div>

      {/* Active Session */}
      <PanelSection colSpan={2} title="Active Session">
        <div className="flow-root">{JSON.stringify(activeSession)}</div>
      </PanelSection>

      {/* Active Interactables */}
      <PanelSection title="Active Interactables">
        <div className="flow-root mt-2">active interactables</div>
      </PanelSection>
    </SheetPageContent>
  );
};

export default CampaignGameplayPage;
