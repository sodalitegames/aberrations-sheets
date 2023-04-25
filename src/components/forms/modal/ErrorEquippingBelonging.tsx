import { FormEvent, useState, useEffect } from 'react';
import { useSelector } from 'react-redux';

import { selectCurrentCharacter } from '../../../redux/character/character.selectors';
import { selectCurrentCampaign } from '../../../redux/campaign/campaign.selectors';

import { capitalize } from '../../../utils/helpers/strings';
import equipBelonging from '../../../utils/functions/equipBelonging';
import classNames from '../../../utils/classNames';

import { ModalForm } from '../Modal';

import ListContainer from '../../data/ListContainer';

import DisplayWeapon from '../../display/DisplayWeapon';
import DisplayWearable from '../../display/DisplayWearable';
import DisplayConsumable from '../../display/DisplayConsumable';
import DisplayUsable from '../../display/DisplayUsable';

import { Belonging, BelongingType, CharacterSheet, SheetType } from '../../../models/sheet';
import { Consumable, Player, Usable, Weapon, Wearable } from '../../../models/sheet/resources';

interface Props {
  nested?: boolean;
  data: {
    belongingType: BelongingType;
    belonging: Belonging;
    sheetType: 'characters' | 'players';
    sheetId: string;
  };
}

const ErrorEquippingBelonging: React.FC<Props> = ({ data, nested }) => {
  const charSheet = useSelector(selectCurrentCharacter);
  const campSheet = useSelector(selectCurrentCampaign);

  const [sheet, setSheet] = useState<CharacterSheet | Player | null>(null);

  useEffect(() => {
    switch (data.sheetType) {
      case 'players':
        const player = campSheet!.players.find(player => player._id === data.sheetId);
        if (player) setSheet(player);
        return;
      case 'characters':
        if (charSheet) setSheet(charSheet);
        return;
      default:
        return;
    }
  }, [charSheet, campSheet, data.sheetType, data.sheetId]);

  const equippedBelongings: Belonging[] = sheet ? (sheet[data.belongingType] as Belonging[]).filter(bel => bel.equipped) : [];

  const [belongingToReplace, setBelongingToReplace] = useState<Belonging | null>(null);

  const getTitleText = () => {
    if (data.belongingType === 'weapons') {
      return `You already have 2 weapons equipped. Would you like to replace one of them with ${(data.belonging as Weapon).nickname || data.belonging.name}?`;
    }

    if (data.belongingType === 'wearables') {
      return `You already have a wearable equipped to your ${capitalize((data.belonging as Wearable).bodyArea)}. Would you like to replace it with ${data.belonging.name}?`;
    }

    if (data.belongingType === 'consumables') {
      return `You already have 3 consumables equipped. Would you like to replace one of them with ${data.belonging.name}?`;
    }

    if (data.belongingType === 'usables') {
      return `You already have 3 usables equipped. Would you like to replace one of them with ${data.belonging.name}?`;
    }

    return 'Error Equipping Belonging';
  };

  const submitHandler = (e: FormEvent) => {
    e.preventDefault();

    if (!sheet) return alert('Something went wrong!');

    const config = { modal: nested ? false : true, nestedModal: nested ? true : false };

    if (data.belongingType === 'wearables') {
      const wearableToReplace = (equippedBelongings as Wearable[]).find(wear => wear.bodyArea === (data.belonging as Wearable).bodyArea);

      if (!wearableToReplace) return alert('Something went wrong!');

      // Unequip the chosen belonging to replace
      equipBelonging({
        sheetType: 'characters',
        sheet,
        belongingType: data.belongingType,
        belonging: wearableToReplace,
        equippedList: equippedBelongings,
      });

      // Equip the belonging that is replacing the old equipped belonging
      equipBelonging(
        {
          sheetType: 'characters',
          sheet,
          belongingType: data.belongingType,
          belonging: data.belonging,
          equippedList: equippedBelongings.filter(wear => wear._id !== wearableToReplace._id),
        },
        config
      );
      return;
    }

    if (!belongingToReplace) return alert('You must select an equipped belonging to replace.');

    // Unequip the chosen belonging to replace
    equipBelonging({ sheetType: 'characters', sheet, belongingType: data.belongingType, belonging: belongingToReplace, equippedList: equippedBelongings });

    // Equip the belonging that is replacing the old equipped belonging
    equipBelonging(
      {
        sheetType: 'characters',
        sheet,
        belongingType: data.belongingType,
        belonging: data.belonging,
        equippedList: equippedBelongings.filter(bel => bel._id !== belongingToReplace._id),
      },
      { modal: nested ? false : true, nestedModal: nested ? true : false }
    );
  };

  return (
    <ModalForm
      nested={nested}
      title={getTitleText()}
      submitText={
        data.belongingType === 'wearables'
          ? `Replace Wearable`
          : belongingToReplace
          ? `Replace ${(belongingToReplace as Weapon).nickname || belongingToReplace.name} with ${(data.belonging as Weapon).nickname || data.belonging.name}`
          : `Replace`
      }
      submitDisabled={data.belongingType !== 'wearables' && !belongingToReplace}
      submitHandler={submitHandler}
    >
      <ListContainer list={equippedBelongings} classes="mt-4">
        {equippedBelongings.map(belonging => {
          if (data.belongingType === 'weapons') {
            return (
              <div
                key={belonging._id}
                className={classNames('flex justify-between items-center px-2 cursor-pointer', belonging._id === belongingToReplace?._id ? 'bg-gray-100' : 'hover:bg-gray-50')}
                onClick={() => setBelongingToReplace(belonging)}
              >
                <DisplayWeapon weapon={belonging as Weapon} sheetType={SheetType.characters} listItem condensed />
              </div>
            );
          }

          if (data.belongingType === 'wearables') {
            return (belonging as Wearable).bodyArea === (data.belonging as Wearable).bodyArea ? (
              <div key={belonging._id} className="flex items-center justify-between px-2 bg-gray-100">
                <DisplayWearable key={belonging._id} wearable={belonging as Wearable} sheetType={SheetType.characters} listItem condensed />
              </div>
            ) : null;
          }

          if (data.belongingType === 'consumables') {
            return (
              <div
                key={belonging._id}
                className={classNames('flex justify-between items-center px-2 cursor-pointer', belonging._id === belongingToReplace?._id ? 'bg-gray-100' : 'hover:bg-gray-50')}
                onClick={() => setBelongingToReplace(belonging)}
              >
                <DisplayConsumable key={belonging._id} consumable={belonging as Consumable} sheetType={SheetType.characters} listItem condensed />
              </div>
            );
          }

          if (data.belongingType === 'usables') {
            return (
              <div
                key={belonging._id}
                className={classNames('flex justify-between items-center px-2 cursor-pointer', belonging._id === belongingToReplace?._id ? 'bg-gray-100' : 'hover:bg-gray-50')}
                onClick={() => setBelongingToReplace(belonging)}
              >
                <DisplayUsable key={belonging._id} usable={belonging as Usable} sheetType={SheetType.characters} listItem condensed />
              </div>
            );
          }

          return <p key={belonging._id}>Something went wrong loading belonging data.</p>;
        })}
      </ListContainer>
    </ModalForm>
  );
};

export default ErrorEquippingBelonging;
