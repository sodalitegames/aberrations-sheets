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
import Notice from '../../Notice';

const ManageAssignedBelongings = ({ data }) => {
  const dispatch = useDispatch();

  const { setNestedModal } = useActions();

  const campSheet = useSelector(selectCurrentCampaign);

  return (
    <SlideOverContainer title={`Manage assigned ${capitalize(data.type)}`} description={`Manage assigned ${capitalize(data.type)} below.`} cancelText="Done">
      <div className="px-6">
        <Notice message="Note: Belongings that are currently assigned to other Npcs will not appear here." classes="mt-4" />

        {campSheet[data.type].length ? (
          <ListContainer>
            {campSheet[data.type]
              .filter(belonging => belonging.npcId === data.npc._id || !belonging.npcId)
              .map(belonging => {
                if (data.type === 'weapons') {
                  return (
                    <Fragment key={belonging._id}>
                      <DisplayWeapon
                        weapon={belonging}
                        listItem
                        condensed
                        actions={[
                          {
                            text: belonging.npcId ? 'Unassign' : 'Assign',
                            dark: belonging.npcId,
                            click: () =>
                              dispatch(
                                updateSheetResourceStart(
                                  'campaigns',
                                  campSheet._id,
                                  'weapons',
                                  belonging._id,
                                  { npcId: belonging.npcId ? null : data.npc._id },
                                  {
                                    notification: {
                                      status: 'success',
                                      heading: `Weapon ${belonging.npcId ? 'Unassigned' : 'Assigned'}`,
                                      message: `You have successfully ${belonging.npcId ? 'unassigned' : 'assigned'} ${belonging.nickname || belonging.name}.`,
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

                if (data.type === 'wearables') {
                  return (
                    <Fragment key={belonging._id}>
                      <DisplayWearable
                        wearable={belonging}
                        listItem
                        condensed
                        actions={[
                          {
                            text: belonging.npcId ? 'Unassign' : 'Assign',
                            dark: belonging.npcId,
                            click: () =>
                              dispatch(
                                updateSheetResourceStart(
                                  'campaigns',
                                  campSheet._id,
                                  'wearables',
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

                if (data.type === 'consumables') {
                  return (
                    <Fragment key={belonging._id}>
                      <DisplayConsumable
                        consumable={belonging}
                        listItem
                        condensed
                        actions={[
                          {
                            text: belonging.npcId ? 'Unassign' : 'Assign',
                            dark: belonging.npcId,
                            click: () =>
                              dispatch(
                                updateSheetResourceStart(
                                  'campaigns',
                                  campSheet._id,
                                  'consumables',
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

                if (data.type === 'usables') {
                  return (
                    <Fragment key={belonging._id}>
                      <DisplayUsable
                        usable={belonging}
                        listItem
                        condensed
                        actions={[
                          {
                            text: belonging.npcId ? 'Unassign' : 'Assign',
                            dark: belonging.npcId,
                            click: () =>
                              dispatch(
                                updateSheetResourceStart(
                                  'campaigns',
                                  campSheet._id,
                                  'usables',
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
