import { Fragment } from 'react';
import { useSelector } from 'react-redux';

import { selectCurrentCharacter } from '../../../redux/character/character.selectors';
import { selectCurrentCampaign } from '../../../redux/campaign/campaign.selectors';

import { useActions } from '../../../hooks/useActions';

import { capitalize } from '../../../utils/helpers/strings';
import equipBelonging from '../../../utils/functions/equipBelonging';
import ModalTypes from '../../../utils/ModalTypes';

import { SlideOverContainer } from '../SlideOver';

import ListContainer from '../../data/ListContainer';

import Notice, { NoticeStatus } from '../../Notice';

import DisplayWeapon from '../../display/DisplayWeapon';
import DisplayWearable from '../../display/DisplayWearable';
import DisplayConsumable from '../../display/DisplayConsumable';
import DisplayUsable from '../../display/DisplayUsable';

import { Belonging, BelongingType, SheetType } from '../../../models/sheet';
import { Consumable, Usable, Weapon, Wearable } from '../../../models/sheet/resources';

interface Props {
  data: {
    belongingType: BelongingType;
    entityType: 'players' | 'characters';
    entityId: string;
  };
}

const ManageEquippedBelongings: React.FC<Props> = ({ data }) => {
  const { setNestedModal } = useActions();

  const charSheet = useSelector(selectCurrentCharacter);
  const campSheet = useSelector(selectCurrentCampaign);

  const getEntity = () => {
    switch (data.entityType) {
      case 'players':
        return campSheet!.players.find(player => player._id === data.entityId);
      case 'characters':
        return charSheet!;
      default:
        return;
    }
  };

  const entity = getEntity();
  const belongings = entity ? (entity[data.belongingType] as Belonging[]).filter(bel => !bel.archived) : [];

  return (
    <SlideOverContainer title={`Manage equipped ${capitalize(data.belongingType)}`} description={`Manage equipped ${data.belongingType} below.`} cancelText="Done">
      <div className="px-6">
        {entity && belongings.length ? (
          <ListContainer list={belongings}>
            {belongings
              .filter(belonging => !belonging.archived)
              .map(belonging => {
                if (data.belongingType === 'weapons') {
                  return (
                    <Fragment key={belonging._id}>
                      <DisplayWeapon
                        weapon={belonging as Weapon}
                        sheetType={SheetType.characters}
                        listItem
                        condensed
                        actions={[
                          {
                            text: belonging.equipped ? 'Unequip' : 'Equip',
                            dark: belonging.equipped,
                            click: () =>
                              equipBelonging({
                                sheetType: data.entityType,
                                sheet: entity,
                                belongingType: BelongingType.weapons,
                                belonging: belonging,
                                equippedList: belongings.filter(bel => bel.equipped),
                                nested: true,
                              }),
                          },
                          {
                            text: 'View',
                            click: () => setNestedModal({ type: ModalTypes.showBelonging, data: { belongingType: data.belongingType, belonging } }),
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
                        sheetType={SheetType.characters}
                        listItem
                        condensed
                        actions={[
                          {
                            text: belonging.equipped ? 'Unequip' : 'Equip',
                            dark: belonging.equipped,
                            click: () =>
                              equipBelonging({
                                sheetType: data.entityType,
                                sheet: entity,
                                belongingType: BelongingType.wearables,
                                belonging: belonging,
                                equippedList: belongings.filter(bel => bel.equipped),
                                nested: true,
                              }),
                          },
                          {
                            text: 'View',
                            click: () => setNestedModal({ type: ModalTypes.showBelonging, data: { belongingType: data.belongingType, belonging } }),
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
                        sheetType={SheetType.characters}
                        listItem
                        condensed
                        actions={[
                          {
                            text: belonging.equipped ? 'Unequip' : 'Equip',
                            dark: belonging.equipped,
                            click: () =>
                              equipBelonging({
                                sheetType: data.entityType,
                                sheet: entity,
                                belongingType: BelongingType.consumables,
                                belonging: belonging,
                                equippedList: belongings.filter(bel => bel.equipped),
                                nested: true,
                              }),
                          },
                          {
                            text: 'View',
                            click: () => setNestedModal({ type: ModalTypes.showBelonging, data: { belongingType: data.belongingType, belonging } }),
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
                        sheetType={SheetType.characters}
                        listItem
                        condensed
                        actions={[
                          {
                            text: belonging.equipped ? 'Unequip' : 'Equip',
                            dark: belonging.equipped,
                            disabled: !(belonging as Usable).equippable,
                            click: () =>
                              equipBelonging({
                                sheetType: data.entityType,
                                sheet: entity,
                                belongingType: BelongingType.usables,
                                belonging: belonging,
                                equippedList: belongings.filter(bel => bel.equipped),
                                nested: true,
                              }),
                          },
                          {
                            text: 'View',
                            click: () => setNestedModal({ type: ModalTypes.showBelonging, data: { belongingType: data.belongingType, belonging } }),
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
          <Notice status={NoticeStatus.Warn} message={`You do not have any ${data.belongingType}.`} classes="mt-4" />
        )}
      </div>
    </SlideOverContainer>
  );
};

export default ManageEquippedBelongings;
