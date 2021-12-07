import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { selectCurrentCharacter } from '../../../../redux/character/character.selectors';

import { setModal } from '../../../../redux/app/app.actions';
import { updateSheetResourceStart } from '../../../../redux/sheet/sheet.actions';

import { ModalForm } from '../../../../layouts/components/app/Modal';

const AcceptInvite = ({ id }) => {
  const dispatch = useDispatch();

  const charSheet = useSelector(selectCurrentCharacter);

  const [invite, setInvite] = useState(null);

  console.log(invite);

  useEffect(() => {
    if (charSheet) {
      setInvite(charSheet.invites.find(invite => invite._id === id));
    }
  }, [charSheet, id]);

  const submitHandler = async e => {
    e.preventDefault();

    dispatch(updateSheetResourceStart('characters', charSheet._id, 'invites', id, { status: 'Declined' }));

    dispatch(setModal(null));
  };

  return (
    <ModalForm title="Accept Campaign Invitation" submitText={`Join ${'Campaign Name'}`} submitHandler={submitHandler}>
      <div className="mt-2">
        <p className="block text-sm font-medium text-gray-900 sm:mt-px sm:pt-2">display invite here</p>
      </div>
    </ModalForm>
  );
};

export default AcceptInvite;
