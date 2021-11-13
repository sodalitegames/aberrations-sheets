import { useRecoilValue } from 'recoil';

import { charSheetState } from '../../recoil/character/character.atoms';

import PanelSection from '../../components/shared/PanelSection';
import SheetPageContent from '../../layouts/components/sheet/SheetPageContent';

const CharacterNotesPage = () => {
  const charSheet = useRecoilValue(charSheetState);

  return (
    <SheetPageContent title="Notes" columns={3}>
      <PanelSection title="All Notes">{JSON.stringify(charSheet.notes)}</PanelSection>
      <PanelSection title="Note Title" colSpan={2}></PanelSection>
    </SheetPageContent>
  );
};

export default CharacterNotesPage;
