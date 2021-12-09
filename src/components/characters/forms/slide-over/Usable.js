import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { selectCurrentCharacter } from '../../../../redux/character/character.selectors';

import { setSlideOver } from '../../../../redux/app/app.actions';
import { createSheetResourceStart, updateSheetResourceStart } from '../../../../redux/sheet/sheet.actions';

import { SlideOverForm } from '../../../../layouts/components/app/SlideOver';

import Input from '../../../shared/Input';
import TextArea from '../../../shared/TextArea';
import Select from '../../../shared/Select';

const Usable = ({ id }) => {
  const dispatch = useDispatch();

  const charSheet = useSelector(selectCurrentCharacter);

  const [name, setName] = useState('');
  const [type, setType] = useState('');
  const [description, setDescription] = useState('');
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    if (id && charSheet) {
      const currentUsable = charSheet.usables.find(usable => usable._id === id);

      setName(currentUsable.name);
      setType(currentUsable.type);
      setDescription(currentUsable.description);
      setQuantity(currentUsable.quantity);
    }
  }, [id, charSheet]);

  const selectType = e => {
    if (!e.target.value) return setType(null);
    setType(e.target.value);
  };

  const submitHandler = async e => {
    e.preventDefault();

    if (!name) return alert('Must provide a name');
    if (!type) return alert('Must provide a type');
    if (!description) return alert('Must provide a description');
    if (!quantity) return alert('Must provide a quantity');

    if (id) {
      dispatch(updateSheetResourceStart('characters', charSheet._id, 'usables', id, { name, type, description, quantity }));

      dispatch(setSlideOver(null));
      return;
    }

    dispatch(createSheetResourceStart('characters', charSheet._id, 'usables', { name, type, description, quantity }));

    dispatch(setSlideOver(null));
  };

  return (
    <SlideOverForm
      title={id ? 'Edit Usable' : 'New Usable'}
      description={id ? 'Update the information below to edit your usable.' : 'Fill out the information below to create your new usable.'}
      submitText={id ? 'Save usable' : 'Create usable'}
      submitHandler={submitHandler}
    >
      <Input slideOver label="Name" name="name" type="text" value={name} changeHandler={setName} />
      <Select
        slideOver
        label="Type"
        name="type"
        value={type}
        options={[
          { name: 'Common', id: 'Common' },
          { name: 'Unique', id: 'Unique' },
          { name: 'Rare', id: 'Rare' },
          { name: 'Coveted', id: 'Coveted' },
        ]}
        changeHandler={selectType}
      />
      <TextArea slideOver label="Description" name="description" rows={4} value={description} changeHandler={setDescription} />
      <Input slideOver label="Quantity" name="quantity" type="number" value={quantity} changeHandler={setQuantity} />
    </SlideOverForm>
  );
};

export default Usable;
