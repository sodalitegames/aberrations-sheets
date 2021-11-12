const SheetPageContent = ({ title, children }) => {
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:max-w-7xl lg:px-8">
      <h1 className="sr-only">Gameplay</h1>
      {/* Main 3 column grid */}
      <div className="grid grid-cols-1 gap-4 items-start lg:grid-cols-3 lg:gap-8">
        {/* Left column */}
        <div className="grid grid-cols-2 gap-4 lg:col-span-2">{/* Welcome panel */}</div>

        {/* Right column */}
        <div className="grid grid-cols-1 gap-4"></div>
      </div>
    </div>
  );
};

export default SheetPageContent;
