import { useSelector, useDispatch } from 'react-redux';

import { selectCurrentCharacter } from '../../../redux/character/character.selectors';

import { setSlideOver } from '../../../redux/app/app.actions';

import SlideOverTypes from '../../../utils/SlideOverTypes';

import SheetPageContent from '../../../layouts/components/sheet/SheetPageContent';

import PanelSection from '../../../components/shared/PanelSection';
import ListContainer from '../../../components/shared/ListContainer';

import Usable from '../../../components/characters/display/Usable';

const CharacterUsablesPage = () => {
  const dispatch = useDispatch();
  const charSheet = useSelector(selectCurrentCharacter);

  return (
    <SheetPageContent title="Usables" columns={4}>
      {/* All Usables */}
      <PanelSection title="Manage Usables">
        <div className="flow-root mt-2">
          <ListContainer
            list={charSheet.usables}
            button={{ click: () => dispatch(setSlideOver({ type: SlideOverTypes.usableForm, data: { sheetType: 'characters' } })), text: 'Add a new Usable' }}
            empty={{
              heading: 'No Usables',
              message: 'Get started by creating your first one now',
              button: { click: () => dispatch(setSlideOver({ type: SlideOverTypes.usableForm, data: { sheetType: 'characters' } })), text: 'New Usable' },
            }}
          >
            {charSheet.usables.map(usable => (
              <Usable key={usable._id} usable={usable} />
            ))}
          </ListContainer>
        </div>
      </PanelSection>

      {/* Selected Usable */}
      <PanelSection title="Selected Usable" colSpan={3}>
        {JSON.stringify(charSheet.usables)}
      </PanelSection>
    </SheetPageContent>
  );
};

export default CharacterUsablesPage;
