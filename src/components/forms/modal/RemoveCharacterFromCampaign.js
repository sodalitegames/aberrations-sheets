import { useSelector, useDispatch } from 'react-redux';

import { selectCurrentCharacter } from '../../../redux/character/character.selectors';
import { selectCurrentCampaign } from '../../../redux/campaign/campaign.selectors';

import { removeCharacterFromCampaignStart } from '../../../redux/sheet/sheet.actions';

import { ModalForm } from '../Modal';

const RemoveCharacterFromCampaign = ({ data }) => {
  const dispatch = useDispatch();

  const charSheet = useSelector(selectCurrentCharacter);
  const campSheet = useSelector(selectCurrentCampaign);

  const submitHandler = async e => {
    e.preventDefault();

    const sheetId = data.sheetType === 'characters' ? charSheet._id : campSheet._id;

    dispatch(
      removeCharacterFromCampaignStart(data.sheetType, sheetId, data.body, {
        modal: true,
        notification: {
          status: 'alert',
          heading: data.sheetType === 'characters' ? 'Left Campaign' : 'Player Removed',
          message: data.sheetType === 'characters' ? `You have left ${charSheet.campaign?.name}.` : `You have removed ${data.playerName} from ${campSheet.name}.`,
        },
      })
    );
  };

  return (
    <ModalForm
      type="alert"
      title={data.sheetType === 'characters' ? `Are you sure you want to leave ${charSheet.campaign?.name}?` : `Are you sure you want to remove ${data.playerName} from ${campSheet.name}?`}
      submitText={data.sheetType === 'characters' ? `Yes, leave ${charSheet.campaign?.name}` : `Yes, remove ${data.playerName} from ${campSheet.name}`}
      submitHandler={submitHandler}
    >
      <div className="mt-2">
        <p className="block text-sm font-medium text-gray-900 sm:mt-px sm:pt-2">
          {data.sheetType === 'characters'
            ? `You will loose all associations to ${charSheet.campaign?.name}, and won't be able to rejoin the unless you are sent a new invitation.`
            : `You will loose all access to ${data.playerName}'s character sheet, and ${data.playerName} will not be able to rejoin the campaign unless you send them a new invitation.`}
        </p>
      </div>
    </ModalForm>
  );
};

export default RemoveCharacterFromCampaign;
