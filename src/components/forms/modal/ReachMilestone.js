import { useState } from 'react';
import { useDispatch } from 'react-redux';

import { updateSheetResourceStart, updateSheetStart } from '../../../redux/sheet/sheet.actions';

import { ModalForm } from '../Modal';

import Detail from '../elements/Detail';

const ReachMilestone = ({ data }) => {
  const dispatch = useDispatch();

  const [milestones] = useState(+data.entity.milestones);
  const [experience] = useState(data.entity.experience);
  const [experienceToGain] = useState((data.entity.milestones + 1) * 5);

  const submitHandler = async e => {
    e.preventDefault();

    switch (data.type) {
      case 'character':
        dispatch(
          updateSheetStart(
            'characters',
            data.entity._id,
            { experience: experience + experienceToGain, milestones: milestones + 1 },
            { modal: true, notification: { status: 'success', heading: 'Experience Updated', message: `You have successfully updated your spent experience to ${experience}.` } }
          )
        );
        return;
      case 'player':
        dispatch(
          updateSheetStart(
            'characters',
            data.entity._id,
            { experience: experience + experienceToGain, milestones: milestones + 1 },
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
            { experience: experience + experienceToGain, milestones: milestones + 1 },
            { modal: true, notification: { status: 'success', heading: 'Experience Updated', message: `You have successfully updated your spent experience to ${experience}.` } }
          )
        );
        return;
      default:
        return;
    }
  };

  return (
    <ModalForm title="Reach Milestone" submitText={`Reach milestone #${milestones + 1} and gain ${experienceToGain} experience`} submitHandler={submitHandler}>
      <Detail label="Milestones" detail={`${milestones} --> ${milestones + 1}`} />
      <Detail label="Experience" detail={`${experience} --> ${experience + experienceToGain}`} />

      <div className="mt-2 space-y-4">
        <p className="block text-sm font-medium text-gray-900 sm:mt-px sm:pt-2">
          If you reach milestone #{milestones + 1}, you will recieve {experienceToGain} more experience.
        </p>{' '}
      </div>
    </ModalForm>
  );
};

export default ReachMilestone;
