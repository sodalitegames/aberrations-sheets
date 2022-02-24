import { useSelector, useDispatch } from 'react-redux';

import { selectCurrentCampaign, selectActiveSession } from '../../../redux/campaign/campaign.selectors';

import { setSlideOver } from '../../../redux/app/app.actions';

import SlideOverTypes from '../../../utils/SlideOverTypes';

import SheetPageContent from '../../../layouts/components/sheet/SheetPageContent';

import SheetPagePanel from '../../../layouts/components/sheet/SheetPagePanel';

import Button from '../../../components/Button';

const CampaignGameplayPage = () => {
  const dispatch = useDispatch();

  const campSheet = useSelector(selectCurrentCampaign);
  const activeSession = useSelector(selectActiveSession);

  return (
    <SheetPageContent title="Gameplay" columns={4}>
      <div className="space-y-4">
        {/* Active Players */}
        <SheetPagePanel title="Active Players">
          <div className="flow-root">active players</div>
        </SheetPagePanel>

        {/* Memos */}
        <SheetPagePanel title="Memos">
          <div className="flow-root">{JSON.stringify(campSheet.memos)}</div>
        </SheetPagePanel>

        {/* Actions */}
        <SheetPagePanel classes="md:col-span-2 lg:col-span-1">
          <Button onClick={() => dispatch(setSlideOver({ type: SlideOverTypes.manageCampaign }))} classes="mt-2">
            Manage Campaign
          </Button>
        </SheetPagePanel>
      </div>

      {/* Active Session */}
      <SheetPagePanel colSpan={2} title="Active Session">
        <div className="flow-root">{JSON.stringify(activeSession)}</div>
      </SheetPagePanel>

      {/* Active Interactables */}
      <SheetPagePanel title="Active Interactables">
        <div className="flow-root mt-2">active interactables</div>
      </SheetPagePanel>
    </SheetPageContent>
  );
};

export default CampaignGameplayPage;
