import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { FormikHelpers } from 'formik';

import { selectCurrentCampaign } from '../../../redux/campaign/campaign.selectors';
import { selectCurrentCharacter } from '../../../redux/character/character.selectors';

import { createSheetResourceStart, updateSheetResourceStart } from '../../../redux/sheet/sheet.actions';

import { useResource } from '../../../hooks/useResource';

import { ResourceType } from '../../../models/enums';

import { SlideOverForm } from '../SlideOver';

import { ConsumableFormSchema } from '../../../utils/schemas/ConsumableFormSchema';

import Input from '../elements/Input';
import TextArea from '../elements/TextArea';
import Select from '../elements/Select';
import CheckboxGroup, { FormikCheckbox } from '../elements/CheckboxGroup';
import { LoadingSpinner } from '../elements/SubmitButton';
import Row from '../elements/Row';
import { ConsumableCategory } from '../../../models/resource';
import { SheetResourceType, SheetType } from '../../../models/sheet';

type SheetConsumableCategory = {
  universalId: string;
  name: string;
  description: string;
};

interface ConsumableFormProps {
  id: string;
  data: {
    sheetType: SheetType;
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

const ConsumableForm: React.FC<ConsumableFormProps> = ({ id, data }) => {
  const dispatch = useDispatch();

  const charSheet = useSelector(selectCurrentCharacter)!;
  const campSheet = useSelector(selectCurrentCampaign)!;

  const fetchedCategories = useResource(ResourceType.ConsumableCategories);

  const [categoriesList, setCategoriesList] = useState<SheetConsumableCategory[]>([]);

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
    if (fetchedCategories) {
      const newCategoriesList = (fetchedCategories as ConsumableCategory[]).map(categ => {
        return {
          universalId: categ._id,
          name: categ.name,
          description: categ.description,
        };
      });

      setCategoriesList(newCategoriesList);
    }
  }, [fetchedCategories]);

  useEffect(() => {
    if (data.sheetType === 'characters') {
      if (id && charSheet) {
        const consumable = charSheet.consumables.find(consumable => consumable._id === id);

        if (consumable) {
          const { name, level, uses, categories, associatedStat, quantity, description } = consumable;
          setInitialValues({
            name,
            level,
            uses,
            categories: categories.map((categ: SheetConsumableCategory) => categ.universalId),
            associatedStat,
            quantity,
            description,
          });
        }
      }
    }

    if (data.sheetType === 'campaigns') {
      if (id && campSheet) {
        const consumable = campSheet.consumables.find(consumable => consumable._id === id);

        if (consumable) {
          const { name, level, uses, categories, associatedStat, quantity, description } = consumable;
          setInitialValues({
            name,
            level,
            uses,
            categories: categories.map((categ: SheetConsumableCategory) => categ.universalId),
            associatedStat,
            quantity,
            description,
          });
        }
      }
    }
  }, [id, data.sheetType, charSheet, campSheet]);

  const submitHandler = async (values: FormValues, actions: FormikHelpers<FormValues>) => {
    const { name, level, uses, categories, associatedStat, quantity, description } = values;

    let detailedCategories: SheetConsumableCategory[] = [];

    categoriesList.forEach(categ => {
      if (categories.includes(categ.universalId)) {
        detailedCategories.push(categ);
      }
    });

    let body = { name, level, uses, quantity, categories: detailedCategories, description, associatedStat: associatedStat ? associatedStat : undefined };

    const sheetId = data.sheetType === 'campaigns' ? campSheet._id : charSheet._id;

    if (id) {
      dispatch(
        updateSheetResourceStart(data.sheetType, sheetId, SheetResourceType.consumables, id, body, {
          slideOver: true,
          notification: { status: 'success', heading: 'Consumabled Updated', message: `You have successfully updated ${name}.` },
        })
      );
      return;
    }

    dispatch(
      createSheetResourceStart(data.sheetType, sheetId, SheetResourceType.consumables, body, {
        slideOver: true,
        notification: { status: 'success', heading: 'Consumable Created', message: `You have successfully created ${name}.` },
      })
    );
  };

  return (
    <SlideOverForm
      title={id ? 'Edit Consumable' : 'New Consumable'}
      description={id ? 'Update the information below to edit your consumable.' : 'Fill out the information below to create your new consumable.'}
      submitText={id ? 'Save consumable' : 'Create consumable'}
      submitHandler={submitHandler}
      initialValues={initialValues}
      validationSchema={ConsumableFormSchema}
      formik
    >
      <Input slideOver label="Name" name="name" type="text" formik />
      <Input slideOver label="Level" name="level" type="number" formik />
      <Input slideOver label="Uses" name="uses" type="number" formik />
      <Input slideOver label="Quantity" name="quantity" type="number" formik />

      {fetchedCategories && categoriesList ? (
        <CheckboxGroup slideOver label="Categories">
          {categoriesList.map(categ => (
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
