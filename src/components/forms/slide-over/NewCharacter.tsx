import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { selectCurrentUser, selectUserError } from '../../../redux/user/user.selectors';

import { createSheetForUserStart } from '../../../redux/user/user.actions';

import { useResource } from '../../../hooks/useResource';

import { FetchedResourceType, Species } from '../../../models/resource';
import { SheetType } from '../../../models/sheet';

import { SlideOverForm } from '../SlideOver';

import Input from '../elements/Input';
import TextArea from '../elements/TextArea';
import Row from '../elements/Row';
import { BasicSelect } from '../elements/Select';
import { LoadingSpinner } from '../elements/SubmitButton';
import Detail from '../elements/Detail';

import DisplaySpecies from '../../display/DisplaySpecies';

import Notice, { NoticeStatus } from '../../Notice';

const NewCharacter = () => {
  const dispatch = useDispatch();

  const currentUser = useSelector(selectCurrentUser)!;
  const error = useSelector(selectUserError);

  const fetchedSpecies = useResource(FetchedResourceType.Species) as Species[];

  const speciesOptions = (fetchedSpecies || []).map(spec => {
    return {
      id: spec.id,
      name: spec.name,
    };
  });

  const [playerNickname, setPlayerNickname] = useState('');
  const [characterName, setCharacterName] = useState('');
  const [charDescription, setCharDescription] = useState('');
  const [charBackground, setCharBackground] = useState('');

  const [speciesId, setSpeciesId] = useState<string>('');

  const species = (fetchedSpecies || []).find(spec => spec.id === speciesId);

  const submitHandler = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!characterName) return alert('Must provide a characterName');
    if (!charDescription) return alert('Must provide a charDescription');
    if (!charBackground) return alert('Must provide a charBackground');

    if (!species) return alert('Must select a species');

    dispatch(
      createSheetForUserStart(
        SheetType.characters,
        {
          playerName: currentUser.name,
          playerNickname,
          characterName,
          charDescription,
          charBackground,
          speciesId: species.id,
          speciesName: species.name,
          currentHp: species.health.starting,
          maxHp: species.health.starting,
          strength: { die: species.stats.strength },
          agility: { die: species.stats.agility },
          persona: { die: species.stats.persona },
          aptitude: { die: species.stats.aptitude },
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
        {speciesOptions ? (
          <>
            <BasicSelect name="species" value={speciesId} options={speciesOptions} changeHandler={setSpeciesId} />
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
      <TextArea slideOver label="Character Description" name="charDescription" rows={4} value={charDescription} changeHandler={setCharDescription} formik={false} />
      <TextArea slideOver label="Character Background" name="charBackground" rows={8} value={charBackground} changeHandler={setCharBackground} formik={false} />
      {error.characters.create && <Notice status={error.characters.create.status as NoticeStatus} message={error.characters.create.message} />}
    </SlideOverForm>
  );
};

export default NewCharacter;
