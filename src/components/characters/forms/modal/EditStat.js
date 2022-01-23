import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { selectCurrentCharacter } from '../../../../redux/character/character.selectors';

import { updateSheetStart } from '../../../../redux/sheet/sheet.actions';

import { capitalize } from '../../../../utils/strings';

import { ModalForm } from '../../../../layouts/components/app/Modal';

import Input from '../../../shared/Input';
import Detail from '../../../shared/Detail';

const EditStat = ({ id }) => {
  const dispatch = useDispatch();

  const charSheet = useSelector(selectCurrentCharacter);

  const [points, setPoints] = useState(0);
  const [modifier, setModifier] = useState(0);
  const [experience, setExperience] = useState(0);
  const [advantage, setAdvantage] = useState(0);

  useEffect(() => {
    if (charSheet) {
      setPoints(charSheet[id].points);
      setModifier(charSheet[id].modifier);
      setExperience(charSheet[id].experience);
      setAdvantage(charSheet[id].advantage);
    }
  }, [charSheet, id]);

  const submitHandler = async e => {
    e.preventDefault();

    dispatch(updateSheetStart('characters', charSheet._id, { [id]: { points, modifier, experience, advantage } }));
  };

  return (
    <ModalForm title={`Edit ${capitalize(id)} Stat`} submitText={`Save changes`} submitHandler={submitHandler}>
      <Input label="Natural" name="points" type="number" value={points} changeHandler={setPoints} />
      <Detail label="Modifier" detail={modifier} />
      <Input label="Experience" name="experience" type="number" value={experience} changeHandler={setExperience} />
      <Input label="Advantage" name="advantage" type="number" value={advantage} changeHandler={setAdvantage} />
    </ModalForm>
  );
};

export default EditStat;
