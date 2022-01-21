import React, { useEffect } from 'react';
import { useParams, Outlet } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import { selectCurrentCharacter, selectError, selectLoading, selectPermissions } from '../redux/character/character.selectors';

import { fetchCurrentSheetStart } from '../redux/sheet/sheet.actions';

import socket from '../utils/socket';

import Loading from './components/app/Loading';

import SheetPageHeader from './components/sheet/SheetPageHeader';
import SheetPageError from './components/sheet/SheetPageError';

import Footer from './components/shared/Footer';
import Banner from './components/shared/Banner';

const CharacterSheet = () => {
  let { charId } = useParams();

  const dispatch = useDispatch();

  const charSheet = useSelector(selectCurrentCharacter);
  const error = useSelector(selectError);
  const loading = useSelector(selectLoading);
  const permissions = useSelector(selectPermissions);

  // useEffect(() => {
  //   const connection = new SocketConnection('/');

  //   if (charId) {
  //     connection.joinRoom(charId);
  //   }
  // });

  useEffect(() => {
    if (loading) return;
    if (error) return;

    if (charId) {
      if (!charSheet || charSheet?._id !== charId) {
        dispatch(fetchCurrentSheetStart('characters', charId));
      }
    }

    if (charSheet) {
      document.title = `${charSheet.characterName} | Aberrations RPG Sheets`;
    }
  });

  return (
    <div className="min-h-screen flex flex-col justify-between">
      <div>
        {permissions?.isCC ? (
          <Banner
            icon="info"
            theme="secondary"
            message={`You are viewing ${charSheet.playerNickname || charSheet.playerName}'s character sheet as a CC, with limited permissions.`}
            // button={{ text: 'Learn more', href: '/about' }}
            closable
          />
        ) : null}

        <div>
          <SheetPageHeader title={charSheet ? `Aberrations RPG Sheets - ${charSheet.characterName}` : 'Aberrations RPG Sheets'} type="character" />
          <main className="-mt-24 pb-8">
            {!loading && charSheet ? (
              <React.Suspense fallback={<Loading />}>
                <Outlet />
              </React.Suspense>
            ) : !loading && error ? (
              <SheetPageError type="characters" error={error} />
            ) : (
              <Loading />
            )}
          </main>
        </div>
      </div>
      <Footer classes="max-w-3xl lg:max-w-7xl" />
    </div>
  );
};

export default CharacterSheet;
