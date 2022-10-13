import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

import { roll } from '@aberrations-rpg/functions';

import { selectCurrentCharacter } from '../../../redux/character/character.selectors';
import { selectCurrentCampaign } from '../../../redux/campaign/campaign.selectors';

// import { useActions } from '../../../hooks/useActions';

import { capitalize } from '../../../utils/helpers/strings';
// import { getRolledDiceNotificationMessage } from '../../../utils/helpers/messages';

import { SlideOverForm } from '../SlideOver';

import Input from '../elements/Input';
import Select from '../elements/Select';
import Detail from '../elements/Detail';

const RollDice = ({ data: { rollingStat, type, playerId, npcId, creatureId } }) => {
  // const dispatch = useDispatch();
  // const { addNotification } = useActions();

  const charSheet = useSelector(selectCurrentCharacter);
  const campSheet = useSelector(selectCurrentCampaign);

  const [statKey, setStatKey] = useState('');
  const [stat, setStat] = useState('');
  const [die, setDie] = useState(0);
  const [advantage, setAdvantage] = useState(0);

  const [results, setResults] = useState(null);

  const [sheet, setSheet] = useState(null);

  useEffect(() => {
    switch (type) {
      case 'player':
        const player = campSheet.players.find(player => player._id === playerId);
        setSheet(player);
        return;
      case 'character':
        setSheet(charSheet);
        return;
      case 'npc':
        const npc = campSheet.npcs.find(npc => npc._id === npcId);
        setSheet(npc);
        return;
      case 'creature':
        const creature = campSheet.creatures.find(creature => creature._id === creatureId);
        setSheet(creature);
        return;
      case 'campaign':
        setSheet(campSheet);
        return;
      default:
        return;
    }
  }, [charSheet, campSheet, type, playerId, npcId, creatureId]);

  useEffect(() => {
    if (rollingStat && sheet) {
      setStatKey(rollingStat);
      setStat(sheet[rollingStat]);
    }
  }, [rollingStat, sheet]);

  const calcAdvantage = () => {
    if (sheet?.conditions) {
      return +advantage + (statKey === 'strength' || statKey === 'agility' ? -sheet.conditions.injured : -sheet.conditions.disturbed);
    }

    return +advantage;
  };

  const getSubmitText = () => {
    if (stat) {
      return `Roll for ${capitalize(statKey)} (D${stat.die}) with ${calcAdvantage()} Advantage.`;
    }

    if (!die) {
      return `Roll`;
    }

    return `Roll D${die} with ${advantage} Advantage.`;
  };

  const selectStat = e => {
    if (!e.target.value) {
      setStat('');
      setStatKey('');
      return;
    }

    if (e.target.value === 'none') {
      setStat('');
      setStatKey(e.target.value);
      return;
    }

    // If not empty or none, set the stat key and stat
    setStatKey(e.target.value);
    setStat(sheet[e.target.value]);

    // Clear all other state
    setDie(2);
    setAdvantage(0);
  };

  const submitHandler = async e => {
    e.preventDefault();

    if (!stat) {
      const results = roll(die, calcAdvantage());

      setResults(results);

      // Add a notification with a message about your results
      // addNotification({ status: 'success', heading: 'Rolled Dice', message: getRolledDiceNotificationMessage(data) });

      return;
    }

    const results = roll(stat.die, calcAdvantage());

    setResults(results);

    // Add a notification with a message about your results
    // addNotification({ status: 'success', heading: `${capitalize(statKey)} Stat Test`, message: getRolledDiceNotificationMessage(data, statKey) });
  };

  const selectDie = e => {
    if (!e.target.value) return setDie('');
    setDie(e.target.value);
  };

  return (
    <SlideOverForm title="Roll Dice" description="Fill out the information below to make a roll." submitText={getSubmitText()} cancelText="Done" submitHandler={submitHandler}>
      {type !== 'campaign' &&
        (rollingStat ? (
          <Detail slideOver label="Which Stat?" detail={capitalize(rollingStat)} />
        ) : (
          <Select
            slideOver
            label="Which Stat?"
            name="stat"
            value={statKey}
            options={[
              { name: 'Strength', id: 'strength' },
              { name: 'Agility', id: 'agility' },
              { name: 'Persona', id: 'persona' },
              { name: 'Aptitude', id: 'aptitude' },
              { name: 'None', id: 'none' },
            ]}
            changeHandler={selectStat}
          />
        ))}

      {stat && sheet?.conditions ? (
        <>
          <Detail slideOver label="Die" detail={'D' + stat.die} />
          {statKey === 'strength' || statKey === 'agility' ? (
            <Detail slideOver label="Injured Disadvantage" detail={-sheet.conditions.injured} />
          ) : statKey === 'persona' || statKey === 'aptitude' ? (
            <Detail slideOver label="Disturbed Disadvantage" detail={-sheet.conditions.disturbed} />
          ) : null}
          <Input slideOver label="Roll Advantage (Opt.)" name="advantage" type="number" value={advantage} changeHandler={setAdvantage} />
        </>
      ) : (
        <>
          <Select
            slideOver
            label="Die"
            name="die"
            value={die.toString()}
            options={[
              { name: 'D2', id: '2' },
              { name: 'D4', id: '4' },
              { name: 'D6', id: '6' },
              { name: 'D8', id: '8' },
              { name: 'D10', id: '10' },
              { name: 'D12', id: '12' },
              { name: 'D14', id: '14' },
              { name: 'D16', id: '16' },
              { name: 'D18', id: '18' },
              { name: 'D20', id: '20' },
            ]}
            changeHandler={selectDie}
          />
          <Input slideOver label="Advantage (Opt.)" name="advantage" type="number" value={advantage} changeHandler={setAdvantage} />
        </>
      )}

      {results ? (
        <div className="mt-8">
          <div className="flex flex-col items-center p-4 mx-8 mt-8 bg-gray-100 rounded-md shrink-0">
            {results.critical.success ? <p className="px-4 py-1 my-1 text-2xl font-semibold text-white uppercase bg-green-600 rounded-md">Critical Success</p> : null}
            {results.critical.failure ? <p className="px-4 py-1 my-1 text-2xl font-semibold text-white uppercase bg-red-600 rounded-md">Critical Failure</p> : null}
            <p className="px-4 py-1 my-2 text-5xl font-semibold text-white bg-gray-900 rounded-md">{results.total}</p>
            <p className="text-sm font-medium text-gray-500 uppercase">{results.roll} NATURAL</p>
            {results.critical.success ? <p className="text-sm font-medium text-gray-500 uppercase">{results.bonus} BONUS</p> : null}
            <p className="text-sm font-medium text-gray-500 uppercase">{results.advantage.calculated} ADVANTAGE (ADV * 2)</p>
            <p className="text-sm font-medium text-gray-500 uppercase">{results.total} TOTAL</p>
          </div>
        </div>
      ) : null}
    </SlideOverForm>
  );
};

export default RollDice;
