import { Fragment } from 'react';
import { useDispatch } from 'react-redux';

import { setNestedModal } from '../../../redux/app/app.actions';

import { capitalize } from '../../../utils/helpers/strings';
import equipBelonging from '../../../utils/functions/equipBelonging';
import ModalTypes from '../../../utils/ModalTypes';

import { SlideOverContainer } from '../SlideOver';

import ListContainer from '../../data/ListContainer';

import DisplayWeapon from '../../display/DisplayWeapon';
import DisplayWearable from '../../display/DisplayWearable';
import DisplayConsumable from '../../display/DisplayConsumable';
import DisplayUsable from '../../display/DisplayUsable';

const ManageEquippedBelongings = ({ data }) => {
  const dispatch = useDispatch();

  return (
    <SlideOverContainer title={`Manage equipped ${capitalize(data.type)}`} description={`Manage equipped ${capitalize(data.type)} below.`} cancelText="Done">
      <div className="px-6">
        {data.sheet[data.type].length ? (
          <ListContainer>
            {data.sheet[data.type].map(belonging => {
              if (data.type === 'weapons') {
                return (
                  <Fragment key={belonging._id}>
                    <DisplayWeapon
                      weapon={belonging}
                      listItem
                      condensed
                      actions={[
                        {
                          text: belonging.equipped ? 'Unequip' : 'Equip',
                          dark: belonging.equipped,
                          click: () =>
                            equipBelonging({
                              sheetType: 'characters',
                              sheet: data.sheet,
                              belongingType: 'weapons',
                              belonging: belonging,
                              equippedList: data.equippedList,
                              nested: true,
                            }),
                        },
                        {
                          text: 'View',
                          click: () =>
                            dispatch(setNestedModal({ type: ModalTypes.showBelonging, id: belonging._id, data: { sheetType: data.sheetType, playerId: belonging.sheetId, resourceType: 'weapons' } })),
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
                          text: belonging.equipped ? 'Unequip' : 'Equip',
                          dark: belonging.equipped,
                          click: () =>
                            equipBelonging({
                              sheetType: 'characters',
                              sheet: data.sheet,
                              belongingType: 'wearables',
                              belonging: belonging,
                              equippedList: data.equippedList,
                              equipmentMods: data.equipmentMods,
                              nested: true,
                            }),
                        },
                        {
                          text: 'View',
                          click: () =>
                            dispatch(
                              setNestedModal({ type: ModalTypes.showBelonging, id: belonging._id, data: { sheetType: data.sheetType, playerId: belonging.sheetId, resourceType: 'wearables' } })
                            ),
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
                          text: belonging.equipped ? 'Unequip' : 'Equip',
                          dark: belonging.equipped,
                          click: () =>
                            equipBelonging({
                              sheetType: 'characters',
                              sheet: data.sheet,
                              belongingType: 'consumables',
                              belonging: belonging,
                              equippedList: data.equippedList,
                              nested: true,
                            }),
                        },
                        {
                          text: 'View',
                          click: () =>
                            dispatch(
                              setNestedModal({ type: ModalTypes.showBelonging, id: belonging._id, data: { sheetType: data.sheetType, playerId: belonging.sheetId, resourceType: 'consumables' } })
                            ),
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
                          text: belonging.equipped ? 'Unequip' : 'Equip',
                          dark: belonging.equipped,
                          click: () =>
                            equipBelonging({
                              sheetType: 'characters',
                              sheet: data.sheet,
                              belongingType: 'usables',
                              belonging: belonging,
                              equippedList: data.equippedList,
                              nested: true,
                            }),
                        },
                        {
                          text: 'View',
                          click: () =>
                            dispatch(setNestedModal({ type: ModalTypes.showBelonging, id: belonging._id, data: { sheetType: data.sheetType, playerId: belonging.sheetId, resourceType: 'usables' } })),
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

export default ManageEquippedBelongings;
