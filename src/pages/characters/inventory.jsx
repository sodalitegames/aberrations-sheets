import { useRecoilValue } from 'recoil';

import { getCharSheet } from '../../recoil/character/character.selectors';

import PanelSection from '../../components/characters/PanelSection';

import ActiveStatsPanel from '../../components/characters/ActiveStatsPanel';
import EquippedWearablesPanel from '../../components/characters/EquippedWearablesPanel';

const CharacterInventoryPage = () => {
  const charSheet = useRecoilValue(getCharSheet);

  if (!charSheet) {
    return <div>Collecting character sheet data...</div>;
  }

  // grid-flow-row-dense

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:max-w-7xl lg:px-8">
      <h1 className="sr-only">Inventory</h1>
      {/* Main 3 column grid */}
      <div className="grid grid-cols-1 gap-4 items-start lg:grid-cols-3 lg:gap-8 grid-flow-row-dense">
        <PanelSection title="Stats" colSpan="2">
          hello
        </PanelSection>
        <PanelSection title="Stats" rowSpan={1}>
          <EquippedWearablesPanel />
        </PanelSection>
        <PanelSection title="Stats" colSpan={2}>
          <ActiveStatsPanel
            generalExhaustion={charSheet.generalExhaustion}
            stats={[
              { name: 'Fortitude', ...charSheet.fortitude },
              { name: 'Agility', ...charSheet.agility },
              { name: 'Persona', ...charSheet.persona },
              { name: 'Aptitude', ...charSheet.aptitude },
            ]}
          />
        </PanelSection>
      </div>
    </div>
  );
};

export default CharacterInventoryPage;
