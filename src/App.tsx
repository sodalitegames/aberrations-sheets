import React from 'react';
import logo from './logo.svg';
import './App.css';

import { BrowserRouter, Routes, Route } from 'react-router-dom';

import HomePageLayout from './layouts/home-page-layout';
import SheetPageLayout from './components/sheet-page-layout';
import HomePage from './pages/home/home';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/">
          <Route element={<HomePageLayout />}>
            <Route index element={<HomePage />} />
            <Route path="characters" element={<>characters</>} />
            <Route path="campaigns" element={<>campaigns</>} />
            <Route path="settings" element={<>settings</>} />
            <Route path="profile" element={<>profile</>} />
            <Route path="privacy" element={<>privacy</>} />
            <Route path="help" element={<>help</>} />
            <Route path="about" element={<>about</>} />
          </Route>
          <Route path="characters/:charId">
            <Route index element={<SheetPageLayout />} />
            <Route path="notes" element={<>notes</>} />
          </Route>
          <Route path="campaign/:campId">
            <Route index element={<SheetPageLayout />} />
            <Route path="notes" element={<>notes</>} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
