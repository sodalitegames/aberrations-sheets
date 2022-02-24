import { Link } from 'react-router-dom';

import SheetPageContent from './SheetPageContent';

import SheetPagePanel from './SheetPagePanel';
import classNames from '../../../utils/classNames';

const SheetPageError = ({ type, error }) => {
  return (
    <SheetPageContent title="Error">
      {/* Error Panel */}
      <SheetPagePanel>
        <div className="sm:flex p-16 justify-between items-center">
          <div className="sm:flex items-center sm:ml-6">
            <p className={classNames('text-4xl font-extrabold sm:text-5xl', type === 'characters' ? 'text-accent2-deep' : type === 'campaigns' ? 'text-accent1-deep' : 'text-gray-900')}>
              {error.status || 500}
            </p>

            <div className="sm:border-l sm:border-gray-200 sm:ml-6 sm:pl-6">
              <h1 className="text-4xl font-extrabold text-gray-900 tracking-tight sm:text-5xl">{error.statusText || error.message || 'Something went wrong'}</h1>
              <p className="mt-1 text-base text-gray-500">{error.data?.message || 'Please wait a few minutes and try again later'}</p>
            </div>
          </div>
          <div className="space-x-3 sm:pl-6">
            <Link
              to="/"
              className={classNames(
                'inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white focus:outline-none focus:ring-2 focus:ring-offset-2',
                type === 'characters'
                  ? 'bg-accent2-deep hover:bg-accent2-dark focus:ring-accent2-deep'
                  : type === 'campaigns'
                  ? 'bg-accent1-deep hover:bg-accent1-dark focus:ring-accent1-deep'
                  : 'bg-gray-900 hover:bg-gray-700 focus:ring-gray-900'
              )}
            >
              Go back home
            </Link>
            {/* <Link
              to="/"
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-indigo-700 bg-indigo-100 hover:bg-indigo-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Contact support
            </Link> */}
          </div>
        </div>
      </SheetPagePanel>
    </SheetPageContent>
  );
};

export default SheetPageError;
