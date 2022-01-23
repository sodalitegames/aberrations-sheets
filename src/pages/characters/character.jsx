import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { DocumentDuplicateIcon } from '@heroicons/react/outline';

import { selectCurrentCharacter } from '../../redux/character/character.selectors';

import { setSlideOver } from '../../redux/app/app.actions';

import SlideOverTypes from '../../utils/SlideOverTypes';

import SheetPageContent from '../../layouts/components/sheet/SheetPageContent';

import PanelSection from '../../components/shared/PanelSection';
import Button from '../../components/shared/Button';
import InfoList from '../../components/shared/InfoList';
import { ButtonPanel } from '../../components/shared/ListItem';
import ListContainer from '../../components/shared/ListContainer';

import Species from '../../components/characters/display/Species';
import DisplayLog from '../../components/sheets/display/DisplayLog';
import EmptyState from '../../components/shared/EmptyState';
import Invite from '../../components/characters/display/Invite';
import Campaign from '../../components/characters/display/Campaign';

const CharacterCharacterPage = () => {
  const dispatch = useDispatch();

  const charSheet = useSelector(selectCurrentCharacter);

  const [copied, setCopied] = useState(false);

  return (
    <SheetPageContent title="Character" columns={4}>
      {/* Character Species */}
      <PanelSection title="Character Species">
        <div className="flow-root">
          <Species species={charSheet.species} />
        </div>
      </PanelSection>

      <div className="space-y-4">
        {/* Character Description */}
        <PanelSection title="Character Description">
          <div className="flow-root">
            <InfoList list={[charSheet.charDescription]} />
            <ButtonPanel editable={{ type: SlideOverTypes.charDescriptionForm }} />
          </div>
        </PanelSection>

        {/* Character Background */}
        <PanelSection title="Character Background">
          <div className="flow-root">
            <InfoList list={[charSheet.charBackground]} />
            <ButtonPanel editable={{ type: SlideOverTypes.charBackgroundForm }} />
          </div>
        </PanelSection>
      </div>

      {/* Character Logs */}
      <PanelSection title="Character Logs">
        <div className="flow-root mt-2">
          <ListContainer
            list={charSheet.characterLogs}
            button={{ click: () => dispatch(setSlideOver({ type: SlideOverTypes.charLogForm })), text: 'Add a new Character Log' }}
            empty={{
              heading: 'No Character Logs',
              message: 'Get started by creating your first one now',
              button: { click: () => dispatch(setSlideOver({ type: SlideOverTypes.charLogForm })), text: 'New Character Log' },
            }}
          >
            {charSheet.characterLogs.map(log => (
              <DisplayLog key={log._id} log={log} sheet="characters" />
            ))}
          </ListContainer>
        </div>
      </PanelSection>

      {/* Campaign Invites and Campaign Details */}
      <PanelSection title={charSheet.campaign ? 'Campaign Details' : 'Campaign Invitations'}>
        <div className="flow-root mt-2">
          {charSheet.campaign ? (
            <Campaign campaign={charSheet.campaign} />
          ) : charSheet.invites.filter(invite => invite.status === 'Pending').length ? (
            <>
              <ListContainer>
                {charSheet.invites
                  .filter(invite => invite.status === 'Pending')
                  .map(invite => (
                    <Invite key={invite._id} invite={invite} />
                  ))}
              </ListContainer>

              <p className="border-t border-gray-100 text-sm italic text-gray-600 mt-4 pt-4 mb-2 text-center">Need a new invite? Copy your Character Id below.</p>
              <Button
                onClick={() => {
                  navigator.clipboard.writeText(charSheet._id);
                  setCopied(true);
                }}
                small
                classes="mt-4"
              >
                {charSheet._id} <DocumentDuplicateIcon className="-mr-1 ml-2 h-5 w-5" aria-hidden="true" />
              </Button>
              {copied ? <p className="text-sm italic text-gray-400 mt-1 text-center">Copied to clipboard</p> : null}
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
                {charSheet._id} <DocumentDuplicateIcon className="-mr-1 ml-2 h-5 w-5" aria-hidden="true" />
              </Button>
              {copied ? <p className="text-sm italic text-gray-400 mt-1">Copied to clipboard</p> : null}
            </EmptyState>
          )}
        </div>
      </PanelSection>
    </SheetPageContent>
  );
};

export default CharacterCharacterPage;
