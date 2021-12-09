import React, { useEffect } from 'react';
import { useParams, Outlet } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import { selectCurrentCampaign } from '../redux/campaign/campaign.selectors';

import { fetchCurrentSheetStart } from '../redux/sheet/sheet.actions';

import Loading from './components/app/Loading';

import SheetPageHeader from './components/sheet/SheetPageHeader';
import Footer from './components/shared/Footer';

export default function CharacterSheet() {
  let { campId } = useParams();

  const dispatch = useDispatch();

  const campSheet = useSelector(selectCurrentCampaign);

  useEffect(() => {
    if (campId) {
      if (!campSheet || campSheet?._id !== campId) {
        dispatch(fetchCurrentSheetStart('campaigns', campId));
      }
    }
  });

  return (
    <div className="min-h-screen flex flex-col justify-between">
      <div>
        <SheetPageHeader type="campaign" />
        <main className="-mt-24 pb-8">
          {campSheet ? (
            <React.Suspense fallback={<Loading />}>
              <Outlet />
            </React.Suspense>
          ) : (
            <Loading />
          )}
        </main>
      </div>
      <Footer />
    </div>
  );
}
