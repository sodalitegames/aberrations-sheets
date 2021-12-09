import { PlusIcon } from '@heroicons/react/solid';

import Button from './Button';

const EmptyState = ({ heading, message, button, children }) => {
  return (
    <div className="relative block w-full border-2 border-gray-300 border-dashed rounded-lg py-5 px-3 text-center">
      <h3 className="text-sm font-medium text-gray-900">{heading}</h3>
      <p className="mt-1 text-sm text-gray-500">{message}</p>
      {button ? (
        <div className="mt-6">
          <Button onClick={button.click}>
            <PlusIcon className="-ml-1 mr-2 h-5 w-5" aria-hidden="true" />
            {button.text}
          </Button>
        </div>
      ) : null}
      {children ? children : null}
    </div>
  );
};

export default EmptyState;
