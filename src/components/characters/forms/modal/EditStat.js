import { useState, useEffect } from 'react';
import { useRecoilState, useSetRecoilState } from 'recoil';

import { modalState } from '../../../../recoil/app/app.atoms';
import { charSheetState } from '../../../../recoil/character/character.atoms';

import { updateSheet } from '../../../../apis/sheets.api';

import { ModalForm } from '../../../../layouts/components/app/Modal';

import Input from '../../../shared/Input';

const EditStat = ({ id }) => {
  const [points, setPoints] = useState(0);
  const [modifier, setModifier] = useState(0);
  const [experience, setExperience] = useState(0);
  const [exhaustion, setExhaustion] = useState(0);

  const [charSheet, setCharSheet] = useRecoilState(charSheetState);
  const setModal = useSetRecoilState(modalState);

  useEffect(() => {
    if (charSheet) {
      setPoints(charSheet[id].points);
      setModifier(charSheet[id].modifier);
      setExperience(charSheet[id].experience);
      setExhaustion(charSheet[id].exhaustion);
    }
  }, [charSheet, id]);

  const submitHandler = async e => {
    e.preventDefault();

    const response = await updateSheet('characters', charSheet._id, { [id]: { points, modifier, experience, exhaustion } });

    const sheet = response.data.data.sheet;

    const { power, maxHp, dodgeValue, initiative, assist } = sheet;

    setCharSheet(oldCharSheet => {
      return { ...oldCharSheet, [id]: sheet[id], power, maxHp, dodgeValue, initiative, assist };
    });

    setModal(null);
  };

  return (
    <ModalForm title={`Edit ${id[0].toUpperCase() + id.slice(1)} Stat`} submitText={`Save changes`} submitHandler={submitHandler}>
      <Input label="Natural" name="points" type="number" value={points} changeHandler={setPoints} />
      <Input label="Modifier" name="modifier" type="number" value={modifier} changeHandler={setModifier} />
      <Input label="Experience" name="experience" type="number" value={experience} changeHandler={setExperience} />
      <Input label="Exhaustion" name="exhaustion" type="number" value={exhaustion} changeHandler={setExhaustion} />
    </ModalForm>
  );
};

export default EditStat;
