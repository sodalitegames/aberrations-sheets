import { Fragment, useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useSearchParams } from 'react-router-dom';

import { CheckCircleIcon } from '@heroicons/react/outline';

import { selectCurrentCharacter, selectEquippedWeapons, selectWeapons as selectCharWeapons, selectArchivedWeapons as selectCharArchivedWeapons } from '../../../redux/character/character.selectors';
import { selectCurrentCampaign, selectWeapons as selectCampWeapons, selectArchivedWeapons as selectCampArchivedWeapons } from '../../../redux/campaign/campaign.selectors';

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
import Notice from '../../../components/shared/Notice';

const SheetBelongingsWeaponsPage = ({ sheetType }) => {
  const dispatch = useDispatch();
  const [searchParams] = useSearchParams();

  const charSheet = useSelector(selectCurrentCharacter);
  const campSheet = useSelector(selectCurrentCampaign);
  const equippedWeapons = useSelector(selectEquippedWeapons);

  const charWeapons = useSelector(selectCharWeapons);
  const campWeapons = useSelector(selectCampWeapons);
  const charArchivedWeapons = useSelector(selectCharArchivedWeapons);
  const campArchivedWeapons = useSelector(selectCampArchivedWeapons);

  const [weapon, setWeapon] = useState(null);
  const [id, setId] = useState(null);

  const [weaponsList, setWeaponsList] = useState([]);

  useEffect(() => {
    if (sheetType === 'characters') {
      switch (searchParams.get('show')) {
        case 'archived':
          setWeaponsList(charArchivedWeapons);
          return;

        default:
          setWeaponsList(charWeapons);
          return;
      }
    }

    if (sheetType === 'campaigns') {
      switch (searchParams.get('show')) {
        case 'archived':
          setWeaponsList(campArchivedWeapons);
          return;

        case 'active':
          setWeaponsList(campWeapons.filter(weap => weap.active));
          return;

        case 'inactive':
          setWeaponsList(campWeapons.filter(weap => !weap.active));
          return;

        default:
          setWeaponsList(campWeapons);
          return;
      }
    }
  }, [sheetType, searchParams, charArchivedWeapons, campArchivedWeapons, charWeapons, campWeapons]);

  useEffect(() => {
    if (weaponsList.length) {
      if (id) {
        setWeapon(weaponsList.find(weap => weap._id === id));
        return;
      }

      setWeapon(weaponsList[0]);
      setId(weaponsList[0]._id);
    }
  }, [weaponsList, id]);

  return (
    <SheetPageContent title="Weapons" columns={4}>
      {/* Showing Archived Weapons Notice */}
      {searchParams.get('show') !== 'current' || searchParams.get('show') !== 'all' ? (
        <div className="col-span-4">
          {searchParams.get('show') === 'archived' ? <Notice status="warn" message="You are viewing your archived weapons. To view your current weapons, specify so above." /> : null}
          {searchParams.get('show') === 'active' ? <Notice status="success" message="You are viewing only your active weapons. To view all of your weapons, specify so above." /> : null}
          {searchParams.get('show') === 'inactive' ? <Notice status="info" message="You are viewing only your inactive weapons. To view all of your weapons, specify so above." /> : null}
        </div>
      ) : null}

      {/* Weapons List */}
      <PanelSection title="Manage Weapons">
        <div className="flow-root mt-2">
          <ListContainer
            list={
              sheetType === 'characters'
                ? searchParams.get('show') === 'archived'
                  ? charArchivedWeapons
                  : charWeapons.filter(weap => (searchParams.get('show') === 'active' ? weap.active === true : searchParams.get('show') === 'inactive' ? weap.active === false : true))
                : searchParams.get('show') === 'archived'
                ? campArchivedWeapons
                : campWeapons.filter(weap => (searchParams.get('show') === 'active' ? weap.active === true : searchParams.get('show') === 'inactive' ? weap.active === false : true))
            }
            button={
              searchParams.get('show') !== 'archived' ? { click: () => dispatch(setSlideOver({ type: SlideOverTypes.newWeaponForm, data: { sheetType: sheetType } })), text: 'Add a new Weapon' } : null
            }
            empty={{
              heading: 'No Weapons',
              message:
                searchParams.get('show') === 'archived'
                  ? 'You have no archived weapons'
                  : searchParams.get('show') === 'active'
                  ? 'You have no active weapons.'
                  : searchParams.get('show') === 'inactive'
                  ? 'You have no inactive weapons'
                  : 'Get started by creating your first one now',
              button:
                searchParams.get('show') !== 'archived' ? { click: () => dispatch(setSlideOver({ type: SlideOverTypes.newWeaponForm, data: { sheetType: sheetType } })), text: 'New Weapon' } : null,
            }}
          >
            {(sheetType === 'characters'
              ? searchParams.get('show') === 'archived'
                ? charArchivedWeapons
                : charWeapons.filter(weap => (searchParams.get('show') === 'active' ? weap.active === true : searchParams.get('show') === 'inactive' ? weap.active === false : true))
              : searchParams.get('show') === 'archived'
              ? campArchivedWeapons
              : campWeapons.filter(weap => (searchParams.get('show') === 'active' ? weap.active === true : searchParams.get('show') === 'inactive' ? weap.active === false : true))
            ).map(weapon => (
              <div
                key={weapon._id}
                className={classNames('flex justify-between items-center px-2 cursor-pointer', id === weapon._id ? 'bg-gray-100' : 'hover:bg-gray-50')}
                onClick={() => setId(weapon._id)}
              >
                <DisplayWeapon key={weapon._id} weapon={weapon} sheetType={sheetType} condensed listItem />

                {/* Display if it's a character sheet weapon is equipped */}
                {sheetType === 'characters' && weapon.equipped ? (
                  <div className="ml-2 shrink-0" title="Equipped">
                    <CheckCircleIcon className="w-6 h-6 text-green-600" aria-hidden="true" />
                  </div>
                ) : null}

                {/* Display if it's a campaign sheet and weapon is active */}
                {sheetType === 'campaigns' && weapon.active ? (
                  <div className="ml-2 shrink-0" title="Active">
                    <CheckCircleIcon className="w-6 h-6 text-green-600" aria-hidden="true" />
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
          <div className="grid grid-cols-3 gap-8 divide-x divide-gray-200">
            <div className="col-span-2">
              <DisplayWeapon weapon={weapon} sheetType={sheetType} />
            </div>

            <div className="col-span-1 pl-8 space-y-4">
              {!weapon.archived ? (
                <Fragment>
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
                </Fragment>
              ) : null}

              <Button onClick={() => dispatch(setSlideOver({ type: SlideOverTypes.editWeaponForm, id: weapon._id, data: { sheetType: sheetType } }))}>Edit</Button>
              <Button
                onClick={() =>
                  dispatch(
                    updateSheetResourceStart(
                      sheetType,
                      sheetType === 'characters' ? charSheet._id : campSheet._id,
                      'weapons',
                      weapon._id,
                      { archived: !weapon.archived, equipped: false, active: false },
                      {
                        notification: {
                          status: 'success',
                          heading: `Weapon ${weapon.archived ? 'Restored' : 'Archived'}`,
                          message: `You have successfully ${weapon.archived ? 'restored' : 'archived'} ${weapon.nickname || weapon.name}.`,
                        },
                      }
                    )
                  )
                }
              >
                {weapon.archived ? 'Restore' : 'Archive'}
              </Button>
              {weapon.archived ? (
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
              ) : null}
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
