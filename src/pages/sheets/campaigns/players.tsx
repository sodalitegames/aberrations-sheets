import { useSelector, useDispatch } from 'react-redux';
import { useSearchParams } from 'react-router-dom';

import { ExternalLinkIcon, CheckCircleIcon } from '@heroicons/react/outline';

import { selectCurrentCampaign } from '../../../redux/campaign/campaign.selectors';

import { updateSheetStart } from '../../../redux/sheet/sheet.actions';

import { useActions } from '../../../hooks/useActions';
import { useResource } from '../../../hooks/useResource';

import ModalTypes from '../../../utils/ModalTypes';
import SlideOverTypes from '../../../utils/SlideOverTypes';
import classNames from '../../../utils/classNames';
import { getSpecies } from '../../../utils/helpers/species';

import { FetchedResourceType, Species } from '../../../models/resource';
import { InteractableType, SheetType } from '../../../models/sheet';
import { Player } from '../../../models/sheet/resources';

import ListContainer from '../../../components/data/ListContainer';

import Button from '../../../components/Button';

import InteractablesPageContent from '../../../components/content/InteractablesPageContent';

import InteractableActions from '../../../components/content/InteractableActions';
import DisplayPlayer from '../../../components/display/DisplayPlayer';

const CampaignPlayersPage = () => {
  const dispatch = useDispatch();
  const [searchParams, setSearchParams] = useSearchParams();
  const { setModal, setSlideOver } = useActions();

  const campSheet = useSelector(selectCurrentCampaign)!;

  const species = useResource(FetchedResourceType.Species) as Species[];

  const show = searchParams.get('show');
  const id = searchParams.get('id');

  const list = show === 'archived' ? campSheet.players : campSheet.players;
  const player = list.find(plyr => plyr._id === id) || list[0];

  const Display = () => <DisplayPlayer player={player} species={species} />;
  const Actions = () => (
    <>
      {/* External Link to Character Sheet */}
      <div className="pb-4 mb-4 border-b border-gray-200">
        <a href={`${process.env.REACT_APP_SELF}/characters/${player._id}/gameplay`} target="_blank" rel="noreferrer">
          <Button dark>
            {player.characterName} <ExternalLinkIcon className="w-4 h-4 ml-2 text-white" aria-hidden="true" />
          </Button>
        </a>
      </div>

      {/* Player Actions */}
      <InteractableActions type="player" id={{ prop: 'playerId', value: player._id }} entity={{ ...player, species: getSpecies(player.speciesId, species) } as Player} />

      {/* Activate or Deactivate */}
      <div className="pt-4 mt-4 border-t border-gray-200">
        <Button
          dark={player.active}
          onClick={() =>
            dispatch(
              updateSheetStart(
                SheetType.characters,
                player._id,
                { active: !player.active },
                {
                  forPlayer: true,
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
      </div>

      {/* Remove from Campaign */}
      <div className="pt-4 mt-4 border-t border-gray-200">
        <Button
          alert
          onClick={() =>
            setModal({ type: ModalTypes.removeCharacterFromCampaign, data: { sheetType: 'campaigns', playerName: player.playerNickname || player.playerName, body: { charId: player._id } } })
          }
        >
          Remove From Campaign
        </Button>
      </div>
    </>
  );

  const List = () => (
    <>
      <ListContainer
        list={campSheet.players}
        button={{ click: () => setModal({ type: ModalTypes.sendInvite }), text: 'Invite a new Player' }}
        empty={{
          heading: 'No Players Assigned',
          message: 'Get started by inviting your first one now',
          button: { click: () => setModal({ type: ModalTypes.sendInvite }), text: 'Invite a Player' },
        }}
      >
        {campSheet.players.map(plyr => (
          <div
            key={plyr._id}
            className={classNames('flex justify-between items-center px-2 cursor-pointer', player._id === plyr._id ? 'bg-gray-100' : 'hover:bg-gray-50')}
            // @ts-expect-error //
            onClick={() => setSearchParams({ ...Object.fromEntries([...searchParams]), id: plyr._id })}
          >
            <DisplayPlayer key={plyr._id} player={plyr} species={species} condensed listItem />
            {plyr.active ? (
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
    </>
  );

  return (
    <InteractablesPageContent
      sheetType={SheetType.campaigns}
      sheetId={campSheet._id}
      show={show}
      id={player._id}
      list={list}
      type={InteractableType.players}
      label="Player"
      interactable={player}
      Display={Display}
      Actions={Actions}
      List={List}
    />
  );
};

export default CampaignPlayersPage;
