import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { selectCurrentCharacter } from '../../../../redux/character/character.selectors';

import { updateSheetStart } from '../../../../redux/sheet/sheet.actions';

import { takeDamage } from '../../../../utils/updateHealth';

import { ModalForm } from '../../../../layouts/components/app/Modal';

import Input from '../../../shared/form/Input';
import Notice from '../../../shared/Notice';

const TakeDamage = () => {
  const dispatch = useDispatch();

  const charSheet = useSelector(selectCurrentCharacter);

  const [damage, setDamage] = useState(0);
  const [actions, setActions] = useState([]);

  useEffect(() => {
    const results = takeDamage(charSheet.currentHp, charSheet.currentHp - +damage, charSheet.maxHp);

    const actionsArr = [`You will have ${results.currentHp} health left.`];

    if (results.justBloodied) {
      actionsArr.push(`You will become Bloodied and gain 1 injured.`);
    }

    if (results.justMauled) {
      actionsArr.push(`You will become Mauled and gain 1 injured.`);
    }

    if (!results.justBloodied && !results.justMauled && results.injured) {
      actionsArr.push(`You will gain ${results.injured} injured because you are Mauled.`);
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
  }, [charSheet.currentHp, charSheet.maxHp, damage]);

  const submitHandler = async e => {
    e.preventDefault();

    const { currentHp, injured, nearlyDead } = takeDamage(charSheet.currentHp, charSheet.currentHp - +damage, charSheet.maxHp);

    let body = {
      currentHp,
    };

    console.log(injured);

    if (injured) {
      body.conditions = {
        ...charSheet.conditions,
        injured: charSheet.conditions.injured + injured,
      };
    }

    if (nearlyDead) {
      body.mortality = charSheet.mortality + 1;
    }

    dispatch(updateSheetStart('characters', charSheet._id, body, { modal: true }));
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
