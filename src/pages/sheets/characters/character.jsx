import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { DocumentDuplicateIcon } from '@heroicons/react/outline';

import { selectCurrentCharacter, selectPermissions } from '../../../redux/character/character.selectors';

import { setSlideOver } from '../../../redux/app/app.actions';

import SlideOverTypes from '../../../utils/SlideOverTypes';

import SheetPageContent from '../../../layouts/components/sheet/SheetPageContent';

import SheetPagePanel from '../../../layouts/components/sheet/SheetPagePanel';
import Button from '../../../components/Button';
import InfoList from '../../../components/data/InfoList';
import { ButtonPanel } from '../../../components/data/ListItem';
import ListContainer from '../../../components/data/ListContainer';
import EmptyState from '../../../components/EmptyState';

import DisplaySpecies from '../../../components/display/DisplaySpecies';
import DisplayLog from '../../../components/display/DisplayLog';
import DisplayInvite from '../../../components/display/DisplayInvite';
import DisplayCampaign from '../../../components/display/DisplayCampaign';

const CharacterCharacterPage = () => {
  const dispatch = useDispatch();

  const charSheet = useSelector(selectCurrentCharacter);
  const permissions = useSelector(selectPermissions);

  const [copied, setCopied] = useState(false);

  return (
    <SheetPageContent title="Character" columns={4}>
      {/* Character Species */}
      <SheetPagePanel title="Character Species">
        <div className="flow-root">
          <DisplaySpecies species={charSheet.species} />
        </div>
      </SheetPagePanel>

      <div className="space-y-4">
        {/* Character Description */}
        <SheetPagePanel title="Character Description">
          <div className="flow-root">
            <InfoList list={[charSheet.charDescription]} />
            <ButtonPanel editable={{ type: SlideOverTypes.editDescriptionForm, data: { type: 'character', description: charSheet.charDescription } }} />
          </div>
        </SheetPagePanel>

        {/* Character Background */}
        <SheetPagePanel title="Character Background">
          <div className="flow-root">
            <InfoList list={[charSheet.charBackground]} />
            <ButtonPanel editable={{ type: SlideOverTypes.editBackgroundForm, data: { type: 'character', background: charSheet.charBackground } }} />
          </div>
        </SheetPagePanel>
      </div>

      {/* Character Logs */}
      <SheetPagePanel title="Character Logs">
        <div className="flow-root mt-2">
          {permissions?.isCC ? (
            <p className="text-sm italic text-gray-400">You do not have permission to view {charSheet.characterName}'s character logs.</p>
          ) : (
            <ListContainer
              list={charSheet.characterLogs}
              button={{ click: () => dispatch(setSlideOver({ type: SlideOverTypes.logForm, data: { sheetType: 'characters' } })), text: 'Add a new Character Log' }}
              empty={{
                heading: 'No Character Logs',
                message: 'Get started by creating your first one now',
                button: { click: () => dispatch(setSlideOver({ type: SlideOverTypes.logForm, data: { sheetType: 'characters' } })), text: 'New Character Log' },
              }}
            >
              {charSheet.characterLogs.map(log => (
                <DisplayLog key={log._id} log={log} sheetType="characters" />
              ))}
            </ListContainer>
          )}
        </div>
      </SheetPagePanel>

      {/* Campaign Invites and Campaign Details */}
      <SheetPagePanel title={charSheet.campaign ? 'Campaign Details' : 'Campaign Invitations'}>
        <div className="flow-root mt-2">
          {charSheet.campaign ? (
            <DisplayCampaign campaign={charSheet.campaign} />
          ) : charSheet.invites.filter(invite => invite.status === 'Pending').length ? (
            <>
              <ListContainer>
                {charSheet.invites
                  .filter(invite => invite.status === 'Pending')
                  .map(invite => (
                    <DisplayInvite key={invite._id} invite={invite} sheetType="characters" />
                  ))}
              </ListContainer>

              <p className="pt-4 mt-4 mb-2 text-sm italic text-center text-gray-600 border-t border-gray-100">Need a new invite? Copy your Character Id below.</p>
              <Button
                onClick={() => {
                  navigator.clipboard.writeText(charSheet._id);
                  setCopied(true);
                }}
                small
                classes="mt-4"
              >
                {charSheet._id} <DocumentDuplicateIcon className="w-5 h-5 ml-2 -mr-1" aria-hidden="true" />
              </Button>
              {copied ? <p className="mt-1 text-sm italic text-center text-gray-400">Copied to clipboard</p> : null}
            </>
          ) : (
            <EmptyState heading="No Pending Invites" message="Copy your Character Id below and send it to your future Campaign Captain">
              <Button
                onClick={() => {
                  navigator.clipboard.writeText(charSheet._id);
                  setCopied(true);
                }}
                small
                classes="mt-4"
              >
                {charSheet._id} <DocumentDuplicateIcon className="w-5 h-5 ml-2 -mr-1" aria-hidden="true" />
              </Button>
              {copied ? <p className="mt-1 text-sm italic text-gray-400">Copied to clipboard</p> : null}
            </EmptyState>
          )}
        </div>
      </SheetPagePanel>
    </SheetPageContent>
  );
};

export default CharacterCharacterPage;
