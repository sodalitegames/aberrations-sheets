import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { CheckCircleIcon } from '@heroicons/react/outline';

import { ExternalLinkIcon } from '@heroicons/react/outline';

import { selectCurrentCampaign } from '../../redux/campaign/campaign.selectors';
import { selectSpecies } from '../../redux/resource/resource.selectors';

import { setModal, setSlideOver } from '../../redux/app/app.actions';
import { fetchResourceStart } from '../../redux/resource/resource.actions';

import ModalTypes from '../../utils/ModalTypes';
import SlideOverTypes from '../../utils/SlideOverTypes';
import classNames from '../../utils/classNames';

import SheetPageContent from '../../layouts/components/sheet/SheetPageContent';

import PanelSection from '../../components/sheets/PanelSection';
import ListContainer from '../../components/shared/data/ListContainer';

import Button from '../../components/shared/Button';

import DisplayPlayer from '../../components/campaigns/display/DisplayPlayer';

const CampaignPlayersPage = () => {
  const dispatch = useDispatch();

  const campSheet = useSelector(selectCurrentCampaign);
  const speciesList = useSelector(selectSpecies);

  const [player, setPlayer] = useState(campSheet.players[0]);
  const [id, setId] = useState(null);

  useEffect(() => {
    if (id) {
      setPlayer(campSheet.players.find(player => player._id === id));
      return;
    }

    setPlayer(campSheet.players[0]);
  }, [id, campSheet]);

  useEffect(() => {
    if (!speciesList) {
      dispatch(fetchResourceStart('species'));
    }
  }, [dispatch, speciesList]);

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
              <div key={player._id} className={classNames('flex justify-between items-center hover:bg-gray-50 px-2 cursor-pointer')} onClick={() => setId(player._id)}>
                <DisplayPlayer key={player._id} player={player} condensed listItem />
                {player.active ? (
                  <div className="shrink-0 ml-2" title="Equipped">
                    <CheckCircleIcon className="h-6 w-6 text-green-600" aria-hidden="true" />
                  </div>
                ) : null}
              </div>
            ))}
          </ListContainer>

          <p className="border-t border-gray-100 text-sm italic text-gray-600 mt-6 pt-4 mb-2 text-center">Want to manage invites you have already sent?</p>
          <Button onClick={() => dispatch(setSlideOver({ type: SlideOverTypes.manageSentInvites }))} small classes="mt-4">
            Manage Sent Invites
          </Button>
        </div>
      </PanelSection>

      {/* Selected Player */}
      <PanelSection title="Selected Player" colSpan={3}>
        {player ? (
          <div className="grid gap-8 grid-cols-3 divide-x divide-gray-200">
            <div className="col-span-2">
              <DisplayPlayer player={player} species={speciesList} />
            </div>

            <div className="col-span-1 space-y-4 pl-8">
              {/* External Link to Character Sheet */}
              <div className="pb-4 mb-4 border-b border-gray-200">
                <a href={`${process.env.REACT_APP_SELF}/characters/${player._id}/gameplay`} target="_blank" rel="noreferrer">
                  <Button dark>
                    {player.characterName} <ExternalLinkIcon className="ml-2 h-4 w-4 text-white" aria-hidden="true" />
                  </Button>
                </a>
              </div>

              {/* Player Actions */}
              <Button>{player.active ? 'Deactivate' : 'Activate'}</Button>
              <Button
                onClick={() =>
                  dispatch(
                    setModal({ type: ModalTypes.removeCharacterFromCampaign, data: { sheetType: 'campaigns', playerName: player.playerNickname || player.playerName, body: { charId: player._id } } })
                  )
                }
              >
                Remove From Campaign
              </Button>
            </div>
          </div>
        ) : (
          <p className="text-sm italic text-gray-400">Please invite or select a player to get started.</p>
          // Once a you have selected a player, you will be able to see their information right here.
        )}
      </PanelSection>
    </SheetPageContent>
  );
};

export default CampaignPlayersPage;
