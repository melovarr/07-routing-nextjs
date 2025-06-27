// import { fetchNotes } from '@/lib/api';
// import NotesClient from './Notes.client';

// const Notes = async () => {
//   const initialNotesData = await fetchNotes('', 1);

//   return <NotesClient initialNotesData={initialNotesData} />;
// };
// export default Notes;
import { Metadata } from 'next';
import NotesClient from './Notes.client';

export const metadata: Metadata = {
  title: 'Notes | NoteHub',
  description: 'View and manage your notes',
};

export default function NotesPage() {
  return <NotesClient />;
}
