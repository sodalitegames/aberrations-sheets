import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useSearchParams } from 'react-router-dom';

import { selectCurrentCharacter, selectEquippedUsables, selectUsables as selectCharUsables, selectArchivedUsables as selectCharArchivedUsables } from '../../../../redux/character/character.selectors';
import { selectCurrentCampaign, selectUsables as selectCampUsables, selectArchivedUsables as selectCampArchivedUsables } from '../../../../redux/campaign/campaign.selectors';

import SheetPageContent from '../../../../layouts/components/sheet/SheetPageContent';

import SheetPagePanel from '../../../../layouts/components/sheet/SheetPagePanel';
import BelongingActions from '../../../../components/sections/BelongingActions';
import ListBelongings, { ListBelongingsMessage } from '../../../../components/sections/ListBelongings';

import DisplayUsable from '../../../../components/display/DisplayUsable';

const SheetBelongingsUsablesPage = ({ sheetType }) => {
  const [searchParams] = useSearchParams();

  const charSheet = useSelector(selectCurrentCharacter);
  const campSheet = useSelector(selectCurrentCampaign);
  const equippedUsables = useSelector(selectEquippedUsables);

  const charUsables = useSelector(selectCharUsables);
  const campUsables = useSelector(selectCampUsables);
  const charArchivedUsables = useSelector(selectCharArchivedUsables);
  const campArchivedUsables = useSelector(selectCampArchivedUsables);

  const [usable, setUsable] = useState(null);
  const [id, setId] = useState(null);

  const [usablesList, setUsablesList] = useState([]);

  useEffect(() => {
    if (sheetType === 'characters') {
      switch (searchParams.get('show')) {
        case 'archived':
          setUsablesList(charArchivedUsables);
          return;

        default:
          setUsablesList(charUsables);
          return;
      }
    }

    if (sheetType === 'campaigns') {
      switch (searchParams.get('show')) {
        case 'archived':
          setUsablesList(campArchivedUsables);
          return;

        case 'active':
          setUsablesList(campUsables.filter(weap => weap.active));
          return;

        case 'inactive':
          setUsablesList(campUsables.filter(weap => !weap.active));
          return;

        default:
          setUsablesList(campUsables);
          return;
      }
    }
  }, [sheetType, searchParams, charArchivedUsables, campArchivedUsables, charUsables, campUsables]);

  useEffect(() => {
    if (id) {
      setUsable(sheetType === 'characters' ? charUsables.find(usab => usab._id === id) : campUsables.find(usab => usab._id === id));
      return;
    }

    setUsable(sheetType === 'characters' ? charUsables[0] : campUsables[0]);
    setId(sheetType === 'characters' ? charUsables[0]?._id : campUsables[0]?._id);
  }, [sheetType, id, charUsables, campUsables]);

  return (
    <SheetPageContent title="Usables" columns={4}>
      {/* Showing Archived Usables Notice */}
      <ListBelongingsMessage show={searchParams.get('show')} belongingType="usables" />

      {/* Usables List */}
      <SheetPagePanel title="Manage Usables">
        <div className="flow-root mt-2">
          <ListBelongings sheetType={sheetType} belongingType="usables" belongingKind="Usable" id={id} setId={setId} belongingsList={usablesList} show={searchParams.get('show')} />
        </div>
      </SheetPagePanel>

      {/* Selected Usable */}
      <SheetPagePanel title="Selected Usable" colSpan={3}>
        {usable ? (
          <div className="grid grid-cols-3 gap-8 divide-x divide-gray-200">
            <div className="col-span-2">
              <DisplayUsable usable={usable} sheetType={sheetType} />
            </div>

            <div className="col-span-1 pl-8 space-y-4">
              <BelongingActions
                sheetType={sheetType}
                sheet={sheetType === 'characters' ? charSheet : campSheet}
                belongingType="usables"
                belonging={usable}
                belongingKind="Usable"
                equippedBelongings={equippedUsables}
              />
            </div>
          </div>
        ) : (
          <p className="text-sm italic text-gray-400">Please create or select a usable to get started.</p>
        )}
      </SheetPagePanel>
    </SheetPageContent>
  );
};

export default SheetBelongingsUsablesPage;
