import { Fragment } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { selectCurrentCharacter, selectEquippedWeapons, selectEquippedWearables, selectEquippedConsumables, selectEquippedUsables } from '../../../../redux/character/character.selectors';

import { setNestedModal } from '../../../../redux/app/app.actions';

import { capitalize } from '../../../../utils/strings';
import equipBelonging from '../../../../utils/equipBelonging';
import ModalTypes from '../../../../utils/ModalTypes';

import { SlideOverContainer } from '../../../../layouts/components/app/SlideOver';

import ListContainer from '../../../shared/data/ListContainer';

import DisplayWeapon from '../../../sheets/display/DisplayWeapon';
import DisplayWearable from '../../../sheets/display/DisplayWearable';
import DisplayConsumable from '../../../sheets/display/DisplayConsumable';
import DisplayUsable from '../../../sheets/display/DisplayUsable';

const ManageEquippedBelongings = ({ data }) => {
  const dispatch = useDispatch();

  const charSheet = useSelector(selectCurrentCharacter);
  const equippedWeapons = useSelector(selectEquippedWeapons);
  const equippedWearables = useSelector(selectEquippedWearables);
  const equippedConsumables = useSelector(selectEquippedConsumables);
  const equippedUsables = useSelector(selectEquippedUsables);

  return (
    <SlideOverContainer title={`Manage equipped ${capitalize(data.type)}`} description={`Manage your equipped ${capitalize(data.type)} below.`} cancelText="Done">
      <div className="px-6">
        {charSheet[data.type].length ? (
          <ListContainer>
            {charSheet[data.type].map(belonging => {
              if (data.type === 'weapons') {
                return (
                  <Fragment>
                    <DisplayWeapon
                      key={belonging._id}
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
                              sheetId: charSheet._id,
                              belongingType: 'weapons',
                              belongingId: belonging._id,
                              status: belonging.equipped,
                              list: equippedWeapons,
                            }),
                        },
                        {
                          text: 'View',
                          click: () => dispatch(setNestedModal({ type: ModalTypes.showBelonging, id: belonging._id, data: { sheetType: 'characters', resourceType: 'weapons' } })),
                        },
                      ]}
                    />
                  </Fragment>
                );
              }

              if (data.type === 'wearables') {
                return (
                  <Fragment>
                    <DisplayWearable
                      key={belonging._id}
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
                              sheetId: charSheet._id,
                              belongingType: 'wearables',
                              belongingId: belonging._id,
                              status: belonging.equipped,
                              list: equippedWearables,
                            }),
                        },
                        {
                          text: 'View',
                          click: () => dispatch(setNestedModal({ type: ModalTypes.showBelonging, id: belonging._id, data: { sheetType: 'characters', resourceType: 'wearables' } })),
                        },
                      ]}
                    />
                  </Fragment>
                );
              }

              if (data.type === 'consumables') {
                return (
                  <Fragment>
                    <DisplayConsumable
                      key={belonging._id}
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
                              sheetId: charSheet._id,
                              belongingType: 'consumables',
                              belongingId: belonging._id,
                              status: belonging.equipped,
                              list: equippedConsumables,
                            }),
                        },
                        {
                          text: 'View',
                          click: () => dispatch(setNestedModal({ type: ModalTypes.showBelonging, id: belonging._id, data: { sheetType: 'characters', resourceType: 'consumables' } })),
                        },
                      ]}
                    />
                  </Fragment>
                );
              }

              if (data.type === 'usables') {
                return (
                  <Fragment>
                    <DisplayUsable
                      key={belonging._id}
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
                              sheetId: charSheet._id,
                              belongingType: 'usables',
                              belongingId: belonging._id,
                              status: belonging.equipped,
                              list: equippedUsables,
                            }),
                        },
                        {
                          text: 'View',
                          click: () => dispatch(setNestedModal({ type: ModalTypes.showBelonging, id: belonging._id, data: { sheetType: 'characters', resourceType: 'usables' } })),
                        },
                      ]}
                    />
                  </Fragment>
                );
              }

              return 'Something went wrong loading belonging data.';
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
