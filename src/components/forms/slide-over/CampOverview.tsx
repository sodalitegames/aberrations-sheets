import { FormEvent, useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { selectCurrentCampaign } from '../../../redux/campaign/campaign.selectors';

import { updateSheetStart } from '../../../redux/sheet/sheet.actions';

import { SlideOverForm } from '../SlideOver';

import TextArea from '../elements/TextArea';

import { SheetType } from '../../../models/sheet';

const CampOverview = () => {
  const dispatch = useDispatch();

  const campSheet = useSelector(selectCurrentCampaign)!;

  const [overview, setOverview] = useState('');

  useEffect(() => {
    if (campSheet) {
      setOverview(campSheet.overview);
    }
  }, [campSheet]);

  const submitHandler = async (e: FormEvent) => {
    e.preventDefault();

    if (!overview) return alert('Must provide overview');

    dispatch(
      updateSheetStart(
        SheetType.campaigns,
        campSheet._id,
        { overview },
        { slideOver: true, notification: { status: 'success', heading: 'Campaign Sheet Updated', message: 'You have successfully updated your campaign overview.' } }
      )
    );
  };

  return (
    <SlideOverForm title="Edit Campaign Overview" description="Update the information below to edit your campaign overview." submitText="Save campaign overview" submitHandler={submitHandler}>
      <TextArea slideOver label="Campaign Overview" name="overview" rows={12} value={overview} changeHandler={setOverview} />
    </SlideOverForm>
  );
};

export default CampOverview;
