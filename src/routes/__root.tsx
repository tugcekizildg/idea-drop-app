import {
  HeadContent,
  Link,
  Outlet,
  createRootRouteWithContext,
} from '@tanstack/react-router';
import { TanStackRouterDevtools } from '@tanstack/react-router-devtools';
import { QueryClient } from '@tanstack/react-query';
import Header from '../components/Header';

type RouterContext = {
  queryClient: QueryClient;
};
export const Route = createRootRouteWithContext<RouterContext>()({
  head: () => ({
    meta: [
      {
        name: 'viewport',
        content:
          'Share, explore and build on the best ideas from around the world',
      },
      {
        title: 'Idea Drop - Your Idea Hub',
      },
    ],
  }),
  component: RootLayout,
  notFoundComponent: NotFound,
});

function RootLayout() {
  return (
    <div className='min-h-screen bg-gray-100 flex flex-col'>
      <HeadContent />
      <Header />
      <main className='flex justify-center p-6'>
        <div className='max-6xl bg-white rounded-2xl shadow-lg p-8'>
          <Outlet />
        </div>
      </main>
      <TanStackRouterDevtools />
    </div>
  );
}

function NotFound() {
  return (
    <div className='flex flex-col justify-center items-center text-center py-20'>
      <h1 className='text-5xl font-bold text-gray-800 mb-4'>404</h1>
      <p className='text-lg text-gray-600 mb-6'>
        Oops! The page you are looking for does not exist.
      </p>
      <Link
        to='/'
        className='bg-orange-600 hover:bg-orange-700 text-white font-medium transition px-6 py-3 rounded-md leading-none'>
        Go Back Home
      </Link>
    </div>
  );
}
