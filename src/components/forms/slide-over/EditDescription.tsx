import { FormEvent, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { selectCurrentCharacter } from '../../../redux/character/character.selectors';
import { selectCurrentCampaign } from '../../../redux/campaign/campaign.selectors';

import { updateSheetResourceStart, updateSheetStart } from '../../../redux/sheet/sheet.actions';

import { SlideOverForm } from '../SlideOver';

import TextArea from '../elements/TextArea';

import { SheetResourceType, SheetType } from '../../../models/sheet';

interface Props {
  data: {
    type: 'character' | 'player' | 'npc';
    description: string;
    resourceId: string;
  };
}

const EditDescription: React.FC<Props> = ({ data }) => {
  const dispatch = useDispatch();

  const charSheet = useSelector(selectCurrentCharacter);
  const campSheet = useSelector(selectCurrentCampaign);

  const [description, setDescription] = useState(data.description);

  const submitHandler = async (e: FormEvent) => {
    e.preventDefault();

    if (!description) return alert('Must provide description');

    switch (data.type) {
      case 'character':
        dispatch(
          updateSheetStart(
            SheetType.characters,
            charSheet!._id,
            { charDescription: description },
            { slideOver: true, notification: { status: 'success', heading: 'Character Sheet Updated', message: 'You have successfully updated your character description.' } }
          )
        );
        return;
      case 'player':
        dispatch(
          updateSheetStart(
            SheetType.characters,
            data.resourceId,
            { charDescription: description },
            { forPlayer: true, slideOver: true, notification: { status: 'success', heading: 'Player Updated', message: "You have successfully updated your player's character description." } }
          )
        );
        return;
      case 'npc':
        dispatch(
          updateSheetResourceStart(
            SheetType.campaigns,
            campSheet!._id,
            SheetResourceType.npcs,
            data.resourceId,
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
      title={`Edit ${data.type === 'npc' ? 'Npc' : 'Character'} Description`}
      description={`Update the information below to edit your ${data.type === 'npc' ? 'npc' : 'character'} description.`}
      submitText={`Save ${data.type === 'npc' ? 'npc' : 'character'} description`}
      submitHandler={submitHandler}
    >
      <TextArea slideOver label={`${data.type === 'npc' ? 'Npc' : 'Character'} Description`} name="description" rows={12} value={description} changeHandler={setDescription} />
    </SlideOverForm>
  );
};

export default EditDescription;
