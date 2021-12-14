import { useSelector, useDispatch } from 'react-redux';

import { selectCurrentCampaign } from '../../redux/campaign/campaign.selectors';

import { setModal, setSlideOver } from '../../redux/app/app.actions';

import ModalTypes from '../../utils/ModalTypes';
import SlideOverTypes from '../../utils/SlideOverTypes';

import SheetPageContent from '../../layouts/components/sheet/SheetPageContent';

import PanelSection from '../../components/shared/PanelSection';
import Button from '../../components/shared/Button';
import ListContainer from '../../components/shared/ListContainer';

import Player from '../../components/campaigns/display/Player';
import { useState } from 'react';

const CampaignPlayersPage = () => {
  const dispatch = useDispatch();

  const campSheet = useSelector(selectCurrentCampaign);

  const [player] = useState(null);

  return (
    <SheetPageContent title="Players" columns={4}>
      {/* All Players */}
      <PanelSection title="Manage Players" classes="col-span-2 lg:col-span-1">
        <div className="flow-root mt-2">
          <ListContainer
            list={campSheet.players}
            button={{ click: () => dispatch(setModal({ type: ModalTypes.sendInvite })), text: 'Invite a new Player' }}
            empty={{
              heading: 'No Players Assigned',
              message: 'Get started by inviting your first one now',
              button: { click: () => dispatch(setModal({ type: ModalTypes.sendInvite })), text: 'Invite a Player' },
            }}
          >
            {campSheet.players.map(player => (
              <Player key={player._id} player={player} />
            ))}
          </ListContainer>

          <p className="border-t border-gray-100 text-sm italic text-gray-600 mt-6 pt-4 mb-2 text-center">Want to manage invites you have already sent?</p>
          <Button onClick={() => dispatch(setSlideOver({ type: SlideOverTypes.manageSentInvites }))} small classes="mt-4" disabled>
            Manage Sent Invites
          </Button>
        </div>
      </PanelSection>

      {/* Selected Player */}
      <PanelSection title="Selected Player" colSpan={3}>
        {!player ? <p className="text-sm italic text-gray-400">Once a you have selected a player, you will be able to see their information right here.</p> : JSON.stringify(player)}
      </PanelSection>
    </SheetPageContent>
  );
};

export default CampaignPlayersPage;
