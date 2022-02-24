import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';

import Loading from '../components/Loading';
import PageNavigation from './components/home/PageNavigation';
import PageHeader from './components/home/PageHeader';
import Footer from './components/shared/Footer';

const Page = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <>
      <PageNavigation sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
      <div className="min-h-screen lg:pl-64 flex flex-col justify-between">
        <div>
          <PageHeader setSidebarOpen={setSidebarOpen} />
          <main className="pb-8">
            <React.Suspense fallback={<Loading />}>
              <Outlet />
            </React.Suspense>
          </main>
        </div>
        <Footer />
      </div>
    </>
  );
};

export default Page;
