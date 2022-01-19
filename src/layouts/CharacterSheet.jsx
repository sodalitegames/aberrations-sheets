import React, { useEffect } from 'react';
import { useParams, Outlet } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import { selectCurrentCharacter } from '../redux/character/character.selectors';

import { fetchCurrentSheetStart } from '../redux/sheet/sheet.actions';

import Loading from './components/app/Loading';

import SheetPageHeader from './components/sheet/SheetPageHeader';
import Footer from './components/shared/Footer';

const CharacterSheet = () => {
  let { charId } = useParams();

  const dispatch = useDispatch();

  const charSheet = useSelector(selectCurrentCharacter);

  useEffect(() => {
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
        <SheetPageHeader title={charSheet ? `Aberrations RPG Sheets - ${charSheet.characterName}` : 'Aberrations RPG Sheets'} type="character" />
        <main className="-mt-24 pb-8">
          {charSheet ? (
            <React.Suspense fallback={<Loading />}>
              <Outlet />
            </React.Suspense>
          ) : (
            <Loading />
          )}
        </main>
      </div>
      <Footer classes="max-w-3xl lg:max-w-7xl" />
    </div>
  );
};

export default CharacterSheet;
