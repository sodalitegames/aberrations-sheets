import { useSelector } from 'react-redux';
import { useSearchParams } from 'react-router-dom';

import { selectCurrentCharacter, selectUsables as selectCharUsables, selectArchivedUsables as selectCharArchivedUsables, selectEquippedUsables } from '../../../../redux/character/character.selectors';
import { selectCurrentCampaign, selectUsables as selectCampUsables, selectArchivedUsables as selectCampArchivedUsables } from '../../../../redux/campaign/campaign.selectors';

import InteractablesPageContent from '../../../../components/content/InteractablesPageContent';

import BelongingActions from '../../../../components/content/BelongingActions';
import DisplayUsable from '../../../../components/display/DisplayUsable';

import { BelongingType, InteractableType, SheetType } from '../../../../models/sheet';

interface Props {
  sheetType: SheetType;
}

const SheetBelongingsUsablesPage: React.FC<Props> = ({ sheetType }) => {
  const [searchParams] = useSearchParams();

  const charSheet = useSelector(selectCurrentCharacter);
  const campSheet = useSelector(selectCurrentCampaign);

  const sheets = {
    characters: charSheet,
    campaigns: campSheet,
  };

  const charUsables = useSelector(selectCharUsables);
  const equippedUsables = useSelector(selectEquippedUsables);
  const campUsables = useSelector(selectCampUsables);
  const charArchivedUsables = useSelector(selectCharArchivedUsables);
  const campArchivedUsables = useSelector(selectCampArchivedUsables);

  const show = searchParams.get('show');
  const id = searchParams.get('id');

  const getList = () => {
    if (sheetType === 'characters') return show === 'archived' ? charArchivedUsables : charUsables;
    if (sheetType === 'campaigns') return show === 'archived' ? campArchivedUsables : campUsables;
    return [];
  };

  const list = getList();
  const usable = list.find(usab => usab._id === id) || list[0];

  const Display = usable ? () => <DisplayUsable usable={usable} sheetType={sheetType} /> : null;
  const Actions = usable
    ? () => <BelongingActions sheetType={sheetType} sheet={sheets[sheetType]!} belongingType={BelongingType.usables} belonging={usable} equippedBelongings={equippedUsables} />
    : null;

  return (
    <InteractablesPageContent
      sheetType={sheetType}
      sheetId={sheets[sheetType]!._id}
      show={show}
      id={usable?._id}
      list={list}
      type={InteractableType.usables}
      label="Usable"
      interactable={usable}
      Display={Display}
      Actions={Actions}
    />
  );
};

export default SheetBelongingsUsablesPage;
