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

const CampOverview: React.FC<Props> = ({ data }) => {
  const dispatch = useDispatch();

  const [overview, setOverview] = useState('');

  useEffect(() => {
    setOverview(data.entity.overview);
  }, [data.entity]);

  const submitHandler = async (e: FormEvent) => {
    e.preventDefault();

    if (!overview) return alert('Must provide overview');

    dispatch(
      updateSheetStart(
        SheetType.campaigns,
        data.sheetId,
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
