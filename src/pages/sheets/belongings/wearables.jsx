import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { CheckCircleIcon } from '@heroicons/react/outline';

import { selectCurrentCharacter } from '../../../redux/character/character.selectors';
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

import DisplayWearable from '../../../components/sheets/display/DisplayWearable';

const SheetBelongingsWearablesPage = ({ sheetType }) => {
  const dispatch = useDispatch();

  const charSheet = useSelector(selectCurrentCharacter);
  const campSheet = useSelector(selectCurrentCampaign);

  const [wearable, setWearable] = useState(null);
  const [id, setId] = useState(null);

  useEffect(() => {
    if (id) {
      setWearable(sheetType === 'characters' ? charSheet.wearables.find(wear => wear._id === id) : campSheet.wearables.find(wear => wear._id === id));
      return;
    }

    setWearable(sheetType === 'characters' ? charSheet.wearables[0] : campSheet.wearables[0]);
  }, [sheetType, id, campSheet, charSheet]);

  console.log(wearable);

  return (
    <SheetPageContent title="Wearables" columns={4}>
      {/* All Wearables */}
      <PanelSection title="Manage Wearables">
        <div className="flow-root mt-2">
          <ListContainer
            list={sheetType === 'characters' ? charSheet.wearables : campSheet.wearables}
            button={{ click: () => dispatch(setSlideOver({ type: SlideOverTypes.wearableForm, data: { sheetType: sheetType } })), text: 'Add a new Wearable' }}
            empty={{
              heading: 'No Wearables',
              message: 'Get started by creating your first one now',
              button: { click: () => dispatch(setSlideOver({ type: SlideOverTypes.wearableForm, data: { sheetType: sheetType } })), text: 'New Wearable' },
            }}
          >
            {(sheetType === 'characters' ? charSheet.wearables : campSheet.wearables).map(wearable => (
              <div key={wearable._id} className={classNames('flex justify-between items-center hover:bg-gray-50 px-2 cursor-pointer')} onClick={() => setId(wearable._id)}>
                <DisplayWearable key={wearable._id} wearable={wearable} sheetType={sheetType} condensed listItem />

                {/* Display if it's a character sheet wearable is equipped */}
                {sheetType === 'characters' && wearable.equipped ? (
                  <div className="shrink-0 ml-2" title="Equipped">
                    <CheckCircleIcon className="h-6 w-6 text-green-600" aria-hidden="true" />
                  </div>
                ) : null}

                {/* Display if it's a campaign sheet and wearable is active */}
                {sheetType === 'campaigns' && wearable.active ? (
                  <div className="shrink-0 ml-2" title="Active">
                    <CheckCircleIcon className="h-6 w-6 text-green-600" aria-hidden="true" />
                  </div>
                ) : null}
              </div>
            ))}
          </ListContainer>
        </div>
      </PanelSection>

      {/* Selected Wearable */}
      <PanelSection title="Selected Wearable" colSpan={3}>
        {wearable ? (
          <div className="grid gap-8 grid-cols-3 divide-x divide-gray-200">
            <div className="col-span-2">
              <DisplayWearable wearable={wearable} sheetType={sheetType} />
            </div>

            <div className="col-span-1 space-y-4 pl-8">
              {sheetType === 'characters' ? (
                <Button onClick={() => equipBelonging({ id: wearable._id, type: 'wearables', status: wearable.equipped })}>{wearable.equipped ? 'Unequip' : 'Equip'}</Button>
              ) : null}
              {sheetType === 'campaigns' ? (
                <Button onClick={() => dispatch(setModal({ type: ModalTypes.assignBelonging, id: wearable._id, data: { type: 'wearables' } }))}>{wearable.npcId ? 'Unassign' : 'Assign'}</Button>
              ) : null}
              {sheetType === 'campaigns' ? (
                <Button onClick={() => dispatch(updateSheetResourceStart(sheetType, campSheet._id, 'wearables', wearable._id, { active: !wearable.active }))}>
                  {wearable.active ? 'Deactivate' : 'Activate'}
                </Button>
              ) : null}
              <Button>Give or Sell</Button>
              <Button onClick={() => dispatch(setSlideOver({ type: SlideOverTypes.wearableForm, id: wearable._id, data: { sheetType: sheetType } }))}>Edit</Button>
              <Button
                alert
                onClick={() =>
                  dispatch(
                    setModal({
                      type: ModalTypes.deleteResource,
                      id: wearable._id,
                      data: {
                        sheetType: sheetType,
                        resourceType: 'wearables',
                        title: `Are you sure you want to delete ${wearable.name}?`,
                        submitText: `Yes, delete ${wearable.name}`,
                        equipped: wearable.equipped,
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
          <p className="text-sm italic text-gray-400">Please create or select a wearable to get started.</p>
        )}
      </PanelSection>
    </SheetPageContent>
  );
};

export default SheetBelongingsWearablesPage;
