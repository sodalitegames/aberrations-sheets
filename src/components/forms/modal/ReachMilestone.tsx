import { FormEvent, useState } from 'react';
import { useDispatch } from 'react-redux';

import { updateSheetResourceStart, updateSheetStart } from '../../../redux/sheet/sheet.actions';

import { ModalForm } from '../Modal';

import { useResource } from '../../../hooks/useResource';

import { correctCurrentHp } from '../../../utils/functions/updateHealth';
import { getSpecies } from '../../../utils/helpers/species';

import Detail from '../elements/Detail';

import { SheetEntity, SheetEntityType, SheetResourceType, SheetType, StatType } from '../../../models/sheet';
import { Npc } from '../../../models/sheet/resources';
import { FetchedResourceType, Species } from '../../../models/resource';
import { calculateLifeHackPoints } from '../../../utils/functions/calculations';
import Select from '../elements/Select';

interface Props {
  data: {
    entityType: SheetEntityType;
    entity: SheetEntity;
  };
}

const ReachMilestone: React.FC<Props> = ({ data }) => {
  const dispatch = useDispatch();

  const species = useResource(FetchedResourceType.Species) as Species[];

  const [stat, setStat] = useState('');

  const entSpecies = getSpecies(data.entity.speciesId, species);

  const level = data.entity.level;
  const currentHp = data.entity.currentHp;
  const maxHp = data.entity.maxHp;
  const healthToIncrease = entSpecies ? entSpecies.health.increment : 0;
  const lifeHackPoints = calculateLifeHackPoints(level, []);

  const statList = [
    { name: `Strength (D${data.entity.strength.die}${data.entity.strength.die !== 20 ? ` --> D${data.entity.strength.die + 2}` : ''})`, id: 'strength', disabled: data.entity.strength.die === 20 },
    { name: `Agility (D${data.entity.agility.die}${data.entity.agility.die !== 20 ? ` --> D${data.entity.agility.die + 2}` : ''})`, id: 'agility', disabled: data.entity.agility.die === 20 },
    { name: `Persona (D${data.entity.persona.die}${data.entity.persona.die !== 20 ? ` --> D${data.entity.persona.die + 2}` : ''})`, id: 'persona', disabled: data.entity.persona.die === 20 },
    { name: `Aptitude (D${data.entity.aptitude.die}${data.entity.aptitude.die !== 20 ? ` --> D${data.entity.aptitude.die + 2}` : ''})`, id: 'aptitude', disabled: data.entity.aptitude.die === 20 },
  ];

  const submitHandler = async (e: FormEvent) => {
    e.preventDefault();

    console.log(stat);

    if (!stat) {
      alert(`You must select a stat to upgrade.`);
      return;
    }

    if (data.entity[stat as StatType].die === 20) {
      alert(`You cannot upgrade your ${stat} stat any further.`);
      return;
    }

    let body = {
      level: level + 1,
      currentHp: correctCurrentHp(currentHp + healthToIncrease, maxHp + healthToIncrease),
      maxHp: maxHp + healthToIncrease,
      [stat]: { die: +data.entity[stat as StatType].die + 2 },
    };

    switch (data.entityType) {
      case 'characters':
        dispatch(
          updateSheetStart(SheetType.characters, data.entity._id, body, {
            modal: true,
            notification: { status: 'success', heading: 'Milestone Reached', message: `You have successfully reached a milestone.` },
          })
        );
        return;
      case 'players':
        dispatch(
          updateSheetStart(SheetType.characters, data.entity._id, body, {
            forPlayer: true,
            modal: true,
            notification: { status: 'success', heading: 'Milestone Reached', message: `Your player has successfully reached milestone.` },
          })
        );
        return;
      case 'npcs':
        dispatch(
          updateSheetResourceStart(SheetType.campaigns, (data.entity as Npc).sheetId, SheetResourceType.npcs, data.entity._id, body, {
            modal: true,
            notification: { status: 'success', heading: 'Milestone Reached', message: `Your npc has successfully reached milestone.` },
          })
        );
        return;
      default:
        return;
    }
  };

  return (
    <ModalForm title="Reach Milestone" submitText="Reach Milestone" submitDisabled={!stat} submitHandler={submitHandler}>
      <Detail label="Level" detail={`${level} --> ${level + 1}`} />
      <Detail label="Max Health" detail={`${maxHp} --> ${maxHp + healthToIncrease}`} />
      <Detail label="Life Hack Points" detail={`${lifeHackPoints} --> ${lifeHackPoints + level}`} />

      <Select label="Upgrade Stat Die" name="stat" value={stat} options={statList} changeHandler={setStat} required />

      <div className="block mt-6 text-sm font-medium text-gray-900">
        <p className="">If you reach this milestone, you will:</p>
        <ul className="ml-8 list-disc">
          <li>Increase your max health by {healthToIncrease}</li>
          <li>Be awarded {level} more life hack points</li>
          <li>Upgrade your {stat} stat die</li>
          <li>Raise your level to {level + 1}</li>
        </ul>
      </div>
    </ModalForm>
  );
};

export default ReachMilestone;
