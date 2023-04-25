import { FormEvent } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { selectCurrentCharacter } from '../../../redux/character/character.selectors';
import { selectCurrentCampaign } from '../../../redux/campaign/campaign.selectors';

import { removeCharacterFromCampaignStart } from '../../../redux/sheet/sheet.actions';

import { ModalForm } from '../Modal';

import { SheetType } from '../../../models/sheet';

interface Props {
  data: {
    sheetType: SheetType;
    characterName?: string;
    characterId?: string;
    campaignName?: string;
  };
}

const RemoveCharacterFromCampaign: React.FC<Props> = ({ data }) => {
  const dispatch = useDispatch();

  const charSheet = useSelector(selectCurrentCharacter);
  const campSheet = useSelector(selectCurrentCampaign);

  const submitHandler = async (e: FormEvent) => {
    e.preventDefault();

    const sheetId = data.sheetType === 'characters' ? charSheet!._id : campSheet!._id;

    dispatch(
      removeCharacterFromCampaignStart(
        data.sheetType,
        sheetId,
        { charId: data.characterId },
        {
          modal: true,
          notification: {
            status: 'alert',
            heading: data.sheetType === 'characters' ? 'Left Campaign' : 'Player Removed',
            message: data.sheetType === 'characters' ? `You have left ${data.campaignName}.` : `You have removed ${data.characterName} from ${data.campaignName}.`,
          },
        }
      )
    );
  };

  return (
    <ModalForm
      type="alert"
      title={data.sheetType === 'characters' ? `Are you sure you want to leave ${data.campaignName}?` : `Are you sure you want to remove ${data.characterName} from ${data.campaignName}?`}
      submitText={data.sheetType === 'characters' ? `Yes, leave ${data.campaignName}` : `Yes, remove ${data.characterName} from ${data.campaignName}`}
      submitHandler={submitHandler}
    >
      <div className="mt-2">
        <p className="block text-sm font-medium text-gray-900 sm:mt-px sm:pt-2">
          {data.sheetType === 'characters'
            ? `You will loose all associations to ${data.campaignName}, and won't be able to rejoin the unless you are sent a new invitation.`
            : `You will loose all access to ${data.characterName}'s character sheet, and ${data.characterName} will not be able to rejoin the campaign unless you send them a new invitation.`}
        </p>
      </div>
    </ModalForm>
  );
};

export default RemoveCharacterFromCampaign;
