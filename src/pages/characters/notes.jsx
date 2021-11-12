import { useRecoilValue } from 'recoil';

import { getCharSheet } from '../../recoil/character/character.selectors';

import PanelSection from '../../components/characters/PanelSection';
import SheetPageContent from '../../layouts/components/sheet/SheetPageContent';

const CharacterNotesPage = () => {
  const charSheet = useRecoilValue(getCharSheet);

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
