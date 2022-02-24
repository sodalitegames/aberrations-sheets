import { useState } from 'react';
import { Outlet } from 'react-router-dom';

import SheetPageContent from '../../../layouts/components/sheet/SheetPageContent';

<<<<<<< HEAD:src/pages/campaigns/interactables.jsx
import PanelSection from '../../components/sheets/PanelSection';
import TabsNavigation from '../../components/sheets/TabsNavigation';

import SelectButton from '../../components/shared/SelectButton';
=======
import SheetPagePanel from '../../../layouts/components/sheet/SheetPagePanel';
import TabsNavigation from '../../../components/TabsNavigation';

import SelectButton from '../../../components/SelectButton';
>>>>>>> fd2f7d014a840121eb82b04bda492f4333af6e21:src/pages/sheets/campaigns/interactables.jsx

const tabs = [
  { name: 'Npcs', href: 'npcs' },
  { name: 'Creatures', href: 'creatures' },
  { name: 'Environments', href: 'environments' },
  { name: 'Weapons', href: 'weapons' },
  { name: 'Wearables', href: 'wearables' },
  { name: 'Consumables', href: 'consumables' },
  { name: 'Usables', href: 'usables' },
];

const interactableStates = [
  { title: 'All', href: 'all', description: 'View and edit both active and inactive Interactables. You will not see your archived interactables here.', current: false },
  { title: 'Active', href: 'active', description: 'Active Interactables show up on the gameplay tab, and if an Npc or Creature, the combat table. ', current: true },
  { title: 'Inactive', href: 'inactive', description: 'Inactive Interactables are hidden elsewhere, but can be viewed and edited here.', current: false },
  { title: 'Archived', href: 'archived', description: 'The interactables that you have previously had, but gave away, sold, or deleted.', current: false },
];

const CampaignInteractablesPage = () => {
  const [selected, setSelected] = useState(interactableStates[0]);

  return (
    <div className="space-y-6">
      <SheetPageContent title="Interactables">
        {/* Tabs */}
        <SheetPagePanel>
          <div className="flex justify-between items-center flex-wrap">
            <TabsNavigation tabs={tabs} sheetType="campaigns" />
            <SelectButton value={selected} onChange={setSelected} options={interactableStates} />
          </div>
        </SheetPagePanel>
      </SheetPageContent>

      {/* Outlet for Subpages */}
      <Outlet />
      {/* End Outlet for Subpages */}
    </div>
  );
};

export default CampaignInteractablesPage;