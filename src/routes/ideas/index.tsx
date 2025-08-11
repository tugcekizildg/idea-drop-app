import { createFileRoute } from '@tanstack/react-router';
import { queryOptions, useSuspenseQuery } from '@tanstack/react-query';
import { fetchIdeas } from '@/api/ideas';
import IdeaCard from '@/components/IdeaCard';

const ideasQueryOptions = () =>
  queryOptions({
    queryKey: ['ideas'],
    queryFn: fetchIdeas,
  });

export const Route = createFileRoute('/ideas/')({
  head: () => ({
    meta: [
      {
        title: 'Idea Drop - Browse Ideas',
      },
    ],
  }),
  component: IdeasPage,
  loader: async ({ context: { queryClient } }) => {
    return queryClient.ensureQueryData(ideasQueryOptions());
  },
});

function IdeasPage() {
  const { data } = useSuspenseQuery(ideasQueryOptions());
  const ideas = [...data].sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );
  return (
    <div className='p-4'>
      <h1 className='text-2xl font-bold mb-4'>Ideas</h1>
      <div className='grid grid-cols-1 sm:grid-cols-2 gap-6'>
        {ideas.map((idea) => (
          <IdeaCard key={idea.id} idea={idea} />
        ))}
      </div>
    </div>
  );
}
