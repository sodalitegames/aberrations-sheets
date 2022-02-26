import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { ExternalLinkIcon, CheckCircleIcon } from '@heroicons/react/outline';

import { selectCurrentCampaign } from '../../../redux/campaign/campaign.selectors';

import { updateSheetStart } from '../../../redux/sheet/sheet.actions';

import { useActions } from '../../../hooks/useActions';
import { useResource } from '../../../hooks/useResource';

import ModalTypes from '../../../utils/ModalTypes';
import SlideOverTypes from '../../../utils/SlideOverTypes';
import classNames from '../../../utils/classNames';
import { ResourceType } from '../../../models/enums';

import SheetPageContent from '../../../layouts/components/sheet/SheetPageContent';

import SheetPagePanel from '../../../layouts/components/sheet/SheetPagePanel';
import ListContainer from '../../../components/data/ListContainer';

import Button from '../../../components/Button';

import DisplayPlayer from '../../../components/display/DisplayPlayer';

const CampaignPlayersPage = () => {
  const dispatch = useDispatch();

  const { setModal, setSlideOver } = useActions();

  const campSheet = useSelector(selectCurrentCampaign);

  const species = useResource(ResourceType.Species);

  const [player, setPlayer] = useState(campSheet.players.length ? campSheet.players[0] : null);
  const [id, setId] = useState(campSheet.players.length ? campSheet.players[0]._id : null);

  useEffect(() => {
    if (id) {
      setPlayer(campSheet.players.find(player => player._id === id));
      return;
    }

    setPlayer(campSheet.players[0]);
  }, [id, campSheet]);

  return (
    <SheetPageContent title="Players" columns={4}>
      {/* All Players */}
      <SheetPagePanel title="Manage Players" classes="col-span-2 lg:col-span-1">
        <div className="flow-root mt-2">
          <ListContainer
            list={campSheet.players}
            button={{ click: () => setModal({ type: ModalTypes.sendInvite }), text: 'Invite a new Player' }}
            empty={{
              heading: 'No Players Assigned',
              message: 'Get started by inviting your first one now',
              button: { click: () => setModal({ type: ModalTypes.sendInvite }), text: 'Invite a Player' },
            }}
          >
            {campSheet.players.map(player => (
              <div
                key={player._id}
                className={classNames('flex justify-between items-center px-2 cursor-pointer', id === player._id ? 'bg-gray-100' : 'hover:bg-gray-50')}
                onClick={() => setId(player._id)}
              >
                <DisplayPlayer key={player._id} player={player} condensed listItem />
                {player.active ? (
                  <div className="ml-2 shrink-0" title="Equipped">
                    <CheckCircleIcon className="w-6 h-6 text-green-600" aria-hidden="true" />
                  </div>
                ) : null}
              </div>
            ))}
          </ListContainer>

          <p className="pt-4 mt-6 mb-2 text-sm italic text-center text-gray-600 border-t border-gray-100">Want to manage invites you have already sent?</p>
          <Button onClick={() => setSlideOver({ type: SlideOverTypes.manageSentInvites })} small classes="mt-4">
            Manage Sent Invites
          </Button>
        </div>
      </SheetPagePanel>

      {/* Selected Player */}
      <SheetPagePanel title="Selected Player" colSpan={3}>
        {player ? (
          <div className="grid grid-cols-3 gap-8 divide-x divide-gray-200">
            <div className="col-span-2">
              <DisplayPlayer player={player} species={species} />
            </div>

            <div className="col-span-1 pl-8 space-y-4">
              {/* External Link to Character Sheet */}
              <div className="pb-4 mb-4 border-b border-gray-200">
                <a href={`${process.env.REACT_APP_SELF}/characters/${player._id}/gameplay`} target="_blank" rel="noreferrer">
                  <Button dark>
                    {player.characterName} <ExternalLinkIcon className="w-4 h-4 ml-2 text-white" aria-hidden="true" />
                  </Button>
                </a>
              </div>

              {/* Player Actions */}

              {/* Activate or Deactivate */}
              <Button
                dark={player.active}
                onClick={() =>
                  dispatch(
                    updateSheetStart(
                      'characters',
                      player._id,
                      { active: !player.active },
                      {
                        notification: {
                          status: 'success',
                          heading: `Player ${player.active ? 'Deactivated' : 'Activated'}`,
                          message: `You have successfully ${player.active ? 'deactivated' : 'activated'} ${player.characterName}.`,
                        },
                      }
                    )
                  )
                }
              >
                {player.active ? 'Deactivate' : 'Activate'}
              </Button>

              {/* Remove from Campaign */}
              <Button
                onClick={() =>
                  setModal({ type: ModalTypes.removeCharacterFromCampaign, data: { sheetType: 'campaigns', playerName: player.playerNickname || player.playerName, body: { charId: player._id } } })
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
      </SheetPagePanel>
    </SheetPageContent>
  );
};

export default CampaignPlayersPage;
