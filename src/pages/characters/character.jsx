import { useRecoilValue } from 'recoil';

import { getCharSheet } from '../../recoil/character/character.selectors';

import PanelSection from '../../components/characters/PanelSection';
import SheetPageContent from '../../layouts/components/sheet/SheetPageContent';

const CharacterCharacterPage = () => {
  const charSheet = useRecoilValue(getCharSheet);

  if (!charSheet) {
    return <div>Collecting character sheet data...</div>;
  }

  return (
    <SheetPageContent title="Character" columns={4}>
      <div className="space-y-4">
        <PanelSection title="Species Info"></PanelSection>
        <PanelSection title="Character Desription"></PanelSection>
      </div>
      <PanelSection title="Character Background"></PanelSection>
      <PanelSection title="Character Logs"></PanelSection>
      <PanelSection title="Campaign Details"></PanelSection>
    </SheetPageContent>
  );
};

export default CharacterCharacterPage;
