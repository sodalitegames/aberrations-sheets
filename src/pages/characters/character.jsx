import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { DocumentDuplicateIcon } from '@heroicons/react/outline';

import { selectCurrentCharacter } from '../../redux/character/character.selectors';

import { setSlideOver } from '../../redux/app/app.actions';

import SlideOverTypes from '../../utils/SlideOverTypes';

import SheetPageContent from '../../layouts/components/sheet/SheetPageContent';

import PanelSection from '../../components/sheets/PanelSection';
import Button from '../../components/shared/Button';
import InfoList from '../../components/shared/data/InfoList';
import { ButtonPanel } from '../../components/shared/data/ListItem';
import ListContainer from '../../components/shared/data/ListContainer';
import EmptyState from '../../components/shared/EmptyState';

import DisplaySpecies from '../../components/sheets/display/DisplaySpecies';
import DisplayLog from '../../components/sheets/display/DisplayLog';
import DisplayInvite from '../../components/sheets/display/DisplayInvite';
import DisplayCampaign from '../../components/characters/display/DisplayCampaign';

const CharacterCharacterPage = () => {
  const dispatch = useDispatch();

  const charSheet = useSelector(selectCurrentCharacter);

  const [copied, setCopied] = useState(false);

  return (
    <SheetPageContent title="Character" columns={4}>
      {/* Character Species */}
      <PanelSection title="Character Species">
        <div className="flow-root">
          <DisplaySpecies species={charSheet.species} />
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
        </div>
      </PanelSection>

      {/* Campaign Invites and Campaign Details */}
      <PanelSection title={charSheet.campaign ? 'Campaign Details' : 'Campaign Invitations'}>
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
