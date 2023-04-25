import { useState } from 'react';
import { useDispatch } from 'react-redux';

import { updateSheetStart, updateSheetResourceStart } from '../../../redux/sheet/sheet.actions';

import { ModalForm } from '../Modal';

import Input from '../elements/Input';

import { Entity, EntityType, SheetResourceType, SheetType } from '../../../models/sheet';
import { Creature, Npc } from '../../../models/sheet/resources';

interface Props {
  data: {
    entityType: EntityType;
    entity: Entity;
  };
}

const EditMortality: React.VFC<Props> = ({ data }) => {
  const dispatch = useDispatch();

  const [mortality, setMortality] = useState(data.entity.mortality);

  const submitHandler = async (e: React.FormEvent) => {
    e.preventDefault();

    switch (data.entityType) {
      case 'characters':
        dispatch(
          updateSheetStart(
            SheetType.characters,
            data.entity._id,
            { mortality: +mortality },
            { modal: true, notification: { status: 'success', heading: 'Mortality Updated', message: `You have successfully updated your mortality to ${mortality}.` } }
          )
        );
        return;
      case 'players':
        dispatch(
          updateSheetStart(
            SheetType.characters,
            data.entity._id,
            { mortality: +mortality },
            { forPlayer: true, modal: true, notification: { status: 'success', heading: 'Mortality Updated', message: `You have successfully updated your player's mortality to ${mortality}.` } }
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
            { mortality: +mortality },
            { modal: true, notification: { status: 'success', heading: 'Mortality Updated', message: `You have successfully updated your npc's mortality to ${mortality}.` } }
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
            { mortality: +mortality },
            { modal: true, notification: { status: 'success', heading: 'Mortality Updated', message: `You have successfully updated your creature's mortality to ${mortality}.` } }
          )
        );
        return;
      default:
        return;
    }
  };

  return (
    <ModalForm title="Edit Mortality" submitText={`Save changes`} submitHandler={submitHandler}>
      <Input label="Mortality" name="mortality" type="number" value={mortality} changeHandler={setMortality} />
    </ModalForm>
  );
};

export default EditMortality;
