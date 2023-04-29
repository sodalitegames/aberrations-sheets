import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { selectUsersCharacters, selectUsersSheetsFetched, selectUserError } from '../../redux/user/user.selectors';

import { fetchSheetsForUserStart } from '../../redux/user/user.actions';

import SlideOverTypes from '../../utils/SlideOverTypes';

import Loading from '../../components/Loading';
import PageContent from '../../layouts/components/home/PageContent';
import Notice, { NoticeStatus } from '../../components/Notice';
import CharSheetCard from '../../components/home/CharSheetCard';

import { CharacterSheet, SheetType } from '../../models/sheet';

const CharactersPage = () => {
  const dispatch = useDispatch();

  const characters = useSelector(selectUsersCharacters) as CharacterSheet[];
  const fetched = useSelector(selectUsersSheetsFetched);
  const error = useSelector(selectUserError);

  useEffect(() => {
    if (!fetched.characters) {
      dispatch(fetchSheetsForUserStart(SheetType.characters));
    }
  });

  return (
    <PageContent heading="My Characters" primary={{ text: 'Create New Character', slideOver: { type: SlideOverTypes.newCharacter } }}>
      {error.characters.fetch && (
        <Notice
          status={error.characters.fetch.status as NoticeStatus}
          message={error.characters.fetch.message}
          action={{ text: 'Retry', click: () => dispatch(fetchSheetsForUserStart(SheetType.characters)) }}
        />
      )}
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">{fetched.characters ? characters.map(charSheet => <CharSheetCard key={charSheet._id} charSheet={charSheet} />) : <Loading />}</div>
    </PageContent>
  );
};

export default CharactersPage;
