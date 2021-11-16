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

const CampaignCampaignPage = () => {
  const campSheet = useRecoilValue(campSheetState);

  const setSlideOver = useSetRecoilState(slideOverState);

  return (
    <SheetPageContent title="Campaign" columns={4}>
      <div className="space-y-4">
        <PanelSection title="Campaign Overview">
          <div className="flow-root">
            <InfoList list={[campSheet.overview]} />
            <ButtonPanel editable={{ type: SlideOverTypes.charDescriptionForm }} />
          </div>
        </PanelSection>

        <PanelSection title="Campaign Details">
          <div className="flow-root">
            <InfoList list={[campSheet.details]} />
            <ButtonPanel editable={{ type: SlideOverTypes.charBackgroundForm }} />
          </div>
        </PanelSection>
      </div>

      <PanelSection colSpan={2} title="Past and Future Sessions">
        <div className="flow-root">{JSON.stringify(campSheet.sessions)}</div>
      </PanelSection>

      <PanelSection title="Captain's Logs">
        <div className="flow-root mt-2">
          <div className="mb-6">
            <Button onClick={() => setSlideOver({ type: SlideOverTypes.charLogForm })}>Add a new Captain's Log</Button>
          </div>
          <ul className="-my-5 divide-y divide-gray-200">
            {campSheet.captainsLogs.map(log => (
              <Log key={log._id} log={log} />
            ))}
          </ul>
        </div>
      </PanelSection>
    </SheetPageContent>
  );
};

export default CampaignCampaignPage;
