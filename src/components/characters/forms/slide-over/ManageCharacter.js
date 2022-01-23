import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { selectCurrentUser } from '../../../../redux/user/user.selectors';
import { selectCurrentCharacter } from '../../../../redux/character/character.selectors';

import { setModal } from '../../../../redux/app/app.actions';
import { updateSheetStart } from '../../../../redux/sheet/sheet.actions';

import { SlideOverForm } from '../../../../layouts/components/app/SlideOver';

import Input from '../../../shared/Input';
// import TextArea from '../../../shared/TextArea';
import Row from '../../../shared/Row';
import Detail from '../../../shared/Detail';
import Button from '../../../shared/Button';

import Species from '../../../characters/display/Species';
import ModalTypes from '../../../../utils/ModalTypes';

const ManageCharacter = () => {
  const dispatch = useDispatch();

  const currentUser = useSelector(selectCurrentUser);
  const charSheet = useSelector(selectCurrentCharacter);

  const [playerNickname, setPlayerNickname] = useState('');
  const [characterName, setCharacterName] = useState('');
  const [charDescription, setCharDescription] = useState('');
  const [charBackground, setCharBackground] = useState('');

  useEffect(() => {
    if (charSheet) {
      setPlayerNickname(charSheet.playerNickname);
      setCharacterName(charSheet.characterName);
      setCharDescription(charSheet.charDescription);
      setCharBackground(charSheet.charBackground);
    }
  }, [charSheet]);

  const submitHandler = async e => {
    e.preventDefault();

    if (!characterName) return alert('Must provide a characterName');
    if (!charDescription) return alert('Must provide a charDescription');
    if (!charBackground) return alert('Must provide a charBackground');

    dispatch(
      updateSheetStart('characters', charSheet._id, {
        playerNickname,
        characterName,
        charDescription,
        charBackground,
      })
    );
  };

  return (
    <SlideOverForm title="Manage Character" description="Edit the information below to update your character." submitText="Save character" submitHandler={submitHandler}>
      <Detail slideOver label="Player Name" detail={currentUser.name} />
      <Input slideOver label="Player Nickname (Opt.)" type="text" name="playerName" value={playerNickname} changeHandler={setPlayerNickname} />
      <Input slideOver label="Character Name" type="text" name="characterName" value={characterName} changeHandler={setCharacterName} />
      <Row slideOver name="species" label="Character Species">
        <ul className="mt-3 divide-y divide-gray-200">
          <Species species={charSheet.species} />
        </ul>
      </Row>
      {/* <TextArea slideOver label="Character Description" name="charDescription" rows={6} value={charDescription} changeHandler={setCharDescription} />
      <TextArea slideOver label="Character Background" name="charBackground" rows={8} value={charBackground} changeHandler={setCharBackground} /> */}
      <Row slideOver name="deleteCharacter" label="Delete Character">
        <Button alert type="button" onClick={() => dispatch(setModal({ type: ModalTypes.deleteCharacter }))}>
          Permanently Delete {charSheet.characterName}
        </Button>
      </Row>
    </SlideOverForm>
  );
};

export default ManageCharacter;
