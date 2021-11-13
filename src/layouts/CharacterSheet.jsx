import React, { useEffect } from 'react';
import { useParams, Outlet } from 'react-router-dom';
import { useSetRecoilState, useRecoilValue } from 'recoil';

import { charIdState, charSheetState } from '../recoil/character/character.atoms';
import { getCharSheet } from '../recoil/character/character.selectors';

import Loading from './components/app/Loading';

import SheetPageHeader from './components/sheet/SheetPageHeader';
import Footer from './components/shared/Footer';

const CharacterSheet = () => {
  let { charId } = useParams();
  let setCharId = useSetRecoilState(charIdState);

  useEffect(() => {
    if (charId) {
      setCharId(charId);
    }
  });

  const charSheet = useRecoilValue(getCharSheet);

  const setCharSheet = useSetRecoilState(charSheetState);

  if (charSheet) {
    setCharSheet(charSheet);
  }

  console.log('Character Sheet:', charSheet);

  if (!charSheet) {
    return <div>Collecting character sheet data...</div>;
  }

  return (
    <div className="min-h-screen flex flex-col justify-between">
      <div>
        <SheetPageHeader type="character" />
        <main className="-mt-24 pb-8">
          <React.Suspense fallback={<Loading />}>
            <Outlet />
          </React.Suspense>
        </main>
      </div>
      <Footer />
    </div>
  );
};

export default CharacterSheet;
