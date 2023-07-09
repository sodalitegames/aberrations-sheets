import React, { useEffect } from 'react';
import { useParams, Outlet } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import { selectCurrentCampaign, selectCampaignError, selectLoading, selectReload, selectPendingTransactions, selectResolvedTransactions, selectPlayers } from '../redux/campaign/campaign.selectors';

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
  const players = useSelector(selectPlayers);
  const pendingTransactions = useSelector(selectPendingTransactions);
  const resolvedTransactions = useSelector(selectResolvedTransactions);

  useEffect(() => {
    if (campId) {
      // Join room for campaign sheet
      campSocket.emit('joinRoom', campId);
    }

    return () => {
      campSocket.emit('leaveRoom', campId);
    };
  }, [campId]);

  useEffect(() => {
    if (players.length) {
      // Join room for each player's character sheet
      players.forEach(character => {
        playerSocket.emit('joinRoom', character._id);
      });
    }

    return () => {
      if (players.length) {
        players.forEach(character => {
          playerSocket.emit('leaveRoom', character._id);
        });
      }
    };
  }, [players]);

  useEffect(() => {
    if (campId) {
      dispatch(fetchCurrentSheetStart('campaigns', campId));
    }
  }, [campId, dispatch]);

  useEffect(() => {
    if (campSheet) {
      document.title = `${campSheet.name} | Aberrations RPG Sheets`;
    }
  }, [campSheet]);

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
          <main className="pb-8 -mt-24">{!loading && campSheet ? <Outlet /> : !loading && error ? <SheetPageError type="campaigns" error={error} /> : <Loading />}</main>
        </div>
      </div>
      <Footer />
    </div>
  );
}
