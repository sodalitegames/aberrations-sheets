import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { selectCurrentCharacter } from '../../../redux/character/character.selectors';
import { selectCurrentCampaign } from '../../../redux/campaign/campaign.selectors';

import { updateSheetStart, updateSheetResourceStart } from '../../../redux/sheet/sheet.actions';

import { correctCurrentHp, takeDamage } from '../../../utils/functions/updateHealth';

import { ModalForm } from '../Modal';

import Input from '../elements/Input';
import Notice from '../../Notice';

const TakeDamage = ({ data: { type, playerId, npcId, creatureId } }) => {
  const dispatch = useDispatch();

  const charSheet = useSelector(selectCurrentCharacter);
  const campSheet = useSelector(selectCurrentCampaign);

  const [damage, setDamage] = useState(0);
  const [actions, setActions] = useState([]);

  const [sheet, setSheet] = useState(null);

  useEffect(() => {
    switch (type) {
      case 'character':
        setSheet(charSheet);
        return;
      case 'player':
        const player = campSheet.players.find(player => player._id === playerId);
        setSheet(player);
        return;
      case 'npc':
        const npc = campSheet.npcs.find(npc => npc._id === npcId);
        setSheet(npc);
        return;
      case 'creature':
        const creature = campSheet.creatures.find(creature => creature._id === creatureId);
        setSheet(creature);
        return;
      default:
        return;
    }
  }, [charSheet, campSheet, type, playerId, npcId, creatureId]);

  useEffect(() => {
    if (sheet) {
      const results = takeDamage(sheet.currentHp, sheet.currentHp - +damage, sheet.maxHp);

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
    }
  }, [sheet, damage]);

  const submitHandler = async e => {
    e.preventDefault();

    const { currentHp, injured, nearlyDead } = takeDamage(sheet.currentHp, sheet.currentHp - +damage, sheet.maxHp);

    let body = {
      currentHp: correctCurrentHp(currentHp, sheet.maxHp),
    };

    if (injured) {
      body.conditions = {
        ...sheet.conditions,
        injured: sheet.conditions.injured + injured,
      };
    }

    if (nearlyDead) {
      body.mortality = sheet.mortality + 1;
    }

    switch (type) {
      case 'player':
        dispatch(
          updateSheetStart('characters', playerId, body, {
            forPlayer: true,
            modal: true,
            notification: { status: 'success', heading: 'Damage Taken', message: `${sheet.characterName} has successfully taken ${damage} damage.` },
          })
        );
        return;
      case 'character':
        dispatch(
          updateSheetStart('characters', charSheet._id, body, { modal: true, notification: { status: 'success', heading: 'Damage Taken', message: `You have successfully taken ${damage} damage.` } })
        );
        return;
      case 'npc':
        dispatch(
          updateSheetResourceStart('campaigns', campSheet._id, 'npcs', npcId, body, {
            modal: true,
            notification: { status: 'success', heading: 'Damage Taken', message: `You have successfully taken ${damage} damage.` },
          })
        );
        return;
      case 'creature':
        dispatch(
          updateSheetResourceStart('campaigns', campSheet._id, 'creatures', creatureId, body, {
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
        <Notice noIcon status="warn" heading={`If you take ${damage} damage, your character sheet will be automatically updated with the following changes:`} message={actions} classes="mt-6" />
      ) : null}
    </ModalForm>
  );
};

export default TakeDamage;
