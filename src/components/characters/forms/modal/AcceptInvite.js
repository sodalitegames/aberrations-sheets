import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { selectCurrentCharacter } from '../../../../redux/character/character.selectors';

import { setModal } from '../../../../redux/app/app.actions';
import { updateSheetResourceStart } from '../../../../redux/sheet/sheet.actions';

import { ModalForm } from '../../../../layouts/components/app/Modal';
import Invite from '../../display/Invite';

const AcceptInvite = ({ id }) => {
  const dispatch = useDispatch();

  const charSheet = useSelector(selectCurrentCharacter);

  const [invite, setInvite] = useState(null);

  useEffect(() => {
    if (charSheet) {
      setInvite(charSheet.invites.find(invite => invite._id === id));
    }
  }, [charSheet, id]);

  const submitHandler = async e => {
    e.preventDefault();

    dispatch(updateSheetResourceStart('characters', charSheet._id, 'invites', id, { status: 'Accepted' }));

    dispatch(setModal(null));
  };

  return (
    <ModalForm title="Accept Campaign Invitation" submitText={`Join ${invite?.campaignName}`} submitHandler={submitHandler}>
      {invite ? (
        <ul className="-my-5 divide-y divide-gray-200 mt-2">
          <Invite invite={invite} noActions />
        </ul>
      ) : null}
    </ModalForm>
  );
};

export default AcceptInvite;
