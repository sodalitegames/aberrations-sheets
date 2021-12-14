import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import ReactQuill from 'react-quill';

// ReactQuill theme stylesheets
// import 'react-quill/dist/quill.snow.css';
import 'react-quill/dist/quill.bubble.css';

import { selectCurrentCharacter } from '../../redux/character/character.selectors';
import { selectCurrentCampaign } from '../../redux/campaign/campaign.selectors';

import { createSheetResourceStart, deleteSheetResourceStart, updateSheetResourceStart } from '../../redux/sheet/sheet.actions';

import classNames from '../../utils/classNames';

import SheetPageContent from '../../layouts/components/sheet/SheetPageContent';

import PanelSection from '../../components/shared/PanelSection';
import Button from '../../components/shared/Button';
import Notice from '../../components/shared/Notice';
import ListContainer from '../../components/shared/ListContainer';

const unescapeHtml = content => {
  if (!content) return '';
  return content.replace(/&lt;/g, '<').replace(/&gt;/g, '>');
};

const SheetNotesPage = ({ sheetType }) => {
  const dispatch = useDispatch();

  const charSheet = useSelector(selectCurrentCharacter);
  const campSheet = useSelector(selectCurrentCampaign);

  const sheets = {
    characters: charSheet,
    campaigns: campSheet,
  };

  const [openNote, setOpenNote] = useState(null);
  const [content, setContent] = useState('');
  const [plainText, setPlainText] = useState('');
  const [saved, setSaved] = useState(true);

  useEffect(() => {
    if (!openNote) {
      if (sheetType === 'characters' && charSheet.notes.length) selectNote(charSheet.notes[0]);
      if (sheetType === 'campaigns' && campSheet.notes.length) selectNote(campSheet.notes[0]);
    }
  }, [sheetType, charSheet, campSheet, openNote]);

  const selectNote = note => {
    setOpenNote(note);
    // Unescape the escaped HTML coming from the database
    setContent(unescapeHtml(note.content));

    setSaved(true);
  };

  const createNote = () => {
    dispatch(createSheetResourceStart(sheetType, sheets[sheetType]._id, 'notes', {}));
  };

  const saveNote = () => {
    dispatch(updateSheetResourceStart(sheetType, sheets[sheetType]._id, 'notes', openNote._id, { plainText: plainText, content: content }));
    setSaved(true);
  };

  const deleteNote = noteId => {
    dispatch(deleteSheetResourceStart(sheetType, sheets[sheetType]._id, 'notes', noteId));

    setOpenNote('deleted');
    setContent('');
  };

  const editorChange = (content, delta, source, editor) => {
    setContent(content);

    // get plain text
    const text = editor.getText(content);
    setPlainText(text);

    if (saved) setSaved(false);
  };

  return (
    <SheetPageContent title="Notes" columns={3}>
      {/* All Notes */}
      <PanelSection>
        <div className="flow-root mt-2">
          <ListContainer
            list={sheets[sheetType].notes}
            button={{ click: createNote, text: 'Create a new Note' }}
            empty={{
              heading: 'No Notes',
              message: 'Get started by creating your first one now',
              button: { click: createNote, text: 'New Note' },
            }}
            classes="mb-4"
          >
            {sheets[sheetType].notes.map(note => (
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
      </PanelSection>

      {/* Selected Note */}
      <PanelSection colSpan={2}>
        <div className="flow-root">
          {!openNote ? (
            <p className="text-sm italic text-gray-400 text-center">Once a you have created a note, you will be able to see and edit it here.</p>
          ) : openNote === 'deleted' ? (
            <p className="text-sm italic text-gray-400 text-center">This note has been deleted. Please select a new one.</p>
          ) : (
            <>
              {!saved ? (
                <Notice
                  status="warn"
                  heading="You have unsaved changes..."
                  message="If you do not save your changes before navigating away from this note, you will lose all your edits."
                  classes="mb-4"
                />
              ) : (
                <Notice status="success" message="Your note is saved and up to date." classes="mb-4" />
              )}
              <ReactQuill
                theme="bubble"
                placeholder="You can select any text that you have typed to bring up formatting options."
                className="rounded-lg border border-gray-200"
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
      </PanelSection>
    </SheetPageContent>
  );
};

export default SheetNotesPage;
