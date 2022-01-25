import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { selectCurrentCharacter } from '../../../../redux/character/character.selectors';

import { updateSheetStart } from '../../../../redux/sheet/sheet.actions';

import { SlideOverForm } from '../../../../layouts/components/app/SlideOver';

import TextArea from '../../../shared/form/TextArea';

const CharDescription = () => {
  const dispatch = useDispatch();

  const charSheet = useSelector(selectCurrentCharacter);

  const [charDescription, setCharDescription] = useState('');

  useEffect(() => {
    if (charSheet) {
      setCharDescription(charSheet.charDescription);
    }
  }, [charSheet]);

  const submitHandler = async e => {
    e.preventDefault();

    if (!charDescription) return alert('Must provide charDescription');

    dispatch(updateSheetStart('characters', charSheet._id, { charDescription }, { slideOver: true }));
  };

  return (
    <SlideOverForm
      title="Edit Character Description"
      description="Update the information below to edit your character description."
      submitText="Save character description"
      submitHandler={submitHandler}
    >
      <TextArea slideOver label="Character Description" name="charDescription" rows={12} value={charDescription} changeHandler={setCharDescription} />
    </SlideOverForm>
  );
};

export default CharDescription;
