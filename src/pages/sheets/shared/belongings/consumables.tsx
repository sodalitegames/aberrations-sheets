import { useSelector } from 'react-redux';
import { useSearchParams } from 'react-router-dom';

import { selectCurrentCharacter, selectConsumables as selectCharConsumables, selectArchivedConsumables as selectCharArchivedConsumables } from '../../../../redux/character/character.selectors';
import { selectCurrentCampaign, selectConsumables as selectCampConsumables, selectArchivedConsumables as selectCampArchivedConsumables } from '../../../../redux/campaign/campaign.selectors';

import InteractablesPageContent from '../../../../components/content/InteractablesPageContent';

import BelongingActions from '../../../../components/content/BelongingActions';
import DisplayConsumable from '../../../../components/display/DisplayConsumable';

import { BelongingType, InteractableType, SheetType } from '../../../../models/sheet';

interface Props {
  sheetType: SheetType;
}

const SheetBelongingsConsumablesPage: React.FC<Props> = ({ sheetType }) => {
  const [searchParams] = useSearchParams();

  const charSheet = useSelector(selectCurrentCharacter);
  const campSheet = useSelector(selectCurrentCampaign);

  const sheets = {
    characters: charSheet,
    campaigns: campSheet,
  };

  const charConsumables = useSelector(selectCharConsumables);
  const campConsumables = useSelector(selectCampConsumables);
  const charArchivedConsumables = useSelector(selectCharArchivedConsumables);
  const campArchivedConsumables = useSelector(selectCampArchivedConsumables);

  const show = searchParams.get('show');
  const id = searchParams.get('id');

  const getList = () => {
    if (sheetType === 'characters') return show === 'archived' ? charArchivedConsumables : charConsumables;
    if (sheetType === 'campaigns') return show === 'archived' ? campArchivedConsumables : campConsumables;
    return [];
  };
  const list = getList();
  const consumable = list.find(cons => cons._id === id) || list[0];

  const Display = () => <DisplayConsumable consumable={consumable} sheetType={sheetType} />;
  const Actions = () => <BelongingActions sheetType={sheetType} sheet={sheets[sheetType]!} belongingType={BelongingType.consumables} belonging={consumable} />;

  return (
    <InteractablesPageContent
      sheetType={sheetType}
      show={show}
      id={consumable._id}
      list={list}
      type={InteractableType.consumables}
      label="Consumable"
      interactable={consumable}
      Display={Display}
      Actions={Actions}
    />
  );
};

export default SheetBelongingsConsumablesPage;
