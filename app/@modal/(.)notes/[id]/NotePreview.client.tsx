'use client';

import NoteDetailsClient from '@/app/notes/[id]/NoteDetails.client';
import Modal from '@/components/Modal/Modal';

const NotePreviewClient = () => {
  return (
    <Modal>
      <NoteDetailsClient />
    </Modal>
  );
};
export default NotePreviewClient;
