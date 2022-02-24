import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useSearchParams } from 'react-router-dom';

import {
  selectCurrentCharacter,
  selectEquippedWearables,
  selectWearables as selectCharWearables,
  selectArchivedWearables as selectCharArchivedWearables,
  selectEquipmentMods,
} from '../../../../redux/character/character.selectors';
import { selectCurrentCampaign, selectWearables as selectCampWearables, selectArchivedWearables as selectCampArchivedWearables } from '../../../../redux/campaign/campaign.selectors';

import SheetPageContent from '../../../../layouts/components/sheet/SheetPageContent';

import SheetPagePanel from '../../../../layouts/components/sheet/SheetPagePanel';
import BelongingActions from '../../../../components/sections/BelongingActions';
import ListBelongings, { ListBelongingsMessage } from '../../../../components/sections/ListBelongings';

import DisplayWearable from '../../../../components/display/DisplayWearable';

const SheetBelongingsWearablesPage = ({ sheetType }) => {
  const [searchParams] = useSearchParams();

  const charSheet = useSelector(selectCurrentCharacter);
  const campSheet = useSelector(selectCurrentCampaign);
  const equippedWearables = useSelector(selectEquippedWearables);
  const equipmentMods = useSelector(selectEquipmentMods);

  const charWearables = useSelector(selectCharWearables);
  const campWearables = useSelector(selectCampWearables);
  const charArchivedWearables = useSelector(selectCharArchivedWearables);
  const campArchivedWearables = useSelector(selectCampArchivedWearables);

  const [wearable, setWearable] = useState(null);
  const [id, setId] = useState(null);

  const [wearablesList, setWearablesList] = useState([]);

  useEffect(() => {
    if (sheetType === 'characters') {
      switch (searchParams.get('show')) {
        case 'archived':
          setWearablesList(charArchivedWearables);
          return;

        default:
          setWearablesList(charWearables);
          return;
      }
    }

    if (sheetType === 'campaigns') {
      switch (searchParams.get('show')) {
        case 'archived':
          setWearablesList(campArchivedWearables);
          return;

        case 'active':
          setWearablesList(campWearables.filter(weap => weap.active));
          return;

        case 'inactive':
          setWearablesList(campWearables.filter(weap => !weap.active));
          return;

        default:
          setWearablesList(campWearables);
          return;
      }
    }
  }, [sheetType, searchParams, charArchivedWearables, campArchivedWearables, charWearables, campWearables]);

  useEffect(() => {
    if (wearablesList.length) {
      if (id) {
        setWearable(wearablesList.find(wear => wear._id === id));
        return;
      }

      setWearable(wearablesList[0]);
      setId(wearablesList[0]._id);
    }
  }, [sheetType, id, wearablesList]);

  return (
    <SheetPageContent title="Wearables" columns={4}>
      {/* Showing Archived Wearables Notice */}
      <ListBelongingsMessage show={searchParams.get('show')} belongingType="wearables" />

      {/* Wearables List */}
      <SheetPagePanel title="Manage Wearables">
        <div className="flow-root mt-2">
          <ListBelongings sheetType={sheetType} belongingType="wearables" belongingKind="Wearable" id={id} setId={setId} belongingsList={wearablesList} show={searchParams.get('show')} />
        </div>
      </SheetPagePanel>

      {/* Selected Wearable */}
      <SheetPagePanel title="Selected Wearable" colSpan={3}>
        {wearable ? (
          <div className="grid grid-cols-3 gap-8 divide-x divide-gray-200">
            <div className="col-span-2">
              <DisplayWearable wearable={wearable} sheetType={sheetType} />
            </div>

            <div className="col-span-1 pl-8 space-y-4">
              <BelongingActions
                sheetType={sheetType}
                sheet={sheetType === 'characters' ? charSheet : campSheet}
                belongingType="wearables"
                belonging={wearable}
                belongingKind="Wearable"
                equippedBelongings={equippedWearables}
                equipmentMods={equipmentMods}
              />
            </div>
          </div>
        ) : (
          <p className="text-sm italic text-gray-400">Please create or select a wearable to get started.</p>
        )}
      </SheetPagePanel>
    </SheetPageContent>
  );
};

export default SheetBelongingsWearablesPage;
