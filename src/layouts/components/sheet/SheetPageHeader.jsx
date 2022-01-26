import { Link } from 'react-router-dom';

import { Popover } from '@headlessui/react';

import classNames from '../../../utils/classNames';

import { DesktopNavigation, MobileMenuButton, MobileNavigation, SecondaryNavigationDropdown } from './SheetPageNavigation';

import SheetPageTransactions from './SheetPageTransactions';
import SheetPageNotifications from './SheetPageNotifications';

const Logo = ({ type, title }) => {
  return (
    <div className="absolute left-0 py-5 shrink-0 lg:static">
      <Link to={`/${type}`}>
        <span className="sr-only">{title}</span>
        <h3 className="text-xl font-display uppercase text-white">{title}</h3>
      </Link>
    </div>
  );
};

const SheetPageHeader = ({ title, transactions, type }) => {
  return (
    <Popover
      as="header"
      className={classNames(
        type === 'characters' ? 'bg-gradient-to-r from-accent2-deep to-accent2-dark' : '',
        type === 'campaigns' ? 'bg-gradient-to-r from-accent1-deep to-accent1-dark' : '',
        'pb-24'
      )}
    >
      {({ open }) => (
        <>
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:max-w-7xl lg:px-8">
            <div className="relative flex flex-wrap items-center justify-center lg:justify-between pt-4 pb-8 lg:py-0">
              {/* Logo */}
              <Logo type={type} title={title} />

              {/* Right section on desktop */}
              <div className="hidden lg:ml-4 lg:flex lg:items-center lg:py-5 lg:pr-0.5">
                {/* Transactions dropdown */}
                <SheetPageTransactions transactions={transactions || { received: [], sent: [] }} type={type} />

                {/* Notifications dropdown */}
                <SheetPageNotifications type={type} />

                {/* Secondary navigation dropdown */}
                <SecondaryNavigationDropdown />
              </div>

              {/* Desktop navigation */}
              <DesktopNavigation type={type} />

              {/* Mobile Menu button */}
              <MobileMenuButton open={open} />
            </div>
          </div>

          {/* Mobile navigation */}
          <MobileNavigation title={title} type={type} />
        </>
      )}
    </Popover>
  );
};

export default SheetPageHeader;
