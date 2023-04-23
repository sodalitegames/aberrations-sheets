import { useState } from 'react';
import { useDispatch } from 'react-redux';

import { updateSheetResourceStart, updateSheetStart } from '../../../redux/sheet/sheet.actions';

import { ModalForm } from '../Modal';

import { correctCurrentHp } from '../../../utils/functions/updateHealth';

import Detail from '../elements/Detail';

const ReachMilestone = ({ data }) => {
  const dispatch = useDispatch();

  const [milestones] = useState(+data.entity.milestones);
  const [experience] = useState(data.entity.experience);
  const [experienceToGain] = useState((data.entity.milestones + 1) * 5);
  const [currentHp] = useState(data.entity.currentHp);
  const [maxHp] = useState(data.entity.maxHp);
  const [healthToIncrease] = useState(data.entity.species.health.increment);

  const submitHandler = async e => {
    e.preventDefault();

    switch (data.type) {
      case 'character':
        dispatch(
          updateSheetStart(
            'characters',
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
      case 'player':
        dispatch(
          updateSheetStart(
            'characters',
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
      case 'npc':
        dispatch(
          updateSheetResourceStart(
            'campaigns',
            data.entity.sheetId,
            'npcs',
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
