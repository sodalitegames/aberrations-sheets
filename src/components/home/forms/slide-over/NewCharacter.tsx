import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { selectCurrentUser } from '../../../../redux/user/user.selectors';
import { selectSpecies } from '../../../../redux/resource/resource.selectors';

import { createSheetForUserStart } from '../../../../redux/user/user.actions';
import { useActions } from '../../../../hooks/useActions';

import { ResourceType } from '../../../../models/enums/ResourceType';

import { SlideOverForm } from '../../../../layouts/components/app/SlideOver';

import Input from '../../../shared/form/Input';
import TextArea from '../../../shared/form/TextArea';
import Row from '../../../shared/form/Row';
import { SelectInput, SelectOption } from '../../../shared/form/Select';
import { LoadingSpinner } from '../../../shared/form/SubmitButton';
import Detail from '../../../shared/form/Detail';

import DisplaySpecies from '../../../sheets/display/DisplaySpecies';
import { Species } from '../../../../models/interfaces/data';

const NewCharacter: React.FC = () => {
  const dispatch = useDispatch();

  const currentUser = useSelector(selectCurrentUser);
  const fetchedSpecies = useSelector(selectSpecies);

  const { fetchResourceStart } = useActions();

  const [speciesList, setSpeciesList] = useState<SelectOption[]>([]);

  const [playerNickname, setPlayerNickname] = useState('');
  const [characterName, setCharacterName] = useState('');
  const [charDescription, setCharDescription] = useState('');
  const [charBackground, setCharBackground] = useState('');
  const [species, setSpecies] = useState<Species | null>(null);

  useEffect(() => {
    if (!fetchedSpecies) {
      fetchResourceStart(ResourceType.Species);
    }
  }, [fetchResourceStart, fetchedSpecies]);

  useEffect(() => {
    if (fetchedSpecies) {
      // Format the species list for the select component
      const speciesList: SelectOption[] = fetchedSpecies.map(spec => {
        return {
          id: spec.id,
          name: spec.name,
        };
      });

      setSpeciesList(speciesList);
    }
  }, [fetchedSpecies]);

  const selectCurrentSpecies = (event: React.ChangeEvent<HTMLSelectElement>) => {
    if (!event.target.value || !fetchedSpecies) {
      setSpecies(null);
      return;
    }

    const currSpec = fetchedSpecies.find(spec => spec.id === event.target.value);

    setSpecies(currSpec || null);
  };

  const submitHandler = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!characterName) return alert('Must provide a characterName');
    if (!charDescription) return alert('Must provide a charDescription');
    if (!charBackground) return alert('Must provide a charBackground');
    if (!species) return alert('Must select a species');

    dispatch(
      createSheetForUserStart(
        'characters',
        {
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
        },
        { slideOver: true, notification: { status: 'success', heading: 'Character Sheet Created', message: `You have successfully successfully created ${characterName}.` } }
      )
    );
  };

  return (
    <SlideOverForm title="Create New Character" description="Edit the information below to create your character." submitText="Create character" submitHandler={submitHandler}>
      <Detail slideOver label="Player Name" detail={currentUser.name} />
      <Input slideOver label="Player Nickname (Opt.)" type="text" name="playerName" value={playerNickname} changeHandler={setPlayerNickname} />
      <Input slideOver label="Character Name" type="text" name="characterName" value={characterName} changeHandler={setCharacterName} />
      <Row slideOver name="species" label="Character Species">
        {fetchedSpecies && speciesList ? (
          <>
            <SelectInput name="species" value={species ? species.id : ''} options={speciesList} changeHandler={selectCurrentSpecies} />
            {species ? (
              <ul className="mt-3 divide-y divide-gray-200">
                <DisplaySpecies species={species} />
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
