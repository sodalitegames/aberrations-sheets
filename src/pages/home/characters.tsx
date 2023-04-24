import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { selectUsersCharacters, selectUsersCharactersFetched } from '../../redux/user/user.selectors';

import { fetchSheetsForUserStart } from '../../redux/user/user.actions';

import SlideOverTypes from '../../utils/SlideOverTypes';

import Loading from '../../components/Loading';
import PageContent from '../../layouts/components/home/PageContent';

import CharSheetCard from '../../components/home/CharSheetCard';

import { CharacterSheet } from '../../models/sheet';

const CharactersPage = () => {
  const dispatch = useDispatch();

  const characters = useSelector(selectUsersCharacters) as CharacterSheet[];
  const fetched = useSelector(selectUsersCharactersFetched);

  useEffect(() => {
    if (!fetched) {
      dispatch(fetchSheetsForUserStart('characters'));
    }
  });

  return (
    <PageContent heading="My Characters" primary={{ text: 'Create New Character', slideOver: { type: SlideOverTypes.newCharacter } }}>
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">{fetched ? characters.map(charSheet => <CharSheetCard key={charSheet._id} charSheet={charSheet} />) : <Loading />}</div>
    </PageContent>
  );
};

export default CharactersPage;
