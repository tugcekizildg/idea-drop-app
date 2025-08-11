import { createFileRoute, Link, useNavigate } from '@tanstack/react-router';
import {
  queryOptions,
  useSuspenseQuery,
  useMutation,
} from '@tanstack/react-query';
import { fetchIdea, deleteIdea } from '@/api/ideas';

const ideaQueryOptions = (ideaId: string) =>
  queryOptions({
    queryKey: ['idea', ideaId],
    queryFn: () => fetchIdea(ideaId),
  });

export const Route = createFileRoute('/ideas/$ideaId/')({
  component: IdeaDetailsPage,
  loader: async ({ params, context: { queryClient } }) => {
    return queryClient.ensureQueryData(ideaQueryOptions(params.ideaId));
  },
});

function IdeaDetailsPage() {
  const { ideaId } = Route.useParams();
  const { data: idea } = useSuspenseQuery(ideaQueryOptions(ideaId));

  const navigate = useNavigate();
  const { mutateAsync: deleteMutate, isPending } = useMutation({
    mutationFn: () => deleteIdea(ideaId),
    onSuccess: () => {
      navigate({ to: '/ideas' });
    },
  });

  const handleDelete = async () => {
    const confirmDelete = window.confirm('Are you sure you want to delete?');
    if (confirmDelete) {
      await deleteMutate();
    }
  };

  return (
    <div className='p-4'>
      <div className='flex justify-between items-center mb-6'>
        <div className='flex gap-4'>
          {' '}
          <Link
            to='/ideas'
            className='text-orange-500 hover:text-orange-700 underline block mb-4 transition-colors duration-300'>
            Back To Idea
          </Link>
          {/* Edit Link */}
          <Link
            to='/ideas/$ideaId/edit'
            params={{ ideaId }}
            className='text-orange-500 hover:text-orange-700 underline block mb-4 transition-colors duration-300'>
            Edit
          </Link>
        </div>
        {/* Back Link */}

        <div className='relative group'>
          {/* Delete Button */}
          <button
            disabled={isPending}
            onClick={handleDelete}
            className='flex -mt-3 justify-center items-center leading-none text-lg border border-red-600 rounded-full h-7 w-7 font-bold text-red-600 hover:text-red-700 transition-colors duration-300 disabled:opacity-50 cursor-pointer'>
            &times;
          </button>
          {/* Tooltip */}
          <span className='absolute -top-9 right-0 bg-gray-800 text-white text-xs rounded px-2 py-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none whitespace-nowrap'>
            {isPending ? 'Deleting...' : 'Delete Idea'}
          </span>
        </div>
      </div>
      <h2 className='text-2xl font-bold'>{idea.title}</h2>
      <p className='mt-4'>{idea.description}</p>
    </div>
  );
}
