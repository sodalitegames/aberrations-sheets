import classNames from '../../../utils/classNames';

const SheetPageContent = ({ title, columns, children }) => {
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:max-w-7xl lg:px-8">
      <h1 className="sr-only">{title}</h1>
      {/* Main grid */}
      <div
        className={classNames(
          'grid grid-flow-row-dense grid-cols-1 gap-4 items-start',
          columns === 2 ? 'md:grid-cols-2' : '',
          columns === 3 ? 'md:grid-cols-3' : '',
          columns === 4 ? 'md:grid-cols-2 lg:grid-cols-4' : ''
        )}
      >
        {children}
      </div>
    </div>
  );
};

export default SheetPageContent;
