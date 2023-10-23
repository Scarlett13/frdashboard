import cookie from 'cookie';
import type { GetServerSideProps, InferGetServerSidePropsType } from 'next';

import logger from '@/lib/logger';

import Breadcrumb from '@/components/Breadcrumb';
// import { Icons } from '@/components/default-icons';
import AuthLayout from '@/components/layout/auth-layout';
import Layout from '@/components/layout/Layout';
import Seo from '@/components/Seo';

export default function AuthPage({
  accessToken,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  logger(accessToken);

  return (
    <Layout>
      <Seo />

      <AuthLayout navitem={null}>
        <div className='container mx-auto max-w-full p-10'>
          <Breadcrumb
            className='absolute top-12 left-10 mt-4 md:left-12'
            crumbs={['/staff', '/staff/:staffid']}
          />
          <div className='mt-10 flex w-full flex-row items-start justify-center'>
            hello mom
          </div>
          <div className='py-4' />
        </div>
      </AuthLayout>
    </Layout>
  );
}

export const getServerSideProps = (async (context) => {
  const cookies = cookie.parse(context.req.headers.cookie ?? '');
  const appCookie = cookies?.['uss_sess'] ?? '';
  const parsedCookies = appCookie ? JSON.parse(appCookie) : {};
  const accessToken = parsedCookies?.accessToken ?? null;

  if (!accessToken) {
    return { props: { accessToken: null } };
  }

  return { props: { accessToken } };
}) satisfies GetServerSideProps<{
  accessToken: string | null;
}>;
