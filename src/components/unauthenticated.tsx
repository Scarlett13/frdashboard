import { useRouter } from 'next/navigation';

import { logout } from '@/lib/api';

import Typography from './typography/Typography';

export default function UnauthenticatedComponent() {
  const router = useRouter();
  return (
    <div className='flex w-full flex-col items-center justify-center gap-2'>
      <Typography variant='h1' color='danger'>
        It seems we can't validate your login session,
      </Typography>
      <Typography
        variant='h1'
        color='tertiary'
        className='text-cyan-500 hover:cursor-pointer'
        onClick={() => {
          router.refresh();
        }}
      >
        Refresh the page
      </Typography>
      <Typography variant='h1' color='danger'>
        or
      </Typography>
      <Typography
        variant='h1'
        color='tertiary'
        className='text-sky-700 hover:cursor-pointer'
        onClick={async () => {
          await logout();
          router.refresh();
        }}
      >
        Relog to the system.
      </Typography>
    </div>
  );
}
