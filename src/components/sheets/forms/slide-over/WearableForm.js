import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { selectCurrentCharacter, selectEquipmentMods } from '../../../../redux/character/character.selectors';
import { selectCurrentCampaign } from '../../../../redux/campaign/campaign.selectors';

import { createSheetResourceStart, updateSheetResourceStart, updateSheetStart } from '../../../../redux/sheet/sheet.actions';

import { calculateNewCurrentHp } from '../../../../utils/updateHealth';
import { correctStatMod } from '../../../../utils/equipBelonging';

import { SlideOverForm } from '../../../../layouts/components/app/SlideOver';

import Input from '../../../shared/form/Input';
import TextArea from '../../../shared/form/TextArea';
import Select from '../../../shared/form/Select';

const WearableForm = ({ id, data }) => {
  const dispatch = useDispatch();

  const charSheet = useSelector(selectCurrentCharacter);
  const campSheet = useSelector(selectCurrentCampaign);
  const equipmentMods = useSelector(selectEquipmentMods);

  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [bodyArea, setBodyArea] = useState('');
  const [fortitude, setFortitude] = useState(0);
  const [agility, setAgility] = useState(0);
  const [persona, setPersona] = useState(0);
  const [aptitude, setAptitude] = useState(0);
  const [equipped, setEquipped] = useState(false);

  useEffect(() => {
    if (data.sheetType === 'characters') {
      if (id && charSheet) {
        const currentWearable = charSheet.wearables.find(wearable => wearable._id === id);

        setName(currentWearable.name);
        setDescription(currentWearable.description);
        setBodyArea(currentWearable.bodyArea);
        setFortitude(currentWearable.statMods.fortitude);
        setAgility(currentWearable.statMods.agility);
        setPersona(currentWearable.statMods.persona);
        setAptitude(currentWearable.statMods.aptitude);
        setEquipped(currentWearable.equipped);
      }
    }

    if (data.sheetType === 'campaigns') {
      if (id && campSheet) {
        const currentWearable = campSheet.wearables.find(wearable => wearable._id === id);

        setName(currentWearable.name);
        setDescription(currentWearable.description);
        setBodyArea(currentWearable.bodyArea);
        setFortitude(currentWearable.statMods.fortitude);
        setAgility(currentWearable.statMods.agility);
        setPersona(currentWearable.statMods.persona);
        setAptitude(currentWearable.statMods.aptitude);
        setEquipped(currentWearable.equipped);
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

    if (data.sheetType === 'characters' && equipped) {
      const currentWearable = charSheet.wearables.find(wearable => wearable._id === id);

      let body = {};

      if (currentWearable.statMods.fortitude !== fortitude) {
        // Get the difference of the new and old fortidue mod
        const diff = fortitude - currentWearable.statMods.fortitude;

        const newFortitudeModifier = correctStatMod(equipmentMods.fortitude + diff);

        body.fortitude = {
          ...charSheet.fortitude,
          modifier: newFortitudeModifier,
        };

        // Calculate the new maxHp
        const newMaxHp = (newFortitudeModifier + charSheet.fortitude.points) * 5;

        body.currentHp = calculateNewCurrentHp(charSheet.currentHp, charSheet.maxHp, newMaxHp);
      }

      if (currentWearable.statMods.agility !== agility) {
        // Get the difference of the new and old agility mod
        const diff = agility - currentWearable.statMods.agility;

        body.agility = {
          ...charSheet.agility,
          modifier: correctStatMod(equipmentMods.agility + diff),
        };
      }

      if (currentWearable.statMods.persona !== persona) {
        // Get the difference of the new and old persona mod
        const diff = persona - currentWearable.statMods.persona;

        body.persona = {
          ...charSheet.persona,
          modifier: correctStatMod(equipmentMods.persona + diff),
        };
      }

      if (currentWearable.statMods.aptitude !== aptitude) {
        // Get the difference of the new and old aptitude mod
        const diff = aptitude - currentWearable.statMods.aptitude;

        body.aptitude = {
          ...charSheet.aptitude,
          modifier: correctStatMod(equipmentMods.aptitude + diff),
        };
      }

      // Update the sheet with the mod changes
      dispatch(updateSheetStart('characters', charSheet._id, body));
    }

    const sheetId = data.sheetType === 'campaigns' ? campSheet._id : charSheet._id;

    if (id) {
      dispatch(updateSheetResourceStart(data.sheetType, sheetId, 'wearables', id, { name, bodyArea, description, statMods: { fortitude, agility, persona, aptitude } }, { slideOver: true }));
      return;
    }

    dispatch(createSheetResourceStart(data.sheetType, sheetId, 'wearables', { name, bodyArea, description, statMods: { fortitude, agility, persona, aptitude } }, { slideOver: true }));
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

export default WearableForm;
