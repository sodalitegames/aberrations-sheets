import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { selectCurrentCharacter } from '../../../redux/character/character.selectors';
import { selectCurrentCampaign } from '../../../redux/campaign/campaign.selectors';

import { updateSheetResourceStart, updateSheetStart } from '../../../redux/sheet/sheet.actions';

import { capitalize } from '../../../utils/helpers/strings';

import { ModalForm } from '../Modal';

import Select from '../elements/Select';

import { Stat } from '../../../models/enums';
import { SheetResourceType, SheetType } from '../../../models/sheet-actions';

interface EditStatProps {
  id: Stat;
  data: {
    type: 'character' | 'player' | 'npc' | 'creature';
    resource: {
      _id: string;
      strength: {
        die: number;
      };
      agility: {
        die: number;
      };
      persona: {
        die: number;
      };
      aptitude: {
        die: number;
      };
    };
  };
}

const EditStat: React.FC<EditStatProps> = ({ id, data }) => {
  const dispatch = useDispatch();

  const charSheet = useSelector(selectCurrentCharacter);
  const campSheet = useSelector(selectCurrentCampaign);

  const [die, setDie] = useState<string | number>(data.resource[id].die);

  const submitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    let body = {
      [id]: { die },
    };

    switch (data.type) {
      case 'character':
        dispatch(
          updateSheetStart(SheetType.characters, charSheet._id, body, {
            modal: true,
            notification: { status: 'success', heading: 'Stats Updated', message: `You have successfully updated your ${id.toLowerCase()} stat.` },
          })
        );
        return;
      case 'player':
        dispatch(
          updateSheetStart(SheetType.characters, data.resource._id, body, {
            forPlayer: true,
            modal: true,
            notification: { status: 'success', heading: 'Stats Updated', message: `You have successfully updated your player's ${id.toLowerCase()} stat.` },
          })
        );
        return;
      case 'npc':
        dispatch(
          updateSheetResourceStart(SheetType.campaigns, campSheet._id, SheetResourceType.npcs, data.resource._id, body, {
            modal: true,
            notification: { status: 'success', heading: 'Stats Updated', message: `You have successfully updated your npcs's ${id.toLowerCase()} stat.` },
          })
        );
        return;
      case 'creature':
        dispatch(
          updateSheetResourceStart(SheetType.campaigns, campSheet._id, SheetResourceType.creatures, data.resource._id, body, {
            modal: true,
            notification: { status: 'success', heading: 'Stats Updated', message: `You have successfully updated your creature's ${id.toLowerCase()} stat.` },
          })
        );
        return;
      default:
        return;
    }
  };

  const selectDie = (e: any) => {
    if (!e.target.value) return setDie('');
    setDie(e.target.value);
  };

  return (
    <ModalForm title={`Edit ${capitalize(id)} Stat`} submitText={`Save changes`} submitHandler={submitHandler}>
      <Select
        label="Die"
        name="die"
        value={die.toString()}
        options={[
          { name: 'D2', id: '2' },
          { name: 'D4', id: '4' },
          { name: 'D6', id: '6' },
          { name: 'D8', id: '8' },
          { name: 'D10', id: '10' },
          { name: 'D12', id: '12' },
          { name: 'D14', id: '14' },
          { name: 'D16', id: '16' },
          { name: 'D18', id: '18' },
          { name: 'D20', id: '20' },
        ]}
        changeHandler={selectDie}
      />
    </ModalForm>
  );
};

export default EditStat;
