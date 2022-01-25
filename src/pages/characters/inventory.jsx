import { useState } from 'react';
import { Outlet } from 'react-router-dom';

import SheetPageContent from '../../layouts/components/sheet/SheetPageContent';

import PanelSection from '../../components/sheets/PanelSection';

import SelectButton from '../../components/shared/SelectButton';
import TabsNavigation from '../../components/sheets/TabsNavigation';

const tabs = [
  { name: 'Weapons', href: 'weapons' },
  { name: 'Wearables', href: 'wearables' },
  { name: 'Consumables', href: 'consumables' },
  { name: 'Usables', href: 'usables' },
];

const inventoryStates = [
  { title: 'Current Inventory', href: 'current', description: 'The belongings that you currently have in your SURONIS or equipped.', current: true },
  { title: 'Inventory Archive - Coming Soon', href: 'archive', description: 'The belongings that you have previously had, but used, gave away, sold, or deleted.', current: false },
  { title: 'Group Inventory - Coming Soon', href: 'group', description: 'The belongings that you and your campaign group collectively have, until a player claims it as their own.', current: false },
];

const CharacterInventoryPage = () => {
  const [selected, setSelected] = useState(inventoryStates[0]);

  return (
    <div className="space-y-6">
      <SheetPageContent title="Inventory">
        {/* Tabs */}
        <PanelSection>
          <div className="flex justify-between items-center flex-wrap">
            <TabsNavigation tabs={tabs} sheetType="characters" />
            <SelectButton value={selected} onChange={setSelected} options={inventoryStates} />
          </div>
        </PanelSection>
      </SheetPageContent>

      {/* Outlet for Subpages */}
      <Outlet />
      {/* End Outlet for Subpages */}
    </div>
  );
};

export default CharacterInventoryPage;
