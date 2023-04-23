import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Provider } from 'react-redux';

import { store } from './redux/store';

import reportWebVitals from './reportWebVitals';
import ErrorBoundary from './components/ErrorBoundary';

import App from './App';

import Page from './layouts/Page';

import CharacterSheet from './layouts/CharacterSheet';
import CampaignSheet from './layouts/CampaignSheet';

import Loading from './components/Loading';

// Home Pages
import HomePage from './pages/home/home';
import CharactersPage from './pages/home/characters';
import CampaignsPage from './pages/home/campaigns';
import AboutPage from './pages/home/about';
import ProfilePage from './pages/home/profile';
import SettingsPage from './pages/home/settings';
import HelpPage from './pages/home/help';
import PrivacyPage from './pages/home/privacy';

// Character Pages
import CharacterGameplayPage from './pages/sheets/characters/gameplay';
import CharacterCharacterPage from './pages/sheets/characters/character';

// Campaign Pages
import CampaignCampaignPage from './pages/sheets/campaigns/campaign';
import CampaignCombatPage from './pages/sheets/campaigns/combat';
import CampaignPlayersPage from './pages/sheets/campaigns/players';
import CampaignNpcsPage from './pages/sheets/campaigns/npcs';
import CampaignCreaturesPage from './pages/sheets/campaigns/creatures';

// Shared Sheet Pages
import SheetBelongingsPage from './pages/sheets/shared/belongings';
import SheetNotesPage from './pages/sheets/shared/notes';
import SheetResourcesPage from './pages/sheets/shared/resources';

// Nested Shared Belongings Pages
import SheetBelongingsWeaponsPage from './pages/sheets/shared/belongings/weapons';
import SheetBelongingsWearablesPage from './pages/sheets/shared/belongings/wearables';
import SheetBelongingsConsumablesPage from './pages/sheets/shared/belongings/consumables';
import SheetBelongingsUsablesPage from './pages/sheets/shared/belongings/usables';

import './index.css';
import { SheetType } from './models/sheet';

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
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
                  <Route index element={<Navigate to="gameplay" />} />
                  <Route path="gameplay" element={<CharacterGameplayPage />} />
                  <Route path="character" element={<CharacterCharacterPage />} />
                  <Route path="belongings" element={<SheetBelongingsPage sheetType={SheetType.characters} />}>
                    <Route index element={<Navigate to="weapons" />} />
                    <Route path="weapons" element={<SheetBelongingsWeaponsPage sheetType={SheetType.characters} />} />
                    <Route path="wearables" element={<SheetBelongingsWearablesPage sheetType={SheetType.characters} />} />
                    <Route path="consumables" element={<SheetBelongingsConsumablesPage sheetType={SheetType.characters} />} />
                    <Route path="usables" element={<SheetBelongingsUsablesPage sheetType={SheetType.characters} />} />
                  </Route>
                  <Route path="notes" element={<SheetNotesPage sheetType={SheetType.characters} />} />
                  <Route path="resources" element={<SheetResourcesPage sheetType={SheetType.characters} />} />
                </Route>
                <Route path="campaigns/:campId" element={<CampaignSheet />}>
                  <Route index element={<Navigate to="campaign" />} />
                  <Route path="campaign" element={<CampaignCampaignPage />} />
                  <Route path="combat" element={<CampaignCombatPage />} />
                  <Route path="players" element={<CampaignPlayersPage />} />
                  <Route path="npcs" element={<CampaignNpcsPage />} />
                  <Route path="creatures" element={<CampaignCreaturesPage />} />
                  <Route path="belongings" element={<SheetBelongingsPage sheetType={SheetType.campaigns} />}>
                    <Route index element={<Navigate to="weapons" />} />
                    <Route path="weapons" element={<SheetBelongingsWeaponsPage sheetType={SheetType.campaigns} />} />
                    <Route path="wearables" element={<SheetBelongingsWearablesPage sheetType={SheetType.campaigns} />} />
                    <Route path="consumables" element={<SheetBelongingsConsumablesPage sheetType={SheetType.campaigns} />} />
                    <Route path="usables" element={<SheetBelongingsUsablesPage sheetType={SheetType.campaigns} />} />
                  </Route>
                  <Route path="notes" element={<SheetNotesPage sheetType={SheetType.campaigns} />} />
                  <Route path="resources" element={<SheetResourcesPage sheetType={SheetType.campaigns} />} />
                </Route>
              </Route>
            </Routes>
          </BrowserRouter>
        </React.Suspense>
      </ErrorBoundary>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
