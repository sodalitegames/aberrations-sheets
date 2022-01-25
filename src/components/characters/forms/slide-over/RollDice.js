import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { selectCurrentCharacter } from '../../../../redux/character/character.selectors';

import { updateSheetStart } from '../../../../redux/sheet/sheet.actions';

import { rollDice } from '../../../../utils/roll';
import { capitalize } from '../../../../utils/strings';

import { SlideOverForm } from '../../../../layouts/components/app/SlideOver';

import Input from '../../../shared/form/Input';
import Select from '../../../shared/form/Select';
import Detail from '../../../shared/form/Detail';
import Notice from '../../../shared/Notice';
import RollResults, { ResultsMessages } from '../../RollResults';

const RollDice = () => {
  const dispatch = useDispatch();

  const charSheet = useSelector(selectCurrentCharacter);

  const [statKey, setStatKey] = useState('');
  const [stat, setStat] = useState('');
  const [dice, setDice] = useState(0);
  const [advantage, setAdvantage] = useState(0);
  const [additionalDice, setAdditionalDice] = useState(0);

  const [rollData, setRollData] = useState(null);

  const calcDice = () => {
    return stat.points + stat.modifier;
  };

  const calcAdvantage = () => {
    return stat.advantage + +advantage + (statKey === 'fortitude' || statKey === 'agility' ? -charSheet.conditions.injured : -charSheet.conditions.disturbed);
  };

  const getSubmitText = () => {
    if (stat) {
      return `Roll for ${capitalize(statKey)} (${calcDice() + parseInt(additionalDice)} ${calcDice() + parseInt(additionalDice) === 1 ? 'die' : 'dice'}) with ${calcAdvantage()} Advantage.`;
    }

    if (!dice) {
      return `Roll Dice`;
    }

    return `Roll ${dice} ${dice === '1' ? 'die' : 'dice'} with ${advantage} Advantage.`;
  };

  const selectStat = e => {
    if (!e.target.value) {
      setStat('');
      setStatKey('');
    }
    setStatKey(e.target.value);
    if (e.target.value === 'none') return setStat('');
    setStat(charSheet[e.target.value]);
  };

  const submitHandler = async e => {
    e.preventDefault();

    if (!stat) {
      const data = rollDice(parseInt(dice), parseInt(advantage));
      setRollData(data);
      return;
    }

    const data = rollDice(calcDice() + parseInt(additionalDice), calcAdvantage(), statKey);
    setRollData(data);

    // If any injured, disturbed, or experience was gained, save that to the database
    if (data.injured) {
      dispatch(updateSheetStart('characters', charSheet._id, { conditions: { ...charSheet.conditions, injured: charSheet.conditions.injured + data.injured } }));
    }
    if (data.disturbed) {
      dispatch(updateSheetStart('characters', charSheet._id, { conditions: { ...charSheet.conditions, disturbed: charSheet.conditions.disturbed + data.disturbed } }));
    }
    if (data.experience) {
      dispatch(updateSheetStart('characters', charSheet._id, { [data.stat]: { ...charSheet[data.stat], experience: charSheet[data.stat].experience + data.experience } }));
    }
  };

  return (
    <SlideOverForm title="Roll Dice" description="Fill out the information below to make a roll." submitText={getSubmitText()} cancelText="Done" submitHandler={submitHandler}>
      <Select
        slideOver
        label="Which Stat?"
        name="stat"
        value={statKey}
        options={[
          { name: 'Fortitude', id: 'fortitude' },
          { name: 'Agility', id: 'agility' },
          { name: 'Persona', id: 'persona' },
          { name: 'Aptitude', id: 'aptitude' },
          { name: 'None', id: 'none' },
        ]}
        changeHandler={selectStat}
        required
      />

      {stat ? (
        <>
          <Detail slideOver label="Dice" detail={calcDice()} />
          <Detail slideOver label="Stat Advantage" detail={stat.advantage} />
          {statKey === 'fortitude' || statKey === 'agility' ? (
            <Detail slideOver label="Injured Advantage" detail={-charSheet.conditions.injured} />
          ) : statKey === 'persona' || statKey === 'aptitude' ? (
            <Detail slideOver label="Disturbed Advantage" detail={-charSheet.conditions.disturbed} />
          ) : null}
          <Input slideOver label="Roll Advantage (Opt.)" name="advantage" type="number" value={advantage} changeHandler={setAdvantage} />
          <Input slideOver label="Additional Dice (Opt.)" name="additionalDice" type="number" value={additionalDice} changeHandler={setAdditionalDice} />
        </>
      ) : (
        <>
          <Input slideOver label="Dice" name="dice" type="number" value={dice} changeHandler={setDice} />
          <Input slideOver label="Advantage (Opt.)" name="advantage" type="number" value={advantage} changeHandler={setAdvantage} />
        </>
      )}
      {stat ? <Notice status="info" message="If you make a roll, any experience or conditions you may gain will be automatically added to your character sheet." /> : null}

      {rollData ? <RollResults results={rollData} /> : null}
      {rollData ? <ResultsMessages results={rollData} /> : null}
    </SlideOverForm>
  );
};

export default RollDice;
