import { Fragment } from 'react';
import { useDispatch } from 'react-redux';

import { setModal, setSlideOver } from '../../redux/root-actions';
import { updateSheetResourceStart } from '../../redux/sheet/sheet.actions';

import { BelongingKind, BelongingType, SheetType } from '../../models/enums';

import equipBelonging from '../../utils/equipBelonging';
import ModalTypes from '../../utils/ModalTypes';
import SlideOverTypes from '../../utils/SlideOverTypes';

import Button from '../shared/Button';

interface BelongingActionsProps {
  sheetType: SheetType;
  sheet: any;
  belongingType: BelongingType;
  belonging: any;
  equippedBelongings: any[];
  equipmentMods?: any;
  belongingKind: BelongingKind;
}

const editForm = {
  weapons: SlideOverTypes.editWeaponForm,
  wearables: SlideOverTypes.wearableForm,
  consumables: SlideOverTypes.consumableForm,
  usables: SlideOverTypes.usableForm,
};

const BelongingActions: React.VFC<BelongingActionsProps> = ({ sheetType, sheet, belongingType, belonging, equippedBelongings, equipmentMods, belongingKind }) => {
  const dispatch = useDispatch();

  return (
    <Fragment>
      {!belonging.archived ? (
        <Fragment>
          {/* Equip or Unequip */}
          {sheetType === 'characters' ? (
            <Button
              dark={belonging.equipped}
              onClick={() => equipBelonging({ sheetType: sheetType, sheet: sheet, belongingType: belongingType, belonging: belonging, equippedList: equippedBelongings, equipmentMods: equipmentMods })}
            >
              {belonging.equipped ? 'Unequip' : 'Equip'}
            </Button>
          ) : null}

          {/* Assign or Unassign */}
          {sheetType === 'campaigns' ? (
            belonging.npcId ? (
              <Button
                dark
                onClick={() =>
                  dispatch(
                    updateSheetResourceStart(
                      sheetType,
                      sheet._id,
                      belongingType,
                      belonging._id,
                      { npcId: null },
                      { notification: { status: 'success', heading: `${belongingKind} Unassigned`, message: `You have successfully unassigned ${belonging.nickname || belonging.name}.` } }
                    )
                  )
                }
              >
                Unassign
              </Button>
            ) : (
              <Button onClick={() => dispatch(setModal({ type: ModalTypes.assignBelonging, id: belonging._id, data: { type: belongingType, name: belonging.name } }))}>Assign</Button>
            )
          ) : null}

          {/* Activate or Deactivate */}
          {sheetType === 'campaigns' ? (
            <Button
              dark={belonging.active}
              onClick={() =>
                dispatch(
                  updateSheetResourceStart(
                    sheetType,
                    sheet._id,
                    belongingType,
                    belonging._id,
                    { active: !belonging.active },
                    {
                      notification: {
                        status: 'success',
                        heading: `${belongingKind} ${belonging.active ? 'Deactivated' : 'Activated'}`,
                        message: `You have successfully ${belonging.active ? 'deactivated' : 'activated'} ${belonging.nickname || belonging.name}.`,
                      },
                    }
                  )
                )
              }
            >
              {belonging.active ? 'Deactivate' : 'Activate'}
            </Button>
          ) : null}

          {/* Give or Sell */}
          <Button
            disabled={belongingType === 'wearables' && (belonging.npcId || belonging.equipped) ? true : false}
            disabledMessage={belongingType === 'wearables' ? `You must unequip/unassign this wearable before you can give or sell it to anybody.` : ''}
            onClick={() => dispatch(setSlideOver({ type: SlideOverTypes.newTransactionForm, data: { sheetType, documentType: belongingType, document: belonging } }))}
          >
            Give or Sell
          </Button>
        </Fragment>
      ) : null}

      {/* Edit */}
      <Button onClick={() => dispatch(setSlideOver({ type: editForm[belongingType], id: belonging._id, data: { sheetType: sheetType } }))}>Edit</Button>

      {/* Archive or Restore */}
      <Button
        disabled={belongingType === 'wearables' && (belonging.npcId || belonging.equipped) ? true : false}
        disabledMessage={belongingType === 'wearables' ? `You must unequip/unassign this wearable before you can archive it.` : ''}
        onClick={() =>
          dispatch(
            updateSheetResourceStart(
              sheetType,
              sheet._id,
              belongingType,
              belonging._id,
              { archived: !belonging.archived, equipped: false, active: false },
              {
                notification: {
                  status: 'success',
                  heading: `${belongingKind} ${belonging.archived ? 'Restored' : 'Archived'}`,
                  message: `You have successfully ${belonging.archived ? 'restored' : 'archived'} ${belonging.nickname || belonging.name}.`,
                },
              }
            )
          )
        }
      >
        {belonging.archived ? 'Restore' : 'Archive'}
      </Button>

      {/* Delete */}
      {belonging.archived ? (
        <Button
          alert
          disabled={belongingType === 'wearables' && (belonging.equipped || belonging.npcId) ? true : false}
          disabledMessage={belongingType === 'wearables' ? 'You must unequip/unassign this wearable before you can delete it.' : ''}
          onClick={() =>
            dispatch(
              setModal({
                type: ModalTypes.deleteResource,
                id: belonging._id,
                data: {
                  sheetType: sheetType,
                  resourceType: belongingType,
                  title: `Are you sure you want to delete ${belonging.nickname || belonging.name}?`,
                  submitText: `Yes, delete ${belonging.nickname || belonging.name}`,
                  equipped: belonging.equipped,
                  notification: { heading: `${belongingKind} Deleted`, message: `You have successfully deleted ${belonging.name}.` },
                },
              })
            )
          }
        >
          Delete
        </Button>
      ) : null}
    </Fragment>
  );
};

export default BelongingActions;
