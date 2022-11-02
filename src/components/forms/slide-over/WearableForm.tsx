import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { FormikHelpers } from 'formik';

import { selectCurrentCharacter } from '../../../redux/character/character.selectors';
import { selectCurrentCampaign } from '../../../redux/campaign/campaign.selectors';

import { createSheetResourceStart, updateSheetResourceStart } from '../../../redux/sheet/sheet.actions';

import { SlideOverForm } from '../SlideOver';

import { WearableFormSchema } from '../../../utils/schemas/WearableFormSchema';

import Input from '../elements/Input';
import TextArea from '../elements/TextArea';
import Select from '../elements/Select';
import List from '../elements/List';
import { SheetResourceType, SheetType } from '../../../models/interfaces/sheet';

interface WearableFormProps {
  id: string;
  data: {
    sheetType: SheetType;
  };
}

type FormValues = {
  name: string;
  description: string;
  bodyArea: 'head' | 'face' | 'torso' | 'arms' | 'hands' | 'legs' | 'feet' | '';
  shieldValue: number;
  speedAdjustment: number;
  quantity: number;
  modifiers: { modifier: string; amount: number }[];
};

const WearableForm: React.FC<WearableFormProps> = ({ id, data }) => {
  const dispatch = useDispatch();

  const charSheet = useSelector(selectCurrentCharacter)!;
  const campSheet = useSelector(selectCurrentCampaign)!;

  const [initialValues, setInitialValues] = useState<FormValues>({
    name: '',
    description: '',
    bodyArea: '',
    shieldValue: 0,
    speedAdjustment: 0,
    quantity: 1,
    modifiers: [],
  });

  useEffect(() => {
    if (data.sheetType === 'characters') {
      if (id && charSheet) {
        const wearable = charSheet.wearables.find(wearable => wearable._id === id);

        if (wearable) {
          const { name, description, bodyArea, shieldValue, speedAdjustment, quantity, modifiers } = wearable;
          setInitialValues({
            name,
            description,
            bodyArea,
            shieldValue,
            speedAdjustment,
            quantity,
            modifiers: modifiers || [],
          });
        }
      }
    }

    if (data.sheetType === 'campaigns') {
      if (id && campSheet) {
        const wearable = campSheet.wearables.find(wearable => wearable._id === id);

        if (wearable) {
          const { name, description, bodyArea, shieldValue, speedAdjustment, quantity, modifiers } = wearable;
          setInitialValues({
            name,
            description,
            bodyArea,
            shieldValue,
            speedAdjustment,
            quantity,
            modifiers: modifiers || [],
          });
        }
      }
    }
  }, [id, data.sheetType, charSheet, campSheet]);

  const submitHandler = async (values: FormValues, actions: FormikHelpers<FormValues>) => {
    const { name, description, bodyArea, shieldValue, speedAdjustment, quantity, modifiers } = values;

    const sheetId = data.sheetType === 'campaigns' ? campSheet._id : charSheet._id;

    if (id) {
      dispatch(
        updateSheetResourceStart(
          data.sheetType,
          sheetId,
          SheetResourceType.wearables,
          id,
          { name, bodyArea, description, shieldValue, speedAdjustment, quantity, modifiers },
          { slideOver: true, notification: { status: 'success', heading: 'Wearable Updated', message: `You have successfully updated ${name}.` } }
        )
      );
      return;
    }

    dispatch(
      createSheetResourceStart(
        data.sheetType,
        sheetId,
        SheetResourceType.wearables,
        { name, bodyArea, description, shieldValue, speedAdjustment, quantity, modifiers },
        { slideOver: true, notification: { status: 'success', heading: 'Wearable Created', message: `You have successfully created ${name}.` } }
      )
    );
  };

  return (
    <SlideOverForm
      title={id ? 'Edit Wearable' : 'New Wearable'}
      description={id ? 'Update the information below to edit your wearable.' : 'Fill out the information below to create your new wearable.'}
      submitText={id ? 'Save wearable' : 'Create wearable'}
      submitHandler={submitHandler}
      initialValues={initialValues}
      validationSchema={WearableFormSchema}
      formik
    >
      <Input slideOver label="Name" name="name" type="text" formik />
      <Select
        slideOver
        label="Body Area"
        name="bodyArea"
        options={[
          { name: 'Head', id: 'head' },
          { name: 'Face', id: 'face' },
          { name: 'Torso', id: 'torso' },
          { name: 'Arms', id: 'arms' },
          { name: 'Hands', id: 'hands' },
          { name: 'Legs', id: 'legs' },
          { name: 'Feet', id: 'feet' },
        ]}
        formik
      />
      <TextArea slideOver label="Description" name="description" rows={4} formik />
      <Input slideOver label="Shield Value" name="shieldValue" type="number" formik />
      <Input slideOver label="Speed Adjustment" name="speedAdjustment" type="number" formik />
      <List
        slideOver
        label="Modifiers"
        name="modifiers"
        fields={[
          { name: 'modifier', type: 'text', label: 'Modifier' },
          { name: 'amount', type: 'number', label: 'Amount' },
        ]}
      />
      <Input slideOver label="Quantity" name="quantity" type="number" formik />
    </SlideOverForm>
  );
};

export default WearableForm;
