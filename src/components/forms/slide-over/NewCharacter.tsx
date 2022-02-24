import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

<<<<<<< HEAD:src/components/home/forms/slide-over/NewCharacter.tsx
import { selectCurrentUser } from '../../../../redux/user/user.selectors';

import { createSheetForUserStart } from '../../../../redux/user/user.actions';

import { useResource } from '../../../../hooks/useResource';

import { ResourceType } from '../../../../models/enums/ResourceType';
import { Species } from '../../../../models/interfaces/data';
=======
import { selectCurrentUser } from '../../../redux/user/user.selectors';

import { createSheetForUserStart } from '../../../redux/user/user.actions';

import { useResource } from '../../../hooks/useResource';
>>>>>>> fd2f7d014a840121eb82b04bda492f4333af6e21:src/components/forms/slide-over/NewCharacter.tsx

import { ResourceType } from '../../../models/enums/ResourceType';
import { Species } from '../../../models/interfaces/data';

import { SlideOverForm } from '../SlideOver';

<<<<<<< HEAD:src/components/home/forms/slide-over/NewCharacter.tsx
import DisplaySpecies from '../../../sheets/display/DisplaySpecies';
=======
import Input from '../elements/Input';
import TextArea from '../elements/TextArea';
import Row from '../elements/Row';
import { SelectInput, SelectOption } from '../elements/Select';
import { LoadingSpinner } from '../elements/SubmitButton';
import Detail from '../elements/Detail';

import DisplaySpecies from '../../display/DisplaySpecies';
>>>>>>> fd2f7d014a840121eb82b04bda492f4333af6e21:src/components/forms/slide-over/NewCharacter.tsx

const NewCharacter: React.FC = () => {
  const dispatch = useDispatch();

  const currentUser = useSelector(selectCurrentUser);

  const fetchedSpecies = useResource(ResourceType.Species) as Species[];

  const [speciesList, setSpeciesList] = useState<SelectOption[]>([]);

  const [playerNickname, setPlayerNickname] = useState('');
  const [characterName, setCharacterName] = useState('');
  const [charDescription, setCharDescription] = useState('');
  const [charBackground, setCharBackground] = useState('');
  const [species, setSpecies] = useState<Species | null>(null);

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
