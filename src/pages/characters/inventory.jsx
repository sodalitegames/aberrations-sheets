import { useRecoilValue, useSetRecoilState } from 'recoil';

import { slideOverState } from '../../recoil/app/app.atoms';
import { charSheetState } from '../../recoil/character/character.atoms';

import SlideOverTypes from '../../utils/SlideOverTypes';

import SheetPageContent from '../../layouts/components/sheet/SheetPageContent';

import PanelSection from '../../components/shared/PanelSection';
import Button from '../../components/shared/Button';

const CharacterInventoryPage = () => {
  const charSheet = useRecoilValue(charSheetState);
  const setSlideOver = useSetRecoilState(slideOverState);

  return (
    <SheetPageContent title="Inventory" columns={4}>
      <PanelSection title="Weapons">
        <div className="flow-root mt-2">
          <div className="mb-6">
            <Button onClick={() => setSlideOver({ type: SlideOverTypes.newWeaponForm })}>Add a new Weapon</Button>
          </div>
          {JSON.stringify(charSheet.weapons)}
        </div>
      </PanelSection>
      <PanelSection title="Wearables">
        <div className="flow-root mt-2">
          <div className="mb-6">
            <Button onClick={() => setSlideOver({ type: SlideOverTypes.wearableForm })}>Add a new Wearable</Button>
          </div>
          {JSON.stringify(charSheet.wearables)}
        </div>
      </PanelSection>
      <PanelSection title="Consumables">
        <div className="flow-root mt-2">
          <div className="mb-6">
            <Button onClick={() => setSlideOver({ type: SlideOverTypes.consumableForm })}>Add a new Consumable</Button>
          </div>
          {JSON.stringify(charSheet.consumables)}
        </div>
      </PanelSection>
      <PanelSection title="Usables">
        <div className="flow-root mt-2">
          <div className="mb-6">
            <Button onClick={() => setSlideOver({ type: SlideOverTypes.usableForm })}>Add a new Usable</Button>
          </div>
          {JSON.stringify(charSheet.usables)}
        </div>
      </PanelSection>
    </SheetPageContent>
  );
};

export default CharacterInventoryPage;
