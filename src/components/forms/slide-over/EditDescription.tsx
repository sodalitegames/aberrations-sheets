import { FormEvent, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';

import { updateSheetResourceStart, updateSheetStart } from '../../../redux/sheet/sheet.actions';

import { SlideOverForm } from '../SlideOver';

import TextArea from '../elements/TextArea';

import { CharacterSheet, Entity, EntityType, SheetResourceType, SheetType } from '../../../models/sheet';
import { Npc, Player } from '../../../models/sheet/resources';
import { capitalize } from '../../../utils/helpers/strings';

interface Props {
  data: {
    sheetType: SheetType;
    sheetId: string;
    entityType: EntityType;
    entity: Entity;
  };
}

const EditDescription: React.FC<Props> = ({ data }) => {
  const dispatch = useDispatch();

  const [description, setDescription] = useState('');

  const label = data.entityType === 'npcs' ? 'npc' : data.entityType === 'players' ? 'player' : 'character';

  useEffect(() => {
    const desc = (data.entity as CharacterSheet | Player).charDescription || (data.entity as Npc).description;
    setDescription(desc);
  }, [data.entity]);

  const submitHandler = async (e: FormEvent) => {
    e.preventDefault();

    if (!description) return alert('Must provide description');

    switch (data.entityType) {
      case 'characters':
        dispatch(
          updateSheetStart(
            SheetType.characters,
            data.sheetId,
            { charDescription: description },
            { slideOver: true, notification: { status: 'success', heading: 'Character Sheet Updated', message: 'You have successfully updated your character description.' } }
          )
        );
        return;
      case 'players':
        dispatch(
          updateSheetStart(
            SheetType.characters,
            data.entity._id,
            { charDescription: description },
            { forPlayer: true, slideOver: true, notification: { status: 'success', heading: 'Player Updated', message: "You have successfully updated your player's character description." } }
          )
        );
        return;
      case 'npcs':
        dispatch(
          updateSheetResourceStart(
            SheetType.campaigns,
            data.sheetId,
            SheetResourceType.npcs,
            data.entity._id,
            { description },
            { slideOver: true, notification: { status: 'success', heading: 'Npc Updated', message: "You have successfully updated your npc's description." } }
          )
        );
        return;
      default:
        return;
    }
  };

  return (
    <SlideOverForm
      title={`Edit ${capitalize(label)} Description`}
      description={`Update the information below to edit your ${label} description.`}
      submitText={`Save ${label} description`}
      submitHandler={submitHandler}
    >
      <TextArea slideOver label={`${capitalize(label)} Description`} name="description" rows={12} value={description} changeHandler={setDescription} />
    </SlideOverForm>
  );
};

export default EditDescription;
