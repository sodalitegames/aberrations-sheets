import { FormEvent, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

import { roll } from '@aberrations-rpg/functions';
import { RollResults } from '@aberrations-rpg/functions/lib/roll/roll';

import { selectCurrentCharacter } from '../../../redux/character/character.selectors';
import { selectCurrentCampaign } from '../../../redux/campaign/campaign.selectors';

import { useActions } from '../../../hooks/useActions';

import { capitalize } from '../../../utils/helpers/strings';
import { getRolledDiceNotificationMessage } from '../../../utils/helpers/messages';

import { SlideOverForm } from '../SlideOver';

import Input from '../elements/Input';
import Select from '../elements/Select';
import Detail from '../elements/Detail';

import { Entity, EntityType, Stat, StatType } from '../../../models/sheet';

interface Props {
  data: {
    stat?: StatType;
    entityType: EntityType;
    entityId: string;
  };
}

const RollDice: React.FC<Props> = ({ data }) => {
  const { addNotification } = useActions();

  const charSheet = useSelector(selectCurrentCharacter);
  const campSheet = useSelector(selectCurrentCampaign);

  const [statType, setStatType] = useState<StatType | ''>('');
  const [advantage, setAdvantage] = useState(0);
  const [modifier, setModifier] = useState(0);

  const [results, setResults] = useState<RollResults | null>(null);

  const [entity, setEntity] = useState<Entity | null>(null);

  const stat: Stat | null = entity && statType ? entity[statType] : null;

  useEffect(() => {
    switch (data.entityType) {
      case 'players':
        const player = campSheet!.players.find(player => player._id === data.entityId);
        if (player) setEntity(player);
        return;
      case 'characters':
        if (charSheet) setEntity(charSheet);
        return;
      case 'npcs':
        const npc = campSheet!.npcs.find(npc => npc._id === data.entityId);
        if (npc) setEntity(npc);
        return;
      case 'creatures':
        const creature = campSheet!.creatures.find(creature => creature._id === data.entityId);
        if (creature) setEntity(creature);
        return;
      default:
        return;
    }
  }, [charSheet, campSheet, data.entityType, data.entityId]);

  useEffect(() => {
    if (data.stat) {
      setStatType(data.stat);
    }
  }, [data.stat]);

  const calcModifier = () => {
    if (entity) {
      return +modifier + -entity.conditions.injured + -entity.conditions.disturbed;
    }

    return +modifier;
  };

  const getSubmitText = () => {
    if (stat) {
      return `Roll for ${capitalize(statType)} (D${stat.die}) with ${+advantage} Advantage.`;
    }

    return `Roll`;
  };

  const submitHandler = async (e: FormEvent) => {
    e.preventDefault();

    if (!stat) return alert('You must select a stat!');

    const results = roll(stat.die, +advantage, calcModifier());

    setResults(results);

    // Add a notification with a message about your results
    addNotification({ status: 'success', heading: `${capitalize(statType)} Stat Test`, message: getRolledDiceNotificationMessage(results, statType || undefined) });
  };

  return (
    <SlideOverForm title="Roll Dice" description="Fill out the information below to make a roll." submitText={getSubmitText()} cancelText="Done" submitHandler={submitHandler}>
      {data.stat ? (
        <Detail slideOver label="Which Stat?" detail={capitalize(statType)} />
      ) : (
        <Select
          slideOver
          label="Which Stat?"
          name="stat"
          value={statType}
          options={[
            { name: 'Strength', id: 'strength' },
            { name: 'Agility', id: 'agility' },
            { name: 'Persona', id: 'persona' },
            { name: 'Aptitude', id: 'aptitude' },
            { name: 'None', id: '' },
          ]}
          changeHandler={setStatType}
        />
      )}

      {stat && entity && (
        <>
          <Detail slideOver label="Die" detail={'D' + stat.die} />
          <Detail slideOver label="Injured/Disturbed" detail={`${-entity.conditions.injured + -entity.conditions.disturbed} Modifier`} />
        </>
      )}

      <Input slideOver label="Roll Advantage (Opt.)" name="advantage" type="number" value={advantage} changeHandler={setAdvantage} />
      <Input slideOver label="Roll Modifier (Opt.)" name="modifier" type="number" value={modifier} changeHandler={setModifier} />

      {results ? (
        <div className="mt-8">
          <div className="flex flex-col items-center p-4 mx-8 mt-8 bg-gray-100 rounded-md shrink-0">
            {results.critical.success ? <p className="px-4 py-1 my-1 text-2xl font-semibold text-white uppercase bg-green-600 rounded-md">Critical Success</p> : null}
            {results.critical.failure ? <p className="px-4 py-1 my-1 text-2xl font-semibold text-white uppercase bg-red-600 rounded-md">Critical Failure</p> : null}
            <p className="px-4 py-1 my-2 text-5xl font-semibold text-white bg-gray-900 rounded-md">{results.total}</p>
            <p className="text-sm font-medium text-gray-500 uppercase">{results.roll} NATURAL</p>
            <p className="text-sm font-medium text-gray-500 uppercase">{results.modifier} MODIFIER</p>
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
