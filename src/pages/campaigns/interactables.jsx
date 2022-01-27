import { useState } from 'react';
import { Outlet } from 'react-router-dom';

import SheetPageContent from '../../layouts/components/sheet/SheetPageContent';

import PanelSection from '../../components/sheets/PanelSection';

import SelectButton from '../../components/shared/SelectButton';
import TabsNavigation from '../../components/sheets/TabsNavigation';

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
  { title: 'All', href: 'all', description: 'View and edit both active and inactive Interactables.', current: false },
  { title: 'Active', href: 'active', description: 'Active Interactables show up on the gameplay tab, and if an Npc or Creature, the combat table. ', current: true },
  { title: 'Inactive', href: 'inactive', description: 'Inactive Interactables are hidden elsewhere, but can be viewed and edited here.', current: false },
  { title: 'Archive', href: 'archive', description: 'The interactables that you have previously had, but gave away, sold, or deleted.', current: false },
];

const CampaignInteractablesPage = () => {
  const [selected, setSelected] = useState(interactableStates[0]);

  return (
    <div className="space-y-6">
      <SheetPageContent title="Interactables">
        {/* Tabs */}
        <PanelSection>
          <div className="flex justify-between items-center flex-wrap">
            <TabsNavigation tabs={tabs} sheetType="campaigns" />
            <SelectButton value={selected} onChange={setSelected} options={interactableStates} />
          </div>
        </PanelSection>
      </SheetPageContent>

      {/* Outlet for Subpages */}
      <Outlet />
      {/* End Outlet for Subpages */}
    </div>
  );
};

export default CampaignInteractablesPage;
