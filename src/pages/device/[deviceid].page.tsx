import cookie from 'cookie';
import type { GetServerSideProps, InferGetServerSidePropsType } from 'next';
import { useRouter } from 'next/router';

import { provideServerRequestOptions } from '@/lib/api';
import clsxm from '@/lib/clsxm';
import logger from '@/lib/logger';

import Breadcrumb from '@/components/Breadcrumb';
import { Icons } from '@/components/default-icons';
import AuthLayout from '@/components/layout/auth-layout';
import Card from '@/components/layout/dashboard/Card';
import Layout from '@/components/layout/Layout';
import Seo from '@/components/Seo';
import Typography from '@/components/typography/Typography';

import UnauthPage from '../zzzsandbox/boilerplate/unauth.page';

import { CustomSidebarNavItem } from '@/types';
import { Device } from '@/types/device';

export default function DeviceDetailPage({
  repo,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const router = useRouter();
  const { deviceid } = router.query;

  const navitem: CustomSidebarNavItem[] = [];
  const sidebarNavItem: CustomSidebarNavItem = {
    category: repo ? 'List Devices' : 'Error getting devices',
    catdesc: 'manage your devices here, click the device to start',
    items: [],
  };

  if (repo) {
    repo.map((item: Device) => {
      sidebarNavItem.items.push({
        title: item.DeviceName,
        href: `/device/${item.DeviceID}`,
        icon: 'options',
      });
    });

    navitem.push(sidebarNavItem);
  }

  const devicedetail = repo.find((item: Device) => item.DeviceID === deviceid);

  logger(devicedetail.Roles);

  return (
    <Layout>
      <Seo templateTitle={`${devicedetail?.DeviceName || 'Device Detail'}`} />

      <AuthLayout navitem={navitem}>
        {!devicedetail || !deviceid ? (
          <div className='mt-10 flex w-full flex-row items-start justify-center'>
            <UnauthPage />
          </div>
        ) : (
          <>
            <Breadcrumb
              className='absolute left-72 top-12 mt-4'
              crumbs={['/device', '/device/:deviceid']}
            />
            <div className='mt-10 flex w-full flex-row items-start justify-center'>
              <Card className='mx-4 h-3/4 w-full bg-gray-100 p-8 lg:mx-0 lg:w-1/2'>
                {devicedetail && (
                  <>
                    <Typography variant='h3' color='primary'>
                      {devicedetail.DeviceName} -{' '}
                      {devicedetail.IsActive ? 'Active' : 'Inactive'}
                    </Typography>
                    <Card.Section>
                      <Typography variant='h4' color='success'>
                        Authorized roles to this device:
                      </Typography>
                      <div className='mt-8 flex flex-wrap gap-2'>
                        {devicedetail.Roles.map(
                          (item: string, index: number) => {
                            logger(item);
                            return (
                              <div
                                key={index}
                                className={clsxm(
                                  'mr-2 mb-2 flex flex-row items-center gap-4 rounded-full px-3 py-1 text-sm font-semibold text-gray-700',
                                  'bg-green-200'
                                )}
                              >
                                <Icons.user className='h-6 w-6' />
                                {item}
                              </div>
                            );
                          }
                        )}
                      </div>
                    </Card.Section>
                  </>
                )}
              </Card>
            </div>
          </>
        )}
      </AuthLayout>
    </Layout>
  );
}

export const getServerSideProps = (async (context) => {
  const cookies = cookie.parse(context.req.headers.cookie ?? '');
  const appCookie = cookies?.['uss_sess'] ?? '';
  const parsedCookies = appCookie ? JSON.parse(appCookie) : {};
  const accessToken = parsedCookies?.accessToken ?? null;

  const request = await provideServerRequestOptions({
    path: '/device',
    method: 'GET',
    token: accessToken,
  });

  if (!request) {
    return { props: { repo: [] } };
  }

  const res = await fetch(request);

  if (!res.ok) {
    return { props: { repo: [] } };
  }

  const repogg = await res.json();

  if (!res.ok) {
    return { props: { repo: [] } };
  }

  const repo = repogg.serialized_items;

  if (!repo) {
    return { props: { repo: [] } };
  }

  return { props: { repo } };
}) satisfies GetServerSideProps<{
  repo: Device[] | null;
}>;
