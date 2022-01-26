import React, { useEffect } from 'react';
import { useParams, Outlet } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import { selectCurrentCampaign, selectCampaignError, selectLoading, selectReload } from '../redux/campaign/campaign.selectors';

import { fetchCurrentSheetStart } from '../redux/sheet/sheet.actions';

// import charSocket from '../sockets/character';
import campSocket from '../sockets/campaign';

import Loading from './components/app/Loading';

import SheetPageHeader from './components/sheet/SheetPageHeader';
import SheetPageError from './components/sheet/SheetPageError';

import Footer from './components/shared/Footer';
import Banner from './components/shared/Banner';

export default function CharacterSheet() {
  let { campId } = useParams();

  const dispatch = useDispatch();

  const campSheet = useSelector(selectCurrentCampaign);
  const error = useSelector(selectCampaignError);
  const loading = useSelector(selectLoading);
  const reload = useSelector(selectReload);

  useEffect(() => {
    if (campId) {
      // Join room for campaign sheet
      campSocket.emit('joinRoom', campId);
    }

    // if (campSheet) {
    //   // Join room for each player's character sheet
    //   campSheet.players.forEach(character => {
    //     charSocket.emit('joinRoom', character._id);
    //   });
    // }
  });

  useEffect(() => {
    if (loading) return;
    if (error) return;

    if (campId) {
      // Fetch current campaign sheet if not already or data is stale
      if (!campSheet || campSheet?._id !== campId) {
        dispatch(fetchCurrentSheetStart('campaigns', campId));
      }
    }

    if (campSheet) {
      document.title = `${campSheet.name} | Aberrations RPG Sheets`;
    }
  });

  return (
    <div className="min-h-screen flex flex-col justify-between">
      <div>
        {reload ? <Banner icon="info" theme="neutral" message={reload} button={{ text: 'Reload', custom: () => dispatch(fetchCurrentSheetStart('campaigns', campId)) }} /> : null}
        <div>
          <SheetPageHeader title={campSheet ? `Aberrations RPG Sheets -  ${campSheet.name}` : 'Aberrations RPG Sheets'} transactions={campSheet ? campSheet.transactions : null} type="campaigns" />
          <main className="-mt-24 pb-8">
            {!loading && campSheet ? (
              <React.Suspense fallback={<Loading />}>
                <Outlet />
              </React.Suspense>
            ) : !loading && error ? (
              <SheetPageError type="campaigns" error={error} />
            ) : (
              <Loading />
            )}
          </main>
        </div>
      </div>
      <Footer />
    </div>
  );
}
