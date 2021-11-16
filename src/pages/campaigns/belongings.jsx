import { useRecoilValue, useSetRecoilState } from 'recoil';

import { slideOverState } from '../../recoil/app/app.atoms';
import { campSheetState } from '../../recoil/campaign/campaign.atoms';

import SlideOverTypes from '../../utils/SlideOverTypes';

import SheetPageContent from '../../layouts/components/sheet/SheetPageContent';

import PanelSection from '../../components/shared/PanelSection';
import Button from '../../components/shared/Button';

import Weapon from '../../components/characters/display/Weapon';
import Wearable from '../../components/characters/display/Wearable';
import Consumable from '../../components/characters/display/Consumable';
import Usable from '../../components/characters/display/Usable';

const CampaignBelongingsPage = () => {
  const campSheet = useRecoilValue(campSheetState);
  const setSlideOver = useSetRecoilState(slideOverState);

  console.log(campSheet.weapons);
  console.log(campSheet.wearables);
  console.log(campSheet.consumables);
  console.log(campSheet.usables);

  return (
    <SheetPageContent title="Belongings" columns={4}>
      <PanelSection title="Weapons">
        <div className="flow-root mt-2">
          <div className="mb-6">
            <Button onClick={() => setSlideOver({ type: SlideOverTypes.newWeaponForm })}>Add a new Weapon</Button>
          </div>

          <ul className="-my-5 divide-y divide-gray-200">
            {campSheet.weapons.map(weapon => (
              <Weapon key={weapon._id} weapon={weapon} />
            ))}
          </ul>
        </div>
      </PanelSection>
      <PanelSection title="Wearables">
        <div className="flow-root mt-2">
          <div className="mb-6">
            <Button onClick={() => setSlideOver({ type: SlideOverTypes.wearableForm })}>Add a new Wearable</Button>
          </div>
          <ul className="-my-5 divide-y divide-gray-200">
            {campSheet.wearables.map(wearable => (
              <Wearable key={wearable._id} wearable={wearable} />
            ))}
          </ul>
        </div>
      </PanelSection>
      <PanelSection title="Consumables">
        <div className="flow-root mt-2">
          <div className="mb-6">
            <Button onClick={() => setSlideOver({ type: SlideOverTypes.consumableForm })}>Add a new Consumable</Button>
          </div>
          <ul className="-my-5 divide-y divide-gray-200">
            {campSheet.consumables.map(consumable => (
              <Consumable key={consumable._id} consumable={consumable} />
            ))}
          </ul>
        </div>
      </PanelSection>
      <PanelSection title="Usables">
        <div className="flow-root mt-2">
          <div className="mb-6">
            <Button onClick={() => setSlideOver({ type: SlideOverTypes.usableForm })}>Add a new Usable</Button>
          </div>
          <ul className="-my-5 divide-y divide-gray-200">
            {campSheet.usables.map(usable => (
              <Usable key={usable._id} usable={usable} />
            ))}
          </ul>
        </div>
      </PanelSection>
    </SheetPageContent>
  );
};

export default CampaignBelongingsPage;
