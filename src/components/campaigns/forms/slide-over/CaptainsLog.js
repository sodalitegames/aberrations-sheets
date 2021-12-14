import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { selectCurrentCampaign } from '../../../../redux/campaign/campaign.selectors';

import { setSlideOver } from '../../../../redux/app/app.actions';
import { createSheetResourceStart, updateSheetResourceStart } from '../../../../redux/sheet/sheet.actions';

import { SlideOverForm } from '../../../../layouts/components/app/SlideOver';

import { isoStringDate } from '../../../../utils/formatDate';

import Input from '../../../shared/Input';
import TextArea from '../../../shared/TextArea';

const CaptainsLog = ({ id }) => {
  const dispatch = useDispatch();

  const campSheet = useSelector(selectCurrentCampaign);

  const [date, setDate] = useState('');
  const [content, setContent] = useState('');

  useEffect(() => {
    if (id && campSheet) {
      const currentLog = campSheet.captainsLogs.find(log => log._id === id);

      setDate(isoStringDate(currentLog.date));
      setContent(currentLog.content);
    }
  }, [id, campSheet]);

  const submitHandler = async e => {
    e.preventDefault();

    if (id) {
      dispatch(updateSheetResourceStart('campaigns', campSheet._id, 'logs', id, { date, content }));

      dispatch(setSlideOver(null));
      return;
    }

    dispatch(createSheetResourceStart('campaigns', campSheet._id, 'logs', { date, content }));

    dispatch(setSlideOver(null));
  };

  return (
    <SlideOverForm
      title={id ? `Edit Captain's Log` : `New Captain's Log`}
      description={id ? `Update the information below to edit your captain's log.` : `Fill out the information below to create your new captain's log.`}
      submitText={id ? `Save captain's log` : `Create captain's log`}
      submitHandler={submitHandler}
    >
      <Input slideOver label="Date" name="date" type="date" value={date} changeHandler={setDate} />
      <TextArea slideOver label="What happened?" name="content" rows={8} value={content} changeHandler={setContent} />
    </SlideOverForm>
  );
};

export default CaptainsLog;
