import { useEffect, useState } from 'react';
import { useRecoilState, useSetRecoilState } from 'recoil';

import { charSheetState } from '../../../../recoil/character/character.atoms';
import { slideOverState } from '../../../../recoil/app/app.atoms';

import { createResource, updateResource } from '../../../../apis/sheets.api';

import { replaceItemById } from '../../../../utils/arrays';

import { SlideOverForm } from '../../../../layouts/components/app/SlideOver';

import Input from '../../../shared/Input';
import TextArea from '../../../shared/TextArea';
import Select from '../../../shared/Select';

const Usable = ({ id }) => {
  const [charSheet, setCharSheet] = useRecoilState(charSheetState);
  const setSlideOver = useSetRecoilState(slideOverState);

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
      const response = await updateResource('characters', charSheet._id, 'usables', id, { name, type, description, quantity });
      console.log(response.data.data);
      setCharSheet(oldCharSheet => {
        console.log(oldCharSheet);
        return { ...oldCharSheet, usables: replaceItemById(oldCharSheet.usables, id, response.data.data.doc) };
      });

      setSlideOver(null);
      return;
    }

    const response = await createResource('characters', charSheet._id, 'usables', { name, type, description, quantity });

    setCharSheet(oldCharSheet => {
      console.log(oldCharSheet);
      return { ...oldCharSheet, usables: [response.data.data.doc, ...oldCharSheet.usables] };
    });

    setSlideOver(null);
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
