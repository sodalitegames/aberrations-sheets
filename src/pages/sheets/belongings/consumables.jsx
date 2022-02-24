import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useSearchParams } from 'react-router-dom';

import {
  selectCurrentCharacter,
  selectEquippedConsumables,
  selectConsumables as selectCharConsumables,
  selectArchivedConsumables as selectCharArchivedConsumables,
} from '../../../redux/character/character.selectors';
import { selectCurrentCampaign, selectConsumables as selectCampConsumables, selectArchivedConsumables as selectCampArchivedConsumables } from '../../../redux/campaign/campaign.selectors';

import SheetPageContent from '../../../layouts/components/sheet/SheetPageContent';

import PanelSection from '../../../components/sheets/PanelSection';
import BelongingActions from '../../../components/sheets/BelongingActions';
import ListBelongings, { ListBelongingsMessage } from '../../../components/sheets/ListBelongings';

import DisplayConsumable from '../../../components/sheets/display/DisplayConsumable';

const SheetBelongingsConsumablesPage = ({ sheetType }) => {
  const [searchParams] = useSearchParams();

  const charSheet = useSelector(selectCurrentCharacter);
  const campSheet = useSelector(selectCurrentCampaign);
  const equippedConsumables = useSelector(selectEquippedConsumables);

  const charConsumables = useSelector(selectCharConsumables);
  const campConsumables = useSelector(selectCampConsumables);
  const charArchivedConsumables = useSelector(selectCharArchivedConsumables);
  const campArchivedConsumables = useSelector(selectCampArchivedConsumables);

  const [consumable, setConsumable] = useState(null);
  const [id, setId] = useState(null);

  const [consumablesList, setConsumablesList] = useState([]);

  useEffect(() => {
    if (sheetType === 'characters') {
      switch (searchParams.get('show')) {
        case 'archived':
          setConsumablesList(charArchivedConsumables);
          return;

        default:
          setConsumablesList(charConsumables);
          return;
      }
    }

    if (sheetType === 'campaigns') {
      switch (searchParams.get('show')) {
        case 'archived':
          setConsumablesList(campArchivedConsumables);
          return;

        case 'active':
          setConsumablesList(campConsumables.filter(weap => weap.active));
          return;

        case 'inactive':
          setConsumablesList(campConsumables.filter(weap => !weap.active));
          return;

        default:
          setConsumablesList(campConsumables);
          return;
      }
    }
  }, [sheetType, searchParams, charArchivedConsumables, campArchivedConsumables, charConsumables, campConsumables]);

  useEffect(() => {
    if (id) {
      setConsumable(sheetType === 'characters' ? charConsumables.find(cons => cons._id === id) : campConsumables.find(cons => cons._id === id));
      return;
    }

    setConsumable(sheetType === 'characters' ? charConsumables[0] : campConsumables[0]);
    setId(sheetType === 'characters' ? charConsumables[0]?._id : campConsumables[0]?._id);
  }, [sheetType, id, charConsumables, campConsumables]);

  return (
    <SheetPageContent title="Consumables" columns={4}>
      {/* Showing Archived Consumables Notice */}
      <ListBelongingsMessage show={searchParams.get('show')} belongingType="consumables" />

      {/* Consumables List */}
      <PanelSection title="Manage Consumables">
        <div className="flow-root mt-2">
          <ListBelongings sheetType={sheetType} belongingType="consumables" belongingKind="Consumable" id={id} setId={setId} belongingsList={consumablesList} show={searchParams.get('show')} />
        </div>
      </PanelSection>

      {/* Selected Consumable */}
      <PanelSection title="Selected Consumable" colSpan={3}>
        {consumable ? (
          <div className="grid grid-cols-3 gap-8 divide-x divide-gray-200">
            <div className="col-span-2">
              <DisplayConsumable consumable={consumable} sheetType={sheetType} />
            </div>

            <div className="col-span-1 pl-8 space-y-4">
              <BelongingActions
                sheetType={sheetType}
                sheet={sheetType === 'characters' ? charSheet : campSheet}
                belongingType="consumables"
                belonging={consumable}
                belongingKind="Consumable"
                equippedBelongings={equippedConsumables}
              />
            </div>
          </div>
        ) : (
          <p className="text-sm italic text-gray-400">Please create or select a consumable to get started.</p>
        )}
      </PanelSection>
    </SheetPageContent>
  );
};

export default SheetBelongingsConsumablesPage;
