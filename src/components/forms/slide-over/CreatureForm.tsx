import { FormEvent, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';

import { createSheetResourceStart, updateSheetResourceStart } from '../../../redux/sheet/sheet.actions';

import { useResource } from '../../../hooks/useResource';

import { CreatureType, FetchedResourceType } from '../../../models/resource';
import { Creature, Type } from '../../../models/sheet/resources';
import { SheetResourceType, SheetType, StatType } from '../../../models/sheet';

import { SlideOverForm } from '../SlideOver';

import Input from '../elements/Input';
import TextArea from '../elements/TextArea';
import Select from '../elements/Select';
import CheckboxGroup, { BasicCheckbox } from '../elements/CheckboxGroup';
import { LoadingSpinner } from '../elements/SubmitButton';
import Row from '../elements/Row';

interface Props {
  data: {
    sheetId: string;
    creature?: Creature;
  };
}

const CreatureForm: React.FC<Props> = ({ data }) => {
  const dispatch = useDispatch();

  const creatureTypes = useResource(FetchedResourceType.CreatureTypes) as CreatureType[];

  const typesOptions: Type[] = (creatureTypes || []).map(type => ({
    universalId: type.id,
    name: type.name,
    description: type.summary,
  }));

  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [damageLevel, setDamageLevel] = useState(1);
  const [types, setTypes] = useState<Type[]>([]);
  const [attackingStat, setAttackingStat] = useState<StatType | ''>('');
  const [health, setHealth] = useState(10);
  const [shieldValue, setShieldValue] = useState(0);
  const [speed, setSpeed] = useState(3);
  const [strength, setStrength] = useState(2);
  const [agility, setAgility] = useState(2);
  const [persona, setPersona] = useState(2);
  const [aptitude, setAptitude] = useState(2);

  useEffect(() => {
    if (data.creature) {
      setName(data.creature.name);
      setDescription(data.creature.description);
      setDamageLevel(data.creature.damageLevel);
      setTypes(data.creature.types);
      setAttackingStat(data.creature.attackingStat);
      setShieldValue(data.creature.shieldValue);
      setSpeed(data.creature.speed);
    }
  }, [data.creature]);

  const submitHandler = async (e: FormEvent) => {
    e.preventDefault();

    let types: Type[] = [];

    typesOptions.forEach(type => {
      // @ts-ignore
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

    let body: any = {
      name,
      description,
      damageLevel,
      attackingStat,
      types,
      maxHp: health,
      shieldValue,
      speed,
    };

    if (data.creature) {
      dispatch(
        updateSheetResourceStart(SheetType.campaigns, data.sheetId, SheetResourceType.creatures, data.creature._id, body, {
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
      createSheetResourceStart(SheetType.campaigns, data.sheetId, SheetResourceType.creatures, body, {
        slideOver: true,
        notification: { status: 'success', heading: 'Creature Created', message: `You have successfully created ${name}.` },
      })
    );
  };

  return (
    <SlideOverForm
      title={data.creature ? 'Edit Creature' : 'New Creature'}
      description={data.creature ? 'Update the information below to edit your creature.' : 'Fill out the information below to create your new creature.'}
      submitText={data.creature ? 'Save creature' : 'Create creature'}
      submitHandler={submitHandler}
    >
      <Input slideOver label="Name" name="name" type="text" value={name} changeHandler={setName} required />
      <TextArea slideOver label="Description" name="description" rows={4} value={description} changeHandler={setDescription} required />

      {typesOptions ? (
        <CheckboxGroup slideOver label="Types">
          {typesOptions.map(type => (
            <BasicCheckbox key={type.universalId} heading={type.name} checked={Boolean(types.find(tp => tp.universalId === type.universalId))} description={type.description} name={type.universalId} />
          ))}
        </CheckboxGroup>
      ) : (
        <Row slideOver name="types" label="Types">
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
        changeHandler={setAttackingStat}
        required
      />

      <Input slideOver label="Damage Level" name="damageLevel" type="number" min="1" max="10" value={damageLevel} changeHandler={setDamageLevel} required />
      <Input slideOver label="Health (Max)" name="health" type="number" value={health} changeHandler={setHealth} required />

      {!data.creature && (
        <>
          <Input slideOver label="Shield Value" name="shieldValue" type="number" value={shieldValue} changeHandler={setShieldValue} required />
          <Input slideOver label="Speed" name="speed" type="number" value={speed} changeHandler={setSpeed} required />

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
