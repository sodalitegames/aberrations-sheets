import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { selectCurrentCharacter } from '../../../../redux/character/character.selectors';

import { updateSheetStart } from '../../../../redux/sheet/sheet.actions';

import { capitalize } from '../../../../utils/strings';

import { ModalForm } from '../../../../layouts/components/app/Modal';

import Select from '../../../shared/form/Select';
import Notice from '../../../shared/Notice';
import { healDamage } from '../../../../utils/updateHealth';

const TakeARest = () => {
  const dispatch = useDispatch();

  const charSheet = useSelector(selectCurrentCharacter);

  const [rest, setRest] = useState('');
  const [actions, setActions] = useState([]);

  const selectRest = e => {
    if (!e.target.value) return setRest('');
    setRest(e.target.value);

    if (e.target.value === 'slumber') {
      let actionsArr = [
        `You'll Recover ${charSheet.fortitude.points + charSheet.fortitude.modifier} health points`,
        `All points in Injured and Disturbed will be removed`,
        `All temporary stat advantages will be reset to 0`,
      ];

      if (charSheet.fortitude.experience >= charSheet.fortitude.points) {
        actionsArr.push(`Foritude stat leveled up (and experience will be reset)`);
      }
      if (charSheet.agility.experience >= charSheet.agility.points) {
        actionsArr.push(`Agility stat leveled up (and experience will be reset)`);
      }
      if (charSheet.persona.experience >= charSheet.persona.points) {
        actionsArr.push(`Persona stat leveled up (and experience will be reset)`);
      }
      if (charSheet.aptitude.experience >= charSheet.aptitude.points) {
        actionsArr.push(`Aptitude stat leveled up (and experience will be reset)`);
      }

      setActions(actionsArr);
    }

    if (e.target.value === 'nap') {
      setActions([
        `You will recover ${Math.floor((charSheet.fortitude.points + charSheet.fortitude.modifier) / 2)} health`,
        `1 point in Injured and 1 point in Disturbed will be removed`,
        `All temporary stat advantages will be reset to 0`,
      ]);
    }
  };

  const submitHandler = async e => {
    e.preventDefault();

    let fortitude = JSON.parse(JSON.stringify(charSheet.fortitude));
    let agility = JSON.parse(JSON.stringify(charSheet.agility));
    let persona = JSON.parse(JSON.stringify(charSheet.persona));
    let aptitude = JSON.parse(JSON.stringify(charSheet.aptitude));

    if (rest === 'slumber') {
      let upgradedFortitude = false;

      if (fortitude.experience >= fortitude.points) {
        upgradedFortitude = true;
        fortitude = {
          ...fortitude,
          points: fortitude.points + 1,
          experience: 0,
        };
      }

      if (agility.experience >= agility.points) {
        agility = {
          ...agility,
          points: agility.points + 1,
          experience: 0,
        };
      }

      if (persona.experience >= persona.points) {
        persona = {
          ...persona,
          points: persona.points + 1,
          experience: 0,
        };
      }

      if (aptitude.experience >= aptitude.points) {
        aptitude = {
          ...aptitude,
          points: aptitude.points + 1,
          experience: 0,
        };
      }

      dispatch(
        updateSheetStart(
          'characters',
          charSheet._id,
          {
            currentHp: healDamage(charSheet.currentHp + (charSheet.fortitude.points + charSheet.fortitude.modifier) + (upgradedFortitude ? 5 : 0)),
            conditions: { ...charSheet.conditions, injured: 0, disturbed: 0 },
            fortitude: { ...fortitude, advantage: 0 },
            agility: { ...agility, advantage: 0 },
            persona: { ...persona, advantage: 0 },
            aptitude: { ...aptitude, advantage: 0 },
          },
          { modal: true }
        )
      );

      return;
    }

    if (rest === 'nap') {
      dispatch(
        updateSheetStart(
          'characters',
          charSheet._id,
          {
            currentHp: charSheet.currentHp + Math.floor((charSheet.fortitude.points + charSheet.fortitude.modifier) / 2),
            conditions: { ...charSheet.conditions, injured: charSheet.conditions.injured - 1, disturbed: charSheet.conditions.disturbed - 1 },
            fortitude: { ...charSheet.fortitude, advantage: 0 },
            agility: { ...charSheet.agility, advantage: 0 },
            persona: { ...charSheet.agility, advantage: 0 },
            aptitude: { ...charSheet.aptitude, advantage: 0 },
          },
          { modal: true }
        )
      );

      return;
    }
  };

  return (
    <ModalForm title="Take a Rest" submitText={`Take my ${rest ? capitalize(rest) : 'rest'}`} submitHandler={submitHandler}>
      <Select
        label="How long is your rest?"
        name="rest"
        value={rest}
        options={[
          { name: 'Slumber (8+ hours)', id: 'slumber' },
          { name: 'Nap (1 - 7 hours)', id: 'nap' },
        ]}
        changeHandler={selectRest}
        required
      />

      {rest && actions.length ? (
        <Notice
          noIcon
          status="info"
          heading={`If you take this ${capitalize(rest)}, your character sheet will be automatically updated with the following changes:`}
          message={actions}
          classes="mt-6"
        />
      ) : null}
    </ModalForm>
  );
};

export default TakeARest;
