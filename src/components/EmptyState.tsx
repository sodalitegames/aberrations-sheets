import { PlusIcon } from '@heroicons/react/solid';

import Button from './Button';

type ESButton = {
  text: string;
  click: () => void;
};

interface Props {
  heading: string;
  message: string;
  button: ESButton;
}

const EmptyState: React.FC<Props> = ({ heading, message, button, children }) => {
  return (
    <div className="relative block w-full px-3 py-5 text-center border-2 border-gray-300 border-dashed rounded-lg">
      <h3 className="text-sm font-medium text-gray-900">{heading}</h3>
      <p className="mt-1 text-sm text-gray-500">{message}</p>
      {button ? (
        <div className="mt-6">
          <Button onClick={button.click}>
            <PlusIcon className="w-5 h-5 mr-2 -ml-1" aria-hidden="true" />
            {button.text}
          </Button>
        </div>
      ) : null}
      {children ? children : null}
    </div>
  );
};

export default EmptyState;
