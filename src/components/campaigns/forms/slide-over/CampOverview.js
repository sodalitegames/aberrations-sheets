import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { selectCurrentCampaign } from '../../../../redux/campaign/campaign.selectors';

import { updateSheetStart } from '../../../../redux/sheet/sheet.actions';

import { SlideOverForm } from '../../../../layouts/components/app/SlideOver';

import TextArea from '../../../shared/TextArea';

const CampOverview = () => {
  const dispatch = useDispatch();

  const campSheet = useSelector(selectCurrentCampaign);

  const [overview, setOverview] = useState('');

  useEffect(() => {
    if (campSheet) {
      setOverview(campSheet.overview);
    }
  }, [campSheet]);

  const submitHandler = async e => {
    e.preventDefault();

    if (!overview) return alert('Must provide overview');

    dispatch(updateSheetStart('campaigns', campSheet._id, { overview }));
  };

  return (
    <SlideOverForm title="Edit Campaign Overview" description="Update the information below to edit your campaign overview." submitText="Save campaign overview" submitHandler={submitHandler}>
      <TextArea slideOver label="Campaign Overview" name="overview" rows={12} value={overview} changeHandler={setOverview} />
    </SlideOverForm>
  );
};

export default CampOverview;
