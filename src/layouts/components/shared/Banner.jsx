import { useState } from 'react';
import { Link } from 'react-router-dom';

import { SpeakerphoneIcon, InformationCircleIcon, XIcon } from '@heroicons/react/outline';

import classNames from '../../../utils/classNames';

const Banner = ({ icon, theme, message, button, closable }) => {
  const [show, setShow] = useState(true);

  if (!show) {
    return null;
  }

  return (
    <div className={classNames(theme === 'primary' ? 'bg-primary' : theme === 'secondary' ? 'bg-secondary' : theme === 'tertiary' ? 'bg-tertiary' : 'bg-gray-900')}>
      <div className={classNames('max-w-7xl mx-auto px-3 sm:px-6 lg:px-8', icon ? 'py-3' : 'py-4')}>
        <div className="flex items-center justify-between flex-wrap">
          <div className="w-0 flex-1 flex items-center">
            {icon ? (
              <span className="flex p-2 rounded-full">
                {icon === 'info' ? <InformationCircleIcon className="h-6 w-6 text-white" aria-hidden="true" /> : null}
                {icon === 'announcement' ? <SpeakerphoneIcon className="h-6 w-6 text-white" aria-hidden="true" /> : null}
              </span>
            ) : null}
            <p className="ml-3 font-medium tracking-wide text-white">{message}</p>
          </div>
          {button ? (
            <div className="order-3 mt-2 flex-shrink-0 w-full sm:order-2 sm:mt-0 sm:w-auto">
              {button.custom ? (
                <button
                  onClick={button.custom}
                  className={classNames(
                    'flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white',
                    theme === 'primary'
                      ? 'bg-primary-light hover:bg-primary-fade'
                      : theme === 'secondary'
                      ? 'bg-secondary-light hover:bg-secondary-fade'
                      : theme === 'tertiary'
                      ? 'bg-tertiary-light hover:bg-tertiary-fade'
                      : 'bg-gray-700 hover:bg-gray-600'
                  )}
                >
                  {button.text}
                </button>
              ) : (
                <Link
                  to={button.href}
                  className={classNames(
                    'flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white',
                    theme === 'primary'
                      ? 'bg-primary-light hover:bg-primary-fade'
                      : theme === 'secondary'
                      ? 'bg-secondary-light hover:bg-secondary-fade'
                      : theme === 'tertiary'
                      ? 'bg-tertiary-light hover:bg-tertiary-fade'
                      : 'bg-gray-700 hover:bg-gray-600'
                  )}
                >
                  {button.text}
                </Link>
              )}
            </div>
          ) : null}
          {closable ? (
            <div className="order-2 flex-shrink-0 sm:order-3 sm:ml-3">
              <button
                type="button"
                className={classNames(
                  '-mr-1 flex p-2 rounded-md  focus:outline-none focus:ring-2 focus:ring-white sm:-mr-2',
                  theme === 'primary' ? 'hover:bg-primary-light' : theme === 'secondary' ? 'hover:bg-secondary-light' : theme === 'tertiary' ? 'hover:bg-tertiary-light' : 'hover:bg-gray-700'
                )}
                onClick={() => setShow(false)}
              >
                <span className="sr-only">Dismiss</span>
                <XIcon className="h-6 w-6 text-white" aria-hidden="true" />
              </button>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default Banner;
