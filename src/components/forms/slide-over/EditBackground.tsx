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
    background: string;
    resourceId: string;
  };
}

const EditBackground: React.FC<Props> = ({ data }) => {
  const dispatch = useDispatch();

  const charSheet = useSelector(selectCurrentCharacter);
  const campSheet = useSelector(selectCurrentCampaign);

  const [background, setBackground] = useState(data.background);

  const submitHandler = async (e: FormEvent) => {
    e.preventDefault();

    if (!background) return alert('Must provide background');

    switch (data.type) {
      case 'character':
        dispatch(
          updateSheetStart(
            SheetType.characters,
            charSheet!._id,
            { charBackground: background },
            { slideOver: true, notification: { status: 'success', heading: 'Character Sheet Updated', message: 'You have successfully updated your character background.' } }
          )
        );
        return;
      case 'player':
        dispatch(
          updateSheetStart(
            SheetType.characters,
            data.resourceId,
            { charBackground: background },
            { forPlayer: true, slideOver: true, notification: { status: 'success', heading: 'Player Updated', message: "You have successfully updated your player's character background." } }
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
      title={`Edit ${data.type === 'npc' ? 'Npc' : 'Character'} Background`}
      description={`Update the information below to edit your ${data.type === 'npc' ? 'npc' : 'character'} background.`}
      submitText={`Save ${data.type === 'npc' ? 'npc' : 'character'} background`}
      submitHandler={submitHandler}
    >
      <TextArea slideOver label={`${data.type === 'npc' ? 'Npc' : 'Character'} Background`} name="background" rows={12} value={background} changeHandler={setBackground} />
    </SlideOverForm>
  );
};

export default EditBackground;
