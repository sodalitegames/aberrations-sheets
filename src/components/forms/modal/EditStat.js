import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { selectCurrentCharacter } from '../../../redux/character/character.selectors';

import { updateSheetStart } from '../../../redux/sheet/sheet.actions';

import { capitalize } from '../../../utils/helpers/strings';
import { calculateNewCurrentHp } from '../../../utils/functions/updateHealth';

import { ModalForm } from '../Modal';

import Input from '../elements/Input';
import Detail from '../elements/Detail';

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

    let body = {
      [id]: { points: parseInt(points), modifier: parseInt(modifier), experience, advantage },
    };

    if (id === 'fortitude') {
      if (charSheet[id].points + charSheet[id].modifier !== body[id].points + body[id].modifier) {
        // Get the new maxHp
        const newMaxHp = (body[id].points + body[id].modifier) * 5;

        body.currentHp = calculateNewCurrentHp(charSheet.currentHp, charSheet.maxHp, newMaxHp);
      }
    }

    dispatch(
      updateSheetStart('characters', charSheet._id, body, {
        modal: true,
        notification: { status: 'success', heading: 'Stats Updated', message: `You have successfully updated your ${id.toLowerCase()} stat.` },
      })
    );
  };

  return (
    <ModalForm title={`Edit ${capitalize(id)} Stat`} submitText={`Save changes`} submitHandler={submitHandler}>
      <Input label="Natural" name="points" type="number" value={points} changeHandler={setPoints} />
      <Detail label="Modifier" detail={modifier} />
      <Input label="Experience" name="experience" type="number" value={experience} changeHandler={setExperience} />
      <Input label="Stat Advantage (Opt.)" name="advantage" type="number" value={advantage} changeHandler={setAdvantage} />
    </ModalForm>
  );
};

export default EditStat;
