import { fetchNoteById } from '@/lib/api';
import NotePreviewClient from './NotePreview.client';
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from '@tanstack/react-query';

type Props = {
  params: Promise<{ id: string }>;
};

const NoteDetails = async ({ params }: Props) => {
  const { id } = await params;

  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ['note', id],
    queryFn: () => fetchNoteById(Number(id)),
  });

  return (
    <div>
      <h1>NoteDetails</h1>
      <br />
      <HydrationBoundary state={dehydrate(queryClient)}>
        <NotePreviewClient />
      </HydrationBoundary>
    </div>
  );
};

export default NoteDetails;

// import NotePreviewClient from './NotePreview.client';

// const NotePreview = () => {
//   return <NotePreviewClient />;
// };
// export default NotePreview;
