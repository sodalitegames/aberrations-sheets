import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { FormikHelpers } from 'formik';

import { selectCurrentCharacter } from '../../../redux/character/character.selectors';
import { selectCurrentCampaign } from '../../../redux/campaign/campaign.selectors';

import { createSheetResourceStart, updateSheetResourceStart } from '../../../redux/sheet/sheet.actions';

import { SheetResourceType, SheetType } from '../../../models/sheet';

import { SlideOverForm } from '../SlideOver';

import { UsableFormSchema } from '../../../utils/schemas/UsableFormSchema';

import Input from '../elements/Input';
import TextArea from '../elements/TextArea';
import Select from '../elements/Select';
import Toggle from '../elements/Toggle';

interface Props {
  id: string;
  data: {
    sheetType: SheetType;
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

const UsableForm: React.FC<Props> = ({ id, data }) => {
  const dispatch = useDispatch();

  const charSheet = useSelector(selectCurrentCharacter)!;
  const campSheet = useSelector(selectCurrentCampaign)!;

  const [initialValues, setInitialValues] = useState<FormValues>({
    name: '',
    type: '',
    description: '',
    equippable: true,
    quantity: 1,
    units: 'units',
  });

  useEffect(() => {
    if (data.sheetType === 'characters') {
      if (id && charSheet) {
        const usable = charSheet.usables.find(usable => usable._id === id);

        if (usable) {
          const { name, type, description, equippable, quantity, units = 'units' } = usable;
          setInitialValues({
            name,
            type,
            description,
            equippable,
            quantity,
            units,
          });
        }
      }
    }

    if (data.sheetType === 'campaigns') {
      if (id && campSheet) {
        const usable = campSheet.usables.find(usable => usable._id === id);

        if (usable) {
          const { name, type, description, equippable, quantity, units = 'units' } = usable;
          setInitialValues({
            name,
            type,
            description,
            equippable,
            quantity,
            units,
          });
        }
      }
    }
  }, [id, data.sheetType, charSheet, campSheet]);

  const submitHandler = async (values: FormValues, actions: FormikHelpers<FormValues>) => {
    const { name, type, description, equippable, quantity, units } = values;

    const sheetId = data.sheetType === 'campaigns' ? campSheet._id : charSheet._id;

    if (id) {
      dispatch(
        updateSheetResourceStart(
          data.sheetType,
          sheetId,
          SheetResourceType.usables,
          id,
          { name, type, description, equippable, quantity, units },
          { slideOver: true, notification: { status: 'success', heading: 'Usable Updated', message: `You have successfully updated ${name}.` } }
        )
      );
      return;
    }

    dispatch(
      createSheetResourceStart(
        data.sheetType,
        sheetId,
        SheetResourceType.usables,
        { name, type, description, equippable, quantity, units },
        { slideOver: true, notification: { status: 'success', heading: 'Usable Created', message: `You have successfully created ${name}.` } }
      )
    );
  };

  return (
    <SlideOverForm
      title={id ? 'Edit Usable' : 'New Usable'}
      description={id ? 'Update the information below to edit your usable.' : 'Fill out the information below to create your new usable.'}
      submitText={id ? 'Save usable' : 'Create usable'}
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
