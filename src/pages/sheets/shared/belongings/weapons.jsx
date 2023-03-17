import { useSelector } from 'react-redux';
import { useSearchParams } from 'react-router-dom';

import { selectCurrentCharacter, selectWeapons as selectCharWeapons, selectArchivedWeapons as selectCharArchivedWeapons } from '../../../../redux/character/character.selectors';
import { selectCurrentCampaign, selectWeapons as selectCampWeapons, selectArchivedWeapons as selectCampArchivedWeapons } from '../../../../redux/campaign/campaign.selectors';

import InteractablesPageContent from '../../../../components/content/InteractablesPageContent';

import BelongingActions from '../../../../components/content/BelongingActions';
import DisplayWeapon from '../../../../components/display/DisplayWeapon';

const SheetBelongingsWeaponsPage = ({ sheetType }) => {
  const [searchParams] = useSearchParams();

  const charSheet = useSelector(selectCurrentCharacter);
  const campSheet = useSelector(selectCurrentCampaign);

  const sheets = {
    characters: charSheet,
    campaigns: campSheet,
  };

  const charWeapons = useSelector(selectCharWeapons);
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

  const Display = () => <DisplayWeapon weapon={weapon} sheetType={sheetType} />;
  const Actions = () => <BelongingActions sheetType={sheetType} sheet={sheets[sheetType]} belongingType="weapons" belonging={weapon} />;

  return <InteractablesPageContent sheetType={sheetType} show={show} id={weapon._id} list={list} type="weapons" label="Weapon" interactable={weapon} Display={Display} Actions={Actions} />;
};

export default SheetBelongingsWeaponsPage;
