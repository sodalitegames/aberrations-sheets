import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { FormikHelpers } from 'formik';

import { createSheetResourceStart, updateSheetResourceStart } from '../../../redux/sheet/sheet.actions';

import { SlideOverForm } from '../SlideOver';

import { WearableFormSchema } from '../../../utils/schemas/WearableFormSchema';

import Input from '../elements/Input';
import TextArea from '../elements/TextArea';
import Select from '../elements/Select';
import List from '../elements/List';

import { SheetResourceType, SheetType } from '../../../models/sheet';
import { Wearable } from '../../../models/sheet/resources';
interface Props {
  data: {
    sheetType: SheetType;
    sheetId: string;
    wearable?: Wearable;
  };
}

type FormValues = {
  name: string;
  description: string;
  bodyArea: 'head' | 'face' | 'torso' | 'arms' | 'hands' | 'legs' | 'feet' | '';
  shieldValue: number;
  speed: number;
  quantity: number;
  modifiers: { modifier: string; amount: number }[];
};

const WearableForm: React.FC<Props> = ({ data }) => {
  const dispatch = useDispatch();

  const [initialValues, setInitialValues] = useState<FormValues>({
    name: '',
    description: '',
    bodyArea: '',
    shieldValue: 0,
    speed: 0,
    quantity: 1,
    modifiers: [],
  });

  useEffect(() => {
    if (data.wearable) {
      const { name, description, bodyArea, shieldValue, speed, quantity, modifiers } = data.wearable;
      setInitialValues({
        name,
        description,
        bodyArea,
        shieldValue,
        speed,
        quantity,
        modifiers: modifiers || [],
      });
    }
  }, [data.wearable]);

  const submitHandler = async (values: FormValues, actions: FormikHelpers<FormValues>) => {
    const { name, description, bodyArea, shieldValue, speed, quantity, modifiers } = values;

    if (data.wearable) {
      dispatch(
        updateSheetResourceStart(
          data.sheetType,
          data.sheetId,
          SheetResourceType.wearables,
          data.wearable._id,
          { name, bodyArea, description, shieldValue, speed, quantity, modifiers },
          { slideOver: true, notification: { status: 'success', heading: 'Wearable Updated', message: `You have successfully updated ${name}.` } }
        )
      );
      return;
    }

    dispatch(
      createSheetResourceStart(
        data.sheetType,
        data.sheetId,
        SheetResourceType.wearables,
        { name, bodyArea, description, shieldValue, speed, quantity, modifiers },
        { slideOver: true, notification: { status: 'success', heading: 'Wearable Created', message: `You have successfully created ${name}.` } }
      )
    );
  };

  return (
    <SlideOverForm
      title={data.wearable ? 'Edit Wearable' : 'New Wearable'}
      description={data.wearable ? 'Update the information below to edit your wearable.' : 'Fill out the information below to create your new wearable.'}
      submitText={data.wearable ? 'Save wearable' : 'Create wearable'}
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
      <Input slideOver label="Speed" name="speed" type="number" formik />
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
