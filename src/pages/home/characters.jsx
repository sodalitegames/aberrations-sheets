import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { selectUsersCharacters, selectUsersCharactersFetched } from '../../redux/user/user.selectors';

import { fetchSheetsForUserStart } from '../../redux/user/user.actions';

import SlideOverTypes from '../../utils/SlideOverTypes';

import Loading from '../../layouts/components/app/Loading';
import PageContent from '../../layouts/components/home/PageContent';

import CharSheetCard from '../../components/home/CharSheetCard';

const CharactersPage = () => {
  const dispatch = useDispatch();

  const characters = useSelector(selectUsersCharacters);
  const fetched = useSelector(selectUsersCharactersFetched);

  useEffect(() => {
    if (!fetched) {
      dispatch(fetchSheetsForUserStart('characters'));
    }
  });

  return (
    <PageContent heading="My Characters" primary={{ text: 'Create New Character', slideOver: { type: SlideOverTypes.newCharacter } }}>
      <div className="grid grid-cols-2 gap-8">{fetched ? characters.map(charSheet => <CharSheetCard key={charSheet._id} charSheet={charSheet} />) : <Loading />}</div>
    </PageContent>
  );
};

export default CharactersPage;
