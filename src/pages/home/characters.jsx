import { useRecoilValue } from 'recoil';

import { getUsersCharacters } from '../../recoil/user/user.selectors';

import PageHeader from '../../layouts/components/home/PageHeader';

import CharSheetCard from '../../components/home/CharSheetCard';

const CharactersPage = () => {
  const characters = useRecoilValue(getUsersCharacters);

  console.log(characters);

  return (
    <main className="flex-1 pb-8 bg-blue-200">
      {/* Page header */}
      <PageHeader heading="Your characters" />
      <div className="bg-red-300 p-8">
        {characters.map(charSheet => (
          <CharSheetCard key={charSheet.id} charSheet={charSheet} />
        ))}
      </div>
    </main>
  );
};

export default CharactersPage;
