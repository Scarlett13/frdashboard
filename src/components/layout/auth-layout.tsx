import Image from 'next/image';

import clsxm from '@/lib/clsxm';

import { DashboardNav } from '@/components/nav/sidenav/dashboard-nav';

import { dashboardConfig } from '@/config/dashboard';

import { MainNav } from '../nav/topnav/main-nav';
import { UserAccountNav } from '../nav/topnav/user-account-nav';

import { CustomSidebarNavItem } from '@/types';

import logo from '~/images/logo.png';

interface IAuthLayout {
  children: React.ReactNode;
  navitem: CustomSidebarNavItem[] | null;
  mainClassName?: string;
}
export default function AuthLayout({
  children,
  navitem,
  mainClassName,
}: IAuthLayout) {
  return (
    <div className='min-w-screen flex min-h-screen flex-col items-center justify-between'>
      <header className='border-border sticky top-0 z-40 min-w-full border-b bg-white shadow-md'>
        <div className='mx-8 flex h-12 items-center justify-between py-4 md:mx-10 lg:mx-12'>
          <div className='flex flex-row space-x-4'>
            <Image height={36} width={36} src={logo} alt='logo image' />
            <MainNav items={dashboardConfig.mainNav} />
          </div>

          <UserAccountNav
            user={{
              name: 'Visi',
              image: null,
              email: 'admin@visiglobalteknologi.co.id',
            }}
          />
        </div>
      </header>
      <div
        className={clsxm(
          'container grid min-h-screen min-w-full flex-1 gap-12',
          navitem && 'md:grid-cols-[210px_1fr]'
        )}
      >
        {navitem && (
          <aside className='border-border hidden w-[250px] flex-col border-r bg-gray-300 pr-2 md:flex'>
            <div className='mt-6'>
              {
                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                //@ts-ignore
                // prettier-ignore
                // eslint-disable-next-line react/jsx-no-undef
                <DashboardNav items={navitem}/>
              }
            </div>
          </aside>
        )}

        <main
          className={clsxm(
            'mx-0 mt-6 flex w-full flex-1 overflow-hidden',
            mainClassName
          )}
        >
          {children}
        </main>
      </div>
      {/* <SiteFooter className='bg-background border-border invisible sticky bottom-0 z-40 mt-8 w-full border-t md:visible' /> */}
    </div>
  );
}
