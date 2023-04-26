import { FormEvent } from 'react';
import { useDispatch } from 'react-redux';

import { deleteSheetResourceStart } from '../../../redux/sheet/sheet.actions';

import { ResourceType, getResourceLabel } from '../../../utils/helpers/resources';

import { ModalForm } from '../Modal';

import Notice, { NoticeStatus } from '../../Notice';
import { Belonging, SheetResource, SheetResourceType, SheetType } from '../../../models/sheet';
import { Notification } from '../../../models/app';

interface Props {
  nested?: boolean;
  data: {
    sheetType: SheetType;
    resourceType: SheetResourceType;
    resource: SheetResource;
    notification?: Notification;
    title?: string;
    submitText?: string;
    message?: string;
  };
}

const DeleteResource: React.FC<Props> = ({ data, nested }) => {
  const dispatch = useDispatch();

  const submitHandler = async (e: FormEvent) => {
    e.preventDefault();

    dispatch(
      deleteSheetResourceStart(data.sheetType, data.resource.sheetId, data.resourceType, data.resource._id, {
        modal: nested ? false : true,
        nestedModal: nested ? true : false,
        notification: data.notification ? { status: 'alert', ...data.notification } : undefined,
      })
    );
  };

  return (
    <ModalForm nested={nested} type="alert" title={data.title || 'Are you sure?'} submitText={data.submitText || 'Yes, I want to delete this item'} submitHandler={submitHandler}>
      <div className="mt-2 space-y-4">
        <p className="block text-sm font-medium text-gray-900 sm:mt-px sm:pt-2">{data.message || 'You will not be able to undo this action.'}</p>
        {(data.resource as Belonging).equipped ? (
          <Notice noIcon status={NoticeStatus.Error} message={`Deleting this ${getResourceLabel(ResourceType[data.resourceType])} will also unequip it.`} />
        ) : null}
      </div>
    </ModalForm>
  );
};

export default DeleteResource;
