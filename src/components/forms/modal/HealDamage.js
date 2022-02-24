import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { selectCurrentCharacter } from '../../../redux/character/character.selectors';

import { updateSheetStart } from '../../../redux/sheet/sheet.actions';

import { correctCurrentHp } from '../../../utils/functions/updateHealth';

import { ModalForm } from '../Modal';

import Input from '../elements/Input';
import Notice from '../../Notice';

const HealDamage = () => {
  const dispatch = useDispatch();

  const charSheet = useSelector(selectCurrentCharacter);

  const [damage, setDamage] = useState(0);
  const [actions, setActions] = useState([]);
  const [status, setStatus] = useState('success');

  useEffect(() => {
    const updatedHp = correctCurrentHp(charSheet.currentHp + +damage, charSheet.maxHp);

    const actionsArr = [`You will be at ${correctCurrentHp(charSheet.currentHp + +damage, charSheet.maxHp)} health.`];

    // If they will not be mauled and were mauled previously
    if (charSheet.currentHp < charSheet.maxHp / 5 && updatedHp >= charSheet.maxHp / 5) {
      actionsArr.push(`You will no longer be mauled.`);
    }

    // If they will not be bloodied, and were bloodied previously
    if (charSheet.currentHp < charSheet.maxHp / 2 && updatedHp >= charSheet.maxHp / 2) {
      actionsArr.push(`You will no longer be bloodied.`);
      setStatus('success');
    }

    // If they will be bloodied
    if (updatedHp < charSheet.maxHp / 2 && updatedHp > charSheet.maxHp / 5) {
      // And were bloodied previously
      if (charSheet.currentHp >= charSheet.maxHp / 5) {
        actionsArr.push(`You will still be bloodied.`);
      }

      // And were mauled previously
      if (charSheet.currentHp < charSheet.maxHp / 5) {
        actionsArr.push(`You now be bloodied.`);
      }

      setStatus('warn');
    }

    // If they will be mauled and were mauled previously
    if (updatedHp < charSheet.maxHp / 5) {
      actionsArr.push(`You will still be mauled.`);
      setStatus('error');
    }

    setActions(actionsArr);
  }, [charSheet.currentHp, charSheet.maxHp, damage]);

  const submitHandler = async e => {
    e.preventDefault();

    dispatch(
      updateSheetStart(
        'characters',
        charSheet._id,
        { currentHp: correctCurrentHp(charSheet.currentHp + +damage, charSheet.maxHp) },
        { modal: true, notification: { status: 'success', heading: 'Healed Damage', message: `You have successfully healed ${damage} damage.` } }
      )
    );
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
