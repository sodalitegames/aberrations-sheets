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

const RollStat: React.FC<Props> = ({ data }) => {
  const { addNotification } = useActions();

  const charSheet = useSelector(selectCurrentCharacter);
  const campSheet = useSelector(selectCurrentCampaign);

  const [rolls, setRolls] = useState(0);
  const [statType, setStatType] = useState<StatType | ''>('');
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
      return +modifier + -entity.conditions.injured;
    }

    return +modifier;
  };

  const getSubmitText = () => {
    if (stat) {
      return `Roll for ${capitalize(statType)} (D${stat.die}) with ${+calcModifier()} Modifier.`;
    }

    return `Roll`;
  };

  const submitHandler = async (e: FormEvent) => {
    e.preventDefault();

    if (!stat) return alert('You must select a stat!');

    const results = roll(stat.die, calcModifier());

    setResults(results);
    setRolls(rolls => rolls + 1);

    // Add a notification with a message about your results
    addNotification({ status: 'success', heading: `${capitalize(statType)} Stat Test`, message: getRolledDiceNotificationMessage(results, statType || undefined) });
  };

  return (
    <SlideOverForm
      title="Roll Dice"
      description="Fill out the information below to make a roll."
      submitDisabled={!statType}
      submitText={getSubmitText()}
      cancelText="Done"
      submitHandler={submitHandler}
    >
      {data.stat ? (
        <Detail slideOver label="Which Stat?" detail={capitalize(data.stat)} />
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
          ]}
          changeHandler={setStatType}
        />
      )}

      {stat && entity && (
        <>
          <Detail slideOver label="Die" detail={'D' + stat.die} />
          <Detail slideOver label="Injured Modifier" detail={`${-entity.conditions.injured} Modifier`} />
        </>
      )}

      <Input slideOver label="Roll Modifier (Opt.)" name="modifier" type="number" value={modifier} changeHandler={setModifier} />

      {results ? (
        <div className="mt-8">
          <div className="relative flex flex-col items-center p-4 mx-8 mt-8 bg-gray-100 rounded-md shrink-0">
            <div className="p-2 m-2 text-xs font-semibold text-white bg-gray-900 rounded-md md:absolute md:top-0 md:left-0">ROLL #{rolls}</div>
            {results.critical.success ? <p className="px-4 py-1 my-1 text-2xl font-semibold text-white uppercase bg-green-600 rounded-md">Critical Success</p> : null}
            {results.critical.failure ? <p className="px-4 py-1 my-1 text-2xl font-semibold text-white uppercase bg-red-600 rounded-md">Critical Failure</p> : null}
            <p className="px-4 py-1 my-2 text-5xl font-semibold text-white bg-gray-900 rounded-md">{results.total}</p>
            <p className="text-sm font-medium text-gray-500 uppercase">{results.roll} NATURAL</p>
            <p className="text-sm font-medium text-gray-500 uppercase">{results.modifier} MODIFIER</p>
            {results.critical.success ? <p className="text-sm font-medium text-gray-500 uppercase">{results.bonus} BONUS</p> : null}
            <p className="text-sm font-medium text-gray-500 uppercase">{results.total} TOTAL</p>
          </div>
        </div>
      ) : null}
    </SlideOverForm>
  );
};

export default RollStat;
