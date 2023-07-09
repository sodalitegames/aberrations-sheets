import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { FormikHelpers } from 'formik';

import { updateSheetResourceStart, updateSheetStart } from '../../../redux/sheet/sheet.actions';

import { ModalForm } from '../Modal';

import List from '../elements/List';

import { SheetEntity, SheetEntityType, SheetResourceType, SheetType } from '../../../models/sheet';
import { Npc } from '../../../models/sheet/resources';

interface Props {
  data: {
    entityType: SheetEntityType;
    entity: SheetEntity;
  };
}

type FormValues = {
  skilled: { skill: string }[];
  expert: { skill: string }[];
};

const EditSkills: React.VFC<Props> = ({ data }) => {
  const dispatch = useDispatch();

  const [initialValues] = useState<FormValues>({
    skilled: (data.entity.skills || []).filter(skill => skill.type === 'skilled').map(skill => ({ skill: skill.skill })),
    expert: (data.entity.skills || []).filter(skill => skill.type === 'expert').map(skill => ({ skill: skill.skill })),
  });

  const submitHandler = async (values: FormValues, actions: FormikHelpers<FormValues>) => {
    const { skilled, expert } = values;

    const skills = [...skilled.map(skill => ({ skill: skill.skill, type: 'skilled' })), ...expert.map(skill => ({ skill: skill.skill, type: 'expert' }))];

    switch (data.entityType) {
      case 'characters':
        dispatch(
          updateSheetStart(
            SheetType.characters,
            data.entity._id,
            { skills },
            { modal: true, notification: { status: 'success', heading: 'Modifiers Updated', message: `You have successfully updated your modifiers.` } }
          )
        );
        return;
      case 'players':
        dispatch(
          updateSheetStart(
            SheetType.characters,
            data.entity._id,
            { skills },
            { forPlayer: true, modal: true, notification: { status: 'success', heading: 'Modifers Updated', message: `You have successfully updated your player's modifiers.` } }
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
            { skills },
            { modal: true, notification: { status: 'success', heading: 'Modifiers Updated', message: `You have successfully updated your npc's modifiers.` } }
          )
        );
        return;
      default:
        return;
    }
  };

  return (
    <ModalForm title={`Edit Skills`} submitText={`Save changes`} submitHandler={submitHandler} initialValues={initialValues} formik>
      <List label="Skilled" name="skilled" fields={[{ name: 'skill', type: 'text', label: 'Skill' }]} />
      <List label="Expert" name="expert" fields={[{ name: 'skill', type: 'text', label: 'Skill' }]} />
    </ModalForm>
  );
};

export default EditSkills;
