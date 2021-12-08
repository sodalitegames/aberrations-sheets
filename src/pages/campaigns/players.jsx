import { useSelector, useDispatch } from 'react-redux';

import { selectCurrentCampaign } from '../../redux/campaign/campaign.selectors';

import { setModal } from '../../redux/app/app.actions';

import ModalTypes from '../../utils/ModalTypes';

import SheetPageContent from '../../layouts/components/sheet/SheetPageContent';

import PanelSection from '../../components/shared/PanelSection';
import Button from '../../components/shared/Button';

const CampaignPlayersPage = () => {
  const dispatch = useDispatch();

  const campSheet = useSelector(selectCurrentCampaign);

  return (
    <SheetPageContent title="Players" columns={4}>
      <PanelSection title="Manage Players">
        <div className="flow-root mt-2">
          <div className="mb-6">
            <Button onClick={() => dispatch(setModal({ type: ModalTypes.sendInvite }))}>Invite new Player</Button>
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
