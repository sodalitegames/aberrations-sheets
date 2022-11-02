import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { selectCurrentCharacter } from '../../../redux/character/character.selectors';
import { selectCurrentCampaign } from '../../../redux/campaign/campaign.selectors';

import { createSheetResourceStart } from '../../../redux/sheet/sheet.actions';

import { useResource } from '../../../hooks/useResource';

import { capitalize } from '../../../utils/helpers/strings';
import { FetchedResourceType } from '../../../models/resource';

import { SlideOverForm } from '../SlideOver';

import Input from '../elements/Input';
import TextArea from '../elements/TextArea';
import Select from '../elements/Select';
import Detail from '../elements/Detail';
import { LoadingSpinner } from '../elements/SubmitButton';
import Row from '../elements/Row';
import { getWeaponRangeString } from '../../../utils/helpers/belongings';

const NewWeaponForm = ({ data }) => {
  const dispatch = useDispatch();

  const charSheet = useSelector(selectCurrentCharacter);
  const campSheet = useSelector(selectCurrentCampaign);

  const fetchedWeapons = useResource(FetchedResourceType.Weapons);

  const [weapon, setWeapon] = useState(null);
  const [weaponsList, setWeaponsList] = useState([]);
  const [weaponsSelectList, setWeaponsSelectList] = useState([]);

  const [nickname, setNickname] = useState('');
  const [damageModifier, setDamageModifier] = useState(1);
  const [quantity, setQuantity] = useState(1);
  const [description, setDescription] = useState('');

  const [name, setName] = useState('');
  const [associatedStat, setAssociatedStat] = useState('');
  const [range, setRange] = useState('');
  const [ability, setAbility] = useState('');

  useEffect(() => {
    if (fetchedWeapons) {
      const mappedWeaponsList = fetchedWeapons.map(weap => {
        return {
          id: weap._id,
          universalId: weap._id,
          name: weap.name,
          ability: weap.ability,
          type: weap.type,
          associatedStat: weap.associatedStat.toLowerCase(),
          range: weap.range,
        };
      });

      let STR = [];
      let AGL = [];
      let PER = [];
      let APT = [];

      mappedWeaponsList.forEach(weap => {
        switch (weap.associatedStat) {
          case 'strength':
            STR.push(weap);
            break;
          case 'agility':
            AGL.push(weap);
            break;
          case 'persona':
            PER.push(weap);
            break;
          case 'aptitude':
            APT.push(weap);
            break;
          default:
            break;
        }
      });

      const newWeaponsList = [
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
          children: STR,
        },
        {
          name: 'Agility',
          children: AGL,
        },
        {
          name: 'Persona',
          children: PER,
        },
        {
          name: 'Aptitude',
          children: APT,
        },
      ];

      setWeaponsList(mappedWeaponsList);
      setWeaponsSelectList(newWeaponsList);
    }
  }, [fetchedWeapons]);

  const selectWeapon = e => {
    if (!e.target.value) return setWeapon(null);

    if (e.target.value === 'Custom' || e.target.value === 'Improvised') return setWeapon(e.target.value);

    const currWeapon = weaponsList.find(weapon => weapon.id === e.target.value);

    setWeapon(currWeapon);
  };

  const selectStat = e => {
    if (!e.target.value) return setAssociatedStat('');
    setAssociatedStat(e.target.value);
  };

  const selectRange = e => {
    if (!e.target.value) return setRange('');
    setRange(e.target.value);
  };

  const submitHandler = async e => {
    e.preventDefault();

    if (!weapon) return alert('Must provide a weapon');

    if (!damageModifier) return alert('Must provide damageModifier');
    if (!quantity) return alert('Must provide a quantity');

    const sheetId = data.sheetType === 'campaigns' ? campSheet._id : charSheet._id;

    if (weapon === 'Custom' || weapon === 'Improvised') {
      if (!name) return alert('Must provide a name');
      if (!associatedStat) return alert('Must provide an associatedStat');
      if (!range) return alert('Must provide a range');

      dispatch(
        createSheetResourceStart(
          data.sheetType,
          sheetId,
          'weapons',
          { type: weapon, name, nickname, associatedStat, damageModifier, range, ability, quantity, description },
          { slideOver: true, notification: { status: 'success', heading: 'Weapon Created', message: `You have successfully created ${nickname || name}.` } }
        )
      );
      return;
    }

    dispatch(
      createSheetResourceStart(
        data.sheetType,
        sheetId,
        'weapons',
        {
          type: weapon.type,
          name: weapon.name,
          nickname,
          associatedStat: weapon.associatedStat,
          damageModifier,
          range: weapon.range,
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
      {fetchedWeapons && weaponsSelectList ? (
        <>
          <Select slideOver label="Choose a Weapon" name="weapons" options={weaponsSelectList} changeHandler={selectWeapon} />

          {weapon && (weapon === 'Custom' || weapon === 'Improvised') ? (
            <>
              <Detail slideOver label="Type" detail={weapon} />
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
                changeHandler={selectStat}
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
                changeHandler={selectRange}
                required
              />
              <Input slideOver label="Quantity" name="quantity" type="number" value={quantity} changeHandler={setQuantity} required />
              <TextArea slideOver label="Ability (Opt.)" name="ability" rows={4} value={ability} changeHandler={setAbility} />
              <TextArea slideOver label="Description (Opt.)" name="description" rows={4} value={description} changeHandler={setDescription} />
            </>
          ) : weapon ? (
            <>
              <Detail slideOver label="Type" detail={weapon.type} />
              <Detail slideOver label="Name" detail={weapon.name} />
              <Input slideOver label="Nickname (Opt.)" name="nickname" type="text" value={nickname} changeHandler={setNickname} />
              <Detail slideOver label="Associated Stat" detail={capitalize(weapon.associatedStat)} />
              <Input slideOver label="Damage Modifier" name="damageModifier" type="number" value={damageModifier} changeHandler={setDamageModifier} required />
              <Detail slideOver label="Range" detail={getWeaponRangeString(weapon.range)} />
              <Detail slideOver label="Ability" detail={weapon.ability} />
              <Input slideOver label="Quantity" name="quantity" type="number" value={quantity} changeHandler={setQuantity} required />
              <TextArea slideOver label="Description (Opt.)" name="description" rows={5} value={description} changeHandler={setDescription} />
            </>
          ) : null}
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
