import { Link } from 'react-router-dom';

import { MenuAlt1Icon } from '@heroicons/react/outline';

const PageHeader = ({ setSidebarOpen }) => {
  return (
    <header className="relative shrink-0 h-16 flex bg-white border-b border-gray-200">
      <button
        type="button"
        className="px-4 border-r border-gray-200 text-gray-400 hover:text-gray-500 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-primary-light lg:hidden"
        onClick={() => setSidebarOpen(true)}
      >
        <span className="sr-only">Open sidebar</span>
        <MenuAlt1Icon className="h-6 w-6" aria-hidden="true" />
      </button>
      {/* Search bar */}
      <div className="flex-1 flex items-center px-6 justify-between lg:mx-auto">
        <Link to="/">
          <span className="sr-only">Aberrations RPG Sheets</span>
          <h3 className="text-xl font-display uppercase text-gray-800">Aberrations RPG Sheets</h3>
        </Link>
      </div>
    </header>
  );
};

export default PageHeader;
