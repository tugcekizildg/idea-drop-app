import { createFileRoute, Link } from '@tanstack/react-router';
import { queryOptions, useSuspenseQuery } from '@tanstack/react-query';
import { fetchIdeas } from '@/api/ideas';

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
  const { data: ideas } = useSuspenseQuery(ideasQueryOptions());
  return (
    <div className='p-4'>
      <h1 className='text-2xl font-bold mb-4'>Ideas</h1>
      <ul className='grid grid-cols-1 sm:grid-cols-2 gap-6'>
        {ideas.map((idea) => (
          <li
            key={idea.id}
            className='border border-gray-200 p-4 rounded cursor-pointer hover:shadow hover:shadow-orange-200 bg-white flex flex-col justify-between transition-shadow duration-300'>
            <div>
              <h2 className='text-lg font-semibold'>{idea.title}</h2>
              <p className='text-gray-700 mt-2'>{idea.summary}</p>
            </div>
            <Link
              to={idea.id}
              className='inline-block self-start bg-orange-400 text-white px-6 py-2 rounded-md mt-4 hover:bg-orange-500 transition-colors duration-300'>
              View Idea
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
