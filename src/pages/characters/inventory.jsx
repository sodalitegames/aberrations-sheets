import { useRecoilValue } from 'recoil';

import { charSheetState } from '../../recoil/character/character.atoms';

import PanelSection from '../../components/shared/PanelSection';
import SheetPageContent from '../../layouts/components/sheet/SheetPageContent';

const CharacterInventoryPage = () => {
  const charSheet = useRecoilValue(charSheetState);

  return (
    <SheetPageContent title="Inventory" columns={4}>
      <PanelSection title="Weapons">{JSON.stringify(charSheet.weapons)}</PanelSection>
      <PanelSection title="Wearables">{JSON.stringify(charSheet.wearables)}</PanelSection>
      <PanelSection title="Consumables">{JSON.stringify(charSheet.consumables)}</PanelSection>
      <PanelSection title="Usables">{JSON.stringify(charSheet.usables)}</PanelSection>
    </SheetPageContent>
  );
};

export default CharacterInventoryPage;
