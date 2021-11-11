import React from 'react';
import { useRecoilValue } from 'recoil';

import { getUsersCampaigns } from '../../recoil/user/user.selectors';

import Loading from '../../layouts/components/app/Loading';
import PageContent from '../../layouts/components/home/PageContent';

import CampSheetCard from '../../components/home/CampSheetCard';

const Campaigns = () => {
  const campaigns = useRecoilValue(getUsersCampaigns);

  console.log('Campaign Sheets:', campaigns);

  return (
    <PageContent heading="Your Campaigns">
      <React.Suspense fallback={<Loading />}>
        {campaigns.map(campSheet => (
          <CampSheetCard key={campSheet._id} campSheet={campSheet} />
        ))}
      </React.Suspense>
    </PageContent>
  );
};

export default Campaigns;
