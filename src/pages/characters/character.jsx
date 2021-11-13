import { useRecoilValue, useSetRecoilState } from 'recoil';

import { slideOverState, modalState } from '../../recoil/app/app.atoms';
import { charSheetState } from '../../recoil/character/character.atoms';

import { getCharactersSpecies } from '../../recoil/resources/resources.selector';

import PanelSection from '../../components/shared/PanelSection';
import SheetPageContent from '../../layouts/components/sheet/SheetPageContent';

import Button from '../../components/shared/Button';
import ModalTypes from '../../utils/ModalTypes';
import SlideOverTypes from '../../utils/SlideOverTypes';

const CharacterCharacterPage = () => {
  const charSheet = useRecoilValue(charSheetState);

  const setSlideOver = useSetRecoilState(slideOverState);
  const setModal = useSetRecoilState(modalState);

  const charsSpecies = useRecoilValue(getCharactersSpecies);

  return (
    <SheetPageContent title="Character" columns={4}>
      <div className="space-y-4">
        <PanelSection title={`Your Species: ${charsSpecies.name}`}>
          <div className="flow-root mt-6">
            <h3 className="text-sm font-semibold text-gray-800">Detail</h3>
            <p className="mt-1 text-sm text-gray-600">Description here</p>
            <p className="mt-1 text-sm text-gray-600">{charsSpecies.name}</p>
          </div>
        </PanelSection>

        <PanelSection title="Character Decsription">
          <div className="flow-root mt-6">
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
        <div className="flow-root mt-6">
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
              <li key={log._id} className="py-3">
                <h3 className="text-sm font-semibold text-gray-800">{new Date(log.date).toLocaleDateString()}</h3>
                <p className="mt-1 text-sm text-gray-600">{log.content}</p>
                <div className="flex justify-end space-x-1 mt-2">
                  <button
                    type="button"
                    className="inline-flex items-center px-1.5 py-1.5 text-xs font-medium rounded text-gray-500 bg-white hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    onClick={() => setSlideOver({ type: SlideOverTypes.charLogForm, id: log._id })}
                  >
                    Edit
                  </button>
                  <button
                    type="button"
                    className="inline-flex items-center px-1.5 py-1.5 text-xs font-medium rounded text-gray-500 bg-white hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    onClick={() => setModal({ type: ModalTypes.deleteCharacterLog, id: log._id })}
                  >
                    Delete
                  </button>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </PanelSection>

      <PanelSection title="Campaign Details">
        {JSON.stringify(charSheet.campaign)}
        {JSON.stringify(charSheet.invites)}
      </PanelSection>
    </SheetPageContent>
  );
};

export default CharacterCharacterPage;
