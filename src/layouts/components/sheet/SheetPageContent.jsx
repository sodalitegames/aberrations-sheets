const SheetPageContent = ({ title, columns, children }) => {
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:max-w-7xl lg:px-8">
      <h1 className="sr-only">{title}</h1>
      {/* Main grid */}
      <div className={`grid grid-cols-1 gap-4 items-start lg:grid-cols-${columns} lg:gap-4`}>{children}</div>
    </div>
  );
};

export default SheetPageContent;
