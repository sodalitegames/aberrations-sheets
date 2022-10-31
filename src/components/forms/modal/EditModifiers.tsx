import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { FormikHelpers } from 'formik';

import { selectCurrentCharacter } from '../../../redux/character/character.selectors';
import { selectCurrentCampaign } from '../../../redux/campaign/campaign.selectors';

import { updateSheetResourceStart, updateSheetStart } from '../../../redux/sheet/sheet.actions';

import { ModalForm } from '../Modal';

import List from '../elements/List';

interface EditModifiersProps {
  data: {
    type: 'character' | 'player' | 'npc' | 'creature';
    resource: {
      _id: string;
      modifiers: { modifier: string; amount: number }[];
    };
  };
}

type FormValues = {
  modifiers: { modifier: string; amount: number }[];
};

const EditModifiers: React.VFC<EditModifiersProps> = ({ data }) => {
  const dispatch = useDispatch();

  const charSheet = useSelector(selectCurrentCharacter);
  const campSheet = useSelector(selectCurrentCampaign);

  const [initialValues] = useState<FormValues>({
    modifiers: data.resource.modifiers,
  });

  const submitHandler = async (values: FormValues, actions: FormikHelpers<FormValues>) => {
    const { modifiers } = values;

    switch (data.type) {
      case 'character':
        dispatch(
          updateSheetStart(
            'characters',
            charSheet._id,
            { modifiers },
            { modal: true, notification: { status: 'success', heading: 'Modifiers Updated', message: `You have successfully updated your modifiers.` } }
          )
        );
        return;
      case 'player':
        dispatch(
          updateSheetStart(
            'characters',
            data.resource._id,
            { modifiers },
            { forPlayer: true, modal: true, notification: { status: 'success', heading: 'Modifers Updated', message: `You have successfully updated your player's modifiers.` } }
          )
        );
        return;
      case 'npc':
        dispatch(
          updateSheetResourceStart(
            'campaigns',
            campSheet._id,
            'npcs',
            data.resource._id,
            { modifiers },
            { modal: true, notification: { status: 'success', heading: 'Modifiers Updated', message: `You have successfully updated your npc's modifiers.` } }
          )
        );
        return;
      case 'creature':
        dispatch(
          updateSheetResourceStart(
            'campaigns',
            campSheet._id,
            'creatures',
            data.resource._id,
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
