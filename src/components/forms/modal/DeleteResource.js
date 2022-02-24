import { useSelector, useDispatch } from 'react-redux';

import { selectCurrentCharacter } from '../../../redux/character/character.selectors';
import { selectCurrentCampaign } from '../../../redux/campaign/campaign.selectors';

import { deleteSheetResourceStart } from '../../../redux/sheet/sheet.actions';

import { getBelongingType } from '../../../utils/helpers/belongings';

import { ModalForm } from '../Modal';

import Notice from '../../Notice';

// Example data object below
// {
//   title?: '',
//   message?: '',
//   submitText?: '',
//   type: '',
//   equipped?: boolean,
//   belonging?: Belonging
// }

const DeleteResource = ({ id, data, nested }) => {
  const dispatch = useDispatch();

  const charSheet = useSelector(selectCurrentCharacter);
  const campSheet = useSelector(selectCurrentCampaign);

  const submitHandler = async e => {
    e.preventDefault();

    // Prevent deletion of equipped wearables
    if (data.sheetType === 'characters' && data.equipped) {
      if (data.resourceType === 'wearables') {
        return alert('You must unequip this wearable before you can delete it.');
      }
    }

    if (data.sheetType === 'characters') {
      dispatch(
        deleteSheetResourceStart('characters', charSheet._id, data.resourceType, id, {
          modal: nested ? false : true,
          nestedModal: nested ? true : false,
          notification: data.notification ? { status: 'alert', ...data.notification } : null,
        })
      );
    }

    if (data.sheetType === 'campaigns') {
      dispatch(
        deleteSheetResourceStart('campaigns', campSheet._id, data.resourceType, id, {
          modal: nested ? false : true,
          nestedModal: nested ? true : false,
          notification: data.notification ? { status: 'alert', ...data.notification } : null,
        })
      );
    }
  };

  return (
    <ModalForm nested={nested} type="alert" title={data.title || 'Are you sure?'} submitText={data.submitText || 'Yes, I want to delete this item'} submitHandler={submitHandler}>
      <div className="mt-2 space-y-4">
        <p className="block text-sm font-medium text-gray-900 sm:mt-px sm:pt-2">{data.message || 'You will not be able to undo this action.'}</p>
        {data.equipped ? (
          <Notice
            noIcon
            status="error"
            message={
              data.resourceType === 'wearables'
                ? `Deleting this wearable will also unequip it, and will remove any modifiers it may be adding to your stats.`
                : `Deleting this ${getBelongingType(data.resourceType)} will also unequip it.`
            }
          />
        ) : null}
      </div>
    </ModalForm>
  );
};

export default DeleteResource;