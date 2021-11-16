import { useRecoilState, useSetRecoilState } from 'recoil';

import { modalState } from '../../../../recoil/app/app.atoms';
import { charSheetState } from '../../../../recoil/character/character.atoms';

import { removeItemById } from '../../../../utils/arrays';

import { deleteResource } from '../../../../apis/sheets.api';

import { ModalForm } from '../../../../layouts/components/app/Modal';

// Example data object below
// {
//   title?: '',
//   message?: '',
//   submitText?: '',
//   type: '',
//   property?: '', // if different from type
// }

const ConfirmDelete = ({ id, data }) => {
  const [charSheet, setCharSheet] = useRecoilState(charSheetState);
  const setModal = useSetRecoilState(modalState);

  const submitHandler = async e => {
    e.preventDefault();

    if (data.equipped) {
      return alert('You cannot delete this belonging until you unequip it.');
    }

    const response = await deleteResource('characters', charSheet._id, data.type, id);

    console.log(response.data);

    setCharSheet(oldCharSheet => {
      return { ...oldCharSheet, [data.property || data.type]: removeItemById(oldCharSheet[data.property || data.type], id) };
    });

    setModal(null);
  };

  return (
    <ModalForm type="alert" title={data.title || 'Are you sure?'} submitText={data.submitText || 'Yes, I want to delete this item'} submitHandler={submitHandler}>
      <div className="mt-2">
        <p className="block text-sm font-medium text-gray-900 sm:mt-px sm:pt-2">{data.message || 'You will not be able to undo this action.'}</p>
      </div>
    </ModalForm>
  );
};

export default ConfirmDelete;
