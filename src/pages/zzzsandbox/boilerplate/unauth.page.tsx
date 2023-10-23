import * as React from 'react';

// import { useEffect, useState } from 'react';
import Layout from '@/components/layout/Layout';
import UnstyledLink from '@/components/links/UnstyledLink';
import Seo from '@/components/Seo';
import UnauthenticatedComponent from '@/components/unauthenticated';

export default function UnauthPage() {
  // const [mounted, setMounted] = useState(false);

  // useEffect(() => {
  //   setMounted(true);
  // }, []);

  return (
    <Layout>
      <Seo />

      <main>
        <div className='bg-background relative flex min-h-screen min-w-full flex-row items-center justify-center text-center'>
          <UnauthenticatedComponent />
          <footer className='absolute bottom-2 text-gray-700'>
            © {new Date().getFullYear()} By{' '}
            <UnstyledLink href='/'>Visi</UnstyledLink>
          </footer>
        </div>
      </main>
    </Layout>
  );
}
