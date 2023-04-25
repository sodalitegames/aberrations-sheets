import { FormEvent, useState } from 'react';
import { useDispatch } from 'react-redux';

import { updateSheetResourceStart, updateSheetStart } from '../../../redux/sheet/sheet.actions';

import { ModalForm } from '../Modal';

import { useResource } from '../../../hooks/useResource';

import { correctCurrentHp } from '../../../utils/functions/updateHealth';
import { getSpecies } from '../../../utils/helpers/species';

import Detail from '../elements/Detail';

import { SheetEntity, SheetEntityType, SheetResourceType, SheetType } from '../../../models/sheet';
import { Npc } from '../../../models/sheet/resources';
import { FetchedResourceType, Species } from '../../../models/resource';

interface Props {
  data: {
    entityType: SheetEntityType;
    entity: SheetEntity;
  };
}

const ReachMilestone: React.FC<Props> = ({ data }) => {
  const dispatch = useDispatch();

  const species = useResource(FetchedResourceType.Species) as Species[];

  const entSpecies = getSpecies(data.entity.speciesId, species);

  const [milestones] = useState(+data.entity.milestones);
  const [experience] = useState(data.entity.experience);
  const [experienceToGain] = useState((data.entity.milestones + 1) * 5);
  const [currentHp] = useState(data.entity.currentHp);
  const [maxHp] = useState(data.entity.maxHp);
  const [healthToIncrease] = useState(entSpecies ? entSpecies.health.increment : 0);

  const submitHandler = async (e: FormEvent) => {
    e.preventDefault();

    switch (data.entityType) {
      case 'characters':
        dispatch(
          updateSheetStart(
            SheetType.characters,
            data.entity._id,
            {
              experience: experience + experienceToGain,
              currentHp: correctCurrentHp(currentHp + healthToIncrease, maxHp + healthToIncrease),
              maxHp: maxHp + healthToIncrease,
              milestones: milestones + 1,
            },
            { modal: true, notification: { status: 'success', heading: 'Experience Updated', message: `You have successfully updated your spent experience to ${experience}.` } }
          )
        );
        return;
      case 'players':
        dispatch(
          updateSheetStart(
            SheetType.characters,
            data.entity._id,
            {
              experience: experience + experienceToGain,
              currentHp: correctCurrentHp(currentHp + healthToIncrease, maxHp + healthToIncrease),
              maxHp: maxHp + healthToIncrease,
              milestones: milestones + 1,
            },
            {
              forPlayer: true,
              modal: true,
              notification: { status: 'success', heading: 'Experience Updated', message: `You have successfully updated your player's spent experience to ${experience}.` },
            }
          )
        );
        return;
      case 'npcs':
        dispatch(
          updateSheetResourceStart(
            SheetType.campaigns,
            (data.entity as Npc).sheetId,
            SheetResourceType.npcs,
            data.entity._id,
            {
              experience: experience + experienceToGain,
              currentHp: correctCurrentHp(currentHp + healthToIncrease, maxHp + healthToIncrease),
              maxHp: maxHp + healthToIncrease,
              milestones: milestones + 1,
            },
            { modal: true, notification: { status: 'success', heading: 'Experience Updated', message: `You have successfully updated your spent experience to ${experience}.` } }
          )
        );
        return;
      default:
        return;
    }
  };

  return (
    <ModalForm title="Reach Milestone" submitText={`Reach Milestone #${milestones + 1}`} submitHandler={submitHandler}>
      <Detail label="Milestones" detail={`${milestones} --> ${milestones + 1}`} />
      <Detail label="Experience" detail={`${experience} --> ${experience + experienceToGain}`} />
      <Detail label="Max Health" detail={`${maxHp} --> ${maxHp + healthToIncrease}`} />

      <div className="mt-2 space-y-4">
        <p className="block text-sm font-medium text-gray-900 sm:mt-px sm:pt-2">
          If you reach Milestone #{milestones + 1}, you will recieve {experienceToGain} more experience and increase your max health by {healthToIncrease}.
        </p>{' '}
      </div>
    </ModalForm>
  );
};

export default ReachMilestone;
