import { useSelector } from 'react-redux';
import { useSearchParams } from 'react-router-dom';

import {
  selectCurrentCharacter,
  selectWearables as selectCharWearables,
  selectArchivedWearables as selectCharArchivedWearables,
  selectEquippedWearables,
} from '../../../../redux/character/character.selectors';
import { selectCurrentCampaign, selectWearables as selectCampWearables, selectArchivedWearables as selectCampArchivedWearables } from '../../../../redux/campaign/campaign.selectors';

import InteractablesPageContent from '../../../../components/content/InteractablesPageContent';

import BelongingActions from '../../../../components/content/BelongingActions';
import DisplayWearable from '../../../../components/display/DisplayWearable';

import { BelongingType, InteractableType, SheetType } from '../../../../models/sheet';

interface Props {
  sheetType: SheetType;
}

const SheetBelongingsWearablesPage: React.FC<Props> = ({ sheetType }) => {
  const [searchParams] = useSearchParams();

  const charSheet = useSelector(selectCurrentCharacter);
  const campSheet = useSelector(selectCurrentCampaign);

  const sheets = {
    characters: charSheet,
    campaigns: campSheet,
  };

  const charWearables = useSelector(selectCharWearables);
  const equippedWearables = useSelector(selectEquippedWearables);
  const campWearables = useSelector(selectCampWearables);
  const charArchivedWearables = useSelector(selectCharArchivedWearables);
  const campArchivedWearables = useSelector(selectCampArchivedWearables);

  const show = searchParams.get('show');
  const id = searchParams.get('id');

  const getList = () => {
    if (sheetType === 'characters') return show === 'archived' ? charArchivedWearables : charWearables;
    if (sheetType === 'campaigns') return show === 'archived' ? campArchivedWearables : campWearables;
    return [];
  };

  const list = getList();
  const wearable = list.find(wear => wear._id === id) || list[0];

  const Display = wearable ? () => <DisplayWearable wearable={wearable} sheetType={sheetType} /> : null;
  const Actions = wearable
    ? () => <BelongingActions sheetType={sheetType} sheet={sheets[sheetType]!} belongingType={BelongingType.wearables} belonging={wearable} equippedBelongings={equippedWearables} />
    : null;

  return (
    <InteractablesPageContent
      sheetType={sheetType}
      sheetId={sheets[sheetType]!._id}
      show={show}
      id={wearable?._id}
      list={list}
      type={InteractableType.wearables}
      label="Wearable"
      interactable={wearable}
      Display={Display}
      Actions={Actions}
    />
  );
};

export default SheetBelongingsWearablesPage;
