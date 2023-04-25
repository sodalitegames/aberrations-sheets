import { useActions } from '../../hooks/useActions';
import { Modal, SlideOver } from '../../models/app';

import Button from '../Button';

interface ButtonPanelProps {
  editable?: SlideOver;
  deletable?: Modal;
  editText?: string;
  deleteText?: string;
}

export const ButtonPanel: React.FC<ButtonPanelProps> = ({ editable, deletable, editText, deleteText }) => {
  const { setModal, setSlideOver } = useActions();

  return (
    <div className="flex justify-end mt-2 space-x-1">
      {editable ? (
        <button
          type="button"
          className="inline-flex items-center px-1.5 py-1.5 text-xs font-medium rounded text-gray-500 bg-white hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          onClick={() => setSlideOver(editable)}
        >
          {editText || 'Edit'}
        </button>
      ) : null}
      {deletable ? (
        <button
          type="button"
          className="inline-flex items-center px-1.5 py-1.5 text-xs font-medium rounded text-gray-500 bg-white hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          onClick={() => setModal(deletable)}
        >
          {deleteText || 'Delete'}
        </button>
      ) : null}
    </div>
  );
};

export type ListItemAction = {
  text: string;
  dark?: boolean;
  click: () => void;
  disabled?: boolean;
};

interface ListItemProps extends ButtonPanelProps {
  heading: string;
  noButtonPanel?: boolean;
  view?: Modal;
  actions?: ListItemAction[];
}

const ListItem: React.FC<ListItemProps> = ({ heading, editable, deletable, editText, deleteText, actions, view, noButtonPanel, children }) => {
  const { setModal } = useActions();

  if (view) {
    return (
      <li className="w-full py-4">
        <div className="flex items-center space-x-4">
          <div className="flex-1 min-w-0">
            <h3 className="text-sm font-semibold text-gray-800">{heading}</h3>
            {children}
          </div>

          <div>
            <Button rounded onClick={() => setModal(view)}>
              View
            </Button>
          </div>
        </div>
      </li>
    );
  }

  if (actions) {
    return (
      <li className="w-full py-4">
        <div className="flex items-center space-x-4">
          <div className="flex-1 min-w-0">
            <h3 className="text-sm font-semibold text-gray-800">{heading}</h3>
            {children}
          </div>
          {actions ? (
            <div className="space-x-4">
              {actions.map((button, index) => (
                <Button key={index} rounded dark={button.dark} onClick={button.click} disabled={button.disabled}>
                  {button.text}
                </Button>
              ))}
            </div>
          ) : null}
        </div>
      </li>
    );
  }

  return (
    <li className="w-full py-3">
      <h3 className="text-sm font-semibold text-gray-800">{heading}</h3>
      <div>{children}</div>
      {!noButtonPanel ? <ButtonPanel editable={editable} deletable={deletable} editText={editText} deleteText={deleteText} /> : null}
    </li>
  );
};

export default ListItem;
