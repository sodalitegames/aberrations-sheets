import { Outlet } from 'react-router-dom';

import { useSelector } from 'react-redux';
import { useSearchParams } from 'react-router-dom';

import { selectCurrentCharacter } from '../../../redux/character/character.selectors';
import { selectCurrentCampaign } from '../../../redux/campaign/campaign.selectors';

import SheetPageContent from '../../../layouts/components/sheet/SheetPageContent';
import SheetPagePanel from '../../../layouts/components/sheet/SheetPagePanel';

import TabsNavigation from '../../../components/TabsNavigation';

const SheetBelongingsPage = ({ sheetType }) => {
  const [searchParams] = useSearchParams();

  const charSheet = useSelector(selectCurrentCharacter);
  const campSheet = useSelector(selectCurrentCampaign);

  const sheets = {
    characters: charSheet,
    campaigns: campSheet,
  };

  const show = searchParams.get('show');

  const tabs = [
    { name: 'Weapons', count: sheets[sheetType].weapons.filter(el => (show === 'archived' ? el.archived : !el.archived)).length, href: 'weapons' },
    { name: 'Wearables', count: sheets[sheetType].wearables.filter(el => (show === 'archived' ? el.archived : !el.archived)).length, href: 'wearables' },
    { name: 'Consumables', count: sheets[sheetType].consumables.filter(el => (show === 'archived' ? el.archived : !el.archived)).length, href: 'consumables' },
    { name: 'Usables', count: sheets[sheetType].usables.filter(el => (show === 'archived' ? el.archived : !el.archived)).length, href: 'usables' },
  ];

  return (
    <div className="space-y-6">
      <SheetPageContent title="Belongings">
        {/* Tabs */}
        <SheetPagePanel>
          <div className="flex flex-wrap items-center justify-between">
            <TabsNavigation tabs={tabs} />
          </div>
        </SheetPagePanel>
      </SheetPageContent>

      {/* Outlet for Subpages */}
      <Outlet />
      {/* End Outlet for Subpages */}
    </div>
  );
};

export default SheetBelongingsPage;
