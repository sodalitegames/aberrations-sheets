import { useSelector, useDispatch } from 'react-redux';

import { selectCurrentCharacter } from '../../redux/character/character.selectors';

import { setSlideOver } from '../../redux/app/app.actions';

import SlideOverTypes from '../../utils/SlideOverTypes';

import SheetPageContent from '../../layouts/components/sheet/SheetPageContent';

import PanelSection from '../../components/shared/PanelSection';
import ListContainer from '../../components/shared/ListContainer';

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
          <ListContainer
            list={charSheet.weapons}
            button={{ click: () => dispatch(setSlideOver({ type: SlideOverTypes.newWeaponForm })), text: 'Add a new Weapon' }}
            empty={{
              heading: 'No Weapons',
              message: 'Get started by creating your first one now',
              button: { click: () => dispatch(setSlideOver({ type: SlideOverTypes.newWeaponForm })), text: 'New Weapon' },
            }}
          >
            {charSheet.weapons.map(weapon => (
              <Weapon key={weapon._id} weapon={weapon} />
            ))}
          </ListContainer>
        </div>
      </PanelSection>

      <PanelSection title="Wearables">
        <div className="flow-root mt-2">
          <ListContainer
            list={charSheet.wearables}
            button={{ click: () => dispatch(setSlideOver({ type: SlideOverTypes.wearableForm })), text: 'Add a new Wearable' }}
            empty={{
              heading: 'No Wearables',
              message: 'Get started by creating your first one now',
              button: { click: () => dispatch(setSlideOver({ type: SlideOverTypes.wearableForm })), text: 'New Wearable' },
            }}
          >
            {charSheet.wearables.map(wearable => (
              <Wearable key={wearable._id} wearable={wearable} />
            ))}
          </ListContainer>
        </div>
      </PanelSection>

      <PanelSection title="Consumables">
        <div className="flow-root mt-2">
          <ListContainer
            list={charSheet.consumables}
            button={{ click: () => dispatch(setSlideOver({ type: SlideOverTypes.consumableForm })), text: 'Add a new Consumable' }}
            empty={{
              heading: 'No Consumables',
              message: 'Get started by creating your first one now',
              button: { click: () => dispatch(setSlideOver({ type: SlideOverTypes.consumableForm })), text: 'New Consumable' },
            }}
          >
            {charSheet.consumables.map(consumable => (
              <Consumable key={consumable._id} consumable={consumable} />
            ))}
          </ListContainer>
        </div>
      </PanelSection>

      <PanelSection title="Usables">
        <div className="flow-root mt-2">
          <ListContainer
            list={charSheet.usables}
            button={{ click: () => dispatch(setSlideOver({ type: SlideOverTypes.usableForm })), text: 'Add a new Usable' }}
            empty={{
              heading: 'No Usables',
              message: 'Get started by creating your first one now',
              button: { click: () => dispatch(setSlideOver({ type: SlideOverTypes.usableForm })), text: 'New Usable' },
            }}
          >
            {charSheet.usables.map(usable => (
              <Usable key={usable._id} usable={usable} />
            ))}
          </ListContainer>
        </div>
      </PanelSection>
    </SheetPageContent>
  );
};

export default CharacterInventoryPage;
