import { useEffect, useState } from 'react';
import { useRecoilState, useSetRecoilState } from 'recoil';

import { charSheetState } from '../../../../recoil/character/character.atoms';
import { slideOverState } from '../../../../recoil/app/app.atoms';

import { createResource, updateResource } from '../../../../apis/sheets.api';

import { replaceItemById } from '../../../../utils/arrays';

import { SlideOverForm } from '../../../../layouts/components/app/SlideOver';

import Input from '../../../shared/Input';
import TextArea from '../../../shared/TextArea';

const CharacterLogForm = ({ id }) => {
  const [charSheet, setCharSheet] = useRecoilState(charSheetState);
  const setSlideOver = useSetRecoilState(slideOverState);

  const [date, setDate] = useState('');
  const [content, setContent] = useState('');

  useEffect(() => {
    if (id && charSheet) {
      setDate(new Date(charSheet.characterLogs.find(log => log._id === id).date).toISOString().split('T')[0]);
      setContent(charSheet.characterLogs.find(log => log._id === id).content);
    }
  }, [id, charSheet]);

  const submitHandler = async e => {
    e.preventDefault();

    if (id) {
      const response = await updateResource('characters', charSheet._id, 'logs', id, { date, content });
      console.log(response.data.data);
      setCharSheet(oldCharSheet => {
        console.log(oldCharSheet);
        return { ...oldCharSheet, characterLogs: replaceItemById(oldCharSheet.characterLogs, id, response.data.data.doc) };
      });

      setSlideOver(null);
      return;
    }

    const response = await createResource('characters', charSheet._id, 'logs', { date, content });

    console.log(response.data.data);

    setCharSheet(oldCharSheet => {
      console.log(oldCharSheet);
      return { ...oldCharSheet, characterLogs: [response.data.data.doc, ...oldCharSheet.characterLogs] };
    });

    setSlideOver(null);
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

export default CharacterLogForm;
