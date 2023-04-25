import { FormEvent, useState } from 'react';

import { roll } from '@aberrations-rpg/functions';

import { useActions } from '../../../hooks/useActions';

import { getRolledDiceNotificationMessage } from '../../../utils/helpers/messages';

import { SlideOverForm } from '../SlideOver';

import Input from '../elements/Input';
import Select from '../elements/Select';

import { RollResults } from '@aberrations-rpg/functions/lib/roll/roll';

const RollDice = () => {
  const { addNotification } = useActions();

  const [die, setDie] = useState(0);
  const [advantage, setAdvantage] = useState(0);
  const [modifier, setModifier] = useState(0);

  const [results, setResults] = useState<RollResults | null>(null);

  const getSubmitText = () => {
    if (!die) return `Roll`;
    return `Roll D${die} with ${advantage} Advantage.`;
  };

  const submitHandler = async (e: FormEvent) => {
    e.preventDefault();

    const results = roll(+die, +advantage, +modifier);

    console.log(results);

    setResults(results);

    // Add a notification with a message about your results
    addNotification({ status: 'success', heading: 'Rolled Dice', message: getRolledDiceNotificationMessage(results) });
  };

  return (
    <SlideOverForm title="Roll Dice" description="Fill out the information below to make a roll." submitText={getSubmitText()} cancelText="Done" submitHandler={submitHandler}>
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
        changeHandler={setDie}
      />

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
