import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { selectCurrentCharacter } from '../../../../redux/character/character.selectors';
import { selectWeapons } from '../../../../redux/resource/resource.selectors';

import { setSlideOver } from '../../../../redux/app/app.actions';
import { fetchResourceStart } from '../../../../redux/resource/resource.actions';
import { createSheetResourceStart } from '../../../../redux/sheet/sheet.actions';

import { SlideOverForm } from '../../../../layouts/components/app/SlideOver';

import Input from '../../../shared/Input';
import TextArea from '../../../shared/TextArea';
import Select from '../../../shared/Select';
import Detail from '../../../shared/Detail';
import { LoadingSpinner } from '../../../shared/SubmitButton';
import Row from '../../../shared/Row';

const NewWeapon = () => {
  const dispatch = useDispatch();

  const fetchedWeapons = useSelector(selectWeapons);
  const charSheet = useSelector(selectCurrentCharacter);

  const [weapon, setWeapon] = useState(null);
  const [weaponsList, setWeaponsList] = useState([]);
  const [weaponsSelectList, setWeaponsSelectList] = useState([]);

  const [nickname, setNickname] = useState('');
  const [levelDamage, setLevelDamage] = useState(1);
  const [description, setDescription] = useState('');

  const [name, setName] = useState('');
  const [associatedStat, setAssociatedStat] = useState('');
  const [range, setRange] = useState('');
  const [ability, setAbility] = useState('');

  useEffect(() => {
    if (!fetchedWeapons) {
      dispatch(fetchResourceStart('weapons'));
    }
  }, [dispatch, fetchedWeapons]);

  useEffect(() => {
    if (charSheet && fetchedWeapons) {
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

      let FOR = [];
      let AGL = [];
      let PER = [];
      let APT = [];

      mappedWeaponsList.forEach(weap => {
        switch (weap.associatedStat) {
          case 'fortitude':
            FOR.push(weap);
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
          name: 'Fortitude',
          children: FOR,
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
  }, [charSheet, fetchedWeapons]);

  const selectWeapon = e => {
    if (!e.target.value) return setWeapon(null);

    if (e.target.value === 'Custom' || e.target.value === 'Improvised') return setWeapon(e.target.value);

    const currWeapon = weaponsList.find(weapon => weapon.id === e.target.value);

    setWeapon(currWeapon);
  };

  const selectStat = e => {
    if (!e.target.value) return setAssociatedStat(null);
    setAssociatedStat(e.target.value);
  };

  const submitHandler = async e => {
    e.preventDefault();

    if (!weapon) return alert('Must provide a weapon');

    if (!levelDamage) return alert('Must provide levelDamage');

    if (weapon === 'Custom' || weapon === 'Improvised') {
      if (!name) return alert('Must provide a name');
      if (!associatedStat) return alert('Must provide an associatedStat');
      if (!range) return alert('Must provide a range');

      dispatch(createSheetResourceStart('characters', charSheet._id, 'weapons', { type: weapon, name, nickname, associatedStat, levelDamage, range, ability, description }));

      dispatch(setSlideOver(null));
      return;
    }

    dispatch(
      createSheetResourceStart('characters', charSheet._id, 'weapons', {
        type: weapon.type,
        name: weapon.name,
        nickname,
        associatedStat: weapon.associatedStat,
        levelDamage,
        range: weapon.range,
        ability: weapon.ability,
        description,
        universalId: weapon.universalId,
      })
    );

    dispatch(setSlideOver(null));
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
                  { name: 'Fortitude', id: 'fortitude' },
                  { name: 'Agility', id: 'agility' },
                  { name: 'Persona', id: 'persona' },
                  { name: 'Aptitude', id: 'aptitude' },
                ]}
                changeHandler={selectStat}
                required
              />
              <Input slideOver label="Level" name="levelDamage" type="number" value={levelDamage} changeHandler={setLevelDamage} required />
              <Input slideOver label="Range" name="range" type="text" value={range} changeHandler={setRange} required />
              <TextArea slideOver label="Ability (Opt.)" name="ability" rows={4} value={ability} changeHandler={setAbility} />
              <TextArea slideOver label="Description (Opt.)" name="description" rows={4} value={description} changeHandler={setDescription} />
            </>
          ) : weapon ? (
            <>
              <Detail slideOver label="Type" detail={weapon.type} />
              <Detail slideOver label="Name" detail={weapon.name} />
              <Input slideOver label="Nickname (Opt.)" name="nickname" type="text" value={nickname} changeHandler={setNickname} />
              <Detail slideOver label="Associated Stat" detail={weapon.associatedStat[0].toUpperCase() + weapon.associatedStat.slice(1)} />
              <Input slideOver label="Level" name="levelDamage" type="number" value={levelDamage} changeHandler={setLevelDamage} required />
              <Detail slideOver label="Range" detail={weapon.range} />
              <Detail slideOver label="Ability" detail={weapon.ability} />
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

export default NewWeapon;
