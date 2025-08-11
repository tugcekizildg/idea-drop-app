import { createFileRoute, Link } from '@tanstack/react-router';
import { Lightbulb } from 'lucide-react';
import { fetchIdeas } from '../api/ideas';
import { queryOptions, useSuspenseQuery } from '@tanstack/react-query';
import IdeaCard from '@/components/IdeaCard';

const ideasQueryOptions = queryOptions({
  queryKey: ['ideas'],
  queryFn: fetchIdeas,
});
export const Route = createFileRoute('/')({
  component: HomePage,
  loader: ({ context }) =>
    context.queryClient.ensureQueryData(ideasQueryOptions),
});

function HomePage() {
  const { data: ideas } = useSuspenseQuery(ideasQueryOptions);
  const latestIdeas = ideas.slice(0, 3);
  return (
    <div className='flex flex-col md:flex-row items-start justify-between gap-10 p-6'>
      <div className='flex flex-col items-start gap-4'>
        <Lightbulb className='w-16 h-16 text-orange-400' />
        <h1 className='text-4xl font-bold text-gray-800'>
          Welcome to IdeaDrop
        </h1>
        <p className='text-gray-600 max-w-xs'>
          Share, explore, and build on the best startup ideas and side hustles.
        </p>
      </div>
      <section className='flex-1 cursor-pointer'>
        <h2 className='text-2xl font-semibold mb-4 text-gray-800'>
          Latest Ideas
        </h2>
        <div className='space-y-6'>
          {latestIdeas.map((idea) => (
            <IdeaCard key={idea.id} idea={idea} button={false} />
          ))}
        </div>
        <div className='mt-6'>
          <a
            href='/ideas'
            className='w-full text-center inline-block bg-orange-600 hover:bg-orange-700 text-white font-semibold px-5 py-2 rounded-md transition'>
            View All Ideas
          </a>
        </div>
      </section>
    </div>
  );
}
