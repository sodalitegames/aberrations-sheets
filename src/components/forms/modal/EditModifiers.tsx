import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { FormikHelpers } from 'formik';

import { updateSheetResourceStart, updateSheetStart } from '../../../redux/sheet/sheet.actions';

import { ModalForm } from '../Modal';

import List from '../elements/List';

import { Entity, EntityType, SheetResourceType, SheetType } from '../../../models/sheet';
import { Creature, Npc } from '../../../models/sheet/resources';

interface Props {
  data: {
    entityType: EntityType;
    entity: Entity;
  };
}

type FormValues = {
  modifiers: { modifier: string; amount: number }[];
};

const EditModifiers: React.VFC<Props> = ({ data }) => {
  const dispatch = useDispatch();

  const [initialValues] = useState<FormValues>({
    modifiers: data.entity.modifiers,
  });

  const submitHandler = async (values: FormValues, actions: FormikHelpers<FormValues>) => {
    const { modifiers } = values;

    switch (data.entityType) {
      case 'characters':
        dispatch(
          updateSheetStart(
            SheetType.characters,
            data.entity._id,
            { modifiers },
            { modal: true, notification: { status: 'success', heading: 'Modifiers Updated', message: `You have successfully updated your modifiers.` } }
          )
        );
        return;
      case 'players':
        dispatch(
          updateSheetStart(
            SheetType.characters,
            data.entity._id,
            { modifiers },
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
            { modifiers },
            { modal: true, notification: { status: 'success', heading: 'Modifiers Updated', message: `You have successfully updated your npc's modifiers.` } }
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
            { modifiers },
            { modal: true, notification: { status: 'success', heading: 'Modifiers Updated', message: `You have successfully updated your creature's modifiers.` } }
          )
        );
        return;
      default:
        return;
    }
  };

  return (
    <ModalForm title={`Edit Modifiers`} submitText={`Save changes`} submitHandler={submitHandler} initialValues={initialValues} formik>
      <List
        label="Modifiers"
        name="modifiers"
        fields={[
          { name: 'modifier', type: 'text', label: 'Modifier' },
          { name: 'amount', type: 'number', label: 'Amount' },
        ]}
      />
    </ModalForm>
  );
};

export default EditModifiers;
