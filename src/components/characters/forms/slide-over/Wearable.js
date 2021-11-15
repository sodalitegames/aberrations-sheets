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

const Wearable = ({ id }) => {
  const [charSheet, setCharSheet] = useRecoilState(charSheetState);
  const setSlideOver = useSetRecoilState(slideOverState);

  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [bodyArea, setBodyArea] = useState('');
  const [fortitude, setFortitude] = useState(0);
  const [agility, setAgility] = useState(0);
  const [persona, setPersona] = useState(0);
  const [aptitude, setAptitude] = useState(0);

  useEffect(() => {
    if (id && charSheet) {
      const currentWearable = charSheet.wearables.find(wearable => wearable._id === id);

      setName(currentWearable.name);
      setDescription(currentWearable.description);
      setBodyArea(currentWearable.bodyArea);
      setFortitude(currentWearable.statMods.fortitude);
      setAgility(currentWearable.statMods.agility);
      setPersona(currentWearable.statMods.persona);
      setAptitude(currentWearable.statMods.aptitude);
    }
  }, [id, charSheet]);

  const selectBodyArea = e => {
    if (!e.target.value) return setBodyArea(null);
    setBodyArea(e.target.value);
  };

  const submitHandler = async e => {
    e.preventDefault();

    if (!name) return alert('Must provide a name');
    if (!bodyArea) return alert('Must provide a bodyArea');
    if (!description) return alert('Must provide a description');

    if (id) {
      const response = await updateResource('characters', charSheet._id, 'wearables', id, { name, bodyArea, description, statMods: { fortitude, agility, persona, aptitude } });
      console.log(response.data.data);
      setCharSheet(oldCharSheet => {
        console.log(oldCharSheet);
        return { ...oldCharSheet, wearables: replaceItemById(oldCharSheet.wearables, id, response.data.data.doc) };
      });

      setSlideOver(null);
      return;
    }

    const response = await createResource('characters', charSheet._id, 'wearables', { name, bodyArea, description, statMods: { fortitude, agility, persona, aptitude } });

    setCharSheet(oldCharSheet => {
      console.log(oldCharSheet);
      return { ...oldCharSheet, wearables: [response.data.data.doc, ...oldCharSheet.wearables] };
    });

    setSlideOver(null);
  };

  return (
    <SlideOverForm
      title={id ? 'Edit Wearable' : 'New Wearable'}
      description={id ? 'Update the information below to edit your wearable.' : 'Fill out the information below to create your new wearable.'}
      submitText={id ? 'Save wearable' : 'Create wearable'}
      submitHandler={submitHandler}
    >
      <Input slideOver label="Name" name="name" type="text" value={name} changeHandler={setName} />
      <Select
        slideOver
        label="Body Area"
        name="bodyArea"
        value={bodyArea}
        options={[
          { name: 'Head', id: 'head' },
          { name: 'Face', id: 'face' },
          { name: 'Torso', id: 'torso' },
          { name: 'Arms', id: 'arms' },
          { name: 'Hands', id: 'hands' },
          { name: 'Legs', id: 'legs' },
          { name: 'Feet', id: 'feet' },
        ]}
        changeHandler={selectBodyArea}
      />
      <TextArea slideOver label="Description" name="description" rows={4} value={description} changeHandler={setDescription} />
      <Input slideOver label="Fortitude Mod" name="fortitude" type="number" value={fortitude} changeHandler={setFortitude} />
      <Input slideOver label="Agility Mod" name="agility" type="number" value={agility} changeHandler={setAgility} />
      <Input slideOver label="Persona Mod" name="persona" type="number" value={persona} changeHandler={setPersona} />
      <Input slideOver label="Aptitude Mod" name="aptitude" type="number" value={aptitude} changeHandler={setAptitude} />
    </SlideOverForm>
  );
};

export default Wearable;
