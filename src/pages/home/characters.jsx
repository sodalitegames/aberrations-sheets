import React from 'react';
import { useRecoilValue } from 'recoil';

import { getUsersCharacters } from '../../recoil/user/user.selectors';

import Loading from '../../layouts/components/app/Loading';
import PageContent from '../../layouts/components/home/PageContent';

import CharSheetCard from '../../components/home/CharSheetCard';

const CharactersPage = () => {
  const characters = useRecoilValue(getUsersCharacters);

  console.log('Character Sheets:', characters);

  return (
    <PageContent heading="Your Characters">
      <React.Suspense fallback={<Loading />}>
        {characters.map(charSheet => (
          <CharSheetCard key={charSheet._id} charSheet={charSheet} />
        ))}
      </React.Suspense>
    </PageContent>
  );
};

export default CharactersPage;
