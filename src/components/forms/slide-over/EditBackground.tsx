import { FormEvent, useState, useEffect } from 'react';
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

const EditBackground: React.FC<Props> = ({ data }) => {
  const dispatch = useDispatch();

  const [background, setBackground] = useState('');

  const label = data.entityType === 'npcs' ? 'npc' : data.entityType === 'players' ? 'player' : 'character';

  useEffect(() => {
    const backg = (data.entity as CharacterSheet | Player).charBackground || (data.entity as Npc).background;
    setBackground(backg);
  }, [data.entity]);

  const submitHandler = async (e: FormEvent) => {
    e.preventDefault();

    if (!background) return alert('Must provide background');

    switch (data.entityType) {
      case 'characters':
        dispatch(
          updateSheetStart(
            SheetType.characters,
            data.sheetId,
            { charBackground: background },
            { slideOver: true, notification: { status: 'success', heading: 'Character Sheet Updated', message: 'You have successfully updated your character background.' } }
          )
        );
        return;
      case 'players':
        dispatch(
          updateSheetStart(
            SheetType.characters,
            data.entity._id,
            { charBackground: background },
            { forPlayer: true, slideOver: true, notification: { status: 'success', heading: 'Player Updated', message: "You have successfully updated your player's character background." } }
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
            { background },
            { slideOver: true, notification: { status: 'success', heading: 'Npc Updated', message: "You have successfully updated your npc's background." } }
          )
        );
        return;
      default:
        return;
    }
  };

  return (
    <SlideOverForm
      title={`Edit ${capitalize(label)} Background`}
      description={`Update the information below to edit your ${label} background.`}
      submitText={`Save ${label} background`}
      submitHandler={submitHandler}
    >
      <TextArea slideOver label={`${capitalize(label)} Background`} name="background" rows={12} value={background} changeHandler={setBackground} />
    </SlideOverForm>
  );
};

export default EditBackground;
