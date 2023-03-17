import { useSelector } from 'react-redux';
import { useSearchParams } from 'react-router-dom';

import { selectCurrentCampaign, selectConsumables, selectArchivedConsumables } from '../../../../redux/campaign/campaign.selectors';

import BelongingActions from '../../../../components/sections/BelongingActions';
import DisplayConsumable from '../../../../components/display/DisplayConsumable';

import InteractablesPageContent from '../../shared/content/InteractablesPageContent';

const CampaignBelongingsConsumablesPage = () => {
  const [searchParams] = useSearchParams();

  const campSheet = useSelector(selectCurrentCampaign);
  const consumables = useSelector(selectConsumables);
  const archivedConsumables = useSelector(selectArchivedConsumables);

  const show = searchParams.get('show');
  const id = searchParams.get('id');

  const list = searchParams.get('show') === 'archived' ? archivedConsumables : consumables;
  const consumable = list.find(cons => cons._id === id);

  const Display = () => <DisplayConsumable consumable={consumable} sheetType="campaigns" />;
  const Actions = () => <BelongingActions sheetType="campaigns" sheet={campSheet} belongingType="consumables" belonging={consumable} />;

  return <InteractablesPageContent sheetType="campaigns" show={show} id={id} list={list} type="consumables" label="Consumable" interactable={consumable} Display={Display} Actions={Actions} />;
};

export default CampaignBelongingsConsumablesPage;
