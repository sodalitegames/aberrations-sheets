import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { selectCurrentCharacter } from '../../../../redux/character/character.selectors';
import { selectCurrentCampaign } from '../../../../redux/campaign/campaign.selectors';

import { createSheetResourceStart, updateSheetResourceStart } from '../../../../redux/sheet/sheet.actions';

import { SlideOverForm } from '../../../../layouts/components/app/SlideOver';

import { isoStringDate } from '../../../../utils/formatDate';

import Input from '../../../shared/form/Input';
import TextArea from '../../../shared/form/TextArea';

const LogForm = ({ id, data }) => {
  const dispatch = useDispatch();

  const charSheet = useSelector(selectCurrentCharacter);
  const campSheet = useSelector(selectCurrentCampaign);

  const [date, setDate] = useState('');
  const [content, setContent] = useState('');

  useEffect(() => {
    if (data.sheetType === 'characters') {
      if (id && charSheet) {
        const currentLog = charSheet.characterLogs.find(log => log._id === id);

        setDate(isoStringDate(currentLog.date));
        setContent(currentLog.content);
      }
    }

    if (data.sheetType === 'campaigns') {
      if (id && campSheet) {
        const currentLog = campSheet.captainsLogs.find(log => log._id === id);

        setDate(isoStringDate(currentLog.date));
        setContent(currentLog.content);
      }
    }
  }, [data.sheetType, id, charSheet, campSheet]);

  const submitHandler = async e => {
    e.preventDefault();

    const sheetId = data.sheetType === 'campaigns' ? campSheet._id : charSheet._id;

    if (id) {
      dispatch(updateSheetResourceStart(data.sheetType, sheetId, 'logs', id, { date, content }));
      return;
    }

    dispatch(createSheetResourceStart(data.sheetType, sheetId, 'logs', { date, content }));
  };

  return (
    <SlideOverForm
      title={id ? `Edit ${data.sheetType === 'campaigns' ? `Captain's` : 'Character'} Log` : `New ${data.sheetType === 'campaigns' ? `Captain's` : 'Character'} Log`}
      description={
        id
          ? `Update the information below to edit your ${data.sheetType === 'campaigns' ? `captain's` : 'character'} log.`
          : `Fill out the information below to create your new ${data.sheetType === 'campaigns' ? `captain's` : 'character'} log.`
      }
      submitText={id ? `Save ${data.sheetType === 'campaigns' ? `captain's` : 'character'} log` : `Create ${data.sheetType === 'campaigns' ? `captain's` : 'character'} log`}
      submitHandler={submitHandler}
    >
      <Input slideOver label="Date" name="date" type="date" value={date} changeHandler={setDate} />
      <TextArea slideOver label="What happened?" name="content" rows={8} value={content} changeHandler={setContent} />
    </SlideOverForm>
  );
};

export default LogForm;
