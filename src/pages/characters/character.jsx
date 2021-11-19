import { useSelector, useDispatch } from 'react-redux';

import { selectCurrentCharacter } from '../../redux/character/character.selectors';

import { setSlideOver } from '../../redux/app/app.actions';

import SlideOverTypes from '../../utils/SlideOverTypes';

import SheetPageContent from '../../layouts/components/sheet/SheetPageContent';

import PanelSection from '../../components/shared/PanelSection';
import Button from '../../components/shared/Button';
import InfoList from '../../components/shared/InfoList';
import { ButtonPanel } from '../../components/shared/ListItem';

import Species from '../../components/characters/display/Species';
import Log from '../../components/characters/display/Log';
import Invite from '../../components/characters/display/Invite';
import Campaign from '../../components/characters/display/Campaign';

const CharacterCharacterPage = () => {
  const dispatch = useDispatch();

  const charSheet = useSelector(selectCurrentCharacter);

  return (
    <SheetPageContent title="Character" columns={4}>
      <div className="space-y-4">
        <PanelSection title="Character Species">
          <div className="flow-root">
            <Species species={charSheet.species} />
          </div>
        </PanelSection>

        <PanelSection title="Character Description">
          <div className="flow-root">
            <InfoList list={[charSheet.charDescription]} />
            <ButtonPanel editable={{ type: SlideOverTypes.charDescriptionForm }} />
          </div>
        </PanelSection>
      </div>

      <PanelSection title="Character Background">
        <div className="flow-root">
          <InfoList list={[charSheet.charBackground]} />
          <ButtonPanel editable={{ type: SlideOverTypes.charBackgroundForm }} />
        </div>
      </PanelSection>

      <PanelSection title="Character Logs">
        <div className="flow-root mt-2">
          <div className="mb-6">
            <Button onClick={() => dispatch(setSlideOver({ type: SlideOverTypes.charLogForm }))}>Add a new Character Log</Button>
          </div>
          <ul className="-my-5 divide-y divide-gray-200">
            {charSheet.characterLogs.map(log => (
              <Log key={log._id} log={log} />
            ))}
          </ul>
        </div>
      </PanelSection>

      <PanelSection title="Campaign Details">
        <div className="flow-root mt-2">
          {charSheet.campaign ? (
            <Campaign campaign={charSheet.campaign} />
          ) : (
            <ul className="-my-5 divide-y divide-gray-200">
              {charSheet.invites.map(invite => (
                <Invite key={invite._id} invite={invite} />
              ))}
            </ul>
          )}
        </div>
      </PanelSection>
    </SheetPageContent>
  );
};

export default CharacterCharacterPage;
