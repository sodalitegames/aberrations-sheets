import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { selectCurrentCharacter } from '../../../../redux/character/character.selectors';

import { createSheetResourceStart, updateSheetResourceStart } from '../../../../redux/sheet/sheet.actions';

import { SlideOverForm } from '../../../../layouts/components/app/SlideOver';

import { isoStringDate } from '../../../../utils/formatDate';

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

      setDate(isoStringDate(currentLog.date));
      setContent(currentLog.content);
    }
  }, [id, charSheet]);

  const submitHandler = async e => {
    e.preventDefault();

    if (id) {
      dispatch(updateSheetResourceStart('characters', charSheet._id, 'logs', id, { date, content }));
      return;
    }

    dispatch(createSheetResourceStart('characters', charSheet._id, 'logs', { date, content }));
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
