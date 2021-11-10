import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { RecoilRoot } from 'recoil';

import reportWebVitals from './reportWebVitals';
import ErrorBoundary from './components/ErrorBoundary';
import App from './App';

import HomePageLayout from './layouts/home-page-layout';
import SheetPageLayout from './layouts/sheet-page-layout';
import HomePage from './pages/home/home';
import CharactersPage from './pages/home/characters';
import CampaignsPage from './pages/home/campaigns';

import CharacterSheet from './layouts/CharacterSheet';
import CampaignSheet from './layouts/CampaignSheet';

import './index.css';

ReactDOM.render(
  <React.StrictMode>
    <RecoilRoot>
      <ErrorBoundary>
        <React.Suspense fallback={<div>Loading...</div>}>
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<App />}>
                <Route element={<HomePageLayout />}>
                  <Route index element={<HomePage />} />
                  <Route path="characters" element={<CharactersPage />} />
                  <Route path="campaigns" element={<CampaignsPage />} />
                  <Route path="profile" element={<>profile</>} />
                  <Route path="settings" element={<>settings</>} />
                  <Route path="help" element={<>help</>} />
                  <Route path="privacy" element={<>privacy</>} />
                  <Route path="about" element={<>about</>} />
                </Route>
                <Route path="characters/:charId" element={<CharacterSheet />}>
                  <Route index element={<SheetPageLayout />} />
                  <Route path="notes" element={<>notes</>} />
                </Route>
                <Route path="campaign/:campId" element={<CampaignSheet />}>
                  <Route index element={<SheetPageLayout />} />
                  <Route path="notes" element={<>notes</>} />
                </Route>
              </Route>
            </Routes>
          </BrowserRouter>
        </React.Suspense>
      </ErrorBoundary>
    </RecoilRoot>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
