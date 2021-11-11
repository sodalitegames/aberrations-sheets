import { Link } from 'react-router-dom';

const ContentHeader = ({ heading }) => {
  return (
    <div className="bg-white shadow">
      <div className="px-4 sm:px-6 lg:px-8">
        <div className="py-6 md:flex md:items-center md:justify-between">
          {/* Heading */}
          <div className="flex-1 min-w-0">
            <div className="flex items-center">
              <h1 className="text-4xl font-bold">{heading}</h1>
            </div>
          </div>

          {/* Buttons */}
          <div className="mt-6 flex space-x-3 md:mt-0 md:ml-4">
            <Link to="?modal=true">
              <button
                type="button"
                className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-500"
              >
                Secondary button
              </button>
            </Link>
            <button
              type="button"
              className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-cyan-600 hover:bg-cyan-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-500"
            >
              Primary button
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const PageContent = ({ heading, children }) => {
  return (
    <>
      <ContentHeader heading={heading} />
      <div className="py-4 sm:p-6 lg:p-8 space-y-8">{children}</div>
    </>
  );
};

export default PageContent;
