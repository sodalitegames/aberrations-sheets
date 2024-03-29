import { PencilIcon } from '@heroicons/react/solid';

import { useActions } from '../hooks/useActions';

import classNames from '../utils/classNames';

import { Modal } from '../models/app';

export enum ChipColor {
  red = 'red',
  yellow = 'yellow',
  green = 'green',
  gray = 'gray',
}

interface ChipProps {
  color: ChipColor;
  classes?: string;
  editable?: Modal;
}

const Chip: React.FC<ChipProps> = ({ color, children, classes, editable }) => {
  const { setModal } = useActions();

  return (
    <div
      className={classNames(
        color === 'red' ? 'bg-red-100 text-red-800' : '',
        color === 'yellow' ? 'bg-yellow-100 text-yellow-800' : '',
        color === 'green' ? 'bg-green-100 text-green-800' : '',
        color === 'gray' ? 'bg-gray-50 text-gray-300' : '',
        editable ? 'justify-between' : 'justify-center',
        'inline-flex items-center px-2.5 py-0.5 rounded-full text-sm font-medium mt-0',
        classes || ''
      )}
    >
      {children}

      {editable ? (
        <span title="Edit manually" onClick={() => setModal(editable)}>
          <PencilIcon
            className={classNames(
              color === 'red' ? 'text-red-800 border-red-800' : '',
              color === 'yellow' ? 'text-yellow-800 border-yellow-800' : '',
              color === 'green' ? 'text-green-800 border-green-800' : '',
              '-mr-1 ml-2 shrink-0 self-center justify-self-end h-4 w-4 cursor-pointer border p-0.5 rounded-full'
            )}
            aria-hidden="true"
          />
        </span>
      ) : null}
    </div>
  );
};

export default Chip;
