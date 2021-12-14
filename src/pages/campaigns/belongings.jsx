import { useSelector, useDispatch } from 'react-redux';

import { selectCurrentCampaign } from '../../redux/campaign/campaign.selectors';

import { setSlideOver } from '../../redux/app/app.actions';

import SlideOverTypes from '../../utils/SlideOverTypes';

import SheetPageContent from '../../layouts/components/sheet/SheetPageContent';

import PanelSection from '../../components/shared/PanelSection';
import ListContainer from '../../components/shared/ListContainer';

import Weapon from '../../components/characters/display/Weapon';
import Wearable from '../../components/characters/display/Wearable';
import Consumable from '../../components/characters/display/Consumable';
import Usable from '../../components/characters/display/Usable';

const CampaignBelongingsPage = () => {
  const dispatch = useDispatch();

  const campSheet = useSelector(selectCurrentCampaign);

  return (
    <SheetPageContent title="Belongings" columns={4}>
      {/* Weapons */}
      <PanelSection title="Weapons">
        <div className="flow-root mt-2">
          <ListContainer
            list={campSheet.weapons}
            button={{ click: () => dispatch(setSlideOver({ type: SlideOverTypes.newWeaponForm })), text: 'Add a new Weapon' }}
            empty={{
              heading: 'No Weapons',
              message: 'This feature is coming soon...',
              // button: { click: () => dispatch(setSlideOver({ type: SlideOverTypes.newWeaponForm })), text: 'New Weapon' },
            }}
          >
            {campSheet.weapons.map(weapon => (
              <Weapon key={weapon._id} weapon={weapon} />
            ))}
          </ListContainer>
        </div>
      </PanelSection>

      {/* Wearables */}
      <PanelSection title="Wearables">
        <div className="flow-root mt-2">
          <ListContainer
            list={campSheet.wearables}
            button={{ click: () => dispatch(setSlideOver({ type: SlideOverTypes.wearableForm })), text: 'Add a new Wearable' }}
            empty={{
              heading: 'No Wearables',
              message: 'This feature is coming soon...',
              // button: { click: () => dispatch(setSlideOver({ type: SlideOverTypes.wearableForm })), text: 'New Wearable' },
            }}
          >
            {campSheet.wearables.map(wearable => (
              <Wearable key={wearable._id} wearable={wearable} />
            ))}
          </ListContainer>
        </div>
      </PanelSection>

      {/* Consumables */}
      <PanelSection title="Consumables">
        <div className="flow-root mt-2">
          <ListContainer
            list={campSheet.consumables}
            button={{ click: () => dispatch(setSlideOver({ type: SlideOverTypes.consumableForm })), text: 'Add a new Consumable' }}
            empty={{
              heading: 'No Consumables',
              message: 'This feature is coming soon...',
              // button: { click: () => dispatch(setSlideOver({ type: SlideOverTypes.consumableForm })), text: 'New Consumable' },
            }}
          >
            {campSheet.consumables.map(consumable => (
              <Consumable key={consumable._id} consumable={consumable} />
            ))}
          </ListContainer>
        </div>
      </PanelSection>

      {/* Usables */}
      <PanelSection title="Usables">
        <div className="flow-root mt-2">
          <ListContainer
            list={campSheet.usables}
            button={{ click: () => dispatch(setSlideOver({ type: SlideOverTypes.usableForm })), text: 'Add a new Usable' }}
            empty={{
              heading: 'No Usables',
              message: 'This feature is coming soon...',
              // button: { click: () => dispatch(setSlideOver({ type: SlideOverTypes.usableForm })), text: 'New Usable' },
            }}
          >
            {campSheet.usables.map(usable => (
              <Usable key={usable._id} usable={usable} />
            ))}
          </ListContainer>
        </div>
      </PanelSection>
    </SheetPageContent>
  );
};

export default CampaignBelongingsPage;
