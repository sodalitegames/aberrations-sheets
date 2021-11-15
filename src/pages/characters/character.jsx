import { useRecoilValue, useSetRecoilState } from 'recoil';

import { slideOverState } from '../../recoil/app/app.atoms';
import { charSheetState } from '../../recoil/character/character.atoms';

import { getCharactersSpecies } from '../../recoil/resources/resources.selector';

import ModalTypes from '../../utils/ModalTypes';
import SlideOverTypes from '../../utils/SlideOverTypes';

import SheetPageContent from '../../layouts/components/sheet/SheetPageContent';

import PanelSection from '../../components/shared/PanelSection';
import Button from '../../components/shared/Button';
import ListItem from '../../components/shared/ListItem';
import DescriptionList from '../../components/shared/DescriptionList';

const CharacterCharacterPage = () => {
  const charSheet = useRecoilValue(charSheetState);

  const setSlideOver = useSetRecoilState(slideOverState);

  const charsSpecies = useRecoilValue(getCharactersSpecies);

  return (
    <SheetPageContent title="Character" columns={4}>
      <div className="space-y-4">
        <PanelSection title="Character Species">
          <div className="flow-root">
            <DescriptionList
              list={[
                { name: 'Species Name', values: [charsSpecies.name] },
                { name: 'Species Ability', values: [charsSpecies.ability] },
                // { name: 'Appearance', values: [charsSpecies.appearance] },
                // { name: 'Basic Info', values: [charsSpecies.basicInfo] },
                { name: 'Fortitude Base', values: [charsSpecies.stats.fortitude], half: true },
                { name: 'Agility Base', values: [charsSpecies.stats.agility], half: true },
                { name: 'Persona Base', values: [charsSpecies.stats.persona], half: true },
                { name: 'Aptitude Base', values: [charsSpecies.stats.aptitude], half: true },
              ]}
            />
          </div>
        </PanelSection>

        <PanelSection title="Character Decsription">
          <div className="flow-root">
            <p className="mt-1 text-sm text-gray-600">{charSheet.charDescription}</p>
            <div className="flex justify-end space-x-1 mt-2">
              <button
                type="button"
                className="inline-flex items-center px-1.5 py-1.5 text-xs font-medium rounded text-gray-500 bg-white hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                onClick={() => setSlideOver({ type: SlideOverTypes.charDescriptionForm })}
              >
                Edit
              </button>
            </div>
          </div>
        </PanelSection>
      </div>

      <PanelSection title="Character Background">
        <div className="flow-root">
          <p className="mt-1 text-sm text-gray-600">{charSheet.charBackground}</p>
          <div className="flex justify-end space-x-1 mt-2">
            <button
              type="button"
              className="inline-flex items-center px-1.5 py-1.5 text-xs font-medium rounded text-gray-500 bg-white hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              onClick={() => setSlideOver({ type: SlideOverTypes.charBackgroundForm })}
            >
              Edit
            </button>
          </div>
        </div>
      </PanelSection>

      <PanelSection title="Character Logs">
        <div className="flow-root mt-2">
          <div className="mb-6">
            <Button onClick={() => setSlideOver({ type: SlideOverTypes.charLogForm })}>Add a new Character Log</Button>
          </div>
          <ul className="-my-5 divide-y divide-gray-200">
            {charSheet.characterLogs.map(log => (
              <ListItem
                key={log._id}
                heading={new Date(log.date).toDateString()}
                editable={{ type: SlideOverTypes.charLogForm, id: log._id }}
                deletable={{
                  type: ModalTypes.confirmDelete,
                  id: log._id,
                  data: { type: 'logs', property: 'characterLogs', title: 'Are you sure you want to delete this character log?', submitText: 'Yes, delete this character log' },
                }}
              >
                <p className="mt-1 text-sm text-gray-600">{log.content}</p>
              </ListItem>
            ))}
          </ul>
        </div>
      </PanelSection>

      <PanelSection title="Campaign Details">
        <div className="flow-root mt-2">
          {charSheet.campaign ? (
            <div>
              <DescriptionList list={[{ name: 'Campaign Name', values: ['Fake Campaign Name'] }]} />
              <div className="mt-6">
                <Button text onClick={() => setSlideOver({ type: SlideOverTypes.charLogForm })}>
                  Leave Campaign
                </Button>
              </div>
            </div>
          ) : (
            <ul className="-my-5 divide-y divide-gray-200">
              {charSheet.invites.map(invite => (
                <ListItem key={invite._id} heading={invite.sheetId}>
                  <DescriptionList
                    list={[
                      { name: 'Invite Sent', values: [new Date(invite.createdAt).toDateString()] },
                      { name: 'Message', values: [invite.message] },
                    ]}
                    classes="mt-2"
                  />
                  <div className="mt-4">
                    <Button onClick={() => setSlideOver({ type: SlideOverTypes.charLogForm })}>Accept Invite</Button>
                  </div>
                  <div className="mt-2">
                    <Button text onClick={() => setSlideOver({ type: SlideOverTypes.charLogForm })}>
                      Decline Invite
                    </Button>
                  </div>
                </ListItem>
              ))}
            </ul>
          )}
        </div>
      </PanelSection>
    </SheetPageContent>
  );
};

export default CharacterCharacterPage;
