// import { useState } from 'react';
import { Outlet } from 'react-router-dom';

import SheetPageContent from '../../../layouts/components/sheet/SheetPageContent';

import SheetPagePanel from '../../../layouts/components/sheet/SheetPagePanel';

// import SelectButton from '../../../components/SelectButton';
import TabsNavigation from '../../../components/TabsNavigation';

const tabs = [
  { name: 'Weapons', href: 'weapons' },
  { name: 'Wearables', href: 'wearables' },
  { name: 'Consumables', href: 'consumables' },
  { name: 'Usables', href: 'usables' },
];

// const belongingStates = [
//   { title: 'Current', href: '?show=current', description: 'The belongings that you currently have in your SURONIS or equipped.', current: true },
//   { title: 'Archived', href: '?show=archived', description: 'The belongings that you have previously had, but used, gave away, sold, or deleted.', current: false },
//   // { title: 'Group Belongings - Coming Soon', href: '?show=group', description: 'The belongings that you and your campaign group collectively have, until a player claims it as their own.', current: false },
// ];

const CharacterBelongingsPage = () => {
  // const [selected, setSelected] = useState(belongingStates[0]);

  return (
    <div className="space-y-6">
      <SheetPageContent title="Belongings">
        {/* Tabs */}
        <SheetPagePanel>
          <div className="flex flex-wrap items-center justify-between">
            <TabsNavigation tabs={tabs} sheetType="characters" />
            {/* <SelectButton value={selected} onChange={setSelected} options={belongingStates} /> */}
          </div>
        </SheetPagePanel>
      </SheetPageContent>

      {/* Outlet for Subpages */}
      <Outlet />
      {/* End Outlet for Subpages */}
    </div>
  );
};

export default CharacterBelongingsPage;
