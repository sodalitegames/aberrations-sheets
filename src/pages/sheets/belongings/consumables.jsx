import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { CheckCircleIcon } from '@heroicons/react/outline';

import { selectCurrentCharacter, selectEquippedConsumables } from '../../../redux/character/character.selectors';
import { selectCurrentCampaign } from '../../../redux/campaign/campaign.selectors';

import { setModal, setSlideOver } from '../../../redux/app/app.actions';
import { updateSheetResourceStart } from '../../../redux/sheet/sheet.actions';

import SlideOverTypes from '../../../utils/SlideOverTypes';
import ModalTypes from '../../../utils/ModalTypes';
import classNames from '../../../utils/classNames';
import equipBelonging from '../../../utils/equipBelonging';

import SheetPageContent from '../../../layouts/components/sheet/SheetPageContent';

import PanelSection from '../../../components/sheets/PanelSection';
import ListContainer from '../../../components/shared/data/ListContainer';

import Button from '../../../components/shared/Button';

import DisplayConsumable from '../../../components/sheets/display/DisplayConsumable';

const SheetBelongingsConsumablesPage = ({ sheetType }) => {
  const dispatch = useDispatch();

  const charSheet = useSelector(selectCurrentCharacter);
  const campSheet = useSelector(selectCurrentCampaign);
  const equippedConsumables = useSelector(selectEquippedConsumables);

  const [consumable, setConsumable] = useState(null);
  const [id, setId] = useState(null);

  useEffect(() => {
    if (id) {
      setConsumable(sheetType === 'characters' ? charSheet.consumables.find(cons => cons._id === id) : campSheet.consumables.find(cons => cons._id === id));
      return;
    }

    setConsumable(sheetType === 'characters' ? charSheet.consumables[0] : campSheet.consumables[0]);
    setId(sheetType === 'characters' ? charSheet.consumables[0]?._id : campSheet.consumables[0]?._id);
  }, [sheetType, id, campSheet, charSheet]);

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
                className={classNames('flex justify-between items-center px-2 cursor-pointer', id === consumable._id ? 'bg-gray-100' : 'hover:bg-gray-50')}
                onClick={() => setId(consumable._id)}
              >
                <DisplayConsumable key={consumable._id} consumable={consumable} sheetType={sheetType} condensed listItem />

                {/* Display if it's a character sheet consumable is equipped */}
                {sheetType === 'characters' && consumable.equipped ? (
                  <div className="shrink-0 ml-2" title="Equipped">
                    <CheckCircleIcon className="h-6 w-6 text-green-600" aria-hidden="true" />
                  </div>
                ) : null}

                {/* Display if it's a campaign sheet and consumable is active */}
                {sheetType === 'campaigns' && consumable.active ? (
                  <div className="shrink-0 ml-2" title="Active">
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
              {sheetType === 'characters' ? (
                <Button
                  dark={consumable.equipped}
                  onClick={() => equipBelonging({ sheetType, sheet: charSheet, belongingType: 'consumables', belonging: consumable, equippedList: equippedConsumables })}
                >
                  {consumable.equipped ? 'Unequip' : 'Equip'}
                </Button>
              ) : null}
              {sheetType === 'campaigns' ? (
                consumable.npcId ? (
                  <Button dark onClick={() => dispatch(updateSheetResourceStart(sheetType, campSheet._id, 'consumables', consumable._id, { npcId: null }))}>
                    Unassign
                  </Button>
                ) : (
                  <Button onClick={() => dispatch(setModal({ type: ModalTypes.assignBelonging, id: consumable._id, data: { type: 'consumables', name: consumable.name } }))}>Assign</Button>
                )
              ) : null}
              {sheetType === 'campaigns' ? (
                <Button dark={consumable.active} onClick={() => dispatch(updateSheetResourceStart(sheetType, campSheet._id, 'consumables', consumable._id, { active: !consumable.active }))}>
                  {consumable.active ? 'Deactivate' : 'Activate'}
                </Button>
              ) : null}
              <Button>Give or Sell</Button>
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
