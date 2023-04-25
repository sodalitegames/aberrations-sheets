import { FormEvent, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';

import { createSheetResourceStart, updateSheetResourceStart } from '../../../redux/sheet/sheet.actions';

import { SlideOverForm } from '../SlideOver';

import { formatDate, isoStringDate } from '../../../utils/helpers/dates';

import Input from '../elements/Input';
import TextArea from '../elements/TextArea';

import { SheetResourceType, SheetType } from '../../../models/sheet';
import { Log } from '../../../models/sheet/resources';

interface Props {
  data: {
    sheetType: SheetType;
    sheetId: string;
    log?: Log;
  };
}

const LogForm: React.FC<Props> = ({ data }) => {
  const dispatch = useDispatch();

  const [date, setDate] = useState('');
  const [content, setContent] = useState('');

  useEffect(() => {
    if (data.log) {
      setDate(isoStringDate(data.log.date));
      setContent(data.log.content);
    }
  }, [data.log]);

  const submitHandler = async (e: FormEvent) => {
    e.preventDefault();

    if (!date) return alert('Must provide an date');
    if (!content) return alert('Must provide content');

    if (data.log) {
      dispatch(
        updateSheetResourceStart(
          data.sheetType,
          data.sheetId,
          SheetResourceType.logs,
          data.log._id,
          { date, content },
          {
            slideOver: true,
            notification: {
              status: 'success',
              heading: `${data.sheetType === 'characters' ? 'Character' : `Captain's`} Log Updated`,
              message: `You have successfully updated ${data.sheetType === 'characters' ? 'character' : `captain's`} log created on ${formatDate(date)}.`,
            },
          }
        )
      );
      return;
    }

    dispatch(
      createSheetResourceStart(
        data.sheetType,
        data.sheetId,
        SheetResourceType.logs,
        { date, content },
        {
          slideOver: true,
          notification: {
            status: 'success',
            heading: `${data.sheetType === 'characters' ? 'Character' : `Captain's`} Log Created`,
            message: `You have successfully created a ${data.sheetType === 'characters' ? 'character' : `captain's`} log for ${formatDate(date)}.`,
          },
        }
      )
    );
  };

  return (
    <SlideOverForm
      title={data.log ? `Edit ${data.sheetType === 'campaigns' ? `Captain's` : 'Character'} Log` : `New ${data.sheetType === 'campaigns' ? `Captain's` : 'Character'} Log`}
      description={
        data.log
          ? `Update the information below to edit your ${data.sheetType === 'campaigns' ? `captain's` : 'character'} log.`
          : `Fill out the information below to create your new ${data.sheetType === 'campaigns' ? `captain's` : 'character'} log.`
      }
      submitText={data.log ? `Save ${data.sheetType === 'campaigns' ? `captain's` : 'character'} log` : `Create ${data.sheetType === 'campaigns' ? `captain's` : 'character'} log`}
      submitHandler={submitHandler}
    >
      <Input slideOver label="Date" name="date" type="date" value={date} changeHandler={setDate} />
      <TextArea slideOver label="What happened?" name="content" rows={8} value={content} changeHandler={setContent} />
    </SlideOverForm>
  );
};

export default LogForm;
