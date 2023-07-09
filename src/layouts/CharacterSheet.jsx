import React, { useEffect } from 'react';
import { useParams, Outlet } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import { selectCurrentCharacter, selectCharacterError, selectLoading, selectPermissions, selectPendingTransactions, selectResolvedTransactions } from '../redux/character/character.selectors';

import { fetchCurrentSheetStart } from '../redux/sheet/sheet.actions';

import charSocket from '../sockets/character';
// import playerSocket from '../sockets/player';

import Loading from '../components/Loading';

import SheetPageHeader from './components/sheet/SheetPageHeader';
import SheetPageError from './components/sheet/SheetPageError';

import Footer from './components/shared/Footer';
import Banner from './components/shared/Banner';

const CharacterSheet = () => {
  let { charId } = useParams();

  const dispatch = useDispatch();

  const charSheet = useSelector(selectCurrentCharacter);
  const error = useSelector(selectCharacterError);
  const loading = useSelector(selectLoading);
  const permissions = useSelector(selectPermissions);
  const pendingTransactions = useSelector(selectPendingTransactions);
  const resolvedTransactions = useSelector(selectResolvedTransactions);

  useEffect(() => {
    if (charId) {
      // Join room for character sheet
      charSocket.emit('joinRoom', charId);
      // playerSocket.emit('joinRoom', charId);
    }

    return () => {
      charSocket.emit('leaveRoom', charId);
      // playerSocket.emit('leaveRoom', charId);
    };
  }, [charId]);

  useEffect(() => {
    if (charId) {
      dispatch(fetchCurrentSheetStart('characters', charId));
    }
  }, [charId, dispatch]);

  useEffect(() => {
    if (charSheet) {
      document.title = `${charSheet.characterName} | Aberrations RPG Sheets`;
    }
  }, [charSheet]);

  return (
    <div className="flex flex-col justify-between min-h-screen">
      <div>
        {permissions?.isCC ? (
          <Banner
            icon="info"
            theme="neutral"
            message={`You are viewing ${charSheet.playerNickname || charSheet.playerName}'s character sheet as a CC, with limited permissions.`}
            // button={{ text: 'Learn more', href: '/about' }}
            closable
          />
        ) : null}

        <div>
          <SheetPageHeader
            title={charSheet ? `Aberrations RPG Sheets - ${charSheet.characterName}` : 'Aberrations RPG Sheets'}
            transactions={{ pending: pendingTransactions, resolved: resolvedTransactions }}
            type="characters"
          />
          <main className="pb-8 -mt-24">{!loading && charSheet ? <Outlet /> : !loading && error ? <SheetPageError type="characters" error={error} /> : <Loading />}</main>
        </div>
      </div>
      <Footer classes="max-w-3xl lg:max-w-7xl" />
    </div>
  );
};

export default CharacterSheet;
