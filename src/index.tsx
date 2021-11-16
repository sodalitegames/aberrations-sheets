import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { RecoilRoot } from 'recoil';

import reportWebVitals from './reportWebVitals';
import ErrorBoundary from './components/ErrorBoundary';

import App from './App';

import Page from './layouts/Page';

import CharacterSheet from './layouts/CharacterSheet';
import CampaignSheet from './layouts/CampaignSheet';

import Loading from './layouts/components/app/Loading';

import HomePage from './pages/home/home';
import CharactersPage from './pages/home/characters';
import CampaignsPage from './pages/home/campaigns';
import AboutPage from './pages/home/about';

import ProfilePage from './pages/home/profile';
import SettingsPage from './pages/home/settings';
import HelpPage from './pages/home/help';
import PrivacyPage from './pages/home/privacy';

import CharacterGameplayPage from './pages/characters/gameplay';
import CharacterInventoryPage from './pages/characters/inventory';
import CharacterCharacterPage from './pages/characters/character';
import CharacterNotesPage from './pages/characters/notes';
import CharacterResourcesPage from './pages/characters/resources';

import CampaignGameplayPage from './pages/campaigns/gameplay';
import CampaignStatsTrackerPage from './pages/campaigns/stats-tracker';
import CampaignCampaignPage from './pages/campaigns/campaign';
import CampaignPlayersPage from './pages/campaigns/players';
import CampaignNpcsPage from './pages/campaigns/npcs';
import CampaignBelongingsPage from './pages/campaigns/belongings';
import CampaignNotesPage from './pages/campaigns/notes';

import './index.css';

ReactDOM.render(
  <React.StrictMode>
    <RecoilRoot>
      <ErrorBoundary>
        <React.Suspense fallback={<Loading fullScreen />}>
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<App />}>
                <Route element={<Page />}>
                  <Route index element={<HomePage />} />
                  <Route path="characters" element={<CharactersPage />} />
                  <Route path="campaigns" element={<CampaignsPage />} />
                  <Route path="about" element={<AboutPage />} />
                  <Route path="profile" element={<ProfilePage />} />
                  <Route path="settings" element={<SettingsPage />} />
                  <Route path="help" element={<HelpPage />} />
                  <Route path="privacy" element={<PrivacyPage />} />
                </Route>
                <Route path="characters/:charId" element={<CharacterSheet />}>
                  <Route index element={<CharacterGameplayPage />} />
                  <Route path="inventory" element={<CharacterInventoryPage />} />
                  <Route path="character" element={<CharacterCharacterPage />} />
                  <Route path="notes" element={<CharacterNotesPage />} />
                  <Route path="resources" element={<CharacterResourcesPage />} />
                </Route>
                <Route path="campaigns/:campId" element={<CampaignSheet />}>
                  <Route index element={<CampaignGameplayPage />} />
                  <Route path="stats-tracker" element={<CampaignStatsTrackerPage />} />
                  <Route path="campaign" element={<CampaignCampaignPage />} />
                  <Route path="players" element={<CampaignPlayersPage />} />
                  <Route path="npcs" element={<CampaignNpcsPage />} />
                  <Route path="creatures" element={<></>} />
                  <Route path="environments" element={<></>} />
                  <Route path="belongings" element={<CampaignBelongingsPage />} />
                  <Route path="notes" element={<CampaignNotesPage />} />
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
