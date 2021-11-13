import React, { useEffect } from 'react';
import { useParams, Outlet } from 'react-router-dom';
import { useSetRecoilState, useRecoilValue } from 'recoil';

import { campIdState, campSheetState } from '../recoil/campaign/campaign.atoms';
import { getCampSheet } from '../recoil/campaign/campaign.selectors';

import Loading from './components/app/Loading';

import SheetPageHeader from './components/sheet/SheetPageHeader';
import Footer from './components/shared/Footer';

export default function CharacterSheet() {
  let { campId } = useParams();
  let setcampId = useSetRecoilState(campIdState);

  useEffect(() => {
    if (campId) {
      setcampId(campId);
    }
  });

  const campSheet = useRecoilValue(getCampSheet);

  const setCampSheet = useSetRecoilState(campSheetState);

  if (campSheet) {
    setCampSheet(campSheet);
  }

  console.log('Campaign Sheet:', campSheet);

  if (!campSheet) {
    return <div>Collecting campaign sheet data...</div>;
  }

  return (
    <div className="min-h-screen flex flex-col justify-between">
      <div>
        <SheetPageHeader type="campaign" />
        <main className="-mt-24 pb-8">
          <React.Suspense fallback={<Loading />}>
            <Outlet />
          </React.Suspense>
        </main>
      </div>
      <Footer />
    </div>
  );
}
