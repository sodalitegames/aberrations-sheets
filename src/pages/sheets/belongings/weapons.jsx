import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { CheckCircleIcon } from '@heroicons/react/outline';

import { selectCurrentCharacter, selectEquippedWeapons } from '../../../redux/character/character.selectors';
import { selectCurrentCampaign } from '../../../redux/campaign/campaign.selectors';

import { setModal, setSlideOver } from '../../../redux/app/app.actions';
import { updateSheetResourceStart } from '../../../redux/sheet/sheet.actions';

import SlideOverTypes from '../../../utils/SlideOverTypes';
import ModalTypes from '../../../utils/ModalTypes';
import classNames from '../../../utils/classNames';
import equipBelonging from '../../../utils/equipBelonging';

import SheetPageContent from '../../../layouts/components/sheet/SheetPageContent';

import PanelSection from '../../../components/sheets/PanelSection';
import ListContainer from '../../../components/shared/data/ListContainer';

import Button from '../../../components/shared/Button';

import DisplayWeapon from '../../../components/sheets/display/DisplayWeapon';

const SheetBelongingsWeaponsPage = ({ sheetType }) => {
  const dispatch = useDispatch();

  const charSheet = useSelector(selectCurrentCharacter);
  const campSheet = useSelector(selectCurrentCampaign);
  const equippedWeapons = useSelector(selectEquippedWeapons);

  const [weapon, setWeapon] = useState(null);
  const [id, setId] = useState(null);

  useEffect(() => {
    if (id) {
      setWeapon(sheetType === 'characters' ? charSheet.weapons.find(weap => weap._id === id) : campSheet.weapons.find(weap => weap._id === id));
      return;
    }

    setWeapon(sheetType === 'characters' ? charSheet.weapons[0] : campSheet.weapons[0]);
    setId(sheetType === 'characters' ? charSheet.weapons[0]?._id : campSheet.weapons[0]?._id);
  }, [sheetType, id, campSheet, charSheet]);

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
              <div
                key={weapon._id}
                className={classNames('flex justify-between items-center px-2 cursor-pointer', id === weapon._id ? 'bg-gray-100' : 'hover:bg-gray-50')}
                onClick={() => setId(weapon._id)}
              >
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
              {sheetType === 'characters' ? (
                <Button dark={weapon.equipped} onClick={() => equipBelonging({ sheetType, sheet: charSheet, belongingType: 'weapons', belonging: weapon, equippedList: equippedWeapons })}>
                  {weapon.equipped ? 'Unequip' : 'Equip'}
                </Button>
              ) : null}
              {sheetType === 'campaigns' ? (
                weapon.npcId ? (
                  <Button
                    dark
                    onClick={() =>
                      dispatch(
                        updateSheetResourceStart(
                          sheetType,
                          campSheet._id,
                          'weapons',
                          weapon._id,
                          { npcId: null },
                          { notification: { status: 'success', heading: 'Weapon Unassigned', message: `You have successfully unassigned ${weapon.nickname || weapon.name}.` } }
                        )
                      )
                    }
                  >
                    Unassign
                  </Button>
                ) : (
                  <Button onClick={() => dispatch(setModal({ type: ModalTypes.assignBelonging, id: weapon._id, data: { type: 'weapons', name: weapon.name } }))}>Assign</Button>
                )
              ) : null}
              {sheetType === 'campaigns' ? (
                <Button
                  dark={weapon.active}
                  onClick={() =>
                    dispatch(
                      updateSheetResourceStart(
                        sheetType,
                        campSheet._id,
                        'weapons',
                        weapon._id,
                        { active: !weapon.active },
                        {
                          notification: {
                            status: 'success',
                            heading: `Weapon ${weapon.active ? 'Deactivated' : 'Activated'}`,
                            message: `You have successfully ${weapon.active ? 'deactivated' : 'activated'} ${weapon.nickname || weapon.name}.`,
                          },
                        }
                      )
                    )
                  }
                >
                  {weapon.active ? 'Deactivate' : 'Activate'}
                </Button>
              ) : null}
              <Button onClick={() => dispatch(setSlideOver({ type: SlideOverTypes.newTransactionForm, data: { sheetType, documentType: 'weapons', document: weapon } }))}>Give or Sell</Button>
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
                        notification: { heading: 'Weapon Deleted', message: `You have successfully deleted ${weapon.name}.` },
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
