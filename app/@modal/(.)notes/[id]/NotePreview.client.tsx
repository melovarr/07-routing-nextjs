'use client';

import css from './NotePreview.module.css';
import { useParams, useRouter } from 'next/navigation';
import { useQuery } from '@tanstack/react-query';
import { fetchNoteById } from '@/lib/api';
import Loader from '@/app/loading';
import NoteError from '../../../notes/[id]/error';
import Modal from '@/components/Modal/Modal';

const NotePreviewClient = () => {
  const router = useRouter();
  const { id } = useParams();

  const {
    data: note,
    isError,
    isLoading,
    error,
  } = useQuery({
    queryKey: ['note', id],
    queryFn: () => fetchNoteById(Number(id)),
    refetchOnMount: false,
  });

  if (isLoading) return <Loader />;

  if (isError) return <NoteError error={error} />;

  if (!note) return <p>Note not found</p>;

  const date = new Date(note.createdAt);
  const formatetDate = date.toLocaleString('uk-UA', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });

  return (
    <Modal>
      <div className={css.container}>
        <div className={css.item}>
          <div className={css.header}>
            <h2>{note.title}</h2>
            <button className={css.editBtn}>Edit note</button>
          </div>
          <p className={css.content}>{note.content}</p>
          <p className={css.date}>{formatetDate}</p>
        </div>
        <button onClick={router.back}>GoBack</button>
      </div>
    </Modal>
  );
};
export default NotePreviewClient;

// 'use client';

// import { useParams, useRouter } from 'next/navigation';
// import { useQuery } from '@tanstack/react-query';
// import Modal from '@/components/Modal/Modal';
// // import { Note } from '../../../../types/note';

// type Note = {
//   id: string;
//   title: string;
//   tag: string;
//   content: string;
//   createdAt: string;
// };

// const fetchNote = async (id: string): Promise<Note> => {
//   const res = await fetch(`/api/notes/${id}`);
//   if (!res.ok) throw new Error('Помилка завантаження нотатки');
//   return res.json();
// };

// const NotePreviewClient = () => {
//   const params = useParams();
//   const id = params?.id as string;
//   const router = useRouter();

//   const { data, isLoading, isError, error } = useQuery({
//     queryKey: ['note', id],
//     queryFn: () => fetchNote(id),
//     enabled: !!id,
//   });

//   const handleClose = () => router.back();

//   return (
//     <Modal onClose={handleClose}>
//       <button onClick={handleClose}>Закрити</button>
//       {isLoading && <div>Завантаження...</div>}
//       {isError && <div>Сталася помилка: {error.message}</div>}
//       {data && (
//         <div>
//           <h2>{data.title}</h2>
//           <span>{data.tag}</span>
//           <p>{data.content}</p>
//           <small>{new Date(data.createdAt).toLocaleString()}</small>
//         </div>
//       )}
//     </Modal>
//   );
// };

// export default NotePreviewClient;

// 'use client';

// import NoteDetailsClient from '@/app/notes/[id]/NoteDetails.client';
// import Modal from '@/components/Modal/Modal';

// const NotePreviewClient = () => {
//   return (
//     <Modal>
//       <NoteDetailsClient />
//     </Modal>
//   );
// };
// export default NotePreviewClient;
