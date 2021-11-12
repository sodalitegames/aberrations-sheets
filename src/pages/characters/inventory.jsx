import { useRecoilState } from 'recoil';

import { charSheetState } from '../../recoil/character/character.atoms';

import PanelSection from '../../components/characters/PanelSection';
import SheetPageContent from '../../layouts/components/sheet/SheetPageContent';

const CharacterInventoryPage = () => {
  const [charSheet, setCharSheet] = useRecoilState(charSheetState);

  if (!charSheet) {
    return <div>Collecting character sheet data...</div>;
  }

  return (
    <SheetPageContent title="Inventory" columns={4}>
      <PanelSection title="Weapons"></PanelSection>
      <PanelSection title="Wearables"></PanelSection>
      <PanelSection title="Consumables"></PanelSection>
      <PanelSection title="Usables"></PanelSection>
    </SheetPageContent>
  );
};

export default CharacterInventoryPage;
