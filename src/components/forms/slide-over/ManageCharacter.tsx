import { FormEvent, useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { selectCurrentUser } from '../../../redux/user/user.selectors';
import { selectCurrentCharacter } from '../../../redux/character/character.selectors';

import { updateSheetStart } from '../../../redux/sheet/sheet.actions';

import { useActions } from '../../../hooks/useActions';
import { useResource } from '../../../hooks/useResource';

import { getSpecies } from '../../../utils/helpers/species';

import { SlideOverForm } from '../SlideOver';

import Input from '../elements/Input';
// import TextArea from '../../../TextArea';
import Row from '../elements/Row';
import Detail from '../elements/Detail';
import Button from '../../Button';

import DisplaySpecies from '../../display/DisplaySpecies';
import ModalTypes from '../../../utils/ModalTypes';

import { FetchedResourceType, Species } from '../../../models/resource';
import { SheetType } from '../../../models/sheet';
import { LoadingSpinner } from '../elements/SubmitButton';

const ManageCharacter = () => {
  const dispatch = useDispatch();
  const { setNestedModal } = useActions();

  const currentUser = useSelector(selectCurrentUser);
  const charSheet = useSelector(selectCurrentCharacter);

  const species = useResource(FetchedResourceType.Species) as Species[];

  const charSpecies = getSpecies(charSheet?.speciesId || '', species);

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

  const submitHandler = async (e: FormEvent) => {
    e.preventDefault();

    if (!characterName) return alert('Must provide a characterName');
    if (!charDescription) return alert('Must provide a charDescription');
    if (!charBackground) return alert('Must provide a charBackground');

    dispatch(
      updateSheetStart(
        SheetType.characters,
        charSheet!._id,
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
        {charSpecies ? (
          <ul className="mt-3 divide-y divide-gray-200">
            <DisplaySpecies species={charSpecies} />
          </ul>
        ) : (
          <LoadingSpinner dark />
        )}
      </Row>
      {/* <TextArea slideOver label="Character Description" name="charDescription" rows={6} value={charDescription} changeHandler={setCharDescription} />
      <TextArea slideOver label="Character Background" name="charBackground" rows={8} value={charBackground} changeHandler={setCharBackground} /> */}
      <Row slideOver name="deleteCharacter" label="Delete Character">
        <Button alert onClick={() => setNestedModal({ type: ModalTypes.deleteSheet, data: { sheetType: 'characters' } })}>
          Permanently Delete {charSheet?.characterName}
        </Button>
      </Row>
    </SlideOverForm>
  );
};

export default ManageCharacter;
