'use client';

import { createPortal } from 'react-dom';
import css from './NoteModal.module.css';
import { useEffect } from 'react';
// import NoteForm from '../NoteForm/NoteForm';
import { useRouter } from 'next/navigation';

interface NoteModalProps {
  children: React.ReactNode;
}

export default function NoteModal({ children }: NoteModalProps) {
  const router = useRouter();
  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      router.back();
    }
  };

  useEffect(() => {
    const handleEscClick = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        router.back();
      }
    };
    document.addEventListener('keydown', handleEscClick);
    document.body.style.overflow = 'hidden';

    return () => {
      document.removeEventListener('keydown', handleEscClick);
      document.body.style.overflow = '';
    };
  }, [router]);

  return createPortal(
    <div
      onClick={handleBackdropClick}
      className={css.backdrop}
      role="dialog"
      aria-modal="true"
    >
      <div className={css.modal}>
        {children}
        {/* <NoteForm onClose={onClose} /> */}
      </div>
    </div>,
    document.body
  );
}
