import { FormEvent, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';

import { updateSheetResourceStart } from '../../../redux/sheet/sheet.actions';

import { capitalize } from '../../../utils/helpers/strings';
import { getWeaponRangeLabel } from '../../../utils/helpers/belongings';

import { SlideOverForm } from '../SlideOver';

import Input from '../elements/Input';
import TextArea from '../elements/TextArea';
import Select from '../elements/Select';
import Detail from '../elements/Detail';

import { Range, Weapon } from '../../../models/sheet/resources';
import { SheetResourceType, SheetType } from '../../../models/sheet';

interface Props {
  data: {
    sheetType: SheetType;
    sheetId: string;
    weapon: Weapon;
  };
}

const EditWeaponForm: React.FC<Props> = ({ data }) => {
  const dispatch = useDispatch();

  const [type, setType] = useState('');
  const [name, setName] = useState('');
  const [nickname, setNickname] = useState('');
  const [associatedStat, setAssociatedStat] = useState('');
  const [damageModifier, setDamageModifier] = useState(1);
  const [range, setRange] = useState('');
  const [ability, setAbility] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [description, setDescription] = useState('');

  useEffect(() => {
    setType(data.weapon.type);
    setName(data.weapon.name);
    setNickname(data.weapon.nickname);
    setAssociatedStat(data.weapon.associatedStat);
    setDamageModifier(data.weapon.damageModifier);
    setRange(data.weapon.range);
    setAbility(data.weapon.ability);
    setQuantity(data.weapon.quantity);
    setDescription(data.weapon.description);
  }, [data.weapon]);

  const submitHandler = async (e: FormEvent) => {
    e.preventDefault();

    if (!damageModifier) return alert('Must provide damageModifier');
    if (!quantity) return alert('Must provide a quantity');

    if (type === 'Custom' || type === 'Improvised') {
      if (!name) return alert('Must provide a name');
      if (!associatedStat) return alert('Must provide an associatedStat');
      if (!range) return alert('Must provide a range');

      dispatch(
        updateSheetResourceStart(
          data.sheetType,
          data.sheetId,
          SheetResourceType.weapons,
          data.weapon._id,
          { name, nickname, associatedStat, damageModifier, range, ability, quantity, description },
          { slideOver: true, notification: { status: 'success', heading: 'Weapon Updated', message: `You have successfully updated ${nickname || name}.` } }
        )
      );
      return;
    }

    dispatch(
      updateSheetResourceStart(
        data.sheetType,
        data.sheetId,
        SheetResourceType.weapons,
        data.weapon._id,
        {
          nickname,
          damageModifier,
          description,
          quantity,
        },
        { slideOver: true, notification: { status: 'success', heading: 'Weapon Updated', message: `You have successfully updated ${name}.` } }
      )
    );
  };

  return (
    <SlideOverForm title="Edit Weapon" description="Update the information below to edit your weapon." submitText="Save weapon" submitHandler={submitHandler}>
      {type === 'Custom' || type === 'Improvised' ? (
        <>
          <Detail slideOver label="Type" detail={type} />
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
          <Input slideOver label="Level" name="damageModifier" type="number" value={damageModifier} changeHandler={setDamageModifier} required />
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
      ) : type === 'Standard' ? (
        <>
          <Detail slideOver label="Type" detail={type} />
          <Detail slideOver label="Name" detail={name} />
          <Input slideOver label="Nickname (Opt.)" name="nickname" type="text" value={nickname} changeHandler={setNickname} />
          <Detail slideOver label="Associated Stat" detail={capitalize(associatedStat)} />
          <Input slideOver label="Damage Modifier" name="damageModifier" type="number" value={damageModifier} changeHandler={setDamageModifier} required />
          <Detail slideOver label="Range" detail={getWeaponRangeLabel(range as Range)} />
          <Detail slideOver label="Ability" detail={ability} />
          <Input slideOver label="Quantity" name="quantity" type="number" value={quantity} changeHandler={setQuantity} required />
          <TextArea slideOver label="Description (Opt.)" name="description" rows={5} value={description} changeHandler={setDescription} />
        </>
      ) : null}
    </SlideOverForm>
  );
};

export default EditWeaponForm;
