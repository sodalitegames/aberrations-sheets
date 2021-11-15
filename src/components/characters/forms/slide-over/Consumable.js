import { useEffect, useState } from 'react';
import { useRecoilState, useSetRecoilState, useRecoilValue } from 'recoil';

import { charSheetState } from '../../../../recoil/character/character.atoms';
import { slideOverState } from '../../../../recoil/app/app.atoms';

import { getConsumableCategories } from '../../../../recoil/resources/resources.selector';

import { createResource, updateResource } from '../../../../apis/sheets.api';

import { replaceItemById } from '../../../../utils/arrays';

import { SlideOverForm } from '../../../../layouts/components/app/SlideOver';

import Input from '../../../shared/Input';
import TextArea from '../../../shared/TextArea';
import Select from '../../../shared/Select';
import CheckboxGroup, { Checkbox } from '../../../shared/CheckboxGroup';

const Consumable = ({ id }) => {
  const [charSheet, setCharSheet] = useRecoilState(charSheetState);
  const setSlideOver = useSetRecoilState(slideOverState);

  const fetchedCategories = useRecoilValue(getConsumableCategories);

  const [categoriesList, setCategoriesList] = useState([]);

  const [name, setName] = useState('');
  const [level, setLevel] = useState(1);
  const [uses, setUses] = useState(1);
  const [associatedStat, setAssociatedStat] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [description, setDescription] = useState('');

  useEffect(() => {
    if (charSheet && fetchedCategories) {
      const newCategoriesList = fetchedCategories.map(categ => {
        return {
          universalId: categ._id,
          name: categ.name,
          description: categ.description,
        };
      });

      setCategoriesList(newCategoriesList);

      console.log(newCategoriesList);
    }
  }, [charSheet, fetchedCategories]);

  useEffect(() => {
    if (id && charSheet) {
      const currentConsumable = charSheet.consumables.find(consumable => consumable._id === id);

      setName(currentConsumable.name);
      setLevel(currentConsumable.level);
      setUses(currentConsumable.uses);
      setAssociatedStat(currentConsumable.associatedStat);
      setQuantity(currentConsumable.quantity);
      setDescription(currentConsumable.description);
    }
  }, [id, charSheet]);

  const selectStat = e => {
    if (!e.target.value) return setAssociatedStat(null);
    setAssociatedStat(e.target.value);
  };

  const submitHandler = async e => {
    e.preventDefault();

    let categories = [];

    categoriesList.forEach(categ => {
      if (e.target[categ.universalId].checked) {
        categories.push(categ);
      }
    });

    console.log(categories);

    if (!categories.length) return alert('Must select at least one category');

    if (!name) return alert('Must provide a name');
    if (!level) return alert('Must provide a level');
    if (!uses) return alert('Must provide a uses');
    if (!quantity) return alert('Must provide a quantity');

    let body = { name, level, uses, quantity, categories, description };

    if (associatedStat) {
      body.associatedStat = associatedStat;
    }

    if (id) {
      const response = await updateResource('characters', charSheet._id, 'consumables', id, body);
      console.log(response.data.data);
      setCharSheet(oldCharSheet => {
        console.log(oldCharSheet);
        return { ...oldCharSheet, consumables: replaceItemById(oldCharSheet.consumables, id, response.data.data.doc) };
      });

      setSlideOver(null);
      return;
    }

    const response = await createResource('characters', charSheet._id, 'consumables', body);

    setCharSheet(oldCharSheet => {
      console.log(oldCharSheet);
      return { ...oldCharSheet, consumables: [response.data.data.doc, ...oldCharSheet.consumables] };
    });

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

      <CheckboxGroup slideOver label="Categories">
        {categoriesList.map(categ => (
          <Checkbox key={categ.universalId} heading={categ.name} description={categ.description} name={categ.universalId} />
        ))}
      </CheckboxGroup>

      <Select
        slideOver
        label="Associated Stat (Opt.)"
        name="associatedStat"
        value={associatedStat}
        options={[
          { name: 'Fortitude', id: 'fortitude' },
          { name: 'Agility', id: 'agility' },
          { name: 'Persona', id: 'persona' },
          { name: 'Aptitude', id: 'aptitude' },
        ]}
        changeHandler={selectStat}
      />
      <TextArea slideOver label="Description (Opt.)" name="description" rows={4} value={description} changeHandler={setDescription} />
    </SlideOverForm>
  );
};

export default Consumable;
