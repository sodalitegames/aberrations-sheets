import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { selectCurrentCampaign } from '../../../../redux/campaign/campaign.selectors';
import { selectCurrentCharacter } from '../../../../redux/character/character.selectors';

import { createSheetResourceStart, updateSheetResourceStart } from '../../../../redux/sheet/sheet.actions';

import { useResource } from '../../../../hooks/useResource';

import { ResourceType } from '../../../../models/enums';

import { SlideOverForm } from '../../../../layouts/components/app/SlideOver';

import Input from '../../../shared/form/Input';
import TextArea from '../../../shared/form/TextArea';
import Select from '../../../shared/form/Select';
import CheckboxGroup, { Checkbox } from '../../../shared/form/CheckboxGroup';
import { LoadingSpinner } from '../../../shared/form/SubmitButton';
import Row from '../../../shared/form/Row';

const ConsumableForm = ({ id, data }) => {
  const dispatch = useDispatch();

  const charSheet = useSelector(selectCurrentCharacter);
  const campSheet = useSelector(selectCurrentCampaign);

  const fetchedCategories = useResource(ResourceType.ConsumableCategories);

  const [categoriesList, setCategoriesList] = useState([]);

  const [name, setName] = useState('');
  const [level, setLevel] = useState(1);
  const [uses, setUses] = useState(1);
  const [categories, setCategories] = useState([]);
  const [associatedStat, setAssociatedStat] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [description, setDescription] = useState('');

  useEffect(() => {
    if (fetchedCategories) {
      const newCategoriesList = fetchedCategories.map(categ => {
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
        const currentConsumable = charSheet.consumables.find(consumable => consumable._id === id);

        setName(currentConsumable.name);
        setLevel(currentConsumable.level);
        setUses(currentConsumable.uses);
        setCategories(currentConsumable.categories);
        setAssociatedStat(currentConsumable.associatedStat);
        setQuantity(currentConsumable.quantity);
        setDescription(currentConsumable.description);
      }
    }

    if (data.sheetType === 'campaigns') {
      if (id && campSheet) {
        const currentConsumable = campSheet.consumables.find(consumable => consumable._id === id);

        setName(currentConsumable.name);
        setLevel(currentConsumable.level);
        setUses(currentConsumable.uses);
        setCategories(currentConsumable.categories);
        setAssociatedStat(currentConsumable.associatedStat);
        setQuantity(currentConsumable.quantity);
        setDescription(currentConsumable.description);
      }
    }
  }, [id, data.sheetType, charSheet, campSheet]);

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

    if (!categories.length) return alert('Must select at least one category');

    if (!name) return alert('Must provide a name');
    if (!level) return alert('Must provide a level');
    if (!uses) return alert('Must provide a uses');
    if (!quantity) return alert('Must provide a quantity');

    let body = { name, level, uses, quantity, categories, description };

    if (associatedStat) {
      body.associatedStat = associatedStat;
    }

    const sheetId = data.sheetType === 'campaigns' ? campSheet._id : charSheet._id;

    if (id) {
      dispatch(
        updateSheetResourceStart(data.sheetType, sheetId, 'consumables', id, body, {
          slideOver: true,
          notification: { status: 'success', heading: 'Consumabled Updated', message: `You have successfully updated ${name}.` },
        })
      );
      return;
    }

    dispatch(
      createSheetResourceStart(data.sheetType, sheetId, 'consumables', body, {
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
    >
      <Input slideOver label="Name" name="name" type="text" value={name} changeHandler={setName} required />
      <Input slideOver label="Level" name="level" type="number" value={level} changeHandler={setLevel} required />
      <Input slideOver label="Uses" name="uses" type="number" value={uses} changeHandler={setUses} required />
      <Input slideOver label="Quantity" name="quantity" type="number" value={quantity} changeHandler={setQuantity} required />

      {fetchedCategories && categoriesList ? (
        <CheckboxGroup slideOver label="Categories">
          {categoriesList.map(categ => (
            <Checkbox
              key={categ.universalId}
              heading={categ.name}
              checked={id ? !!categories.find(cat => cat.universalId === categ.universalId) : false}
              description={categ.description}
              name={categ.universalId}
            />
          ))}
        </CheckboxGroup>
      ) : (
        <Row slideOver label="Categories">
          <LoadingSpinner dark />
        </Row>
      )}

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

export default ConsumableForm;
