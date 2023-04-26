import { Fragment } from 'react';
import { useDispatch } from 'react-redux';

import { updateSheetResourceStart } from '../../redux/sheet/sheet.actions';

import { useActions } from '../../hooks/useActions';

import { Belonging, Sheet, SheetType, SheetResourceType, BelongingType, CharacterSheet } from '../../models/sheet';
import { Usable, Weapon } from '../../models/sheet/resources';

import equipBelonging from '../../utils/functions/equipBelonging';
import ModalTypes from '../../utils/ModalTypes';
import SlideOverTypes from '../../utils/SlideOverTypes';
import { getResourceLabel, ResourceType } from '../../utils/helpers/resources';
import { capitalize } from '../../utils/helpers/strings';

import Button from '../Button';

interface BelongingActionsProps {
  sheetType: SheetType;
  sheet: Sheet;
  belongingType: BelongingType;
  belonging: Belonging;
  equippedBelongings: Belonging[];
}

const editForm = {
  weapons: SlideOverTypes.editWeaponForm,
  wearables: SlideOverTypes.wearableForm,
  consumables: SlideOverTypes.consumableForm,
  usables: SlideOverTypes.usableForm,
};

const BelongingActions: React.VFC<BelongingActionsProps> = ({ sheetType, sheet, belongingType, belonging, equippedBelongings }) => {
  const dispatch = useDispatch();
  const { setModal, setSlideOver } = useActions();

  return (
    <Fragment>
      {!belonging.archived ? (
        <Fragment>
          {/* Equip or Unequip */}
          {sheetType === 'characters' && (
            <Button
              dark={belonging.equipped}
              disabled={belongingType === 'usables' ? !(belonging as Usable).equippable : false}
              onClick={() => equipBelonging({ sheetType: sheetType, sheet: sheet as CharacterSheet, belongingType: belongingType, belonging: belonging, equippedList: equippedBelongings })}
            >
              {belonging.equipped ? 'Unequip' : 'Equip'}
            </Button>
          )}

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
                      SheetResourceType[belongingType],
                      belonging._id,
                      { npcId: null },
                      {
                        notification: {
                          status: 'success',
                          heading: `${getResourceLabel(ResourceType[belongingType])} Unassigned`,
                          message: `You have successfully unassigned ${(belonging as Weapon).nickname || belonging.name}.`,
                        },
                      }
                    )
                  )
                }
              >
                Unassign
              </Button>
            ) : (
              <Button onClick={() => setModal({ type: ModalTypes.assignBelonging, id: belonging._id, data: { belongingType, belonging } })}>Assign</Button>
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
                    SheetResourceType[belongingType],
                    belonging._id,
                    { active: !belonging.active },
                    {
                      notification: {
                        status: 'success',
                        heading: `${capitalize(getResourceLabel(ResourceType[belongingType]))} ${belonging.active ? 'Deactivated' : 'Activated'}`,
                        message: `You have successfully ${belonging.active ? 'deactivated' : 'activated'} ${(belonging as Weapon).nickname || belonging.name}.`,
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
          <Button onClick={() => setSlideOver({ type: SlideOverTypes.newTransactionForm, data: { sheetType, sheet, documentType: belongingType, document: belonging } })}>Give or Sell</Button>
        </Fragment>
      ) : null}

      {/* Edit */}
      <Button onClick={() => setSlideOver({ type: editForm[belongingType], data: { sheetType, sheetId: sheet._id, [getResourceLabel(ResourceType[belongingType])]: belonging } })}>Edit</Button>

      {/* Archive or Restore */}
      <Button
        onClick={() =>
          dispatch(
            updateSheetResourceStart(
              sheetType,
              sheet._id,
              SheetResourceType[belongingType],
              belonging._id,
              { archived: !belonging.archived, equipped: false, active: false, npcId: null },
              {
                notification: {
                  status: 'success',
                  heading: `${capitalize(getResourceLabel(ResourceType[belongingType]))} ${belonging.archived ? 'Restored' : 'Archived'}`,
                  message: `You have successfully ${belonging.archived ? 'restored' : 'archived'} ${(belonging as Weapon).nickname || belonging.name}.`,
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
          onClick={() =>
            setModal({
              type: ModalTypes.deleteResource,
              data: {
                sheetType: sheetType,
                resourceType: belongingType,
                resource: belonging,
                title: `Are you sure you want to delete ${(belonging as Weapon).nickname || belonging.name}?`,
                submitText: `Yes, delete ${(belonging as Weapon).nickname || belonging.name}`,
                notification: { heading: `${capitalize(getResourceLabel(ResourceType[belongingType]))} Deleted`, message: `You have successfully deleted ${belonging.name}.` },
              },
            })
          }
        >
          Delete
        </Button>
      ) : null}
    </Fragment>
  );
};

export default BelongingActions;
