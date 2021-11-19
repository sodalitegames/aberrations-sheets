import { useEffect, useState } from 'react';
import { useRecoilState, useSetRecoilState } from 'recoil';

import { charSheetState } from '../../../../recoil/character/character.atoms';
import { slideOverState } from '../../../../recoil/app/app.atoms';

import { updateSheet } from '../../../../apis/sheets.api';

import { SlideOverForm } from '../../../../layouts/components/app/SlideOver';

import TextArea from '../../../shared/TextArea';

const CharBackground = () => {
  const [charSheet, setCharSheet] = useRecoilState(charSheetState);
  const setSlideOver = useSetRecoilState(slideOverState);

  const [charBackground, setCharBackground] = useState('');

  useEffect(() => {
    if (charSheet) {
      setCharBackground(charSheet.charBackground);
    }
  }, [charSheet]);

  const submitHandler = async e => {
    e.preventDefault();

    const response = await updateSheet('characters', charSheet._id, { charBackground });

    setCharSheet(oldCharSheet => {
      return { ...oldCharSheet, charBackground: response.data.data.sheet.charBackground };
    });

    setSlideOver(null);
  };

  return (
    <SlideOverForm title="Edit Character Background" description="Update the information below to edit your character background." submitText="Save character background" submitHandler={submitHandler}>
      <TextArea slideOver label="Character Background" name="charBackground" rows={8} value={charBackground} changeHandler={setCharBackground} />
    </SlideOverForm>
  );
};

export default CharBackground;
