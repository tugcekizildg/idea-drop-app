import type { Idea } from '@/types';
import { Link } from '@tanstack/react-router';
import clsx from 'clsx';
const IdeaCard = ({
  idea,
  button = true,
}: {
  idea: Idea;
  button?: boolean;
}) => {
  const linkClasses = clsx({
    'text-orange-600 hover:underline mt-3': !button,
    'inline-block self-start bg-orange-400 text-white px-6 py-2 rounded-md mt-4 hover:bg-orange-500 transition-colors duration-300':
      button,
  });
  return (
    <div className='border border-gray-200 p-4 rounded cursor-pointer hover:shadow hover:shadow-orange-200 bg-white flex flex-col justify-between transition-shadow duration-300'>
      <div>
        <h2 className='text-lg font-semibold'>{idea.title}</h2>
        <p className='text-gray-700 mt-2'>{idea.summary}</p>
      </div>
      <Link
        to='/ideas/$ideaId'
        params={{ ideaId: idea.id }}
        className={linkClasses}>
        {button ? 'View Idea' : 'Read More →'}
      </Link>
    </div>
  );
};

export default IdeaCard;
