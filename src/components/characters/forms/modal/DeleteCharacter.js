import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router';

import { selectCurrentCharacter } from '../../../../redux/character/character.selectors';

import { deleteSheetStart } from '../../../../redux/sheet/sheet.actions';

import { ModalForm } from '../../../../layouts/components/app/Modal';
import { setModal } from '../../../../redux/app/app.actions';

const DeleteCharacter = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const charSheet = useSelector(selectCurrentCharacter);

  const submitHandler = async e => {
    e.preventDefault();

    if (charSheet.campaign) {
      return alert('You cannot delete this character until you leave the campaign you are in.');
    }

    dispatch(deleteSheetStart('characters', charSheet._id));

    dispatch(setModal(null));

    navigate('/characters');
  };

  return (
    <ModalForm
      type="alert"
      title="Hold up, this is permanent and irreversable."
      submitText={`Yes, I want to permanently delete ${charSheet.characterName}`}
      cancelText="Nevermind"
      submitHandler={submitHandler}
    >
      <div className="mt-2">
        <p className="block text-sm font-medium text-gray-900 sm:mt-px sm:pt-2">Deleting '{charSheet.characterName}' will permanently delete all character sheet data.</p>
        <p className="block text-sm font-medium text-gray-900 sm:mt-px sm:pt-2">
          In addition, it will permanently delete all resources (such as belongings, augmentations, notes, etc.) associated with it.
        </p>
        <p className="block text-sm font-medium text-gray-900 sm:mt-px sm:pt-2">This is permanent and you will never be able to recover this data again. It will be lost forever.</p>
        <p className="block text-sm font-medium text-gray-900 sm:mt-px sm:pt-2">Are you sure you wish to proceed?</p>
      </div>
    </ModalForm>
  );
};

export default DeleteCharacter;
