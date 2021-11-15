import { useSetRecoilState } from 'recoil';

import { modalState, slideOverState } from '../../recoil/app/app.atoms';

const ListItem = ({ heading, editable, deletable, children }) => {
  const setModal = useSetRecoilState(modalState);
  const setSlideOver = useSetRecoilState(slideOverState);

  return (
    <li className="py-3">
      <h3 className="text-sm font-semibold text-gray-800">{heading}</h3>

      <div>{children}</div>

      <div className="flex justify-end space-x-1 mt-2">
        {editable ? (
          <button
            type="button"
            className="inline-flex items-center px-1.5 py-1.5 text-xs font-medium rounded text-gray-500 bg-white hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            onClick={() => setSlideOver(editable)}
          >
            Edit
          </button>
        ) : null}
        {deletable ? (
          <button
            type="button"
            className="inline-flex items-center px-1.5 py-1.5 text-xs font-medium rounded text-gray-500 bg-white hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            onClick={() => setModal(deletable)}
          >
            Delete
          </button>
        ) : null}
      </div>
    </li>
  );
};

export default ListItem;
