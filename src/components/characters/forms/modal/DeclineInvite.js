import { useSelector, useDispatch } from 'react-redux';

import { selectCurrentCharacter } from '../../../../redux/character/character.selectors';

import { setModal } from '../../../../redux/app/app.actions';
import { updateSheetResourceStart } from '../../../../redux/sheet/sheet.actions';

import { ModalForm } from '../../../../layouts/components/app/Modal';

const DeclineInvite = ({ id, data }) => {
  const dispatch = useDispatch();

  const charSheet = useSelector(selectCurrentCharacter);

  const submitHandler = async e => {
    e.preventDefault();

    dispatch(updateSheetResourceStart('characters', charSheet._id, 'invites', id, { status: 'Declined' }));

    dispatch(setModal(null));
  };

  return (
    <ModalForm type="alert" title="Are you sure?" submitText="Yes, I want to decline this invite" submitHandler={submitHandler}>
      <div className="mt-2">
        <p className="block text-sm font-medium text-gray-900 sm:mt-px sm:pt-2">You will not be able to undo this action.</p>
      </div>
    </ModalForm>
  );
};

export default DeclineInvite;
