import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';

import { selectUsersCharacters } from '../../redux/user/user.selectors';

import { fetchSheetsForUserStart } from '../../redux/user/user.actions';

import SlideOverTypes from '../../utils/SlideOverTypes';

import Loading from '../../layouts/components/app/Loading';
import PageContent from '../../layouts/components/home/PageContent';

import CharSheetCard from '../../components/home/CharSheetCard';

const CharactersPage = () => {
  const characters = useSelector(selectUsersCharacters);

  useEffect(() => {
    if (!characters.length) {
      fetchSheetsForUserStart('characters');
    }
  });

  console.log('Character Sheets:', characters);

  return (
    <PageContent heading="My Characters" primary={{ text: 'Create New Character', slideOver: { type: SlideOverTypes.newCharacter } }}>
      <React.Suspense fallback={<Loading />}>
        {characters.map(charSheet => (
          <CharSheetCard key={charSheet._id} charSheet={charSheet} />
        ))}
      </React.Suspense>
    </PageContent>
  );
};

export default CharactersPage;
