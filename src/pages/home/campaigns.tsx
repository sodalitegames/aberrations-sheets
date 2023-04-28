import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { selectUsersCampaigns, selectUsersSheetsFetched, selectUserError } from '../../redux/user/user.selectors';

import { fetchSheetsForUserStart } from '../../redux/user/user.actions';

import Loading from '../../components/Loading';
import PageContent from '../../layouts/components/home/PageContent';
import Notice from '../../components/Notice';
import CampSheetCard from '../../components/home/CampSheetCard';

import SlideOverTypes from '../../utils/SlideOverTypes';

import { CampaignSheet } from '../../models/sheet';

const Campaigns = () => {
  const dispatch = useDispatch();

  const campaigns = useSelector(selectUsersCampaigns) as CampaignSheet[];
  const fetched = useSelector(selectUsersSheetsFetched);
  const error = useSelector(selectUserError);

  useEffect(() => {
    if (!fetched.campaigns) {
      dispatch(fetchSheetsForUserStart('campaigns'));
    }
  });

  return (
    <PageContent heading="My Campaigns" primary={{ text: 'Create New Campaign', slideOver: { type: SlideOverTypes.newCampaign } }}>
      {error.campaigns.fetch && (
        <Notice status={error.campaigns.fetch.status} message={error.campaigns.fetch.message} action={{ text: 'Retry', click: () => dispatch(fetchSheetsForUserStart('campaigns')) }} />
      )}
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">{fetched.campaigns ? campaigns.map(campSheet => <CampSheetCard key={campSheet._id} campSheet={campSheet} />) : <Loading />}</div>
    </PageContent>
  );
};

export default Campaigns;
