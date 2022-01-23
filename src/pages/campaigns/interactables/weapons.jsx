import { useSelector, useDispatch } from 'react-redux';

import { selectCurrentCampaign } from '../../../redux/campaign/campaign.selectors';

import { setSlideOver } from '../../../redux/app/app.actions';

import SlideOverTypes from '../../../utils/SlideOverTypes';

import SheetPageContent from '../../../layouts/components/sheet/SheetPageContent';

import PanelSection from '../../../components/shared/PanelSection';
import ListContainer from '../../../components/shared/ListContainer';

import DisplayWeapon from '../../../components/sheets/display/DisplayWeapon';

const CampaignWeaponsPage = () => {
  const dispatch = useDispatch();
  const campSheet = useSelector(selectCurrentCampaign);

  return (
    <SheetPageContent title="Weapons" columns={4}>
      {/* All Weapons */}
      <PanelSection title="Manage Weapons">
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
              <DisplayWeapon key={weapon._id} weapon={weapon} />
            ))}
          </ListContainer>
        </div>
      </PanelSection>

      {/* Selected Weapon */}
      <PanelSection title="Selected Weapon" colSpan={3}>
        {JSON.stringify(campSheet.weapons)}
      </PanelSection>
    </SheetPageContent>
  );
};

export default CampaignWeaponsPage;
