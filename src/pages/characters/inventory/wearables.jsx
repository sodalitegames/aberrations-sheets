import { useSelector, useDispatch } from 'react-redux';

import { selectCurrentCharacter } from '../../../redux/character/character.selectors';

import { setSlideOver } from '../../../redux/app/app.actions';

import SlideOverTypes from '../../../utils/SlideOverTypes';

import SheetPageContent from '../../../layouts/components/sheet/SheetPageContent';

import PanelSection from '../../../components/shared/PanelSection';
import ListContainer from '../../../components/shared/ListContainer';

import Wearable from '../../../components/characters/display/Wearable';

const CharacterWearablesPage = () => {
  const dispatch = useDispatch();
  const charSheet = useSelector(selectCurrentCharacter);

  return (
    <SheetPageContent title="Wearables" columns={4}>
      {/* All Wearables */}
      <PanelSection title="Manage Wearables">
        <div className="flow-root mt-2">
          <ListContainer
            list={charSheet.wearables}
            button={{ click: () => dispatch(setSlideOver({ type: SlideOverTypes.wearableForm })), text: 'Add a new Wearable' }}
            empty={{
              heading: 'No Wearables',
              message: 'Get started by creating your first one now',
              button: { click: () => dispatch(setSlideOver({ type: SlideOverTypes.wearableForm })), text: 'New Wearable' },
            }}
          >
            {charSheet.wearables.map(wearable => (
              <Wearable key={wearable._id} wearable={wearable} />
            ))}
          </ListContainer>
        </div>
      </PanelSection>

      {/* Selected Wearable */}
      <PanelSection title="Selected Wearable" colSpan={3}>
        {JSON.stringify(charSheet.wearables)}
      </PanelSection>
    </SheetPageContent>
  );
};

export default CharacterWearablesPage;
