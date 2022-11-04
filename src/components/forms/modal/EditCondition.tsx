import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { selectCurrentCharacter } from '../../../redux/character/character.selectors';
import { selectCurrentCampaign } from '../../../redux/campaign/campaign.selectors';

import { updateSheetResourceStart, updateSheetStart } from '../../../redux/sheet/sheet.actions';

import { capitalize } from '../../../utils/helpers/strings';

import { SheetResourceType, SheetType, ConditionType } from '../../../models/sheet';

import { ModalForm } from '../Modal';

import Input from '../elements/Input';

interface EditConditionProps {
  id: ConditionType;
  data: {
    type: 'character' | 'player' | 'npc' | 'creature';
    resource: {
      _id: string;
      conditions: {
        slowed: number;
        agony: number;
        injured: number;
        disturbed: number;
      };
    };
  };
}

const EditCondition: React.VFC<EditConditionProps> = ({ id, data }) => {
  const dispatch = useDispatch();

  const charSheet = useSelector(selectCurrentCharacter)!;
  const campSheet = useSelector(selectCurrentCampaign)!;

  const [points, setPoints] = useState(data.resource.conditions[id]);

  const submitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    switch (data.type) {
      case 'character':
        dispatch(
          updateSheetStart(
            SheetType.characters,
            charSheet._id,
            { conditions: { ...charSheet.conditions, [id]: points } },
            { modal: true, notification: { status: 'success', heading: 'Conditions Updated', message: `You have successfully updated your ${id.toLowerCase()} condition.` } }
          )
        );
        return;
      case 'player':
        dispatch(
          updateSheetStart(
            SheetType.characters,
            data.resource._id,
            { conditions: { ...data.resource.conditions, [id]: points } },
            { forPlayer: true, modal: true, notification: { status: 'success', heading: 'Conditions Updated', message: `You have successfully updated your player's ${id.toLowerCase()} condition.` } }
          )
        );
        return;
      case 'npc':
        dispatch(
          updateSheetResourceStart(
            SheetType.campaigns,
            campSheet._id,
            SheetResourceType.npcs,
            data.resource._id,
            { conditions: { ...data.resource.conditions, [id]: points } },
            { modal: true, notification: { status: 'success', heading: 'Conditions Updated', message: `You have successfully updated your npc's ${id.toLowerCase()} condition.` } }
          )
        );
        return;
      case 'creature':
        dispatch(
          updateSheetResourceStart(
            SheetType.campaigns,
            campSheet._id,
            SheetResourceType.creatures,
            data.resource._id,
            { conditions: { ...data.resource.conditions, [id]: points } },
            { modal: true, notification: { status: 'success', heading: 'Conditions Updated', message: `You have successfully updated your creature's ${id.toLowerCase()} condition.` } }
          )
        );
        return;
      default:
        return;
    }
  };

  return (
    <ModalForm title={`Edit ${capitalize(id)} Condition`} submitText={`Save changes`} submitHandler={submitHandler}>
      <Input label={`${capitalize(id)} Points`} name={id} type="number" value={points} changeHandler={setPoints} />
    </ModalForm>
  );
};

export default EditCondition;
