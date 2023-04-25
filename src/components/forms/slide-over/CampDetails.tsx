import { FormEvent, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';

import { updateSheetStart } from '../../../redux/sheet/sheet.actions';

import { SlideOverForm } from '../SlideOver';

import TextArea from '../elements/TextArea';

import { CampaignSheet, SheetType } from '../../../models/sheet';

interface Props {
  data: {
    sheetId: string;
    entity: CampaignSheet;
  };
}

const CampDetails: React.FC<Props> = ({ data }) => {
  const dispatch = useDispatch();

  const [details, setDetails] = useState('');

  useEffect(() => {
    setDetails(data.entity.details);
  }, [data.entity]);

  const submitHandler = async (e: FormEvent) => {
    e.preventDefault();

    if (!details) return alert('Must provide details');

    dispatch(
      updateSheetStart(
        SheetType.campaigns,
        data.sheetId,
        { details },
        { slideOver: true, notification: { status: 'success', heading: 'Campaign Sheet Updated', message: 'You have successfully updated your campaign details.' } }
      )
    );
  };

  return (
    <SlideOverForm title="Edit Campaign Details" description="Update the information below to edit your campaign details." submitText="Save campaign details" submitHandler={submitHandler}>
      <TextArea slideOver label="Campaign Details" name="details" rows={12} value={details} changeHandler={setDetails} />
    </SlideOverForm>
  );
};

export default CampDetails;
