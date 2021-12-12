import { useSelector, useDispatch } from 'react-redux';

import { selectCurrentCampaign } from '../../../../redux/campaign/campaign.selectors';

import { setModal } from '../../../../redux/app/app.actions';
import { deleteSheetResourceStart } from '../../../../redux/sheet/sheet.actions';

import { ModalForm } from '../../../../layouts/components/app/Modal';

// Example data object below
// {
//   title?: '',
//   message?: '',
//   submitText?: '',
//   type: '',
//   equipped?: boolean,
// }

const DeleteCampResource = ({ id, data }) => {
  const dispatch = useDispatch();

  const campSheet = useSelector(selectCurrentCampaign);

  const submitHandler = async e => {
    e.preventDefault();

    if (data.equipped) {
      return alert('You cannot delete this belonging until you unequip it.');
    }

    dispatch(deleteSheetResourceStart('campaigns', campSheet._id, data.type, id));

    dispatch(setModal(null));
  };

  return (
    <ModalForm type="alert" title={data.title || 'Are you sure?'} submitText={data.submitText || 'Yes, I want to delete this item'} submitHandler={submitHandler}>
      <div className="mt-2">
        <p className="block text-sm font-medium text-gray-900 sm:mt-px sm:pt-2">{data.message || 'You will not be able to undo this action.'}</p>
      </div>
    </ModalForm>
  );
};

export default DeleteCampResource;
