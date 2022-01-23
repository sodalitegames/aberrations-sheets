import { useSelector, useDispatch } from 'react-redux';

import { selectCurrentCharacter } from '../../../../redux/character/character.selectors';

import { removeCharacterFromCampaignStart } from '../../../../redux/sheet/sheet.actions';

import { ModalForm } from '../../../../layouts/components/app/Modal';

const LeaveCampaign = () => {
  const dispatch = useDispatch();

  const charSheet = useSelector(selectCurrentCharacter);

  const submitHandler = async e => {
    e.preventDefault();

    dispatch(removeCharacterFromCampaignStart('characters', charSheet._id));
  };

  return (
    <ModalForm type="alert" title="Are you sure you want to leave?" submitText={`Yes, leave ${charSheet.campaign.name}`} submitHandler={submitHandler}>
      <div className="mt-2">
        <p className="block text-sm font-medium text-gray-900 sm:mt-px sm:pt-2">You won't be able to rejoin the campaign unless you are sent a new invitation.</p>
      </div>
    </ModalForm>
  );
};

export default LeaveCampaign;
