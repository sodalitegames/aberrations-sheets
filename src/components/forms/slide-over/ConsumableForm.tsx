import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { FormikHelpers } from 'formik';

import { createSheetResourceStart, updateSheetResourceStart } from '../../../redux/sheet/sheet.actions';

import { useResource } from '../../../hooks/useResource';

import { FetchedResourceType, ConsumableCategory } from '../../../models/resource';
import { SheetResourceType, SheetType } from '../../../models/sheet';
import { Category, Consumable } from '../../../models/sheet/resources';

import { SlideOverForm } from '../SlideOver';

import { ConsumableFormSchema } from '../../../utils/schemas/ConsumableFormSchema';

import Input from '../elements/Input';
import TextArea from '../elements/TextArea';
import Select from '../elements/Select';
import CheckboxGroup, { FormikCheckbox } from '../elements/CheckboxGroup';
import { LoadingSpinner } from '../elements/SubmitButton';
import Row from '../elements/Row';

interface Props {
  data: {
    sheetType: SheetType;
    sheetId: string;
    consumable?: Consumable;
  };
}

type FormValues = {
  name: string;
  level: number;
  uses: number;
  categories: string[];
  associatedStat?: string;
  quantity: number;
  description?: string;
};

const ConsumableForm: React.FC<Props> = ({ data }) => {
  const dispatch = useDispatch();

  const fetchedCategories = useResource(FetchedResourceType.ConsumableCategories) as ConsumableCategory[];

  const categories: Category[] = (fetchedCategories || []).map(categ => ({
    universalId: categ.id,
    name: categ.name,
    description: categ.description,
  }));

  const [initialValues, setInitialValues] = useState<FormValues>({
    name: '',
    level: 1,
    uses: 1,
    categories: [],
    associatedStat: '',
    quantity: 1,
    description: '',
  });

  useEffect(() => {
    if (data.consumable) {
      const { name, level, uses, categories, associatedStat, quantity, description } = data.consumable;
      setInitialValues({
        name,
        level,
        uses,
        categories: categories.map((categ: Category) => categ.universalId),
        associatedStat,
        quantity,
        description,
      });
    }
  }, [data.consumable]);

  const submitHandler = async (values: FormValues, actions: FormikHelpers<FormValues>) => {
    const { name, level, uses, categories: cats, associatedStat, quantity, description } = values;

    const selectedCategories = categories.filter(categ => cats.includes(categ.universalId));

    let body = { name, level, uses, quantity, categories: selectedCategories, description, associatedStat: associatedStat ? associatedStat : undefined };

    if (data.consumable) {
      dispatch(
        updateSheetResourceStart(data.sheetType, data.sheetId, SheetResourceType.consumables, data.consumable._id, body, {
          slideOver: true,
          notification: { status: 'success', heading: 'Consumabled Updated', message: `You have successfully updated ${name}.` },
        })
      );
      return;
    }

    dispatch(
      createSheetResourceStart(data.sheetType, data.sheetId, SheetResourceType.consumables, body, {
        slideOver: true,
        notification: { status: 'success', heading: 'Consumable Created', message: `You have successfully created ${name}.` },
      })
    );
  };

  return (
    <SlideOverForm
      title={data.consumable ? 'Edit Consumable' : 'New Consumable'}
      description={data.consumable ? 'Update the information below to edit your consumable.' : 'Fill out the information below to create your new consumable.'}
      submitText={data.consumable ? 'Save consumable' : 'Create consumable'}
      submitHandler={submitHandler}
      initialValues={initialValues}
      validationSchema={ConsumableFormSchema}
      formik
    >
      <Input slideOver label="Name" name="name" type="text" formik />
      <Input slideOver label="Level" name="level" type="number" formik />
      <Input slideOver label="Uses" name="uses" type="number" formik />
      <Input slideOver label="Quantity" name="quantity" type="number" formik />

      {categories ? (
        <CheckboxGroup slideOver label="Categories">
          {categories.map(categ => (
            <FormikCheckbox key={categ.universalId} heading={categ.name} value={categ.universalId} description={categ.description} name="categories" />
          ))}
        </CheckboxGroup>
      ) : (
        <Row slideOver label="Categories" name="categories">
          <LoadingSpinner dark />
        </Row>
      )}

      <Select
        slideOver
        label="Associated Stat (Opt.)"
        name="associatedStat"
        options={[
          { name: 'Strength', id: 'strength' },
          { name: 'Agility', id: 'agility' },
          { name: 'Persona', id: 'persona' },
          { name: 'Aptitude', id: 'aptitude' },
        ]}
        formik
      />
      <TextArea slideOver label="Description (Opt.)" name="description" rows={4} formik />
    </SlideOverForm>
  );
};

export default ConsumableForm;
