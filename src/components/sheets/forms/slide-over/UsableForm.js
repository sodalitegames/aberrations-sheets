import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { selectCurrentCharacter } from '../../../../redux/character/character.selectors';
import { selectCurrentCampaign } from '../../../../redux/campaign/campaign.selectors';

import { createSheetResourceStart, updateSheetResourceStart } from '../../../../redux/sheet/sheet.actions';

import { SlideOverForm } from '../../../../layouts/components/app/SlideOver';

import Input from '../../../shared/form/Input';
import TextArea from '../../../shared/form/TextArea';
import Select from '../../../shared/form/Select';
import Toggle from '../../../shared/form/Toggle';

const UsableForm = ({ id, data }) => {
  const dispatch = useDispatch();

  const charSheet = useSelector(selectCurrentCharacter);
  const campSheet = useSelector(selectCurrentCampaign);

  const [name, setName] = useState('');
  const [type, setType] = useState('');
  const [description, setDescription] = useState('');
  const [equippable, setEquippable] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const [units, setUnits] = useState('');

  useEffect(() => {
    if (data.sheetType === 'characters') {
      if (id && charSheet) {
        const currentUsable = charSheet.usables.find(usable => usable._id === id);

        setName(currentUsable.name);
        setType(currentUsable.type);
        setDescription(currentUsable.description);
        setEquippable(currentUsable.equippable);
        setQuantity(currentUsable.quantity);
        setUnits(currentUsable.units || '');
      }
    }

    if (data.sheetType === 'campaigns') {
      if (id && campSheet) {
        const currentUsable = campSheet.usables.find(usable => usable._id === id);

        setName(currentUsable.name);
        setType(currentUsable.type);
        setDescription(currentUsable.description);
        setEquippable(currentUsable.equippable);
        setQuantity(currentUsable.quantity);
        setUnits(currentUsable.units || '');
      }
    }
  }, [id, data.sheetType, charSheet, campSheet]);

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
    if (!units) return alert('Must provide a unit of measurement');

    const sheetId = data.sheetType === 'campaigns' ? campSheet._id : charSheet._id;

    if (id) {
      dispatch(
        updateSheetResourceStart(
          data.sheetType,
          sheetId,
          'usables',
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
        'usables',
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
      submitHandler={submitHandler}
    >
      <Input slideOver label="Name" name="name" type="text" value={name} changeHandler={setName} required />
      <Select
        slideOver
        label="Type"
        name="type"
        value={type}
        options={[
          { name: 'Common', id: 'Common' },
          { name: 'Semi-Common', id: 'Semi-Common' },
          { name: 'Rare', id: 'Rare' },
          { name: 'Collectible', id: 'Collectible' },
          { name: 'One of A Kind', id: 'One of A Kind' },
        ]}
        changeHandler={selectType}
        required
      />
      <TextArea slideOver label="Description" name="description" rows={4} value={description} changeHandler={setDescription} required />
      <Toggle slideOver label="Equippable" name="equippable" enabled={equippable} setEnabled={setEquippable} />
      <Input slideOver label="Quantity" name="quantity" type="text" value={quantity} changeHandler={setQuantity} required />
      <Input slideOver label="Units" name="units" type="text" value={units} changeHandler={setUnits} required />
    </SlideOverForm>
  );
};

export default UsableForm;
