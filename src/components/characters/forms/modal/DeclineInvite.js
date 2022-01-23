import { useSelector, useDispatch } from 'react-redux';

import { selectCurrentCharacter } from '../../../../redux/character/character.selectors';

import { updateSheetResourceStart } from '../../../../redux/sheet/sheet.actions';

import { ModalForm } from '../../../../layouts/components/app/Modal';

const DeclineInvite = ({ id }) => {
  const dispatch = useDispatch();

  const charSheet = useSelector(selectCurrentCharacter);

  const submitHandler = async e => {
    e.preventDefault();

    dispatch(updateSheetResourceStart('characters', charSheet._id, 'invites', id, { status: 'Declined' }));
  };

  return (
    <ModalForm type="alert" title="Are you sure you want to decline?" submitText="Yes, I want to decline this invite" submitHandler={submitHandler}>
      <div className="mt-2">
        <p className="block text-sm font-medium text-gray-900 sm:mt-px sm:pt-2">You will not be change your decision once you have declined this invitation.</p>
      </div>
    </ModalForm>
  );
};

export default DeclineInvite;
