import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useSearchParams } from 'react-router-dom';

import { selectCurrentCharacter, selectEquippedWeapons, selectWeapons as selectCharWeapons, selectArchivedWeapons as selectCharArchivedWeapons } from '../../../../redux/character/character.selectors';
import { selectCurrentCampaign, selectWeapons as selectCampWeapons, selectArchivedWeapons as selectCampArchivedWeapons } from '../../../../redux/campaign/campaign.selectors';

import SheetPageContent from '../../../../layouts/components/sheet/SheetPageContent';

import SheetPagePanel from '../../../../layouts/components/sheet/SheetPagePanel';
import BelongingActions from '../../../../components/sections/BelongingActions';
import ListInteractables, { ListInteractablesMessage } from '../../../../components/sections/ListInteractables';

import DisplayWeapon from '../../../../components/display/DisplayWeapon';

const SheetBelongingsWeaponsPage = ({ sheetType }) => {
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
    // First, clear out currently selected
    setWeapon(null);
    setId(null);

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
      <ListInteractablesMessage show={searchParams.get('show')} interactableType="weapons" />

      {/* Weapons List */}
      <SheetPagePanel title="Manage Weapons">
        <div className="flow-root mt-2">
          <ListInteractables sheetType={sheetType} interactableType="weapons" id={id} setId={setId} interactablesList={weaponsList} label="Weapon" show={searchParams.get('show')} />
        </div>
      </SheetPagePanel>

      {/* Selected Weapon */}
      <SheetPagePanel title="Selected Weapon" colSpan={3}>
        {weapon ? (
          <div className="grid grid-cols-3 gap-8 divide-x divide-gray-200">
            <div className="col-span-2">
              <DisplayWeapon weapon={weapon} sheetType={sheetType} />
            </div>

            <div className="col-span-1 pl-8 space-y-4">
              <BelongingActions
                sheetType={sheetType}
                sheet={sheetType === 'characters' ? charSheet : campSheet}
                belongingType="weapons"
                belonging={weapon}
                belongingKind="Weapon"
                equippedBelongings={equippedWeapons}
              />
            </div>
          </div>
        ) : (
          <p className="text-sm italic text-gray-400">Please create or select a weapon to get started.</p>
        )}
      </SheetPagePanel>
    </SheetPageContent>
  );
};

export default SheetBelongingsWeaponsPage;
