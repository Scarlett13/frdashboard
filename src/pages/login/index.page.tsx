import Image from 'next/image';
// import { useTheme } from 'next-themes';
import * as React from 'react';
import { useEffect, useState } from 'react';

import Layout from '@/components/layout/Layout';
import UnstyledLink from '@/components/links/UnstyledLink';
import Seo from '@/components/Seo';
import Skeleton from '@/components/Skeleton';

import LoginForm from './loginform';

import logo from '~/images/logo.png';

export default function HomePage() {
  const [loading, setLoading] = useState<boolean>(false);
  // const { theme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <>
        <Skeleton className='my-2 h-8 max-w-sm' />
        <Skeleton className='mb-8 mt-2 h-8 max-w-sm' />
      </>
    );
  }

  return (
    <Layout>
      <Seo templateTitle='Login' />

      <main>
        <div className='bg-background relative flex min-h-screen min-w-full flex-row items-center justify-center text-center'>
          <div className='container flex h-screen w-screen flex-col items-center justify-center'>
            <div className='mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px] md:w-[400px]'>
              <div className='flex flex-col items-center space-y-2 text-center'>
                <Image height={60} width={60} src={logo} alt='logo image' />
                <h1 className='text-2xl font-semibold tracking-tight'>
                  Welcome back
                </h1>
                <p className='text-muted-foreground text-sm'>
                  Enter your username to login to your account
                </p>
              </div>

              <div className='text-muted-foreground px-8 text-center text-sm'>
                <LoginForm loading={loading} setLoading={setLoading} />
              </div>
            </div>
          </div>
          <footer className='absolute bottom-2 text-gray-700'>
            © {new Date().getFullYear()} By{' '}
            <UnstyledLink href='/'>Visi</UnstyledLink>
          </footer>
        </div>
      </main>
    </Layout>
  );
}

//#region  //*=========== Sandbox ===========
// eslint-disable-next-line unused-imports/no-unused-vars
const sandbox = [
  {
    title: 'Typography',
    route: '/sandbox/typography',
  },
  {
    title: 'Colors',
    route: '/sandbox/colors',
  },
  {
    title: 'Form',
    route: '/sandbox/form',
  },
  {
    title: 'Searchable Select Form',
    route: '/sandbox/searchable-select-form',
  },
  {
    title: 'Text Link & Button',
    route: '/sandbox/text-button',
  },
  {
    title: 'Button',
    route: '/sandbox/button',
  },
  {
    title: 'Breadcrumb',
    route: '/sandbox/breadcrumb',
  },
  {
    title: 'Icon Button',
    route: '/sandbox/icon-button',
  },
  {
    title: 'React Query & Toast',
    route: '/sandbox/toast-rq',
  },
  {
    title: 'Modal',
    route: '/sandbox/modal',
  },
  {
    title: 'Dialog',
    route: '/sandbox/dialog',
  },
  {
    title: 'Table',
    route: '/sandbox/table',
  },
  {
    title: 'Tooltip',
    route: '/sandbox/tooltip',
  },
  {
    title: 'Mac Card',
    route: '/sandbox/mac-cards',
  },
  {
    title: 'Popover',
    route: '/sandbox/popover',
  },
  {
    title: 'Banner',
    route: '/sandbox/banner',
  },
  {
    title: 'Alert',
    route: '/sandbox/alert',
  },
  {
    title: 'Typography Alert',
    route: '/sandbox/typography-alert',
  },
  {
    title: 'Tag',
    route: '/sandbox/tag',
  },
  {
    title: 'Card',
    route: '/sandbox/card',
  },
  {
    title: 'Development Card',
    route: '/sandbox/development-card',
  },
  {
    title: 'Statistics Card',
    route: '/sandbox/statistics-card',
  },
];
//#endregion  //*======== Sandbox ===========
