import React, { useEffect } from 'react';
import { useParams, Outlet } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import { selectCurrentCampaign, selectError, selectLoading } from '../redux/campaign/campaign.selectors';

import { fetchCurrentSheetStart } from '../redux/sheet/sheet.actions';

import Loading from './components/app/Loading';

import SheetPageHeader from './components/sheet/SheetPageHeader';
import Footer from './components/shared/Footer';
import SheetPageError from './components/sheet/SheetPageError';

export default function CharacterSheet() {
  let { campId } = useParams();

  const dispatch = useDispatch();

  const campSheet = useSelector(selectCurrentCampaign);
  const error = useSelector(selectError);
  const loading = useSelector(selectLoading);

  useEffect(() => {
    if (loading) return;
    if (error) return;

    if (campId) {
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
        <SheetPageHeader title={campSheet ? `Aberrations RPG Sheets -  ${campSheet.name}` : 'Aberrations RPG Sheets'} type="campaign" />
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
      <Footer />
    </div>
  );
}
