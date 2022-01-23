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

import Loading from './layouts/components/app/Loading';

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
import CharacterGameplayPage from './pages/characters/gameplay';
import CharacterInventoryPage from './pages/characters/inventory';
import CharacterCharacterPage from './pages/characters/character';

// Nested Character Inventory Pages
import CharacterWeaponsPage from './pages/characters/inventory/weapons';
import CharacterWearablesPage from './pages/characters/inventory/wearables';
import CharacterConsumablesPage from './pages/characters/inventory/consumables';
import CharacterUsablesPage from './pages/characters/inventory/usables';

// Campaign Pages
import CampaignGameplayPage from './pages/campaigns/gameplay';
import CampaignCombatPage from './pages/campaigns/combat';
import CampaignCampaignPage from './pages/campaigns/campaign';
import CampaignPlayersPage from './pages/campaigns/players';
import CampaignInteractablesPage from './pages/campaigns/interactables';

// Nested Campaign Interactables Pages
import CampaignNpcsPage from './pages/campaigns/interactables/npcs';
import CampaignWeaponsPage from './pages/campaigns/interactables/weapons';
import CampaignWearablesPage from './pages/campaigns/interactables/wearables';
import CampaignConsumablesPage from './pages/campaigns/interactables/consumables';
import CampaignUsablesPage from './pages/campaigns/interactables/usables';
import CampaignEnvironmentsPage from './pages/campaigns/interactables/environments';
import CampaignCreaturesPage from './pages/campaigns/interactables/creatures';

// Shared Sheet Pages
import SheetNotesPage from './pages/sheets/notes';
import SheetResourcesPage from './pages/sheets/resources';

import './index.css';

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
                  <Route path="inventory" element={<CharacterInventoryPage />}>
                    <Route index element={<Navigate to="weapons" />} />
                    <Route path="weapons" element={<CharacterWeaponsPage />} />
                    <Route path="wearables" element={<CharacterWearablesPage />} />
                    <Route path="consumables" element={<CharacterConsumablesPage />} />
                    <Route path="usables" element={<CharacterUsablesPage />} />
                  </Route>
                  <Route path="notes" element={<SheetNotesPage sheetType="characters" />} />
                  <Route path="resources" element={<SheetResourcesPage sheetType="characters" />} />
                </Route>
                <Route path="campaigns/:campId" element={<CampaignSheet />}>
                  <Route index element={<Navigate to="gameplay" />} />
                  <Route path="gameplay" element={<CampaignGameplayPage />} />
                  <Route path="combat" element={<CampaignCombatPage />} />
                  <Route path="campaign" element={<CampaignCampaignPage />} />
                  <Route path="players" element={<CampaignPlayersPage />} />
                  <Route path="interactables" element={<CampaignInteractablesPage />}>
                    <Route index element={<Navigate to="npcs" />} />
                    <Route path="npcs" element={<CampaignNpcsPage />} />
                    <Route path="creatures" element={<CampaignCreaturesPage />} />
                    <Route path="environments" element={<CampaignEnvironmentsPage />} />
                    <Route path="weapons" element={<CampaignWeaponsPage />} />
                    <Route path="wearables" element={<CampaignWearablesPage />} />
                    <Route path="consumables" element={<CampaignConsumablesPage />} />
                    <Route path="usables" element={<CampaignUsablesPage />} />
                  </Route>
                  <Route path="notes" element={<SheetNotesPage sheetType="campaigns" />} />
                  <Route path="resources" element={<SheetResourcesPage sheetType="campaigns" />} />
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
