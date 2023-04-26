import { useState, useEffect, FormEvent } from 'react';
import { useDispatch } from 'react-redux';

import { createSheetResourceStart, updateSheetResourceStart } from '../../../redux/sheet/sheet.actions';

import { SlideOverForm } from '../SlideOver';

import { isoStringDate } from '../../../utils/helpers/dates';

import Input from '../elements/Input';
import TextArea from '../elements/TextArea';
import Toggle from '../elements/Toggle';

import { SheetResourceType, SheetType } from '../../../models/sheet';
import { Session } from '../../../models/sheet/resources';

interface Props {
  data: {
    sheetId: string;
    session?: Session;
  };
}

const SessionForm: React.FC<Props> = ({ data }) => {
  const dispatch = useDispatch();

  const [name, setName] = useState('');
  const [dateScheduled, setDateScheduled] = useState('');
  const [datePlayed, setDatePlayed] = useState('');
  const [active, setActive] = useState(true);
  const [completed, setCompleted] = useState(false);
  const [content, setContent] = useState('');

  useEffect(() => {
    if (data.session) {
      setName(data.session.name);
      setDateScheduled(data.session.dateScheduled ? isoStringDate(data.session.dateScheduled) : '');
      setDatePlayed(data.session.datePlayed ? isoStringDate(data.session.datePlayed) : '');
      setActive(data.session.active);
      setCompleted(data.session.completed);
      setContent(data.session.content);
    }
  }, [data.session]);

  const submitHandler = async (e: FormEvent) => {
    e.preventDefault();

    if (data.session) {
      dispatch(
        updateSheetResourceStart(
          SheetType.campaigns,
          data.sheetId,
          SheetResourceType.sessions,
          data.session._id,
          { name, dateScheduled, datePlayed, active, completed, content },
          { slideOver: true, notification: { status: 'success', heading: 'Session Updated', message: `You have successfully updated ${name}.` } }
        )
      );
      return;
    }

    dispatch(
      createSheetResourceStart(
        SheetType.campaigns,
        data.sheetId,
        SheetResourceType.sessions,
        { name, dateScheduled, datePlayed, active, completed, content },
        { slideOver: true, notification: { status: 'success', heading: 'Session Created', message: `You have successfully created ${name}.` } }
      )
    );
  };

  return (
    <SlideOverForm
      title={data.session ? 'Edit Session' : 'New Session'}
      description={data.session ? 'Edit the information below to update your session."' : 'Fill out the information below to create your new session.'}
      submitText={data.session ? 'Update Session' : 'Create session'}
      submitHandler={submitHandler}
    >
      <Input slideOver label="Date Scheduled" name="dateScheduled" type="date" value={dateScheduled} changeHandler={setDateScheduled} />
      <Input slideOver label="Name" name="name" type="text" value={name} changeHandler={setName} />
      <Toggle slideOver label="Active" name="active" enabled={active} setEnabled={setActive} />
      <Toggle slideOver label="Completed" name="completed" enabled={completed} setEnabled={setCompleted} />
      {completed && <Input slideOver label="Date Played" name="datePlayed" type="date" value={datePlayed} changeHandler={setDatePlayed} />}
      <TextArea slideOver label="Content" name="content" rows={24} value={content} changeHandler={setContent} required />
    </SlideOverForm>
  );
};

export default SessionForm;
