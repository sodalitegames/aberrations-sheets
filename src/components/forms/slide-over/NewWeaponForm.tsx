import { FormEvent, useState } from 'react';
import { useDispatch } from 'react-redux';

import { createSheetResourceStart } from '../../../redux/sheet/sheet.actions';

import { useResource } from '../../../hooks/useResource';

import { capitalize } from '../../../utils/helpers/strings';
import { getWeaponRangeString } from '../../../utils/helpers/belongings';

import { FetchedResourceType, Weapon } from '../../../models/resource';
import { SheetResourceType, SheetType } from '../../../models/sheet';
import { Range } from '../../../models/sheet/resources';

import { SlideOverForm } from '../SlideOver';

import Input from '../elements/Input';
import TextArea from '../elements/TextArea';
import Select from '../elements/Select';
import Detail from '../elements/Detail';
import { LoadingSpinner } from '../elements/SubmitButton';
import Row from '../elements/Row';

interface Props {
  data: {
    sheetType: SheetType;
    sheetId: string;
  };
}

const NewWeaponForm: React.FC<Props> = ({ data }) => {
  const dispatch = useDispatch();

  const fetchedWeapons = useResource(FetchedResourceType.Weapons) as Weapon[];

  const weapons = (fetchedWeapons || []).map(weap => ({
    id: weap.id,
    universalId: weap.id,
    name: weap.name,
    ability: weap.ability,
    type: weap.type,
    associatedStat: weap.stat.toLowerCase(),
    range: weap.range,
  }));

  const options = [
    {
      name: 'Custom Weapon',
      id: 'Custom',
    },
    {
      name: 'Improvised Weapon',
      id: 'Improvised',
    },
    {
      name: 'Strength',
      id: 'Standard',
      children: weapons.filter(weap => weap.associatedStat === 'strength'),
    },
    {
      name: 'Agility',
      id: 'Standard',
      children: weapons.filter(weap => weap.associatedStat === 'agility'),
    },
    {
      name: 'Persona',
      id: 'Standard',
      children: weapons.filter(weap => weap.associatedStat === 'persona'),
    },
    {
      name: 'Aptitude',
      id: 'Standard',
      children: weapons.filter(weap => weap.associatedStat === 'aptitude'),
    },
  ];

  const [nickname, setNickname] = useState('');
  const [damageModifier, setDamageModifier] = useState(1);
  const [quantity, setQuantity] = useState(1);
  const [description, setDescription] = useState('');
  const [name, setName] = useState('');
  const [associatedStat, setAssociatedStat] = useState('');
  const [range, setRange] = useState('');
  const [ability, setAbility] = useState('');

  const [weaponId, setWeaponId] = useState<string>('');

  const weapon = weapons.find(weap => weap.id === weaponId);

  const submitHandler = async (e: FormEvent) => {
    e.preventDefault();

    if (!damageModifier) return alert('Must provide damageModifier');
    if (!quantity) return alert('Must provide a quantity');

    if (weaponId === 'Custom' || weaponId === 'Improvised') {
      if (!name) return alert('Must provide a name');
      if (!associatedStat) return alert('Must provide an associatedStat');
      if (!range) return alert('Must provide a range');

      dispatch(
        createSheetResourceStart(
          data.sheetType,
          data.sheetId,
          SheetResourceType.weapons,
          { type: weaponId, name, nickname, associatedStat, damageModifier, range, ability, quantity, description },
          { slideOver: true, notification: { status: 'success', heading: 'Weapon Created', message: `You have successfully created ${nickname || name}.` } }
        )
      );
      return;
    }

    if (!weapon) return alert('Must provide a weapon');

    dispatch(
      createSheetResourceStart(
        data.sheetType,
        data.sheetId,
        SheetResourceType.weapons,
        {
          type: capitalize(weapon.type),
          name: weapon.name,
          nickname,
          associatedStat: weapon.associatedStat,
          damageModifier,
          range: capitalize(weapon.range),
          ability: weapon.ability,
          quantity,
          description,
          universalId: weapon.universalId,
        },
        { slideOver: true, notification: { status: 'success', heading: 'Weapon Created', message: `You have successfully created ${nickname || weapon.name}.` } }
      )
    );
  };

  return (
    <SlideOverForm title="New Weapon" description="Fill out the information below to create your new weapon." submitText="Create weapon" submitHandler={submitHandler}>
      {options ? (
        <>
          <Select slideOver label="Choose a Weapon" name="weapons" options={options} value={weaponId} changeHandler={setWeaponId} />

          {weaponId === 'Custom' || weaponId === 'Improvised' ? (
            <>
              <Detail slideOver label="Type" detail={weaponId} />
              <Input slideOver label="Name" name="name" type="text" value={name} changeHandler={setName} required />
              <Input slideOver label="Nickname (Opt.)" name="nickname" type="text" value={nickname} changeHandler={setNickname} />
              <Select
                slideOver
                label="Associated Stat"
                name="associatedStat"
                value={associatedStat}
                options={[
                  { name: 'Strength', id: 'strength' },
                  { name: 'Agility', id: 'agility' },
                  { name: 'Persona', id: 'persona' },
                  { name: 'Aptitude', id: 'aptitude' },
                ]}
                changeHandler={setAssociatedStat}
                required
              />
              <Input slideOver label="Damage Modifier" name="damageModifier" type="number" value={damageModifier} changeHandler={setDamageModifier} required />
              <Select
                slideOver
                label="Range"
                name="range"
                value={range}
                options={[
                  { name: 'Close (0 - 1)', id: 'Close' },
                  { name: 'Short (2 - 4)', id: 'Short' },
                  { name: 'Long (4 - 6)', id: 'Long' },
                  { name: 'Far (6 - 10)', id: 'Far' },
                ]}
                changeHandler={setRange}
                required
              />
              <Input slideOver label="Quantity" name="quantity" type="number" value={quantity} changeHandler={setQuantity} required />
              <TextArea slideOver label="Ability (Opt.)" name="ability" rows={4} value={ability} changeHandler={setAbility} />
              <TextArea slideOver label="Description (Opt.)" name="description" rows={4} value={description} changeHandler={setDescription} />
            </>
          ) : (
            weapon && (
              <>
                <Detail slideOver label="Type" detail={capitalize(weapon.type)} />
                <Detail slideOver label="Name" detail={weapon.name} />
                <Input slideOver label="Nickname (Opt.)" name="nickname" type="text" value={nickname} changeHandler={setNickname} />
                <Detail slideOver label="Associated Stat" detail={capitalize(weapon.associatedStat)} />
                <Input slideOver label="Damage Modifier" name="damageModifier" type="number" value={damageModifier} changeHandler={setDamageModifier} required />
                <Detail slideOver label="Range" detail={getWeaponRangeString(capitalize(weapon.range) as Range)} />
                <Detail slideOver label="Ability" detail={weapon.ability} />
                <Input slideOver label="Quantity" name="quantity" type="number" value={quantity} changeHandler={setQuantity} required />
                <TextArea slideOver label="Description (Opt.)" name="description" rows={5} value={description} changeHandler={setDescription} />
              </>
            )
          )}
        </>
      ) : (
        <Row slideOver label="Choose a Weapon" name="weapons">
          <LoadingSpinner dark />
        </Row>
      )}
    </SlideOverForm>
  );
};

export default NewWeaponForm;
