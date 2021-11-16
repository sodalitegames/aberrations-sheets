import { useSetRecoilState } from 'recoil';

import { modalState, slideOverState } from '../../recoil/app/app.atoms';

import Button from './Button';

export const ButtonPanel = ({ editable, deletable, editText, deleteText }) => {
  const setModal = useSetRecoilState(modalState);
  const setSlideOver = useSetRecoilState(slideOverState);

  return (
    <div className="flex justify-end space-x-1 mt-2">
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

const ListItem = ({ heading, editable, deletable, editText, deleteText, view, noButtonPanel, children }) => {
  const setModal = useSetRecoilState(modalState);

  if (view) {
    return (
      <li className="py-4">
        <div className="flex items-center space-x-4">
          <div className="flex-1 min-w-0">
            <h3 className="text-sm font-semibold text-gray-800">{heading}</h3>
            {children}
          </div>
          {view === 'hideButton' ? null : (
            <div>
              <Button rounded onClick={() => setModal(view)}>
                View
              </Button>
            </div>
          )}
        </div>
      </li>
    );
  }

  return (
    <li className="py-3">
      <h3 className="text-sm font-semibold text-gray-800">{heading}</h3>
      <div>{children}</div>
      {!noButtonPanel ? <ButtonPanel editable={editable} deletable={deletable} editText={editText} deleteText={deleteText} /> : null}
    </li>
  );
};

export default ListItem;
