import { useState } from 'react';
import { useSelector } from 'react-redux';

import {
  selectCurrentCharacter,
  selectEquippedWeapons,
  selectEquippedWearables,
  selectEquippedConsumables,
  selectEquippedUsables,
  selectEquipmentMods,
} from '../../../../redux/character/character.selectors';

import { capitalize } from '../../../../utils/strings';
import equipBelonging from '../../../../utils/equipBelonging';
import classNames from '../../../../utils/classNames';

import { ModalForm } from '../../../../layouts/components/app/Modal';

import ListContainer from '../../../shared/data/ListContainer';

import DisplayWeapon from '../../../sheets/display/DisplayWeapon';
import DisplayWearable from '../../../sheets/display/DisplayWearable';
import DisplayConsumable from '../../../sheets/display/DisplayConsumable';
import DisplayUsable from '../../../sheets/display/DisplayUsable';

const ErrorEquippingBelonging = ({ data, nested }) => {
  const charSheet = useSelector(selectCurrentCharacter);
  const equippedWeapons = useSelector(selectEquippedWeapons);
  const equippedWearables = useSelector(selectEquippedWearables);
  const equippedConsumables = useSelector(selectEquippedConsumables);
  const equippedUsables = useSelector(selectEquippedUsables);
  const equipmentMods = useSelector(selectEquipmentMods);

  const [belongingToReplace, setBelongingToReplace] = useState(null);

  console.log('LOOK', nested);

  const getTitleText = () => {
    if (data.belongingType === 'weapons') {
      return `You already have 2 weapons equipped. Would you like to replace one of them with ${data.belonging.nickname || data.belonging.name}?`;
    }

    if (data.belongingType === 'wearables') {
      return `You already have a wearable equipped to your ${capitalize(data.belonging.bodyArea)}. Would you like to replace it with ${data.belonging.name}?`;
    }

    if (data.belongingType === 'consumables') {
      return `You already have 3 consumables equipped. Would you like to replace one of them with ${data.belonging.name}?`;
    }

    if (data.belongingType === 'usables') {
      return `You already have 3 usables equipped. Would you like to replace one of them with ${data.belonging.name}?`;
    }

    return 'Error Equipping Belonging';
  };

  const submitHandler = e => {
    e.preventDefault();

    const config = { modal: nested ? false : true, nestedModal: nested ? true : false };
    console.log(config);

    if (data.belongingType !== 'wearables' && !belongingToReplace) return alert('You must select an equipped belonging to replace.');
    if (data.belongingType === 'usables' && !data.belonging.equippable) return alert('This usable is not equippable.');

    if (data.belongingType === 'weapons') {
      // Unequip the chosen belonging to replace
      equipBelonging({ sheetType: 'characters', sheet: charSheet, belongingType: data.belongingType, belonging: belongingToReplace, equippedList: equippedWeapons });

      // Equip the belonging that is replacing the old equipped belonging
      equipBelonging(
        {
          sheetType: 'characters',
          sheet: charSheet,
          belongingType: data.belongingType,
          belonging: data.belonging,
          equippedList: equippedWeapons.filter(weap => weap._id !== belongingToReplace._id),
        },
        { modal: nested ? false : true, nestedModal: nested ? true : false }
      );
      return;
    }

    if (data.belongingType === 'wearables') {
      const wearableToReplace = equippedWearables.find(wear => wear.bodyArea === data.belonging.bodyArea);

      // Unequip the chosen belonging to replace
      equipBelonging({
        sheetType: 'characters',
        sheet: charSheet,
        belongingType: data.belongingType,
        belonging: wearableToReplace,
        equippedList: equippedWearables,
        equipmentMods,
      });

      // Equip the belonging that is replacing the old equipped belonging
      equipBelonging(
        {
          sheetType: 'characters',
          sheet: charSheet,
          belongingType: data.belongingType,
          belonging: data.belonging,
          equippedList: equippedWearables.filter(wear => wear._id !== wearableToReplace._id),
          equipmentMods,
        },
        config
      );
      return;
    }

    if (data.belongingType === 'consumables') {
      // Unequip the chosen belonging to replace
      equipBelonging({ sheetType: 'characters', sheet: charSheet, belongingType: data.belongingType, belonging: belongingToReplace, equippedList: equippedConsumables });

      // Equip the belonging that is replacing the old equipped belonging
      equipBelonging(
        {
          sheetType: 'characters',
          sheet: charSheet,
          belongingType: data.belongingType,
          belonging: data.belonging,
          equippedList: equippedConsumables.filter(cons => cons._id !== belongingToReplace._id),
        },
        config
      );
      return;
    }

    if (data.belongingType === 'usables') {
      // Unequip the chosen belonging to replace
      equipBelonging({ sheetType: 'characters', sheet: charSheet, belongingType: data.belongingType, belonging: belongingToReplace, equippedList: equippedUsables });

      // Equip the belonging that is replacing the old equipped belonging
      equipBelonging(
        {
          sheetType: 'characters',
          sheet: charSheet,
          belongingType: data.belongingType,
          belonging: data.belonging,
          equippedList: equippedUsables.filter(usab => usab._id !== belongingToReplace._id),
        },
        config
      );
      return;
    }
  };

  return (
    <ModalForm
      nested={nested}
      title={getTitleText()}
      submitText={
        data.belongingType === 'wearables'
          ? `Replace Wearable`
          : belongingToReplace
          ? `Replace ${belongingToReplace.nickname || belongingToReplace.name} with ${data.belonging.nickname || data.belonging.name}`
          : `Replace`
      }
      submitDisabled={data.belongingType !== 'wearables' && !belongingToReplace}
      submitHandler={submitHandler}
    >
      <ListContainer classes="mt-4">
        {data.belongingType === 'weapons'
          ? equippedWeapons.map(weapon => (
              <div
                key={weapon._id}
                className={classNames('flex justify-between items-center px-2 cursor-pointer', weapon._id === belongingToReplace?._id ? 'bg-gray-100' : 'hover:bg-gray-50')}
                onClick={() => setBelongingToReplace(weapon)}
              >
                <DisplayWeapon weapon={weapon} listItem condensed />
              </div>
            ))
          : null}
        {data.belongingType === 'wearables'
          ? equippedWearables
              .filter(wearable => wearable.bodyArea === data.belonging.bodyArea)
              .map(wearable => (
                <div key={wearable._id} className="flex justify-between items-center px-2 bg-gray-100">
                  <DisplayWearable key={wearable._id} wearable={wearable} listItem condensed />
                </div>
              ))
          : null}
        {data.belongingType === 'consumables'
          ? equippedConsumables.map(consumable => (
              <div
                key={consumable._id}
                className={classNames('flex justify-between items-center px-2 cursor-pointer', consumable._id === belongingToReplace?._id ? 'bg-gray-100' : 'hover:bg-gray-50')}
                onClick={() => setBelongingToReplace(consumable)}
              >
                <DisplayConsumable key={consumable._id} consumable={consumable} listItem condensed />
              </div>
            ))
          : null}
        {data.belongingType === 'usables'
          ? equippedUsables.map(usable => (
              <div
                key={usable._id}
                className={classNames('flex justify-between items-center px-2 cursor-pointer', usable._id === belongingToReplace?._id ? 'bg-gray-100' : 'hover:bg-gray-50')}
                onClick={() => setBelongingToReplace(usable)}
              >
                <DisplayUsable key={usable._id} usable={usable} listItem condensed />
              </div>
            ))
          : null}
      </ListContainer>
    </ModalForm>
  );
};

export default ErrorEquippingBelonging;
