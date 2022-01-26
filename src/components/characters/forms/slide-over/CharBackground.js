import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { selectCurrentCharacter } from '../../../../redux/character/character.selectors';

import { updateSheetStart } from '../../../../redux/sheet/sheet.actions';

import { SlideOverForm } from '../../../../layouts/components/app/SlideOver';

import TextArea from '../../../shared/form/TextArea';

const CharBackground = () => {
  const dispatch = useDispatch();

  const charSheet = useSelector(selectCurrentCharacter);

  const [charBackground, setCharBackground] = useState('');

  useEffect(() => {
    if (charSheet) {
      setCharBackground(charSheet.charBackground);
    }
  }, [charSheet]);

  const submitHandler = async e => {
    e.preventDefault();

    if (!charBackground) return alert('Must provide charBackground');

    dispatch(
      updateSheetStart(
        'characters',
        charSheet._id,
        { charBackground },
        { slideOver: true, notification: { status: 'success', heading: 'Character Sheet Updated', message: 'You have successfully updated your character background.' } }
      )
    );
  };

  return (
    <SlideOverForm title="Edit Character Background" description="Update the information below to edit your character background." submitText="Save character background" submitHandler={submitHandler}>
      <TextArea slideOver label="Character Background" name="charBackground" rows={12} value={charBackground} changeHandler={setCharBackground} />
    </SlideOverForm>
  );
};

export default CharBackground;
