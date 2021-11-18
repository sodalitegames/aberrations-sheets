import React from 'react';
import { useSelector } from 'react-redux';

import { selectUsersCampaigns } from '../../redux/user/user.selectors';

import Loading from '../../layouts/components/app/Loading';
import PageContent from '../../layouts/components/home/PageContent';

import CampSheetCard from '../../components/home/CampSheetCard';
import SlideOverTypes from '../../utils/SlideOverTypes';

const Campaigns = () => {
  const campaigns = useSelector(selectUsersCampaigns);

  console.log('Campaign Sheets:', campaigns);

  return (
    <PageContent heading="My Campaigns" primary={{ text: 'Create New Campaign', slideOver: { type: SlideOverTypes.newCampaign } }}>
      <React.Suspense fallback={<Loading />}>
        {campaigns.map(campSheet => (
          <CampSheetCard key={campSheet._id} campSheet={campSheet} />
        ))}
      </React.Suspense>
    </PageContent>
  );
};

export default Campaigns;
