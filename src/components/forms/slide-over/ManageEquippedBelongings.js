import { Fragment, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

import { selectCurrentCharacter } from '../../../redux/character/character.selectors';
import { selectCurrentCampaign } from '../../../redux/campaign/campaign.selectors';

import { useActions } from '../../../hooks/useActions';

import { capitalize } from '../../../utils/helpers/strings';
import equipBelonging from '../../../utils/functions/equipBelonging';
import ModalTypes from '../../../utils/ModalTypes';

import { SlideOverContainer } from '../SlideOver';

import ListContainer from '../../data/ListContainer';

import DisplayWeapon from '../../display/DisplayWeapon';
import DisplayWearable from '../../display/DisplayWearable';
import DisplayConsumable from '../../display/DisplayConsumable';
import DisplayUsable from '../../display/DisplayUsable';

const ManageEquippedBelongings = ({ data: { type, belongingType, playerId } }) => {
  const { setNestedModal } = useActions();

  const charSheet = useSelector(selectCurrentCharacter);
  const campSheet = useSelector(selectCurrentCampaign);

  const [belongings, setBelongings] = useState([]);
  const [player, setPlayer] = useState(null);

  useEffect(() => {
    switch (type) {
      case 'players':
        const player = campSheet.players.find(player => player._id === playerId);
        setPlayer(player);
        setBelongings(player[belongingType].filter(bel => !bel.archived));
        return;
      case 'characters':
        setBelongings(charSheet[belongingType].filter(bel => !bel.archived));
        return;
      default:
        return;
    }
  }, [charSheet, campSheet, type, belongingType, playerId]);

  return (
    <SlideOverContainer title={`Manage equipped ${capitalize(belongingType)}`} description={`Manage equipped ${belongingType} below.`} cancelText="Done">
      <div className="px-6">
        {belongings.length ? (
          <ListContainer>
            {belongings
              .filter(belonging => !belonging.archived)
              .map(belonging => {
                if (belongingType === 'weapons') {
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
                                sheet: type === 'characters' ? charSheet : player,
                                belongingType: 'weapons',
                                belonging: belonging,
                                equippedList: belongings.filter(bel => bel.equipped),
                                nested: true,
                                forPlayer: type === 'players' ? true : false,
                              }),
                          },
                          {
                            text: 'View',
                            click: () => setNestedModal({ type: ModalTypes.showBelonging, id: belonging._id, data: { sheetType: type, playerId, belongingType } }),
                          },
                        ]}
                      />
                    </Fragment>
                  );
                }

                if (belongingType === 'wearables') {
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
                                sheet: type === 'characters' ? charSheet : player,
                                belongingType: 'wearables',
                                belonging: belonging,
                                equippedList: belongings.filter(bel => bel.equipped),
                                equipmentMods: belongings
                                  .filter(wearable => wearable.equipped)
                                  .reduce(
                                    (mods, wearable) => ({
                                      fortitude: mods.fortitude + wearable.statMods.fortitude,
                                      agility: mods.agility + wearable.statMods.agility,
                                      persona: mods.persona + wearable.statMods.persona,
                                      aptitude: mods.aptitude + wearable.statMods.aptitude,
                                    }),
                                    { fortitude: 0, agility: 0, persona: 0, aptitude: 0 }
                                  ),
                                nested: true,
                                forPlayer: type === 'players' ? true : false,
                              }),
                          },
                          {
                            text: 'View',
                            click: () => setNestedModal({ type: ModalTypes.showBelonging, id: belonging._id, data: { sheetType: type, playerId, belongingType } }),
                          },
                        ]}
                      />
                    </Fragment>
                  );
                }

                if (belongingType === 'consumables') {
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
                                sheet: type === 'characters' ? charSheet : player,
                                belongingType: 'consumables',
                                belonging: belonging,
                                equippedList: belongings.filter(bel => bel.equipped),
                                nested: true,
                                forPlayer: type === 'players' ? true : false,
                              }),
                          },
                          {
                            text: 'View',
                            click: () => setNestedModal({ type: ModalTypes.showBelonging, id: belonging._id, data: { sheetType: type, playerId, belongingType } }),
                          },
                        ]}
                      />
                    </Fragment>
                  );
                }

                if (belongingType === 'usables') {
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
                                sheet: type === 'characters' ? charSheet : player,
                                belongingType: 'usables',
                                belonging: belonging,
                                equippedList: belongings.filter(bel => bel.equipped),
                                nested: true,
                                forPlayer: type === 'players' ? true : false,
                              }),
                          },
                          {
                            text: 'View',
                            click: () => setNestedModal({ type: ModalTypes.showBelonging, id: belonging._id, data: { sheetType: type, playerId, belongingType } }),
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
