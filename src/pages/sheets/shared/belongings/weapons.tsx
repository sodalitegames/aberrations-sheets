import { useSelector } from 'react-redux';
import { useSearchParams } from 'react-router-dom';

import { selectCurrentCharacter, selectWeapons as selectCharWeapons, selectArchivedWeapons as selectCharArchivedWeapons, selectEquippedWeapons } from '../../../../redux/character/character.selectors';
import { selectCurrentCampaign, selectWeapons as selectCampWeapons, selectArchivedWeapons as selectCampArchivedWeapons } from '../../../../redux/campaign/campaign.selectors';

import InteractablesPageContent from '../../../../components/content/InteractablesPageContent';

import BelongingActions from '../../../../components/content/BelongingActions';
import DisplayWeapon from '../../../../components/display/DisplayWeapon';

import { BelongingType, InteractableType, SheetType } from '../../../../models/sheet';

interface Props {
  sheetType: SheetType;
}

const SheetBelongingsWeaponsPage: React.FC<Props> = ({ sheetType }) => {
  const [searchParams] = useSearchParams();

  const charSheet = useSelector(selectCurrentCharacter);
  const campSheet = useSelector(selectCurrentCampaign);

  const sheets = {
    characters: charSheet,
    campaigns: campSheet,
  };

  const charWeapons = useSelector(selectCharWeapons);
  const equippedWeapons = useSelector(selectEquippedWeapons);
  const campWeapons = useSelector(selectCampWeapons);
  const charArchivedWeapons = useSelector(selectCharArchivedWeapons);
  const campArchivedWeapons = useSelector(selectCampArchivedWeapons);

  const show = searchParams.get('show');
  const id = searchParams.get('id');

  const getList = () => {
    if (sheetType === 'characters') return show === 'archived' ? charArchivedWeapons : charWeapons;
    if (sheetType === 'campaigns') return show === 'archived' ? campArchivedWeapons : campWeapons;
    return [];
  };

  const list = getList();
  const weapon = list.find(weap => weap._id === id) || list[0];

  const Display = weapon ? () => <DisplayWeapon weapon={weapon} sheetType={sheetType} /> : null;
  const Actions = weapon
    ? () => <BelongingActions sheetType={sheetType} sheet={sheets[sheetType]!} belongingType={BelongingType.weapons} belonging={weapon} equippedBelongings={equippedWeapons} />
    : null;

  return (
    <InteractablesPageContent
      sheetType={sheetType}
      sheetId={sheets[sheetType]!._id}
      show={show}
      id={weapon?._id}
      list={list}
      type={InteractableType.weapons}
      label="Weapon"
      interactable={weapon}
      Display={Display}
      Actions={Actions}
    />
  );
};

export default SheetBelongingsWeaponsPage;
