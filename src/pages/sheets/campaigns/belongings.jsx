import { useState } from 'react';
import { Outlet } from 'react-router-dom';

import SheetPageContent from '../../../layouts/components/sheet/SheetPageContent';

import SheetPagePanel from '../../../layouts/components/sheet/SheetPagePanel';

import TabsNavigation from '../../../components/TabsNavigation';
import SelectButton from '../../../components/SelectButton';

const tabs = [
  { name: 'Weapons', href: 'weapons' },
  { name: 'Wearables', href: 'wearables' },
  { name: 'Consumables', href: 'consumables' },
  { name: 'Usables', href: 'usables' },
];

const belongingStates = [
  { title: 'All', href: '?show=all', description: 'View and edit both active and inactive Belongings. You will not see your archived belongings here.', current: false },
  { title: 'Active', href: '?show=active', description: 'View and edit only your active belongings.', current: true },
  { title: 'Inactive', href: '?show=inactive', description: 'Inactive Belongings are hidden elsewhere, but can be viewed and edited here.', current: false },
  { title: 'Archived', href: '?show=archived', description: 'The belongings that you have previously had, but gave away, sold, or deleted.', current: false },
];

const CampaignBelongingsPage = () => {
  const [selected, setSelected] = useState(belongingStates[0]);

  return (
    <div className="space-y-6">
      <SheetPageContent title="Belongings">
        {/* Tabs */}
        <SheetPagePanel>
          <div className="flex flex-wrap items-center justify-between">
            <TabsNavigation tabs={tabs} sheetType="campaigns" />
            <SelectButton value={selected} onChange={setSelected} options={belongingStates} />
          </div>
        </SheetPagePanel>
      </SheetPageContent>

      {/* Outlet for Subpages */}
      <Outlet />
      {/* End Outlet for Subpages */}
    </div>
  );
};

export default CampaignBelongingsPage;
