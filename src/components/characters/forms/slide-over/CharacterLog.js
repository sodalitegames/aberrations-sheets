import { useEffect, useState } from 'react';
import { useRecoilState, useSetRecoilState } from 'recoil';

import { charSheetState } from '../../../../recoil/character/character.atoms';
import { slideOverState } from '../../../../recoil/app/app.atoms';

import { createResource } from '../../../../apis/sheets.api';

import { SlideOverForm } from '../../../../layouts/components/app/SlideOver';

import Input from '../../../shared/Input';

const CharacterLogForm = ({ id }) => {
  const [charSheet, setCharSheet] = useRecoilState(charSheetState);
  const setSlideOver = useSetRecoilState(slideOverState);

  const [date, setDate] = useState('');
  const [content, setContent] = useState('');

  useEffect(() => {
    if (id && charSheet) {
      setDate(new Date(charSheet.characterLogs.find(log => log._id === id).date));
      setContent(charSheet.characterLogs.find(log => log._id === id).content);
    }
  }, [id, charSheet]);

  const submitHandler = async e => {
    e.preventDefault();

    const response = await createResource('characters', charSheet._id, 'logs', { date, content });

    console.log(response.data.data);

    setCharSheet(oldCharSheet => {
      console.log(oldCharSheet);
      return { ...oldCharSheet, characterLogs: [response.data.data.doc, ...oldCharSheet.characterLogs] };
    });

    setSlideOver(null);
  };

  return (
    <SlideOverForm title="New Character Log" description="Fill out the information below to create your new character log." submitText="Create new log" submitHandler={submitHandler}>
      <Input slideOver label="Date" name="date" type="number" value={date} changeHandler={setDate} />
      <Input slideOver label="What happened?" name="content" type="number" value={content} changeHandler={setContent} />
    </SlideOverForm>
  );
};

export default CharacterLogForm;
