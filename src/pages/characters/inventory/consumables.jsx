import { useSelector, useDispatch } from 'react-redux';

import { selectCurrentCharacter } from '../../../redux/character/character.selectors';

import { setSlideOver } from '../../../redux/app/app.actions';

import SlideOverTypes from '../../../utils/SlideOverTypes';

import SheetPageContent from '../../../layouts/components/sheet/SheetPageContent';

import PanelSection from '../../../components/shared/PanelSection';
import ListContainer from '../../../components/shared/ListContainer';

import Consumable from '../../../components/characters/display/Consumable';

const CharacterConsumablesPage = () => {
  const dispatch = useDispatch();
  const charSheet = useSelector(selectCurrentCharacter);

  return (
    <SheetPageContent title="Consumables" columns={4}>
      {/* All Consumables */}
      <PanelSection title="Manage Consumables">
        <div className="flow-root mt-2">
          <ListContainer
            list={charSheet.consumables}
            button={{ click: () => dispatch(setSlideOver({ type: SlideOverTypes.consumableForm, data: { sheetType: 'characters' } })), text: 'Add a new Consumable' }}
            empty={{
              heading: 'No Consumables',
              message: 'Get started by creating your first one now',
              button: { click: () => dispatch(setSlideOver({ type: SlideOverTypes.consumableForm, data: { sheetType: 'characters' } })), text: 'New Consumable' },
            }}
          >
            {charSheet.consumables.map(consumable => (
              <Consumable key={consumable._id} consumable={consumable} />
            ))}
          </ListContainer>
        </div>
      </PanelSection>

      {/* Selected Consumable */}
      <PanelSection title="Selected Consumable" colSpan={3}>
        {JSON.stringify(charSheet.consumables)}
      </PanelSection>
    </SheetPageContent>
  );
};

export default CharacterConsumablesPage;
