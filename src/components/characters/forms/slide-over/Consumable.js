import { useEffect, useState } from 'react';
import { useRecoilState, useSetRecoilState, useRecoilValue } from 'recoil';

import { charSheetState } from '../../../../recoil/character/character.atoms';
import { slideOverState } from '../../../../recoil/app/app.atoms';

import { getConsumableCategories } from '../../../../recoil/resources/resources.selector';

import { createResource, updateSheet } from '../../../../apis/sheets.api';

import { SlideOverForm } from '../../../../layouts/components/app/SlideOver';

import Input from '../../../shared/Input';
import TextArea from '../../../shared/TextArea';
import Select from '../../../shared/Select';
import CheckboxGroup from '../../../shared/CheckboxGroup';
import RadioGroup from '../../../shared/RadioGroup';
import Detail from '../../../shared/Detail';

const Consumable = ({ id }) => {
  const [charSheet, setCharSheet] = useRecoilState(charSheetState);
  const setSlideOver = useSetRecoilState(slideOverState);

  const categories = useRecoilValue(getConsumableCategories);

  const [category, setCategory] = useState(null);
  const [categoriesList, setCategoriesList] = useState([]);

  const [name, setName] = useState('');
  const [level, setLevel] = useState(1);
  const [uses, setUses] = useState(1);
  const [associatedStat, setAssociatedStat] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [description, setDescription] = useState('');

  useEffect(() => {
    if (charSheet && categories) {
      const newCategoriesList = categories.map(categ => {
        return {
          id: categ._id,
          universalId: categ._id,
          name: categ.name,
          description: categ.description,
        };
      });

      setCategoriesList(newCategoriesList);

      console.log(newCategoriesList);
    }
  }, [charSheet, categories]);

  const selectCategory = e => {
    if (!e.target.value) setCategory(null);

    const currCateg = categoriesList.find(cat => cat.universalId === e.target.value);

    setCategory(currCateg);
  };

  const selectStat = e => {
    if (!e.target.value) return setAssociatedStat(null);
    setAssociatedStat(e.target.value);
  };

  const submitHandler = async e => {
    e.preventDefault();

    if (!category) return alert('Must have a category');

    // const { name, pointCost, description, universalId } = augmentation;

    // const resourceResponse = await createResource('characters', charSheet._id, 'augmentations', { name, pointCost, description, universalId });
    // const sheetResponse = await updateSheet('characters', charSheet._id, { upgradePoints: charSheet.upgradePoints - pointCost });

    // setCharSheet(oldCharSheet => {
    //   console.log(oldCharSheet);
    //   return { ...oldCharSheet, upgradePoints: sheetResponse.data.data.sheet.upgradePoints, augmentations: [resourceResponse.data.data.doc, ...oldCharSheet.augmentations] };
    // });

    setSlideOver(null);
  };

  return (
    <SlideOverForm
      title={id ? 'Edit Consumable' : 'New Consumable'}
      description={id ? 'Update the information below to edit your consumable.' : 'Fill out the information below to create your new consumable.'}
      submitText={id ? 'Save consumable' : 'Create consumable'}
      submitHandler={submitHandler}
    >
      <Input slideOver label="Name" name="name" type="text" value={name} changeHandler={setName} />
      <Input slideOver label="Level" name="level" type="number" value={level} changeHandler={setLevel} />
      <Input slideOver label="Uses" name="uses" type="number" value={uses} changeHandler={setUses} />
      <Input slideOver label="Quantity" name="quantity" type="number" value={quantity} changeHandler={setQuantity} />

      {/* <Select slideOver label="Category" name="category" options={categoriesList} changeHandler={selectCategory} /> */}
      <CheckboxGroup />
      <RadioGroup />

      <Select
        slideOver
        label="Associated Stat (Opt.)"
        name="associatedStat"
        options={[
          { name: 'Fortitude', id: 'fortitude' },
          { name: 'Agility', id: 'agility' },
          { name: 'Persona', id: 'persona' },
          { name: 'Aptitude', id: 'aptitude' },
        ]}
        changeHandler={selectStat}
      />
      <TextArea slideOver label="Description" name="description" rows={4} value={description} changeHandler={setDescription} />
    </SlideOverForm>
  );
};

export default Consumable;
