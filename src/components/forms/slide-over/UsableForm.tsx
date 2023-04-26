import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { FormikHelpers } from 'formik';

import { createSheetResourceStart, updateSheetResourceStart } from '../../../redux/sheet/sheet.actions';

import { SheetResourceType, SheetType } from '../../../models/sheet';

import { SlideOverForm } from '../SlideOver';

import { UsableFormSchema } from '../../../utils/schemas/UsableFormSchema';

import Input from '../elements/Input';
import TextArea from '../elements/TextArea';
import Select from '../elements/Select';
import Toggle from '../elements/Toggle';

import { Usable } from '../../../models/sheet/resources';
interface Props {
  data: {
    sheetType: SheetType;
    sheetId: string;
    usable?: Usable;
  };
}

type FormValues = {
  name: string;
  type: string;
  description: string;
  equippable: boolean;
  quantity: number;
  units: string;
};

const UsableForm: React.FC<Props> = ({ data }) => {
  const dispatch = useDispatch();

  const [initialValues, setInitialValues] = useState<FormValues>({
    name: '',
    type: '',
    description: '',
    equippable: true,
    quantity: 1,
    units: 'units',
  });

  useEffect(() => {
    if (data.usable) {
      const { name, type, description, equippable, quantity, units = 'units' } = data.usable;
      setInitialValues({
        name,
        type,
        description,
        equippable,
        quantity,
        units,
      });
    }
  }, [data.usable]);

  const submitHandler = async (values: FormValues, actions: FormikHelpers<FormValues>) => {
    const { name, type, description, equippable, quantity, units } = values;

    if (data.usable) {
      dispatch(
        updateSheetResourceStart(
          data.sheetType,
          data.sheetId,
          SheetResourceType.usables,
          data.usable._id,
          { name, type, description, equippable, quantity, units },
          { slideOver: true, notification: { status: 'success', heading: 'Usable Updated', message: `You have successfully updated ${name}.` } }
        )
      );
      return;
    }

    dispatch(
      createSheetResourceStart(
        data.sheetType,
        data.sheetId,
        SheetResourceType.usables,
        { name, type, description, equippable, quantity, units },
        { slideOver: true, notification: { status: 'success', heading: 'Usable Created', message: `You have successfully created ${name}.` } }
      )
    );
  };

  return (
    <SlideOverForm
      title={data.usable ? 'Edit Usable' : 'New Usable'}
      description={data.usable ? 'Update the information below to edit your usable.' : 'Fill out the information below to create your new usable.'}
      submitText={data.usable ? 'Save usable' : 'Create usable'}
      initialValues={initialValues}
      validationSchema={UsableFormSchema}
      submitHandler={submitHandler}
      formik
    >
      <Input slideOver label="Name" name="name" type="text" formik />
      <Select
        slideOver
        label="Type"
        name="type"
        options={[
          { name: 'Common', id: 'Common' },
          { name: 'Semi-Common', id: 'Semi-Common' },
          { name: 'Rare', id: 'Rare' },
          { name: 'Collectible', id: 'Collectible' },
          { name: 'One of A Kind', id: 'One of A Kind' },
        ]}
        formik
      />
      <TextArea slideOver label="Description" name="description" rows={4} formik />
      <Toggle slideOver label="Equippable" name="equippable" formik />
      <Input slideOver label="Quantity" name="quantity" type="number" formik />
      <Input slideOver label="Units" name="units" type="text" formik />
    </SlideOverForm>
  );
};

export default UsableForm;
