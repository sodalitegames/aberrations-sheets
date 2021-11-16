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

import StatsTracker from '../../components/campaigns/StatsTracker';

const CampaignStatsTrackerPage = () => {
  const campSheet = useRecoilValue(campSheetState);

  const setSlideOver = useSetRecoilState(slideOverState);

  return (
    <SheetPageContent title="Stats Tracker" columns={1}>
      <PanelSection title="Stats Tracker">
        <div className="flow-root mt-2">
          <StatsTracker list={[...campSheet.players, ...campSheet.npcs]} />
        </div>
      </PanelSection>
    </SheetPageContent>
  );
};

export default CampaignStatsTrackerPage;
