import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useSearchParams } from 'react-router-dom';

import { selectCurrentCharacter, selectEquippedUsables, selectUsables as selectCharUsables, selectArchivedUsables as selectCharArchivedUsables } from '../../../../redux/character/character.selectors';
import { selectCurrentCampaign, selectUsables as selectCampUsables, selectArchivedUsables as selectCampArchivedUsables } from '../../../../redux/campaign/campaign.selectors';

import SheetPageContent from '../../../../layouts/components/sheet/SheetPageContent';

import SheetPagePanel from '../../../../layouts/components/sheet/SheetPagePanel';
import BelongingActions from '../../../../components/sections/BelongingActions';
import ListInteractables, { ListInteractablesMessage } from '../../../../components/sections/ListInteractables';

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
    // First, clear out currently selected
    setUsable(null);
    setId(null);

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
    const id = searchParams.get('id');

    if (usablesList.length) {
      if (id) {
        setId(id);
        setUsable(usablesList.find(usab => usab._id === id));
        return;
      }

      setUsable(usablesList[0]);
      setId(usablesList[0]._id);
    }
  }, [id, usablesList, searchParams]);

  return (
    <SheetPageContent title="Usables" columns={4}>
      {/* Showing Archived Usables Notice */}
      <ListInteractablesMessage show={searchParams.get('show')} interactableType="usables" />

      {/* Usables List */}
      <SheetPagePanel title="Manage Usables">
        <div className="flow-root mt-2">
          <ListInteractables sheetType={sheetType} interactableType="usables" id={id} interactablesList={usablesList} label="Usable" show={searchParams.get('show')} />
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
