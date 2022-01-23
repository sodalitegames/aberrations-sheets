import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { CheckCircleIcon } from '@heroicons/react/outline';

import { selectCurrentCharacter } from '../../../redux/character/character.selectors';
import { selectCurrentCampaign } from '../../../redux/campaign/campaign.selectors';

import { setModal, setSlideOver } from '../../../redux/app/app.actions';

import SlideOverTypes from '../../../utils/SlideOverTypes';
import ModalTypes from '../../../utils/ModalTypes';
import classNames from '../../../utils/classNames';

import SheetPageContent from '../../../layouts/components/sheet/SheetPageContent';

import PanelSection from '../../../components/sheets/PanelSection';
import ListContainer from '../../../components/shared/data/ListContainer';

import Button from '../../../components/shared/Button';

import DisplayWeapon from '../../../components/sheets/display/DisplayWeapon';

const SheetBelongingsWeaponsPage = ({ sheetType }) => {
  const dispatch = useDispatch();

  const charSheet = useSelector(selectCurrentCharacter);
  const campSheet = useSelector(selectCurrentCampaign);

  const [weapon, setWeapon] = useState(sheetType === 'characters' ? charSheet.weapons[0] || null : campSheet.weapons[0] || null);

  console.log(weapon);

  return (
    <SheetPageContent title="Weapons" columns={4}>
      {/* All Weapons */}
      <PanelSection title="Manage Weapons">
        <div className="flow-root mt-2">
          <ListContainer
            list={sheetType === 'characters' ? charSheet.weapons : campSheet.weapons}
            button={{ click: () => dispatch(setSlideOver({ type: SlideOverTypes.newWeaponForm, data: { sheetType: sheetType } })), text: 'Add a new Weapon' }}
            empty={{
              heading: 'No Weapons',
              message: 'Get started by creating your first one now',
              button: { click: () => dispatch(setSlideOver({ type: SlideOverTypes.newWeaponForm, data: { sheetType: sheetType } })), text: 'New Weapon' },
            }}
          >
            {(sheetType === 'characters' ? charSheet.weapons : campSheet.weapons).map(weapon => (
              <div key={weapon._id} className={classNames('flex justify-between items-center hover:bg-gray-50 px-2 cursor-pointer')} onClick={() => setWeapon(weapon)}>
                <DisplayWeapon key={weapon._id} weapon={weapon} sheetType={sheetType} condensed listItem />

                {/* Display if it's a character sheet weapon is equipped */}
                {sheetType === 'characters' && weapon.equipped ? (
                  <div className="shrink-0 ml-2" title="Equipped">
                    <CheckCircleIcon className="h-6 w-6 text-green-600" aria-hidden="true" />
                  </div>
                ) : null}

                {/* Display if it's a campaign sheet and weapon is active */}
                {sheetType === 'campaigns' && weapon.active ? (
                  <div className="shrink-0 ml-2" title="Active">
                    <CheckCircleIcon className="h-6 w-6 text-green-600" aria-hidden="true" />
                  </div>
                ) : null}
              </div>
            ))}
          </ListContainer>
        </div>
      </PanelSection>

      {/* Selected Weapon */}
      <PanelSection title="Selected Weapon" colSpan={3}>
        {weapon ? (
          <div className="grid gap-8 grid-cols-3 divide-x divide-gray-200">
            <div className="col-span-2">
              <DisplayWeapon weapon={weapon} sheetType={sheetType} />
            </div>

            <div className="col-span-1 space-y-4 pl-8">
              {sheetType === 'characters' ? <Button>{weapon.equipped ? 'Unequip' : 'Equip'}</Button> : null}
              {sheetType === 'campaigns' ? <Button>{weapon.npcId ? 'Unassign' : 'Assign'}</Button> : null}
              {sheetType === 'campaigns' ? <Button>{weapon.active ? 'Deactivate' : 'Activate'}</Button> : null}
              <Button>Give or Sell</Button>
              <Button onClick={() => dispatch(setSlideOver({ type: SlideOverTypes.editWeaponForm, id: weapon._id, data: { sheetType: sheetType } }))}>Edit</Button>
              <Button
                alert
                onClick={() =>
                  dispatch(
                    setModal({
                      type: ModalTypes.deleteResource,
                      id: weapon._id,
                      data: {
                        sheetType: sheetType,
                        resourceType: 'weapons',
                        title: `Are you sure you want to delete ${weapon.nickname || weapon.name}?`,
                        submitText: `Yes, delete ${weapon.nickname || weapon.name}`,
                        equipped: weapon.equipped,
                      },
                    })
                  )
                }
              >
                Delete
              </Button>
            </div>
          </div>
        ) : (
          <p className="text-sm italic text-gray-400">Please create or select a weapon to get started.</p>
        )}
      </PanelSection>
    </SheetPageContent>
  );
};

export default SheetBelongingsWeaponsPage;
