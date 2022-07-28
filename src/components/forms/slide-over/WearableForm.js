import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { selectCurrentCharacter } from '../../../redux/character/character.selectors';
import { selectCurrentCampaign } from '../../../redux/campaign/campaign.selectors';

import { createSheetResourceStart, updateSheetResourceStart } from '../../../redux/sheet/sheet.actions';

import { SlideOverForm } from '../SlideOver';

import Input from '../elements/Input';
import TextArea from '../elements/TextArea';
import Select from '../elements/Select';

const WearableForm = ({ id, data }) => {
  const dispatch = useDispatch();

  const charSheet = useSelector(selectCurrentCharacter);
  const campSheet = useSelector(selectCurrentCampaign);

  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [bodyArea, setBodyArea] = useState('');
  const [shieldValue, setShieldValue] = useState(0);
  const [speedAdjustment, setSpeedAdjustment] = useState(0);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    if (data.sheetType === 'characters') {
      if (id && charSheet) {
        const currentWearable = charSheet.wearables.find(wearable => wearable._id === id);

        setName(currentWearable.name);
        setDescription(currentWearable.description);
        setBodyArea(currentWearable.bodyArea);
        setShieldValue(currentWearable.shieldValue);
        setSpeedAdjustment(currentWearable.speedAdjustment);
        setQuantity(currentWearable.quantity);
      }
    }

    if (data.sheetType === 'campaigns') {
      if (id && campSheet) {
        const currentWearable = campSheet.wearables.find(wearable => wearable._id === id);

        setName(currentWearable.name);
        setDescription(currentWearable.description);
        setBodyArea(currentWearable.bodyArea);
        setShieldValue(currentWearable.shieldValue);
        setSpeedAdjustment(currentWearable.speedAdjustment);
        setQuantity(currentWearable.quantity);
      }
    }
  }, [id, data.sheetType, charSheet, campSheet]);

  const selectBodyArea = e => {
    if (!e.target.value) return setBodyArea(null);
    setBodyArea(e.target.value);
  };

  const submitHandler = async e => {
    e.preventDefault();

    if (!name) return alert('Must provide a name');
    if (!bodyArea) return alert('Must provide a bodyArea');
    if (!description) return alert('Must provide a description');
    if (!quantity) return alert('Must provide a quantity');

    const sheetId = data.sheetType === 'campaigns' ? campSheet._id : charSheet._id;

    if (id) {
      dispatch(
        updateSheetResourceStart(
          data.sheetType,
          sheetId,
          'wearables',
          id,
          { name, bodyArea, description, shieldValue, speedAdjustment, quantity },
          { slideOver: true, notification: { status: 'success', heading: 'Wearable Updated', message: `You have successfully updated ${name}.` } }
        )
      );
      return;
    }

    dispatch(
      createSheetResourceStart(
        data.sheetType,
        sheetId,
        'wearables',
        { name, bodyArea, description, shieldValue, speedAdjustment, quantity },
        { slideOver: true, notification: { status: 'success', heading: 'Wearable Created', message: `You have successfully created ${name}.` } }
      )
    );
  };

  return (
    <SlideOverForm
      title={id ? 'Edit Wearable' : 'New Wearable'}
      description={id ? 'Update the information below to edit your wearable.' : 'Fill out the information below to create your new wearable.'}
      submitText={id ? 'Save wearable' : 'Create wearable'}
      submitHandler={submitHandler}
    >
      <Input slideOver label="Name" name="name" type="text" value={name} changeHandler={setName} required />
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
        required
      />
      <TextArea slideOver label="Description" name="description" rows={4} value={description} changeHandler={setDescription} required />
      <Input slideOver label="Shield Value" name="shieldValue" type="number" value={shieldValue} changeHandler={setShieldValue} />
      <Input slideOver label="Speed Adjustment" name="speedAdjustment" type="number" value={speedAdjustment} changeHandler={setSpeedAdjustment} />
      <Input slideOver label="Quantity" name="quantity" type="number" value={quantity} changeHandler={setQuantity} required />
    </SlideOverForm>
  );
};

export default WearableForm;
