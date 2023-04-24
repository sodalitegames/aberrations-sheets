import { useActions } from '../../../hooks/useActions';

import { Modal, SlideOver } from '../../../models/app';

type CHButton<T> = {
  text: string;
  slideOver: T;
};

interface ContentHeaderProps {
  heading: string;
  primary?: CHButton<SlideOver>;
  secondary?: CHButton<Modal>;
}

const ContentHeader: React.FC<ContentHeaderProps> = ({ heading, primary, secondary }) => {
  const { setSlideOver, setModal } = useActions();

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
          <div className="flex mt-6 space-x-3 md:mt-0 md:ml-4">
            {secondary ? (
              <button
                type="button"
                className="inline-flex items-center px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-500"
                onClick={() => setModal(secondary.slideOver)}
              >
                {secondary.text}
              </button>
            ) : null}
            {primary ? (
              <button
                type="button"
                className="inline-flex items-center px-4 py-2 text-sm font-medium text-white border border-transparent rounded-md shadow-sm bg-cyan-600 hover:bg-cyan-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-500"
                onClick={() => setSlideOver(primary.slideOver)}
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

interface PageContentProps extends ContentHeaderProps {}

const PageContent: React.FC<PageContentProps> = ({ heading, primary, secondary, children }) => {
  return (
    <>
      <ContentHeader heading={heading} primary={primary} secondary={secondary} />
      <div className="p-6 space-y-8">{children}</div>
    </>
  );
};

export default PageContent;
