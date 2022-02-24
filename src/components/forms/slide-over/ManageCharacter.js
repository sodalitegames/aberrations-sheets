import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { selectCurrentUser } from '../../../redux/user/user.selectors';
import { selectCurrentCharacter } from '../../../redux/character/character.selectors';

import { setNestedModal } from '../../../redux/app/app.actions';
import { updateSheetStart } from '../../../redux/sheet/sheet.actions';

import { SlideOverForm } from '../SlideOver';

import Input from '../elements/Input';
// import TextArea from '../../../TextArea';
import Row from '../elements/Row';
import Detail from '../elements/Detail';
import Button from '../../Button';

import DisplaySpecies from '../../display/DisplaySpecies';
import ModalTypes from '../../../utils/ModalTypes';

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
      updateSheetStart(
        'characters',
        charSheet._id,
        {
          playerNickname,
          characterName,
          charDescription,
          charBackground,
        },
        { slideOver: true, notification: { status: 'success', heading: 'Character Sheet Updated', message: `You have successfully updated ${characterName}.` } }
      )
    );
  };

  return (
    <SlideOverForm title="Manage Character" description="Edit the information below to update your character." submitText="Save character" submitHandler={submitHandler}>
      <Detail slideOver label="Player Name" detail={currentUser.name} />
      <Input slideOver label="Player Nickname (Opt.)" type="text" name="playerName" value={playerNickname} changeHandler={setPlayerNickname} />
      <Input slideOver label="Character Name" type="text" name="characterName" value={characterName} changeHandler={setCharacterName} />
      <Row slideOver name="species" label="Character Species">
        <ul className="mt-3 divide-y divide-gray-200">{charSheet ? <DisplaySpecies species={charSheet.species} /> : null}</ul>
      </Row>
      {/* <TextArea slideOver label="Character Description" name="charDescription" rows={6} value={charDescription} changeHandler={setCharDescription} />
      <TextArea slideOver label="Character Background" name="charBackground" rows={8} value={charBackground} changeHandler={setCharBackground} /> */}
      <Row slideOver name="deleteCharacter" label="Delete Character">
        <Button alert type="button" onClick={() => dispatch(setNestedModal({ type: ModalTypes.deleteSheet, data: { sheetType: 'characters' } }, { nestedModal: true, slideOver: true }))}>
          Permanently Delete {charSheet?.characterName}
        </Button>
      </Row>
    </SlideOverForm>
  );
};

export default ManageCharacter;
