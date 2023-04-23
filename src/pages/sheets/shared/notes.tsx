import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import ReactQuill from 'react-quill';

// ReactQuill theme stylesheets
// import 'react-quill/dist/quill.snow.css';
import 'react-quill/dist/quill.bubble.css';

import { selectCurrentCharacter, selectPermissions } from '../../../redux/character/character.selectors';
import { selectCurrentCampaign } from '../../../redux/campaign/campaign.selectors';

import { createSheetResourceStart, deleteSheetResourceStart, updateSheetResourceStart } from '../../../redux/sheet/sheet.actions';

import classNames from '../../../utils/classNames';

import SheetPageContent from '../../../layouts/components/sheet/SheetPageContent';

import SheetPagePanel from '../../../layouts/components/sheet/SheetPagePanel';
import Button from '../../../components/Button';
import Notice, { NoticeStatus } from '../../../components/Notice';
import ListContainer from '../../../components/data/ListContainer';

import { SheetResourceType, SheetType } from '../../../models/sheet';
import { Note } from '../../../models/sheet/resources';

const unescapeHtml = (content: string) => {
  if (!content) return '';
  return content.replace(/&lt;/g, '<').replace(/&gt;/g, '>');
};

interface Props {
  sheetType: SheetType;
}

const SheetNotesPage: React.FC<Props> = ({ sheetType }) => {
  const dispatch = useDispatch();

  const charSheet = useSelector(selectCurrentCharacter);
  const campSheet = useSelector(selectCurrentCampaign);
  const permissions = useSelector(selectPermissions);

  const sheets = {
    characters: charSheet,
    campaigns: campSheet,
  };

  const [openNote, setOpenNote] = useState<Note | null>(null);
  const [content, setContent] = useState('');
  const [plainText, setPlainText] = useState('');
  const [saved, setSaved] = useState(true);

  useEffect(() => {
    if (!openNote) {
      if (sheetType === 'characters' && charSheet?.notes.length) selectNote(charSheet.notes[0]);
      if (sheetType === 'campaigns' && campSheet?.notes.length) selectNote(campSheet.notes[0]);
    }
  }, [sheetType, charSheet, campSheet, openNote]);

  const selectNote = (note: Note) => {
    setOpenNote(note);
    // Unescape the escaped HTML coming from the database
    setContent(unescapeHtml(note.content));

    setSaved(true);
  };

  const createNote = () => {
    dispatch(createSheetResourceStart(sheetType, sheets[sheetType]!._id, SheetResourceType.notes, {}, {}));
  };

  const saveNote = () => {
    dispatch(updateSheetResourceStart(sheetType, sheets[sheetType]!._id, SheetResourceType.notes, openNote!._id, { plainText: plainText, content: content }, {}));
    setSaved(true);
  };

  const deleteNote = (noteId: string) => {
    dispatch(deleteSheetResourceStart(sheetType, sheets[sheetType]!._id, SheetResourceType.notes, noteId, {}));
    setOpenNote(null);
    setContent('');
  };

  const editorChange = (content: any, delta: any, source: any, editor: any) => {
    setContent(content);

    // get plain text
    const text = editor.getText(content);
    setPlainText(text);

    if (saved) setSaved(false);
  };

  if (sheetType === 'characters' && permissions?.isCC) {
    return (
      <SheetPageContent title="Notes">
        {/* No Permissions Panel */}
        <SheetPagePanel>
          <div className="items-center justify-between px-2 py-8 sm:flex">
            <div className="items-center sm:flex">
              <div>
                <h1 className="text-4xl font-extrabold tracking-tight text-gray-900 sm:text-5xl">No Permission</h1>
                <p className="mt-1 text-base text-gray-500">You do not have permission to view {charSheet!.characterName}'s notes.</p>
              </div>
            </div>
            <div className="space-x-3 sm:pl-6">
              <Link
                to="/about"
                className="inline-flex items-center px-4 py-2 text-sm font-medium text-white border border-transparent rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 bg-accent2-deep hover:bg-accent2-dark focus:ring-accent2-deep"
              >
                Learn More
              </Link>
            </div>
          </div>
        </SheetPagePanel>
      </SheetPageContent>
    );
  }

  return (
    <SheetPageContent title="Notes" columns={3}>
      {/* All Notes */}
      <SheetPagePanel>
        <div className="flow-root mt-2">
          <ListContainer
            list={sheets[sheetType]!.notes}
            button={{ click: createNote, text: 'Create a new Note' }}
            empty={{
              heading: 'No Notes',
              message: 'Get started by creating your first one now',
              button: { click: createNote, text: 'New Note' },
            }}
            classes="mb-4"
          >
            {sheets[sheetType]!.notes.map(note => (
              <li
                key={note._id}
                className={classNames(note._id === openNote?._id ? 'bg-gray-50' : '', 'py-3 px-2 border-b border-gray-200 hover:bg-gray-50 cursor-pointer')}
                onClick={() => selectNote(note)}
              >
                <p className="mt-1 text-sm text-gray-600 line-clamp-2">{note.plainText || 'Empty note'}</p>
              </li>
            ))}
          </ListContainer>
        </div>
      </SheetPagePanel>

      {/* Selected Note */}
      <SheetPagePanel colSpan={2}>
        <div className="flow-root">
          {!openNote ? (
            <p className="text-sm italic text-center text-gray-400">Once a you have created a note, you will be able to see and edit it here.</p>
          ) : (
            <>
              {!saved ? (
                <Notice
                  status={NoticeStatus.Warn}
                  heading="You have unsaved changes..."
                  message="If you do not save your changes before navigating away from this note, you will lose all your edits."
                  classes="mb-4"
                />
              ) : (
                <Notice status={NoticeStatus.Success} message="Your note is saved and up to date." classes="mb-4" />
              )}
              <ReactQuill
                theme="bubble"
                placeholder="You can select any text that you have typed to bring up formatting options."
                className="border border-gray-200 rounded-lg"
                value={content}
                onChange={editorChange}
              />
              <div className="mt-6">
                <Button dark onClick={saveNote} disabled={saved}>
                  Save Changes
                </Button>
                <Button text onClick={() => deleteNote(openNote._id)} classes="mt-2">
                  Delete Note
                </Button>
              </div>
            </>
          )}
        </div>
      </SheetPagePanel>
    </SheetPageContent>
  );
};

export default SheetNotesPage;
