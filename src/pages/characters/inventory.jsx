import { useSelector, useDispatch } from 'react-redux';

import { selectCurrentCharacter } from '../../redux/character/character.selectors';

import { setSlideOver } from '../../redux/app/app.actions';

import SlideOverTypes from '../../utils/SlideOverTypes';

import SheetPageContent from '../../layouts/components/sheet/SheetPageContent';

import PanelSection from '../../components/shared/PanelSection';
import Button from '../../components/shared/Button';
import EmptyState from '../../components/shared/EmptyState';

import Weapon from '../../components/characters/display/Weapon';
import Wearable from '../../components/characters/display/Wearable';
import Consumable from '../../components/characters/display/Consumable';
import Usable from '../../components/characters/display/Usable';

const CharacterInventoryPage = () => {
  const dispatch = useDispatch();

  const charSheet = useSelector(selectCurrentCharacter);

  return (
    <SheetPageContent title="Inventory" columns={4}>
      <PanelSection title="Weapons">
        <div className="flow-root mt-2">
          {charSheet.weapons.length ? (
            <>
              <div className="mb-6">
                <Button onClick={() => dispatch(setSlideOver({ type: SlideOverTypes.newWeaponForm }))}>Add a new Weapon</Button>
              </div>
              <ul className="-my-5 divide-y divide-gray-200">
                {charSheet.weapons.map(weapon => (
                  <Weapon key={weapon._id} weapon={weapon} />
                ))}
              </ul>
            </>
          ) : (
            <EmptyState
              heading="No Weapons"
              message="Get started by creating your first one now"
              button={{ click: () => dispatch(setSlideOver({ type: SlideOverTypes.newWeaponForm })), text: 'New Weapon' }}
            />
          )}
        </div>
      </PanelSection>
      <PanelSection title="Wearables">
        <div className="flow-root mt-2">
          {charSheet.wearables.length ? (
            <>
              <div className="mb-6">
                <Button onClick={() => dispatch(setSlideOver({ type: SlideOverTypes.wearableForm }))}>Add a new Wearable</Button>
              </div>
              <ul className="-my-5 divide-y divide-gray-200">
                {charSheet.wearables.map(wearable => (
                  <Wearable key={wearable._id} wearable={wearable} />
                ))}
              </ul>
            </>
          ) : (
            <EmptyState
              heading="No Wearables"
              message="Get started by creating your first one now"
              button={{ click: () => dispatch(setSlideOver({ type: SlideOverTypes.wearableForm })), text: 'New Wearable' }}
            />
          )}
        </div>
      </PanelSection>
      <PanelSection title="Consumables">
        <div className="flow-root mt-2">
          {charSheet.consumables.length ? (
            <>
              <div className="mb-6">
                <Button onClick={() => dispatch(setSlideOver({ type: SlideOverTypes.consumableForm }))}>Add a new Consumable</Button>
              </div>
              <ul className="-my-5 divide-y divide-gray-200">
                {charSheet.consumables.map(consumable => (
                  <Consumable key={consumable._id} consumable={consumable} />
                ))}
              </ul>
            </>
          ) : (
            <EmptyState
              heading="No Consumables"
              message="Get started by creating your first one now"
              button={{ click: () => dispatch(setSlideOver({ type: SlideOverTypes.consumableForm })), text: 'New Consumable' }}
            />
          )}
        </div>
      </PanelSection>
      <PanelSection title="Usables">
        <div className="flow-root mt-2">
          {charSheet.usables.length ? (
            <>
              <div className="mb-6">
                <Button onClick={() => dispatch(setSlideOver({ type: SlideOverTypes.usableForm }))}>Add a new Usable</Button>
              </div>
              <ul className="-my-5 divide-y divide-gray-200">
                {charSheet.usables.map(usable => (
                  <Usable key={usable._id} usable={usable} />
                ))}
              </ul>
            </>
          ) : (
            <EmptyState
              heading="No Usables"
              message="Get started by creating your first one now"
              button={{ click: () => dispatch(setSlideOver({ type: SlideOverTypes.usableForm })), text: 'New Usable' }}
            />
          )}
        </div>
      </PanelSection>
    </SheetPageContent>
  );
};

export default CharacterInventoryPage;
