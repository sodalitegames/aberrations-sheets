import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { selectCurrentCharacter } from '../../../redux/character/character.selectors';
import { selectCurrentCampaign } from '../../../redux/campaign/campaign.selectors';

import { updateSheetResourceStart, updateSheetStart } from '../../../redux/sheet/sheet.actions';

import { capitalize } from '../../../utils/helpers/strings';
import { calculateNewCurrentHp } from '../../../utils/functions/updateHealth';

import { ModalForm } from '../Modal';

import Input from '../elements/Input';
import Detail from '../elements/Detail';
import { Stat } from '../../../models/enums';

interface EditStatProps {
  id: Stat;
  data: {
    type: 'character' | 'player' | 'npc' | 'creature';
    resource: {
      _id: string;
      currentHp: number;
      maxHp: number;
      fortitude: {
        points: number;
        modifier: number;
        experience: number;
        advantage: number;
        pool: number;
      };
      agility: {
        points: number;
        modifier: number;
        experience: number;
        advantage: number;
        pool: number;
      };
      persona: {
        points: number;
        modifier: number;
        experience: number;
        advantage: number;
        pool: number;
      };
      aptitude: {
        points: number;
        modifier: number;
        experience: number;
        advantage: number;
        pool: number;
      };
    };
  };
}

const EditStat: React.FC<EditStatProps> = ({ id, data }) => {
  const dispatch = useDispatch();

  const charSheet = useSelector(selectCurrentCharacter);
  const campSheet = useSelector(selectCurrentCampaign);

  const [points, setPoints] = useState(data.resource[id].points);
  const [modifier] = useState(data.resource[id].modifier);
  const [experience, setExperience] = useState(data.resource[id].experience);
  const [advantage, setAdvantage] = useState(data.resource[id].advantage);
  const [pool, setPool] = useState(data.resource[id].pool);

  const submitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    let body = {
      [id]: { points, modifier, experience, advantage, pool },
    };

    if (id === 'fortitude') {
      if (data.resource[id].points + (data.resource[id].modifier || 0) !== +body[id].points + +(body[id].modifier || 0)) {
        // Get the new maxHp
        const newMaxHp = (+body[id].points + +(body[id].modifier || 0)) * 10;

        body.currentHp = calculateNewCurrentHp(data.resource.currentHp, data.resource.maxHp, newMaxHp);
      }
    }

    switch (data.type) {
      case 'character':
        dispatch(
          updateSheetStart('characters', charSheet._id, body, {
            modal: true,
            notification: { status: 'success', heading: 'Stats Updated', message: `You have successfully updated your ${id.toLowerCase()} stat.` },
          })
        );
        return;
      case 'player':
        dispatch(
          updateSheetStart('characters', data.resource._id, body, {
            modal: true,
            notification: { status: 'success', heading: 'Stats Updated', message: `You have successfully updated your player's ${id.toLowerCase()} stat.` },
          })
        );
        return;
      case 'npc':
        dispatch(
          updateSheetResourceStart('campaigns', campSheet._id, 'npcs', data.resource._id, body, {
            modal: true,
            notification: { status: 'success', heading: 'Stats Updated', message: `You have successfully updated your npcs's ${id.toLowerCase()} stat.` },
          })
        );
        return;
      case 'creature':
        dispatch(
          updateSheetResourceStart('campaigns', campSheet._id, 'creatures', data.resource._id, body, {
            modal: true,
            notification: { status: 'success', heading: 'Stats Updated', message: `You have successfully updated your creature's ${id.toLowerCase()} stat.` },
          })
        );
        return;
      default:
        return;
    }
  };

  return (
    <ModalForm title={`Edit ${capitalize(id)} Stat`} submitText={`Save changes`} submitHandler={submitHandler}>
      <Input label="Natural" name="points" type="number" value={points} changeHandler={setPoints} />
      {data.type !== 'creature' ? <Detail label="Modifier" detail={modifier} /> : null}
      {data.type !== 'creature' ? <Input label="Experience" name="experience" type="number" value={experience} changeHandler={setExperience} /> : null}
      <Input label="Stat Advantage" name="advantage" type="number" value={advantage} changeHandler={setAdvantage} />
      {data.type !== 'creature' ? <Input label="Advantage Pool Contribution" name="pool" type="number" value={pool} changeHandler={setPool} /> : null}
    </ModalForm>
  );
};

export default EditStat;
