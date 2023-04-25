import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { selectCurrentCharacter } from '../../../redux/character/character.selectors';
import { selectCurrentCampaign } from '../../../redux/campaign/campaign.selectors';

import { updateSheetResourceStart, updateSheetStart } from '../../../redux/sheet/sheet.actions';

import { capitalize } from '../../../utils/helpers/strings';

import { Entity, EntityType, SheetResourceType, SheetType, StatType } from '../../../models/sheet';

import { ModalForm } from '../Modal';

import Select from '../elements/Select';

interface Props {
  data: {
    stat: StatType;
    entityType: EntityType;
    entity: Entity;
  };
}

const EditStat: React.FC<Props> = ({ data }) => {
  const dispatch = useDispatch();

  const charSheet = useSelector(selectCurrentCharacter)!;
  const campSheet = useSelector(selectCurrentCampaign)!;

  const [die, setDie] = useState<string | number>(data.entity[data.stat].die);

  const submitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    let body = {
      [data.stat]: { die },
    };

    switch (data.entityType) {
      case 'characters':
        dispatch(
          updateSheetStart(SheetType.characters, charSheet._id, body, {
            modal: true,
            notification: { status: 'success', heading: 'Stats Updated', message: `You have successfully updated your ${data.stat} stat.` },
          })
        );
        return;
      case 'players':
        dispatch(
          updateSheetStart(SheetType.characters, data.entity._id, body, {
            forPlayer: true,
            modal: true,
            notification: { status: 'success', heading: 'Stats Updated', message: `You have successfully updated your player's ${data.stat} stat.` },
          })
        );
        return;
      case 'npcs':
        dispatch(
          updateSheetResourceStart(SheetType.campaigns, campSheet._id, SheetResourceType.npcs, data.entity._id, body, {
            modal: true,
            notification: { status: 'success', heading: 'Stats Updated', message: `You have successfully updated your npcs's ${data.stat} stat.` },
          })
        );
        return;
      case 'creatures':
        dispatch(
          updateSheetResourceStart(SheetType.campaigns, campSheet._id, SheetResourceType.creatures, data.entity._id, body, {
            modal: true,
            notification: { status: 'success', heading: 'Stats Updated', message: `You have successfully updated your creature's ${data.stat} stat.` },
          })
        );
        return;
      default:
        return;
    }
  };

  return (
    <ModalForm title={`Edit ${capitalize(data.stat)} Stat`} submitText={`Save changes`} submitHandler={submitHandler}>
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
        changeHandler={setDie}
      />
    </ModalForm>
  );
};

export default EditStat;
