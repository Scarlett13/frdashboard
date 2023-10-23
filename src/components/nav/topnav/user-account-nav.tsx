'use client';

// import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { User } from 'next-auth';

import { logout } from '@/lib/api';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/dropdown-menu';
import { UserAvatar } from '@/components/user-avatar';

interface UserAccountNavProps extends React.HTMLAttributes<HTMLDivElement> {
  user: Pick<User, 'name' | 'image' | 'email'>;
}

export function UserAccountNav({ user }: UserAccountNavProps) {
  const router = useRouter();
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <UserAvatar
          user={{ name: user.name || null, image: user.image || null }}
          className='h-10 w-10'
        />
      </DropdownMenuTrigger>
      <DropdownMenuContent align='end'>
        <div className='z-40 flex items-center justify-start gap-2 p-2'>
          <div className='flex flex-col space-y-1 leading-none'>
            {user.name && <p className='font-medium'>{user.name}</p>}
            {user.email && (
              <p className='text-muted-foreground w-[200px] truncate text-sm'>
                {user.email}
              </p>
            )}
          </div>
        </div>
        <DropdownMenuSeparator />
        {/* <DropdownMenuItem asChild>
          <Link href='/device'>Device</Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Link href='/staff'>Staff</Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Link href='/log'>Log</Link>
        </DropdownMenuItem>
        <DropdownMenuSeparator /> */}
        <DropdownMenuItem
          className='cursor-pointer'
          onSelect={async () => {
            // event.preventDefault();
            const logoutret = await logout();
            if (logoutret) {
              router.refresh();
              router.push('/login');
            }
            // signOut({
            //   callbackUrl: `${window.location.origin}/login`,
            // });
          }}
        >
          Sign out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
