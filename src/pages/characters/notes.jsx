import { useRecoilState } from 'recoil';

import { charSheetState } from '../../recoil/character/character.atoms';

import PanelSection from '../../components/characters/PanelSection';
import SheetPageContent from '../../layouts/components/sheet/SheetPageContent';

const CharacterNotesPage = () => {
  const [charSheet, setCharSheet] = useRecoilState(charSheetState);

  if (!charSheet) {
    return <div>Collecting character sheet data...</div>;
  }

  return (
    <SheetPageContent title="Notes" columns={3}>
      <PanelSection title="All Notes"></PanelSection>
      <PanelSection title="Note Title" colSpan={2}></PanelSection>
    </SheetPageContent>
  );
};

export default CharacterNotesPage;
