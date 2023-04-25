import { FormEvent, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';

import { updateSheetStart, updateSheetResourceStart } from '../../../redux/sheet/sheet.actions';

import { correctCurrentHp, takeDamage } from '../../../utils/functions/updateHealth';

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

const TakeDamage: React.FC<Props> = ({ data }) => {
  const dispatch = useDispatch();

  const [damage, setDamage] = useState(0);
  const [actions, setActions] = useState<string[]>([]);

  useEffect(() => {
    const results = takeDamage(data.entity.currentHp, data.entity.currentHp - +damage, data.entity.maxHp);

    const actionsArr = [`You will have ${results.currentHp} health left.`];

    if (results.justBloodied) {
      actionsArr.push(`You will become Bloodied and gain 1 injured.`);
    }

    if (results.justMauled) {
      actionsArr.push(`You will become Mauled and gain 1 injured.`);
    }

    if (results.nearlyDead) {
      actionsArr.push(`You will become Nearly Dead and gain 1 Mortality.`);
    }

    if (results.totallyDead) {
      actionsArr.push(`You will become Totally Dead, because your current health is less than the negative value of your max health.`);
    }

    if (results.alreadyDead) {
      actionsArr.push(`You will not gain any injured, because you are already dead.`);
    }

    setActions(actionsArr);
  }, [data.entity, damage]);

  const submitHandler = async (e: FormEvent) => {
    e.preventDefault();

    const { currentHp, injured, nearlyDead } = takeDamage(data.entity.currentHp, data.entity.currentHp - +damage, data.entity.maxHp);

    let body: any = {
      currentHp: correctCurrentHp(currentHp, data.entity.maxHp),
    };

    if (injured) {
      body.conditions = {
        ...data.entity.conditions,
        injured: data.entity.conditions.injured + injured,
      };
    }

    if (nearlyDead) {
      body.mortality = data.entity.mortality + 1;
    }

    switch (data.entityType) {
      case 'players':
        dispatch(
          updateSheetStart(SheetType.characters, data.entity._id, body, {
            forPlayer: true,
            modal: true,
            notification: { status: 'success', heading: 'Damage Taken', message: `${(data.entity as Player).characterName} has successfully taken ${damage} damage.` },
          })
        );
        return;
      case 'characters':
        dispatch(
          updateSheetStart(SheetType.characters, data.entity._id, body, {
            modal: true,
            notification: { status: 'success', heading: 'Damage Taken', message: `You have successfully taken ${damage} damage.` },
          })
        );
        return;
      case 'npcs':
        dispatch(
          updateSheetResourceStart(SheetType.campaigns, (data.entity as Npc).sheetId, SheetResourceType.npcs, data.entity._id, body, {
            modal: true,
            notification: { status: 'success', heading: 'Damage Taken', message: `You have successfully taken ${damage} damage.` },
          })
        );
        return;
      case 'creatures':
        dispatch(
          updateSheetResourceStart(SheetType.campaigns, (data.entity as Creature).sheetId, SheetResourceType.creatures, data.entity._id, body, {
            modal: true,
            notification: { status: 'success', heading: 'Damage Taken', message: `You have successfully taken ${damage} damage.` },
          })
        );
        return;
      default:
        return;
    }
  };

  return (
    <ModalForm title="Take Damage" submitText={`Take ${damage} Damage`} submitDisabled={!damage} submitHandler={submitHandler}>
      <Input label="How much damage?" name="damage" type="number" min="0" value={damage} changeHandler={setDamage} />
      {damage > 0 && actions.length ? (
        <Notice
          noIcon
          status={NoticeStatus.Warn}
          heading={`If you take ${damage} damage, your character sheet will be automatically updated with the following changes:`}
          message={actions}
          classes="mt-6"
        />
      ) : null}
    </ModalForm>
  );
};

export default TakeDamage;
