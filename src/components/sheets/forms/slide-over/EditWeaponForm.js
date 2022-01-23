import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { selectCurrentCharacter } from '../../../../redux/character/character.selectors';
import { selectCurrentCampaign } from '../../../../redux/campaign/campaign.selectors';

import { updateSheetResourceStart } from '../../../../redux/sheet/sheet.actions';

import { capitalize } from '../../../../utils/strings';

import { SlideOverForm } from '../../../../layouts/components/app/SlideOver';

import Input from '../../../shared/form/Input';
import TextArea from '../../../shared/form/TextArea';
import Select from '../../../shared/form/Select';
import Detail from '../../../shared/form/Detail';

const EditWeapon = ({ id, data }) => {
  const dispatch = useDispatch();

  const charSheet = useSelector(selectCurrentCharacter);
  const campSheet = useSelector(selectCurrentCampaign);

  const [type, setType] = useState('');
  const [name, setName] = useState('');
  const [nickname, setNickname] = useState('');
  const [associatedStat, setAssociatedStat] = useState('');
  const [levelDamage, setLevelDamage] = useState(1);
  const [range, setRange] = useState('');
  const [ability, setAbility] = useState('');
  const [description, setDescription] = useState('');

  useEffect(() => {
    if (data.sheetType === 'characters') {
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
    }

    if (data.sheetType === 'campaigns') {
      if (id && campSheet) {
        const currentWeapon = campSheet.weapons.find(weapon => weapon._id === id);

        setType(currentWeapon.type);
        setName(currentWeapon.name);
        setNickname(currentWeapon.nickname);
        setAssociatedStat(currentWeapon.associatedStat);
        setLevelDamage(currentWeapon.levelDamage);
        setRange(currentWeapon.range);
        setAbility(currentWeapon.ability);
        setDescription(currentWeapon.description);
      }
    }
  }, [id, data.sheetType, charSheet, campSheet]);

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

    if (!levelDamage) return alert('Must provide levelDamage');

    const sheetId = data.sheetType === 'campaigns' ? campSheet._id : charSheet._id;

    if (type === 'Custom' || type === 'Improvised') {
      if (!name) return alert('Must provide a name');
      if (!associatedStat) return alert('Must provide an associatedStat');
      if (!range) return alert('Must provide a range');

      dispatch(updateSheetResourceStart(data.sheetType, sheetId, 'weapons', id, { name, nickname, associatedStat, levelDamage, range, ability, description }));
      return;
    }

    dispatch(
      updateSheetResourceStart(data.sheetType, sheetId, 'weapons', id, {
        nickname,
        levelDamage,
        description,
      })
    );
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
          <TextArea slideOver label="Ability (Opt.)" name="ability" rows={4} value={ability} changeHandler={setAbility} />
          <TextArea slideOver label="Description (Opt.)" name="description" rows={4} value={description} changeHandler={setDescription} />
        </>
      ) : type === 'Standard' ? (
        <>
          <Detail slideOver label="Type" detail={type} />
          <Detail slideOver label="Name" detail={name} />
          <Input slideOver label="Nickname (Opt.)" name="nickname" type="text" value={nickname} changeHandler={setNickname} />
          <Detail slideOver label="Associated Stat" detail={capitalize(associatedStat)} />
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
