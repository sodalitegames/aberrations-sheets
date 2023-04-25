import { useState } from 'react';
import { useDispatch } from 'react-redux';

import { updateSheetResourceStart, updateSheetStart } from '../../../redux/sheet/sheet.actions';

import { capitalize } from '../../../utils/helpers/strings';

import { SheetResourceType, SheetType, ConditionType, EntityType, Entity } from '../../../models/sheet';
import { Creature, Npc } from '../../../models/sheet/resources';

import { ModalForm } from '../Modal';

import Input from '../elements/Input';

interface Props {
  data: {
    condition: ConditionType;
    entityType: EntityType;
    entity: Entity;
  };
}

const EditCondition: React.VFC<Props> = ({ data }) => {
  const dispatch = useDispatch();

  const [points, setPoints] = useState(data.entity.conditions[data.condition]);

  const submitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    switch (data.entityType) {
      case 'characters':
        dispatch(
          updateSheetStart(
            SheetType.characters,
            data.entity._id,
            { conditions: { ...data.entity.conditions, [data.condition]: points } },
            { modal: true, notification: { status: 'success', heading: 'Conditions Updated', message: `You have successfully updated your ${data.condition} condition.` } }
          )
        );
        return;
      case 'players':
        dispatch(
          updateSheetStart(
            SheetType.characters,
            data.entity._id,
            { conditions: { ...data.entity.conditions, [data.condition]: points } },
            {
              forPlayer: true,
              modal: true,
              notification: { status: 'success', heading: 'Conditions Updated', message: `You have successfully updated your player's ${data.condition} condition.` },
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
            { conditions: { ...data.entity.conditions, [data.condition]: points } },
            { modal: true, notification: { status: 'success', heading: 'Conditions Updated', message: `You have successfully updated your npc's ${data.condition} condition.` } }
          )
        );
        return;
      case 'creatures':
        dispatch(
          updateSheetResourceStart(
            SheetType.campaigns,
            (data.entity as Creature).sheetId,
            SheetResourceType.creatures,
            data.entity._id,
            { conditions: { ...data.entity.conditions, [data.condition]: points } },
            { modal: true, notification: { status: 'success', heading: 'Conditions Updated', message: `You have successfully updated your creature's ${data.condition} condition.` } }
          )
        );
        return;
      default:
        return;
    }
  };

  return (
    <ModalForm title={`Edit ${capitalize(data.condition)} Condition`} submitText={`Save changes`} submitHandler={submitHandler}>
      <Input label={`${capitalize(data.condition)} Points`} name={data.condition} type="number" value={points} changeHandler={setPoints} />
    </ModalForm>
  );
};

export default EditCondition;
