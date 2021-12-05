import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { selectCurrentCharacter } from '../../../../redux/character/character.selectors';

import { setSlideOver } from '../../../../redux/app/app.actions';
import { createSheetResourceStart, updateSheetResourceStart } from '../../../../redux/sheet/sheet.actions';

import { SlideOverForm } from '../../../../layouts/components/app/SlideOver';

import Input from '../../../shared/Input';
import TextArea from '../../../shared/TextArea';

const CharacterLog = ({ id }) => {
  const dispatch = useDispatch();

  const charSheet = useSelector(selectCurrentCharacter);

  const [date, setDate] = useState('');
  const [content, setContent] = useState('');

  useEffect(() => {
    if (id && charSheet) {
      const currentLog = charSheet.characterLogs.find(log => log._id === id);

      setDate(new Date(currentLog.date).toISOString().split('T')[0]);
      setContent(currentLog.content);
    }
  }, [id, charSheet]);

  const submitHandler = async e => {
    e.preventDefault();

    if (id) {
      dispatch(updateSheetResourceStart('characters', charSheet._id, 'logs', id, { date, content }));

      dispatch(setSlideOver(null));
      return;
    }

    dispatch(createSheetResourceStart('characters', charSheet._id, 'logs', { date, content }));

    dispatch(setSlideOver(null));
  };

  return (
    <SlideOverForm
      title={id ? 'Edit Character Log' : 'New Character Log'}
      description={id ? 'Update the information below to edit your character log.' : 'Fill out the information below to create your new character log.'}
      submitText={id ? 'Save character log' : 'Create character log'}
      submitHandler={submitHandler}
    >
      <Input slideOver label="Date" name="date" type="date" value={date} changeHandler={setDate} />
      <TextArea slideOver label="What happened?" name="content" rows={8} value={content} changeHandler={setContent} />
    </SlideOverForm>
  );
};

export default CharacterLog;
