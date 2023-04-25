import { FormEvent, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';

import { updateSheetStart, updateSheetResourceStart } from '../../../redux/sheet/sheet.actions';

import { correctCurrentHp } from '../../../utils/functions/updateHealth';

import { ModalForm } from '../Modal';

import Input from '../elements/Input';
import Notice, { NoticeStatus } from '../../Notice';

import { Entity, EntityType, SheetResourceType, SheetType } from '../../../models/sheet';
import { Creature, Npc, Player } from '../../../models/sheet/resources';

interface Props {
  data: {
    entityType: EntityType;
    entity: Entity;
  };
}

const HealDamage: React.FC<Props> = ({ data }) => {
  const dispatch = useDispatch();

  const [damage, setDamage] = useState(0);
  const [actions, setActions] = useState<string[]>([]);
  const [status, setStatus] = useState<NoticeStatus>(NoticeStatus.Success);

  useEffect(() => {
    const updatedHp = correctCurrentHp(data.entity.currentHp + +damage, data.entity.maxHp);

    const actionsArr = [`You will be at ${correctCurrentHp(data.entity.currentHp + +damage, data.entity.maxHp)} health.`];

    // If they will not be mauled and were mauled previously
    if (data.entity.currentHp < data.entity.maxHp / 5 && updatedHp >= data.entity.maxHp / 5) {
      actionsArr.push(`You will no longer be mauled.`);
    }

    // If they will not be bloodied, and were bloodied previously
    if (data.entity.currentHp < data.entity.maxHp / 2 && updatedHp >= data.entity.maxHp / 2) {
      actionsArr.push(`You will no longer be bloodied.`);
      setStatus(NoticeStatus.Success);
    }

    // If they will be bloodied
    if (updatedHp < data.entity.maxHp / 2 && updatedHp > data.entity.maxHp / 5) {
      // And were bloodied previously
      if (data.entity.currentHp >= data.entity.maxHp / 5) {
        actionsArr.push(`You will still be bloodied.`);
      }

      // And were mauled previously
      if (data.entity.currentHp < data.entity.maxHp / 5) {
        actionsArr.push(`You now be bloodied.`);
      }

      setStatus(NoticeStatus.Warn);
    }

    // If they will be mauled and were mauled previously
    if (updatedHp < data.entity.maxHp / 5) {
      actionsArr.push(`You will still be mauled.`);
      setStatus(NoticeStatus.Error);
    }

    setActions(actionsArr);
  }, [data.entity, damage]);

  const submitHandler = async (e: FormEvent) => {
    e.preventDefault();

    switch (data.entityType) {
      case 'players':
        dispatch(
          updateSheetStart(
            SheetType.characters,
            data.entity._id,
            { currentHp: correctCurrentHp(data.entity.currentHp + +damage, data.entity.maxHp) },
            {
              forPlayer: true,
              modal: true,
              notification: { status: 'success', heading: 'Healed Damage', message: `${(data.entity as Player).characterName} has successfully healed ${damage} damage.` },
            }
          )
        );
        return;
      case 'characters':
        dispatch(
          updateSheetStart(
            SheetType.characters,
            data.entity._id,
            { currentHp: correctCurrentHp(data.entity.currentHp + +damage, data.entity.maxHp) },
            { modal: true, notification: { status: 'success', heading: 'Healed Damage', message: `You have successfully healed ${damage} damage.` } }
          )
        );
        return;
      case 'npcs':
        dispatch(
          updateSheetResourceStart(
            SheetType.campaigns,
            (data.entity as Npc).sheetId,
            SheetResourceType.npcs,
            data.entity._id,
            { currentHp: correctCurrentHp(data.entity.currentHp + +damage, data.entity.maxHp) },
            { modal: true, notification: { status: 'success', heading: 'Healed Damage', message: `You have successfully healed ${damage} damage.` } }
          )
        );
        return;
      case 'creatures':
        dispatch(
          updateSheetResourceStart(
            SheetType.campaigns,
            (data.entity as Creature).sheetId,
            SheetResourceType.creatures,
            data.entity._id,
            { currentHp: correctCurrentHp(data.entity.currentHp + +damage, data.entity.maxHp) },
            { modal: true, notification: { status: 'success', heading: 'Healed Damage', message: `You have successfully healed ${damage} damage.` } }
          )
        );
        return;

      default:
        return;
    }
  };

  return (
    <ModalForm title="Heal Damage" submitText={`Heal ${damage} Damage`} submitDisabled={!damage} submitHandler={submitHandler}>
      <Input label="How much damage?" name="damage" type="number" min="0" value={damage} changeHandler={setDamage} />
      {damage ? (
        <Notice noIcon status={status} heading={`If you take ${damage} damage, your character sheet will be automatically updated with the following changes:`} message={actions} classes="mt-6" />
      ) : null}
    </ModalForm>
  );
};

export default HealDamage;
