import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { selectUsersCampaigns, selectUsersCampaignsFetched } from '../../redux/user/user.selectors';

import { fetchSheetsForUserStart } from '../../redux/user/user.actions';

import Loading from '../../components/Loading';
import PageContent from '../../layouts/components/home/PageContent';

import CampSheetCard from '../../components/home/CampSheetCard';
import SlideOverTypes from '../../utils/SlideOverTypes';

import { CampaignSheet } from '../../models/sheet';

const Campaigns = () => {
  const dispatch = useDispatch();

  const campaigns = useSelector(selectUsersCampaigns) as CampaignSheet[];
  const fetched = useSelector(selectUsersCampaignsFetched);

  useEffect(() => {
    if (!fetched) {
      dispatch(fetchSheetsForUserStart('campaigns'));
    }
  });

  return (
    <PageContent heading="My Campaigns" primary={{ text: 'Create New Campaign', slideOver: { type: SlideOverTypes.newCampaign } }}>
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">{fetched ? campaigns.map(campSheet => <CampSheetCard key={campSheet._id} campSheet={campSheet} />) : <Loading />}</div>
    </PageContent>
  );
};

export default Campaigns;
