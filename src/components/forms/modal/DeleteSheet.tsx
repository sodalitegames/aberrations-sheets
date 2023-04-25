import { FormEvent } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router';

import { selectCurrentCharacter } from '../../../redux/character/character.selectors';
import { selectCurrentCampaign } from '../../../redux/campaign/campaign.selectors';

import { deleteSheetStart } from '../../../redux/sheet/sheet.actions';

import { ModalForm } from '../Modal';

import { SheetType } from '../../../models/sheet';

interface Props {
  nested?: boolean;
  data: {
    sheetType: SheetType;
  };
}

const DeleteSheet: React.FC<Props> = ({ data, nested }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const charSheet = useSelector(selectCurrentCharacter);
  const campSheet = useSelector(selectCurrentCampaign);

  const submitHandler = async (e: FormEvent) => {
    e.preventDefault();

    if (data.sheetType === 'characters') {
      if (charSheet!.campaign) {
        return alert('You cannot delete this character until you leave the campaign you are in.');
      }

      dispatch(
        deleteSheetStart(SheetType.characters, charSheet!._id, {
          modal: nested ? false : true,
          nestedModal: nested ? true : false,
          notification: { status: 'alert', heading: 'Character Sheet Deleted', message: `You have successfully deleted ${charSheet!.characterName}.` },
        })
      );

      navigate('/characters');
    }

    if (data.sheetType === 'campaigns') {
      if (campSheet!.players.length) {
        return alert('You cannot delete this campaign until you remove all the players that are in it.');
      }

      dispatch(
        deleteSheetStart(SheetType.campaigns, campSheet!._id, {
          modal: nested ? false : true,
          nestedModal: nested ? true : false,
          notification: { status: 'alert', heading: 'Campaign Sheet Deleted', message: `You have successfully deleted ${campSheet!.name}.` },
        })
      );

      navigate('/campaigns');
    }
  };

  return (
    <ModalForm
      nested={nested}
      type="alert"
      title="Hold up, this is permanent and irreversable."
      submitText={`Yes, I want to permanently delete ${data.sheetType === 'characters' ? charSheet?.characterName : campSheet?.name}`}
      cancelText="Nevermind"
      submitHandler={submitHandler}
    >
      <div className="mt-2">
        <p className="block text-sm font-medium text-gray-900 sm:mt-px sm:pt-2">
          Deleting '{data.sheetType === 'characters' ? charSheet?.characterName : campSheet?.name}' will permanently delete all {data.sheetType === 'characters' ? 'character' : 'campaign'} sheet data.
        </p>
        <p className="block text-sm font-medium text-gray-900 sm:mt-px sm:pt-2">
          In addition, it will permanently delete all associated resources (such as belongings, augmentations, {data.sheetType === 'campaigns' ? 'interactables, ' : ''} notes, etc.).
        </p>
        <p className="block text-sm font-medium text-gray-900 sm:mt-px sm:pt-2">This is absolutely permanent and you will never be able to recover this data again. It will be lost forever.</p>
        <p className="block text-sm font-medium text-gray-900 sm:mt-px sm:pt-2">Are you sure you wish to proceed?</p>
      </div>
    </ModalForm>
  );
};

export default DeleteSheet;
