import { useState, useEffect, FormEvent } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { selectCurrentCampaign } from '../../../redux/campaign/campaign.selectors';

import { createSheetResourceStart, updateSheetResourceStart } from '../../../redux/sheet/sheet.actions';

import { SlideOverForm } from '../SlideOver';

import { isoStringDate } from '../../../utils/helpers/dates';

import Input from '../elements/Input';
import TextArea from '../elements/TextArea';
import Toggle from '../elements/Toggle';

import { SheetResourceType, SheetType } from '../../../models/sheet';

interface Props {
  id: string;
}

const SessionForm: React.FC<Props> = ({ id }) => {
  const dispatch = useDispatch();

  const campSheet = useSelector(selectCurrentCampaign)!;

  const [name, setName] = useState('');
  const [dateScheduled, setDateScheduled] = useState('');
  const [datePlayed, setDatePlayed] = useState('');
  const [active, setActive] = useState(true);
  const [completed, setCompleted] = useState(false);
  const [content, setContent] = useState('');

  useEffect(() => {
    if (id && campSheet) {
      const currentSession = campSheet.sessions.find(session => session._id === id);

      if (currentSession) {
        setName(currentSession.name);
        setDateScheduled(currentSession.dateScheduled ? isoStringDate(currentSession.dateScheduled) : '');
        setDatePlayed(currentSession.datePlayed ? isoStringDate(currentSession.datePlayed) : '');
        setActive(currentSession.active);
        setCompleted(currentSession.completed);
        setContent(currentSession.content);
      }
    }
  }, [id, campSheet]);

  const submitHandler = async (e: FormEvent) => {
    e.preventDefault();

    if (id) {
      dispatch(
        updateSheetResourceStart(
          SheetType.campaigns,
          campSheet._id,
          SheetResourceType.sessions,
          id,
          { name, dateScheduled, datePlayed, active, completed, content },
          { slideOver: true, notification: { status: 'success', heading: 'Session Updated', message: `You have successfully updated ${name}.` } }
        )
      );
      return;
    }

    dispatch(
      createSheetResourceStart(
        SheetType.campaigns,
        campSheet._id,
        SheetResourceType.sessions,
        { name, dateScheduled, datePlayed, active, completed, content },
        { slideOver: true, notification: { status: 'success', heading: 'Session Created', message: `You have successfully created ${name}.` } }
      )
    );
  };

  return (
    <SlideOverForm
      title={id ? 'Edit Session' : 'New Session'}
      description={id ? 'Edit the information below to update your session."' : 'Fill out the information below to create your new session.'}
      submitText={id ? 'Update Session' : 'Create session'}
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
