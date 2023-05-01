import React, { useEffect } from 'react';
import { useParams, Outlet } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import { selectCurrentCampaign, selectCampaignError, selectLoading, selectReload, selectPendingTransactions, selectResolvedTransactions } from '../redux/campaign/campaign.selectors';

import { fetchCurrentSheetStart } from '../redux/sheet/sheet.actions';

import campSocket from '../sockets/campaign';
import playerSocket from '../sockets/player';

import Loading from '../components/Loading';

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
  const pendingTransactions = useSelector(selectPendingTransactions);
  const resolvedTransactions = useSelector(selectResolvedTransactions);

  useEffect(() => {
    if (campId) {
      // Join room for campaign sheet
      campSocket.emit('joinRoom', campId);
    }

    if (campSheet) {
      // Join room for each player's character sheet
      campSheet.players.forEach(character => {
        playerSocket.emit('joinRoom', character._id);
      });
    }

    return () => {
      campSocket.emit('leaveRoom', campId);

      if (campSheet) {
        campSheet.players.forEach(character => {
          playerSocket.emit('leaveRoom', character._id);
        });
      }
    };
  }, [campId, campSheet]);

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
    <div className="flex flex-col justify-between min-h-screen">
      <div>
        {reload ? <Banner icon="info" theme="neutral" message={reload} button={{ text: 'Reload', custom: () => dispatch(fetchCurrentSheetStart('campaigns', campId)) }} /> : null}
        <div>
          <SheetPageHeader
            title={campSheet ? `Aberrations RPG Sheets -  ${campSheet.name}` : 'Aberrations RPG Sheets'}
            transactions={{ pending: pendingTransactions, resolved: resolvedTransactions }}
            type="campaigns"
          />
          <main className="pb-8 -mt-24">
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
