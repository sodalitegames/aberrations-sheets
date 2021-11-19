import { useSelector } from 'react-redux';

import { selectCurrentCharacter } from '../../redux/character/character.selectors';

import SheetPageContent from '../../layouts/components/sheet/SheetPageContent';

import PanelSection from '../../components/shared/PanelSection';
import Button from '../../components/shared/Button';

const CharacterNotesPage = () => {
  const charSheet = useSelector(selectCurrentCharacter);

  return (
    <SheetPageContent title="Notes" columns={3}>
      <PanelSection title="All Notes">
        <div className="flow-root mt-2">
          <div className="mb-6">
            <Button>Create a new Note</Button>
          </div>
          {JSON.stringify(charSheet.notes)}
        </div>
      </PanelSection>
      <PanelSection title="Note Title" colSpan={2}></PanelSection>
    </SheetPageContent>
  );
};

export default CharacterNotesPage;
