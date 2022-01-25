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
                              sheet: charSheet,
                              belongingType: 'weapons',
                              belonging: belonging,
                              equippedList: equippedWeapons,
                              nested: true,
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
                              sheet: charSheet,
                              belongingType: 'wearables',
                              belonging: belonging,
                              equippedList: equippedWearables,
                              nested: true,
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
                              sheet: charSheet,
                              belongingType: 'consumables',
                              belonging: belonging,
                              equippedList: equippedConsumables,
                              nested: true,
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
                              sheet: charSheet,
                              belongingType: 'usables',
                              belonging: belonging,
                              equippedList: equippedUsables,
                              nested: true,
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
