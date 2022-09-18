import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { selectCurrentCharacter } from '../../../redux/character/character.selectors';
import { selectCurrentCampaign } from '../../../redux/campaign/campaign.selectors';

import { updateSheetStart, updateSheetResourceStart } from '../../../redux/sheet/sheet.actions';

import { correctCurrentHp } from '../../../utils/functions/updateHealth';

import { ModalForm } from '../Modal';

import Input from '../elements/Input';
import Notice from '../../Notice';

const HealDamage = ({ data: { type, playerId, npcId, creatureId } }) => {
  const dispatch = useDispatch();

  const charSheet = useSelector(selectCurrentCharacter);
  const campSheet = useSelector(selectCurrentCampaign);

  const [damage, setDamage] = useState(0);
  const [actions, setActions] = useState([]);
  const [status, setStatus] = useState('success');

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
      const updatedHp = correctCurrentHp(sheet.currentHp + +damage, sheet.maxHp);

      const actionsArr = [`You will be at ${correctCurrentHp(sheet.currentHp + +damage, sheet.maxHp)} health.`];

      // If they will not be mauled and were mauled previously
      if (sheet.currentHp < sheet.maxHp / 5 && updatedHp >= sheet.maxHp / 5) {
        actionsArr.push(`You will no longer be mauled.`);
      }

      // If they will not be bloodied, and were bloodied previously
      if (sheet.currentHp < sheet.maxHp / 2 && updatedHp >= sheet.maxHp / 2) {
        actionsArr.push(`You will no longer be bloodied.`);
        setStatus('success');
      }

      // If they will be bloodied
      if (updatedHp < sheet.maxHp / 2 && updatedHp > sheet.maxHp / 5) {
        // And were bloodied previously
        if (sheet.currentHp >= sheet.maxHp / 5) {
          actionsArr.push(`You will still be bloodied.`);
        }

        // And were mauled previously
        if (sheet.currentHp < sheet.maxHp / 5) {
          actionsArr.push(`You now be bloodied.`);
        }

        setStatus('warn');
      }

      // If they will be mauled and were mauled previously
      if (updatedHp < sheet.maxHp / 5) {
        actionsArr.push(`You will still be mauled.`);
        setStatus('error');
      }

      setActions(actionsArr);
    }
  }, [sheet, damage]);

  const submitHandler = async e => {
    e.preventDefault();

    switch (type) {
      case 'player':
        dispatch(
          updateSheetStart(
            'characters',
            sheet._id,
            { currentHp: correctCurrentHp(sheet.currentHp + +damage, sheet.maxHp) },
            { modal: true, notification: { status: 'success', heading: 'Healed Damage', message: `${sheet.characterName} has successfully healed ${damage} damage.` } }
          )
        );
        return;
      case 'character':
        dispatch(
          updateSheetStart(
            'characters',
            charSheet._id,
            { currentHp: correctCurrentHp(charSheet.currentHp + +damage, charSheet.maxHp) },
            { modal: true, notification: { status: 'success', heading: 'Healed Damage', message: `You have successfully healed ${damage} damage.` } }
          )
        );
        return;
      case 'npc':
        dispatch(
          updateSheetResourceStart(
            'campaigns',
            campSheet._id,
            'npcs',
            npcId,
            { currentHp: correctCurrentHp(sheet.currentHp + +damage, sheet.maxHp) },
            { modal: true, notification: { status: 'success', heading: 'Healed Damage', message: `You have successfully healed ${damage} damage.` } }
          )
        );
        return;
      case 'creature':
        dispatch(
          updateSheetResourceStart(
            'campaigns',
            campSheet._id,
            'creatures',
            creatureId,
            { currentHp: correctCurrentHp(sheet.currentHp + +damage, sheet.maxHp) },
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
