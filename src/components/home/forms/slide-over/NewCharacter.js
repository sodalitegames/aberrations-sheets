import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { selectCurrentUser } from '../../../../redux/user/user.selectors';
import { selectSpecies } from '../../../../redux/resource/resource.selectors';

import { setSlideOver } from '../../../../redux/app/app.actions';
import { createSheetForUserStart } from '../../../../redux/user/user.actions';
import { fetchResourceStart } from '../../../../redux/resource/resource.actions';

import { SlideOverForm } from '../../../../layouts/components/app/SlideOver';

import Input from '../../../shared/Input';
import TextArea from '../../../shared/TextArea';
import Row from '../../../shared/Row';
import { SelectInput } from '../../../shared/Select';
import { LoadingSpinner } from '../../../shared/SubmitButton';
import Detail from '../../../shared/Detail';

import Species from '../../../characters/display/Species';

const NewCharacter = () => {
  const dispatch = useDispatch();
  const currentUser = useSelector(selectCurrentUser);
  const speciesList = useSelector(selectSpecies);

  const [newSpeciesList, setNewSpeciesList] = useState(null);

  const [playerNickname, setPlayerNickname] = useState('');
  const [characterName, setCharacterName] = useState('');
  const [charDescription, setCharDescription] = useState('');
  const [charBackground, setCharBackground] = useState('');
  const [species, setSpecies] = useState(null);

  useEffect(() => {
    if (!speciesList) {
      dispatch(fetchResourceStart('species'));
    }
  }, [dispatch, speciesList]);

  useEffect(() => {
    if (speciesList) {
      // Format the species list for the select component
      const newSpeciesList = speciesList.map(spec => {
        return {
          id: spec.id,
          name: spec.name,
        };
      });

      setNewSpeciesList(newSpeciesList);
    }
  }, [speciesList]);

  const selectCurrentSpecies = e => {
    if (!e.target.value) setSpecies(null);

    const currSpec = speciesList.find(spec => spec.id === e.target.value);

    setSpecies(currSpec);
  };

  const submitHandler = async e => {
    e.preventDefault();

    if (!characterName) return alert('Must provide a characterName');
    if (!charDescription) return alert('Must provide a charDescription');
    if (!charBackground) return alert('Must provide a charBackground');
    if (!species) return alert('Must select a species');

    dispatch(
      createSheetForUserStart('characters', {
        playerName: currentUser.name,
        playerNickname,
        characterName,
        charDescription,
        charBackground,
        speciesId: species.id,
        speciesName: species.name,
        currentHp: species.stats.fortitude * 5,
        fortitude: { points: species.stats.fortitude },
        agility: { points: species.stats.agility },
        persona: { points: species.stats.persona },
        aptitude: { points: species.stats.aptitude },
      })
    );

    dispatch(setSlideOver(null));
  };

  return (
    <SlideOverForm title="Create New Character" description="Edit the information below to create your character." submitText="Create character" submitHandler={submitHandler}>
      <Detail slideOver label="Player Name" detail={currentUser.name} />
      <Input slideOver label="Player Nickname (Opt.)" type="text" name="playerName" value={playerNickname} changeHandler={setPlayerNickname} />
      <Input slideOver label="Character Name" type="text" name="characterName" value={characterName} changeHandler={setCharacterName} />
      <Row slideOver name="species" label="Character Species">
        {speciesList && newSpeciesList ? (
          <>
            <SelectInput name="species" value={species ? species.id : ''} options={newSpeciesList} changeHandler={selectCurrentSpecies} />
            {species ? (
              <ul className="mt-3 divide-y divide-gray-200">
                <Species species={species} />
              </ul>
            ) : null}
          </>
        ) : (
          <Row slideOver label="Character Species" name="species">
            <LoadingSpinner dark />
          </Row>
        )}
      </Row>
      <TextArea slideOver label="Character Description" name="charDescription" rows={4} value={charDescription} changeHandler={setCharDescription} />
      <TextArea slideOver label="Character Background" name="charBackground" rows={8} value={charBackground} changeHandler={setCharBackground} />
    </SlideOverForm>
  );
};

export default NewCharacter;
