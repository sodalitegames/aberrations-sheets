import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { CheckCircleIcon } from '@heroicons/react/outline';

import { selectCurrentCharacter } from '../../../redux/character/character.selectors';
import { selectCurrentCampaign } from '../../../redux/campaign/campaign.selectors';

import { setModal, setSlideOver } from '../../../redux/app/app.actions';

import SlideOverTypes from '../../../utils/SlideOverTypes';
import ModalTypes from '../../../utils/ModalTypes';
import classNames from '../../../utils/classNames';

import SheetPageContent from '../../../layouts/components/sheet/SheetPageContent';

import PanelSection from '../../../components/shared/PanelSection';
import ListContainer from '../../../components/shared/ListContainer';

import Button from '../../../components/shared/Button';

import DisplayConsumable from '../../../components/sheets/display/DisplayConsumable';

const SheetBelongingsConsumablesPage = ({ sheetType }) => {
  const dispatch = useDispatch();

  const charSheet = useSelector(selectCurrentCharacter);
  const campSheet = useSelector(selectCurrentCampaign);

  const [consumable, setConsumable] = useState(sheetType === 'characters' ? charSheet.consumables[0] : campSheet.consumables[0]);

  console.log(consumable);

  return (
    <SheetPageContent title="Consumables" columns={4}>
      {/* All Consumables */}
      <PanelSection title="Manage Consumables">
        <div className="flow-root mt-2">
          <ListContainer
            list={sheetType === 'characters' ? charSheet.consumables : campSheet.consumables}
            button={{ click: () => dispatch(setSlideOver({ type: SlideOverTypes.consumableForm, data: { sheetType: sheetType } })), text: 'Add a new Consumable' }}
            empty={{
              heading: 'No Consumables',
              message: 'Get started by creating your first one now',
              button: { click: () => dispatch(setSlideOver({ type: SlideOverTypes.consumableForm, data: { sheetType: sheetType } })), text: 'New Consumable' },
            }}
          >
            {(sheetType === 'characters' ? charSheet.consumables : campSheet.consumables).map(consumable => (
              <div
                key={consumable._id}
                className={classNames('flex justify-between items-center hover:bg-gray-50 px-2 cursor-pointer', consumable.equipped ? '' : '')}
                onClick={() => setConsumable(consumable)}
              >
                <DisplayConsumable key={consumable._id} consumable={consumable} sheetType={sheetType} condensed listItem />
                {consumable.equipped ? (
                  <div className="shrink-0 ml-2" title="Equipped">
                    <CheckCircleIcon className="h-6 w-6 text-green-600" aria-hidden="true" />
                  </div>
                ) : null}
              </div>
            ))}
          </ListContainer>
        </div>
      </PanelSection>

      {/* Selected Consumable */}
      <PanelSection title="Selected Consumable" colSpan={3}>
        {consumable ? (
          <div className="grid gap-8 grid-cols-3 divide-x divide-gray-200">
            <div className="col-span-2">
              <DisplayConsumable consumable={consumable} sheetType={sheetType} />
            </div>

            <div className="col-span-1 space-y-4 pl-8">
              <Button>{consumable.equipped ? 'Unequip' : 'Equip'}</Button>
              <Button>Give</Button>
              <Button>Sell</Button>
              <Button onClick={() => dispatch(setSlideOver({ type: SlideOverTypes.consumableForm, id: consumable._id, data: { sheetType: sheetType } }))}>Edit</Button>
              <Button
                alert
                onClick={() =>
                  dispatch(
                    setModal({
                      type: ModalTypes.deleteResource,
                      id: consumable._id,
                      data: {
                        sheetType: sheetType,
                        resourceType: 'consumables',
                        title: `Are you sure you want to delete ${consumable.name}?`,
                        submitText: `Yes, delete ${consumable.name}`,
                        equipped: consumable.equipped,
                      },
                    })
                  )
                }
              >
                Delete
              </Button>
            </div>
          </div>
        ) : (
          <p className="text-sm italic text-gray-400">Please create or select a consumable to get started.</p>
        )}
      </PanelSection>
    </SheetPageContent>
  );
};

export default SheetBelongingsConsumablesPage;
