import { useRecoilValue, useSetRecoilState } from 'recoil';

import { slideOverState } from '../../recoil/app/app.atoms';
import { campSheetState } from '../../recoil/campaign/campaign.atoms';

import SlideOverTypes from '../../utils/SlideOverTypes';

import SheetPageContent from '../../layouts/components/sheet/SheetPageContent';

import PanelSection from '../../components/shared/PanelSection';
import Button from '../../components/shared/Button';
import InfoList from '../../components/shared/InfoList';
import { ButtonPanel } from '../../components/shared/ListItem';

import Log from '../../components/characters/display/Log';

const CampaignGameplayPage = () => {
  const campSheet = useRecoilValue(campSheetState);

  const setSlideOver = useSetRecoilState(slideOverState);

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
