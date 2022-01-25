import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { selectCurrentCampaign } from '../../../../redux/campaign/campaign.selectors';

import { updateSheetStart } from '../../../../redux/sheet/sheet.actions';

import { SlideOverForm } from '../../../../layouts/components/app/SlideOver';

import TextArea from '../../../shared/form/TextArea';

const CampDetails = () => {
  const dispatch = useDispatch();

  const campSheet = useSelector(selectCurrentCampaign);

  const [details, setDetails] = useState('');

  useEffect(() => {
    if (campSheet) {
      setDetails(campSheet.details);
    }
  }, [campSheet]);

  const submitHandler = async e => {
    e.preventDefault();

    if (!details) return alert('Must provide details');

    dispatch(updateSheetStart('campaigns', campSheet._id, { details }, { slideOver: true }));
  };

  return (
    <SlideOverForm title="Edit Campaign Details" description="Update the information below to edit your campaign details." submitText="Save campaign details" submitHandler={submitHandler}>
      <TextArea slideOver label="Campaign Details" name="details" rows={12} value={details} changeHandler={setDetails} />
    </SlideOverForm>
  );
};

export default CampDetails;
