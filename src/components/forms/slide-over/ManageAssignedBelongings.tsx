import { Fragment } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { selectCurrentCampaign } from '../../../redux/campaign/campaign.selectors';

import { updateSheetResourceStart } from '../../../redux/sheet/sheet.actions';

import { useActions } from '../../../hooks/useActions';

import { capitalize } from '../../../utils/helpers/strings';
import ModalTypes from '../../../utils/ModalTypes';

import { SlideOverContainer } from '../SlideOver';

import ListContainer from '../../data/ListContainer';

import DisplayWeapon from '../../display/DisplayWeapon';
import DisplayWearable from '../../display/DisplayWearable';
import DisplayConsumable from '../../display/DisplayConsumable';
import DisplayUsable from '../../display/DisplayUsable';
import Notice, { NoticeStatus } from '../../Notice';

import { Consumable, Npc, Usable, Weapon, Wearable } from '../../../models/sheet/resources';
import { SheetType, SheetResourceType, Belonging, BelongingType } from '../../../models/sheet';

interface Props {
  data: {
    belongingType: BelongingType;
    npc: Npc;
  };
}

const ManageAssignedBelongings: React.FC<Props> = ({ data }) => {
  const dispatch = useDispatch();

  const { setNestedModal } = useActions();

  const campSheet = useSelector(selectCurrentCampaign)!;

  const belongings = (campSheet[data.belongingType] as Belonging[]).filter(belonging => belonging.npcId === data.npc._id || !belonging.npcId);

  return (
    <SlideOverContainer title={`Manage assigned ${capitalize(data.belongingType)}`} description={`Manage assigned ${capitalize(data.belongingType)} below.`} cancelText="Done">
      <div className="px-6">
        <Notice status={NoticeStatus.Info} message="Note: Belongings that are currently assigned to other Npcs will not appear here." classes="mt-4" />

        {belongings.length ? (
          <ListContainer list={belongings}>
            {belongings.map(belonging => {
              if (data.belongingType === 'weapons') {
                return (
                  <Fragment key={belonging._id}>
                    <DisplayWeapon
                      weapon={belonging as Weapon}
                      sheetType={SheetType.campaigns}
                      listItem
                      condensed
                      actions={[
                        {
                          text: belonging.npcId ? 'Unassign' : 'Assign',
                          dark: Boolean(belonging.npcId),
                          click: () =>
                            dispatch(
                              updateSheetResourceStart(
                                SheetType.campaigns,
                                campSheet._id,
                                SheetResourceType.weapons,
                                belonging._id,
                                { npcId: belonging.npcId ? null : data.npc._id },
                                {
                                  notification: {
                                    status: 'success',
                                    heading: `Weapon ${belonging.npcId ? 'Unassigned' : 'Assigned'}`,
                                    message: `You have successfully ${belonging.npcId ? 'unassigned' : 'assigned'} ${(belonging as Weapon).nickname || belonging.name}.`,
                                  },
                                }
                              )
                            ),
                        },
                        {
                          text: 'View',
                          click: () => setNestedModal({ type: ModalTypes.showBelonging, data: { belongingType: 'weapons', belonging } }),
                        },
                      ]}
                    />
                  </Fragment>
                );
              }

              if (data.belongingType === 'wearables') {
                return (
                  <Fragment key={belonging._id}>
                    <DisplayWearable
                      wearable={belonging as Wearable}
                      sheetType={SheetType.campaigns}
                      listItem
                      condensed
                      actions={[
                        {
                          text: belonging.npcId ? 'Unassign' : 'Assign',
                          dark: Boolean(belonging.npcId),
                          click: () =>
                            dispatch(
                              updateSheetResourceStart(
                                SheetType.campaigns,
                                campSheet._id,
                                SheetResourceType.wearables,
                                belonging._id,
                                { npcId: belonging.npcId ? null : data.npc._id },
                                {
                                  notification: {
                                    status: 'success',
                                    heading: `Wearable ${belonging.npcId ? 'Unassigned' : 'Assigned'}`,
                                    message: `You have successfully ${belonging.npcId ? 'unassigned' : 'assigned'} ${belonging.name}.`,
                                  },
                                }
                              )
                            ),
                        },
                        {
                          text: 'View',
                          click: () => setNestedModal({ type: ModalTypes.showBelonging, data: { belongingType: 'wearables', belonging } }),
                        },
                      ]}
                    />
                  </Fragment>
                );
              }

              if (data.belongingType === 'consumables') {
                return (
                  <Fragment key={belonging._id}>
                    <DisplayConsumable
                      consumable={belonging as Consumable}
                      sheetType={SheetType.campaigns}
                      listItem
                      condensed
                      actions={[
                        {
                          text: belonging.npcId ? 'Unassign' : 'Assign',
                          dark: Boolean(belonging.npcId),
                          click: () =>
                            dispatch(
                              updateSheetResourceStart(
                                SheetType.campaigns,
                                campSheet._id,
                                SheetResourceType.consumables,
                                belonging._id,
                                { npcId: belonging.npcId ? null : data.npc._id },
                                {
                                  notification: {
                                    status: 'success',
                                    heading: `Consumable ${belonging.npcId ? 'Unassigned' : 'Assigned'}`,
                                    message: `You have successfully ${belonging.npcId ? 'unassigned' : 'assigned'} ${belonging.name}.`,
                                  },
                                }
                              )
                            ),
                        },
                        {
                          text: 'View',
                          click: () => setNestedModal({ type: ModalTypes.showBelonging, data: { belongingType: 'consumables', belonging } }),
                        },
                      ]}
                    />
                  </Fragment>
                );
              }

              if (data.belongingType === 'usables') {
                return (
                  <Fragment key={belonging._id}>
                    <DisplayUsable
                      usable={belonging as Usable}
                      sheetType={SheetType.campaigns}
                      listItem
                      condensed
                      actions={[
                        {
                          text: belonging.npcId ? 'Unassign' : 'Assign',
                          dark: Boolean(belonging.npcId),
                          click: () =>
                            dispatch(
                              updateSheetResourceStart(
                                SheetType.campaigns,
                                campSheet._id,
                                SheetResourceType.usables,
                                belonging._id,
                                { npcId: belonging.npcId ? null : data.npc._id },
                                {
                                  notification: {
                                    status: 'success',
                                    heading: `Usable ${belonging.npcId ? 'Unassigned' : 'Assigned'}`,
                                    message: `You have successfully ${belonging.npcId ? 'unassigned' : 'assigned'} ${belonging.name}.`,
                                  },
                                }
                              )
                            ),
                        },
                        {
                          text: 'View',
                          click: () => setNestedModal({ type: ModalTypes.showBelonging, data: { belongingType: 'usables', belonging } }),
                        },
                      ]}
                    />
                  </Fragment>
                );
              }

              return <p key={belonging._id}>Something went wrong loading belonging data.</p>;
            })}
          </ListContainer>
        ) : (
          'You do not have any {belongingType}, create one now.'
        )}
      </div>
    </SlideOverContainer>
  );
};

export default ManageAssignedBelongings;
