import { useDispatch } from 'react-redux';

import { setSlideOver } from '../../../redux/app/app.actions';

const ContentHeader = ({ heading, primary, secondary }) => {
  const dispatch = useDispatch();
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
            {secondary ? (
              <button
                type="button"
                className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-500"
              >
                Secondary button
              </button>
            ) : null}
            {primary ? (
              <button
                type="button"
                className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-cyan-600 hover:bg-cyan-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-500"
                onClick={() => dispatch(setSlideOver(primary.slideOver))}
              >
                {primary.text}
              </button>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
};

const PageContent = ({ heading, primary, secondary, children }) => {
  return (
    <>
      <ContentHeader heading={heading} primary={primary} secondary={secondary} />
      <div className="py-4 sm:p-6 lg:p-8 space-y-8">{children}</div>
    </>
  );
};

export default PageContent;
