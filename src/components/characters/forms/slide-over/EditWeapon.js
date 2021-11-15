import { useEffect, useState } from 'react';
import { useRecoilState, useSetRecoilState } from 'recoil';

import { charSheetState } from '../../../../recoil/character/character.atoms';
import { slideOverState } from '../../../../recoil/app/app.atoms';

import { updateResource } from '../../../../apis/sheets.api';

import { replaceItemById } from '../../../../utils/arrays';

import { SlideOverForm } from '../../../../layouts/components/app/SlideOver';

import Input from '../../../shared/Input';
import TextArea from '../../../shared/TextArea';
import Select from '../../../shared/Select';
import Detail from '../../../shared/Detail';

const EditWeapon = ({ id }) => {
  const [charSheet, setCharSheet] = useRecoilState(charSheetState);
  const setSlideOver = useSetRecoilState(slideOverState);

  const [type, setType] = useState('');
  const [name, setName] = useState('');
  const [nickname, setNickname] = useState('');
  const [associatedStat, setAssociatedStat] = useState('');
  const [levelDamage, setLevelDamage] = useState(1);
  const [range, setRange] = useState('');
  const [ability, setAbility] = useState('');
  const [description, setDescription] = useState('');

  useEffect(() => {
    if (id && charSheet) {
      const currentWeapon = charSheet.weapons.find(weapon => weapon._id === id);

      setType(currentWeapon.type);
      setName(currentWeapon.name);
      setNickname(currentWeapon.nickname);
      setAssociatedStat(currentWeapon.associatedStat);
      setLevelDamage(currentWeapon.levelDamage);
      setRange(currentWeapon.range);
      setAbility(currentWeapon.ability);
      setDescription(currentWeapon.description);
    }
  }, [id, charSheet]);

  const selectStat = e => {
    if (!e.target.value) return setAssociatedStat(null);
    setAssociatedStat(e.target.value);
  };

  const submitHandler = async e => {
    e.preventDefault();

    if (!levelDamage) return alert('Must provide levelDamage');

    if (type === 'Custom' || type === 'Improvised') {
      if (!name) return alert('Must provide a name');
      if (!associatedStat) return alert('Must provide an associatedStat');
      if (!range) return alert('Must provide a range');

      const response = await updateResource('characters', charSheet._id, 'weapons', id, { name, nickname, associatedStat, levelDamage, range, ability, description });

      setCharSheet(oldCharSheet => {
        console.log(oldCharSheet);
        return { ...oldCharSheet, weapons: replaceItemById(oldCharSheet.weapons, id, response.data.data.doc) };
      });

      setSlideOver(null);
      return;
    }

    const response = await updateResource('characters', charSheet._id, 'weapons', id, {
      nickname,
      levelDamage,
      description,
    });

    setCharSheet(oldCharSheet => {
      console.log(oldCharSheet);
      return { ...oldCharSheet, weapons: replaceItemById(oldCharSheet.weapons, id, response.data.data.doc) };
    });

    setSlideOver(null);
  };

  return (
    <SlideOverForm title="Edit Weapon" description="Update the information below to edit your weapon." submitText="Save weapon" submitHandler={submitHandler}>
      {type === 'Custom' || type === 'Improvised' ? (
        <>
          <Detail slideOver label="Type" detail={type} />
          <Input slideOver label="Name" name="name" type="text" value={name} changeHandler={setName} />
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
          />
          <Input slideOver label="Level" name="levelDamage" type="number" value={levelDamage} changeHandler={setLevelDamage} />
          <Input slideOver label="Range" name="range" type="text" value={range} changeHandler={setRange} />
          <TextArea slideOver label="Ability" name="ability" rows={4} value={ability} changeHandler={setAbility} />
          <TextArea slideOver label="Description (Opt.)" name="description" rows={4} value={description} changeHandler={setDescription} />
        </>
      ) : type === 'Standard' ? (
        <>
          <Detail slideOver label="Type" detail={type} />
          <Detail slideOver label="Name" detail={name} />
          <Input slideOver label="Nickname (Opt.)" name="nickname" type="text" value={nickname} changeHandler={setNickname} />
          <Detail slideOver label="Associated Stat" detail={associatedStat[0].toUpperCase() + associatedStat.slice(1)} />
          <Input slideOver label="Level" name="levelDamage" type="number" value={levelDamage} changeHandler={setLevelDamage} />
          <Detail slideOver label="Range" detail={range} />
          <Detail slideOver label="Ability" detail={ability} />
          <TextArea slideOver label="Description (Opt.)" name="description" rows={5} value={description} changeHandler={setDescription} />
        </>
      ) : null}
    </SlideOverForm>
  );
};

export default EditWeapon;
