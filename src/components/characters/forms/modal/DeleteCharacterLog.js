import { useRecoilState, useSetRecoilState } from 'recoil';

import { modalState } from '../../../../recoil/app/app.atoms';
import { charSheetState } from '../../../../recoil/character/character.atoms';

import { removeItemById } from '../../../../utils/arrays';

import { deleteResource } from '../../../../apis/sheets.api';

import { ModalForm } from '../../../../layouts/components/app/Modal';

const DeleteCharacterLog = ({ id }) => {
  const [charSheet, setCharSheet] = useRecoilState(charSheetState);
  const setModal = useSetRecoilState(modalState);

  const submitHandler = async e => {
    e.preventDefault();

    const response = await deleteResource('characters', charSheet._id, 'logs', id);

    console.log(response.data);

    setCharSheet(oldCharSheet => {
      return { ...oldCharSheet, characterLogs: removeItemById(oldCharSheet.characterLogs, id) };
    });

    setModal(null);
  };

  return (
    <ModalForm type="alert" title="Are you sure?" submitText={`Yes, delete this character log`} submitHandler={submitHandler}>
      <div className="mt-2">
        <p className="block text-sm font-medium text-gray-900 sm:mt-px sm:pt-2">You will not be able to undo this action.</p>
      </div>
    </ModalForm>
  );
};

export default DeleteCharacterLog;
