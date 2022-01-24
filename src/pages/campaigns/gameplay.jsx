import { useSelector, useDispatch } from 'react-redux';

import { selectCurrentCampaign, selectActiveSession } from '../../redux/campaign/campaign.selectors';

import { setSlideOver } from '../../redux/app/app.actions';

import SlideOverTypes from '../../utils/SlideOverTypes';

import SheetPageContent from '../../layouts/components/sheet/SheetPageContent';

import PanelSection from '../../components/sheets/PanelSection';

import Button from '../../components/shared/Button';

const CampaignGameplayPage = () => {
  const dispatch = useDispatch();

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

        {/* Actions */}
        <PanelSection classes="md:col-span-2 lg:col-span-1">
          <Button onClick={() => dispatch(setSlideOver({ type: SlideOverTypes.manageCampaign }))} classes="mt-2">
            Manage Campaign
          </Button>
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
