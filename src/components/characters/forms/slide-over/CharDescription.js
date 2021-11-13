import { useEffect, useState } from 'react';
import { useRecoilState, useSetRecoilState } from 'recoil';

import { charSheetState } from '../../../../recoil/character/character.atoms';
import { slideOverState } from '../../../../recoil/app/app.atoms';

import { updateSheet } from '../../../../apis/sheets.api';

import { SlideOverForm } from '../../../../layouts/components/app/SlideOver';

import TextArea from '../../../shared/TextArea';

const CharDescription = () => {
  const [charSheet, setCharSheet] = useRecoilState(charSheetState);
  const setSlideOver = useSetRecoilState(slideOverState);

  const [charDescription, setCharDescription] = useState('');

  useEffect(() => {
    if (charSheet) {
      setCharDescription(charSheet.charDescription);
    }
  }, [charSheet]);

  const submitHandler = async e => {
    e.preventDefault();

    const response = await updateSheet('characters', charSheet._id, { charDescription });

    console.log(response.data.data);

    setCharSheet(oldCharSheet => {
      console.log(oldCharSheet);
      return { ...oldCharSheet, charDescription: response.data.data.sheet.charDescription };
    });

    setSlideOver(null);
  };

  return (
    <SlideOverForm
      title="Edit Character Description"
      description="Update the information below to edit your character description."
      submitText="Save character description"
      submitHandler={submitHandler}
    >
      <TextArea slideOver label="Character Description" name="charDescription" rows={8} value={charDescription} changeHandler={setCharDescription} />
    </SlideOverForm>
  );
};

export default CharDescription;
