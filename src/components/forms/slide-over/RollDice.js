import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { roll } from '@aberrations-rpg/functions';

import { selectCurrentCharacter } from '../../../redux/character/character.selectors';
import { selectCurrentCampaign } from '../../../redux/campaign/campaign.selectors';

import { useActions } from '../../../hooks/useActions';

import { updateSheetStart, updateSheetResourceStart } from '../../../redux/sheet/sheet.actions';

import { capitalize } from '../../../utils/helpers/strings';
import { getRolledDiceNotificationMessage } from '../../../utils/helpers/messages';

import { SlideOverForm } from '../SlideOver';

import Input from '../elements/Input';
import Select from '../elements/Select';
import Detail from '../elements/Detail';
import Notice from '../../Notice';

import RollResults, { ResultsMessages } from '../../sections/RollResults';

const RollDice = ({ data: { type, playerId, npcId, creatureId } }) => {
  const dispatch = useDispatch();
  const { addNotification } = useActions();

  const charSheet = useSelector(selectCurrentCharacter);
  const campSheet = useSelector(selectCurrentCampaign);

  const [statKey, setStatKey] = useState('');
  const [stat, setStat] = useState('');
  const [dice, setDice] = useState(0);
  const [advantage, setAdvantage] = useState(0);
  const [additionalDice, setAdditionalDice] = useState(0);

  const [rollData, setRollData] = useState(null);

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

  const calcDice = () => {
    return stat.points + (stat.modifier || 0);
  };

  const calcAdvantage = () => {
    return stat.advantage + +advantage + (statKey === 'fortitude' || statKey === 'agility' ? -sheet.conditions.injured : -sheet.conditions.disturbed);
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
    setDice(3);
    setAdditionalDice(0);
    setAdvantage(0);
    setRollData(null);
  };

  const submitHandler = async e => {
    e.preventDefault();

    if (!stat) {
      const data = roll(parseInt(dice), parseInt(advantage));

      console.log(data);

      // Add a notification with a message about your results
      addNotification({ status: 'success', heading: 'Rolled Dice', message: getRolledDiceNotificationMessage(data) });

      setRollData(data);
      return;
    }

    const data = roll(calcDice() + parseInt(additionalDice), calcAdvantage());

    console.log(data);

    // Add a notification with a message about your results
    addNotification({ status: 'success', heading: `${capitalize(statKey)} Stat Test`, message: getRolledDiceNotificationMessage(data, statKey) });

    setRollData(data);

    if (data.experience !== 0) {
      switch (type) {
        case 'player':
          dispatch(
            updateSheetStart(
              'characters',
              sheet._id,
              { [statKey]: { ...sheet[statKey], experience: sheet[statKey].experience + data.experience } },
              { notification: { status: 'success', heading: 'Gained Experience', message: `${sheet.characterName} has gained ${data.experience} experience.` } }
            )
          );
          return;
        case 'character':
          dispatch(
            updateSheetStart(
              'characters',
              sheet._id,
              { [statKey]: { ...sheet[statKey], experience: sheet[statKey].experience + data.experience } },
              { notification: { status: 'success', heading: 'Gained Experience', message: `You have gained ${data.experience} experience.` } }
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
              { [statKey]: { ...sheet[statKey], experience: sheet[statKey].experience + data.experience } },
              { notification: { status: 'success', heading: 'Gained Experience', message: `You have gained ${data.experience} experience.` } }
            )
          );
          return;
        case 'creature':
          return;
        case 'campaign':
          return;
        default:
          return;
      }
    }
  };

  return (
    <SlideOverForm title="Roll Dice" description="Fill out the information below to make a roll." submitText={getSubmitText()} cancelText="Done" submitHandler={submitHandler}>
      {type !== 'campaign' && (
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
        />
      )}

      {stat ? (
        <>
          <Detail slideOver label="Dice" detail={calcDice()} />
          <Detail slideOver label="Stat Advantage" detail={stat.advantage} />
          {statKey === 'fortitude' || statKey === 'agility' ? (
            <Detail slideOver label="Injured Advantage" detail={-sheet.conditions.injured} />
          ) : statKey === 'persona' || statKey === 'aptitude' ? (
            <Detail slideOver label="Disturbed Advantage" detail={-sheet.conditions.disturbed} />
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
