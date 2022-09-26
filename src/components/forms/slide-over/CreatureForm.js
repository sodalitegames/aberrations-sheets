import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { selectCurrentCampaign } from '../../../redux/campaign/campaign.selectors';

import { createSheetResourceStart, updateSheetResourceStart } from '../../../redux/sheet/sheet.actions';

import { useResource } from '../../../hooks/useResource';

import { ResourceType } from '../../../models/enums';

import { SlideOverForm } from '../SlideOver';

import Input from '../elements/Input';
import TextArea from '../elements/TextArea';
import Select from '../elements/Select';
import CheckboxGroup, { Checkbox } from '../elements/CheckboxGroup';
import { LoadingSpinner } from '../elements/SubmitButton';
import Row from '../elements/Row';

const CreatureForm = ({ id }) => {
  const dispatch = useDispatch();

  const campSheet = useSelector(selectCurrentCampaign);

  const creatureTypes = useResource(ResourceType.CreatureTypes);

  const [typesList, setTypesList] = useState([]);

  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [damageLevel, setDamageLevel] = useState(1);
  const [types, setTypes] = useState([]);
  const [attackingStat, setAttackingStat] = useState('');
  const [health, setHealth] = useState(10);

  // Only needed if creating
  const [strength, setStrength] = useState(2);
  const [agility, setAgility] = useState(2);
  const [persona, setPersona] = useState(2);
  const [aptitude, setAptitude] = useState(2);

  useEffect(() => {
    if (creatureTypes) {
      const newTypesList = creatureTypes.map(type => {
        return {
          universalId: type._id,
          name: type.name,
          description: type.summary,
        };
      });

      setTypesList(newTypesList);
    }
  }, [creatureTypes]);

  useEffect(() => {
    if (id && campSheet) {
      const currentCreature = campSheet.creatures.find(creature => creature._id === id);

      setName(currentCreature.name);
      setDescription(currentCreature.description);
      setDamageLevel(currentCreature.damageLevel);
      setTypes(currentCreature.types);
      setAttackingStat(currentCreature.attackingStat);
    }
  }, [id, campSheet]);

  const selectStat = e => {
    if (!e.target.value) return setAttackingStat(null);
    setAttackingStat(e.target.value);
  };

  const submitHandler = async e => {
    e.preventDefault();

    let types = [];

    typesList.forEach(type => {
      if (e.target[type.universalId].checked) {
        types.push(type);
      }
    });

    if (!types.length) return alert('Must select at least one type');

    if (!name) return alert('Must provide a name');
    if (!description) return alert('Must provide a description');
    if (!damageLevel) return alert('Must provide a damageLevel');
    if (!attackingStat) return alert('Must provide an attackingStat');
    if (!health) return alert('Must provide a health');

    let body = {
      name,
      description,
      damageLevel,
      attackingStat,
      types,
      maxHp: health,
    };

    if (id) {
      dispatch(
        updateSheetResourceStart('campaigns', campSheet._id, 'creatures', id, body, {
          slideOver: true,
          notification: { status: 'success', heading: 'Creature Updated', message: `You have successfully updated ${name}.` },
        })
      );
      return;
    }

    if (!strength) return alert('Must provide a strength value');
    if (!agility) return alert('Must provide an agility value');
    if (!persona) return alert('Must provide a persona value');
    if (!aptitude) return alert('Must provide a aptitude value');

    body = {
      ...body,
      strength: { die: strength },
      agility: { die: agility },
      persona: { die: persona },
      aptitude: { die: aptitude },
      currentHp: health,
    };

    dispatch(
      createSheetResourceStart('campaigns', campSheet._id, 'creatures', body, {
        slideOver: true,
        notification: { status: 'success', heading: 'Creature Created', message: `You have successfully created ${name}.` },
      })
    );
  };

  return (
    <SlideOverForm
      title={id ? 'Edit Creature' : 'New Creature'}
      description={id ? 'Update the information below to edit your creature.' : 'Fill out the information below to create your new creature.'}
      submitText={id ? 'Save creature' : 'Create creature'}
      submitHandler={submitHandler}
    >
      <Input slideOver label="Name" name="name" type="text" value={name} changeHandler={setName} required />
      <TextArea slideOver label="Description" name="description" rows={4} value={description} changeHandler={setDescription} required />

      {creatureTypes && typesList ? (
        <CheckboxGroup slideOver label="Types">
          {typesList.map(type => (
            <Checkbox
              key={type.universalId}
              heading={type.name}
              checked={id ? !!types.find(tp => tp.universalId === type.universalId) : false}
              description={type.description}
              name={type.universalId}
            />
          ))}
        </CheckboxGroup>
      ) : (
        <Row slideOver label="Types">
          <LoadingSpinner dark />
        </Row>
      )}

      <Select
        slideOver
        label="Attacking Stat"
        name="attackingStat"
        value={attackingStat}
        options={[
          { name: 'Strength', id: 'strength' },
          { name: 'Agility', id: 'agility' },
          { name: 'Persona', id: 'persona' },
          { name: 'Aptitude', id: 'aptitude' },
        ]}
        changeHandler={selectStat}
        required
      />

      <Input slideOver label="Damage Level" name="damageLevel" type="number" min="1" max="10" value={damageLevel} changeHandler={setDamageLevel} required />
      <Input slideOver label="Health (Max)" name="health" type="number" value={health} changeHandler={setHealth} required />

      {!id && (
        <>
          <Input slideOver label="Strength" name="strength" type="number" min="2" max="20" step="2" value={strength} changeHandler={setStrength} required />
          <Input slideOver label="Agility" name="agility" type="number" min="2" max="20" step="2" value={agility} changeHandler={setAgility} required />
          <Input slideOver label="Persona" name="persona" type="number" min="2" max="20" step="2" value={persona} changeHandler={setPersona} required />
          <Input slideOver label="Aptitude" name="aptitude" type="number" min="2" max="20" step="2" value={aptitude} changeHandler={setAptitude} required />
        </>
      )}
    </SlideOverForm>
  );
};

export default CreatureForm;
