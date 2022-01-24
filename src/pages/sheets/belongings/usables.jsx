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

import DisplayUsable from '../../../components/sheets/display/DisplayUsable';

const SheetBelongingsUsablesPage = ({ sheetType }) => {
  const dispatch = useDispatch();

  const charSheet = useSelector(selectCurrentCharacter);
  const campSheet = useSelector(selectCurrentCampaign);

  const [usable, setUsable] = useState(null);
  const [id, setId] = useState(null);

  useEffect(() => {
    if (id) {
      setUsable(sheetType === 'characters' ? charSheet.usables.find(usab => usab._id === id) : campSheet.usables.find(usab => usab._id === id));
      return;
    }

    setUsable(sheetType === 'characters' ? charSheet.usables[0] : campSheet.usables[0]);
    setId(sheetType === 'characters' ? charSheet.usables[0]?._id : campSheet.usables[0]?._id);
  }, [sheetType, id, campSheet, charSheet]);

  console.log(usable);

  return (
    <SheetPageContent title="Usables" columns={4}>
      {/* All Usables */}
      <PanelSection title="Manage Usables">
        <div className="flow-root mt-2">
          <ListContainer
            list={sheetType === 'characters' ? charSheet.usables : campSheet.usables}
            button={{ click: () => dispatch(setSlideOver({ type: SlideOverTypes.usableForm, data: { sheetType: sheetType } })), text: 'Add a new Usable' }}
            empty={{
              heading: 'No Usables',
              message: 'Get started by creating your first one now',
              button: { click: () => dispatch(setSlideOver({ type: SlideOverTypes.usableForm, data: { sheetType: sheetType } })), text: 'New Usable' },
            }}
          >
            {(sheetType === 'characters' ? charSheet.usables : campSheet.usables).map(usable => (
              <div
                key={usable._id}
                className={classNames('flex justify-between items-center px-2 cursor-pointer', id === usable._id ? 'bg-gray-100' : 'hover:bg-gray-50')}
                onClick={() => setId(usable._id)}
              >
                <DisplayUsable key={usable._id} usable={usable} sheetType={sheetType} condensed listItem />

                {/* Display if it's a character sheet usable is equipped */}
                {sheetType === 'characters' && usable.equipped ? (
                  <div className="shrink-0 ml-2" title="Equipped">
                    <CheckCircleIcon className="h-6 w-6 text-green-600" aria-hidden="true" />
                  </div>
                ) : null}

                {/* Display if it's a campaign sheet and usable is active */}
                {sheetType === 'campaigns' && usable.active ? (
                  <div className="shrink-0 ml-2" title="Active">
                    <CheckCircleIcon className="h-6 w-6 text-green-600" aria-hidden="true" />
                  </div>
                ) : null}
              </div>
            ))}
          </ListContainer>
        </div>
      </PanelSection>

      {/* Selected Usable */}
      <PanelSection title="Selected Usable" colSpan={3}>
        {usable ? (
          <div className="grid gap-8 grid-cols-3 divide-x divide-gray-200">
            <div className="col-span-2">
              <DisplayUsable usable={usable} sheetType={sheetType} />
            </div>

            <div className="col-span-1 space-y-4 pl-8">
              {sheetType === 'characters' ? (
                <Button dark={usable.equipped} onClick={() => equipBelonging({ id: usable._id, type: 'usables', status: usable.equipped, unequippable: !usable.equippable })}>
                  {usable.equipped ? 'Unequip' : 'Equip'}
                </Button>
              ) : null}
              {sheetType === 'campaigns' ? (
                usable.npcId ? (
                  <Button dark onClick={() => dispatch(updateSheetResourceStart(sheetType, campSheet._id, 'usables', usable._id, { npcId: null }))}>
                    Unassign
                  </Button>
                ) : (
                  <Button onClick={() => dispatch(setModal({ type: ModalTypes.assignBelonging, id: usable._id, data: { type: 'usables', name: usable.name } }))}>Assign</Button>
                )
              ) : null}
              {sheetType === 'campaigns' ? (
                <Button dark={usable.active} onClick={() => dispatch(updateSheetResourceStart(sheetType, campSheet._id, 'usables', usable._id, { active: !usable.active }))}>
                  {usable.active ? 'Deactivate' : 'Activate'}
                </Button>
              ) : null}
              <Button>Give or Sell</Button>
              <Button onClick={() => dispatch(setSlideOver({ type: SlideOverTypes.usableForm, id: usable._id, data: { sheetType: sheetType } }))}>Edit</Button>
              <Button
                alert
                onClick={() =>
                  dispatch(
                    setModal({
                      type: ModalTypes.deleteResource,
                      id: usable._id,
                      data: {
                        sheetType: sheetType,
                        resourceType: 'usables',
                        title: `Are you sure you want to delete ${usable.name}?`,
                        submitText: `Yes, delete ${usable.name}`,
                        equipped: usable.equipped,
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
          <p className="text-sm italic text-gray-400">Please create or select a usable to get started.</p>
        )}
      </PanelSection>
    </SheetPageContent>
  );
};

export default SheetBelongingsUsablesPage;
