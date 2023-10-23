import cookie from 'cookie';
import type { GetServerSideProps, InferGetServerSidePropsType } from 'next';

// import { useState } from 'react';
// import { useEffect } from 'react';
import { provideServerRequestOptions } from '@/lib/api';

// import logger from '@/lib/logger';
import StatisticsCard from '@/components/cards/StatisticsCard';
// import { DashboardShell } from '@/components/dashboard-shell';
import { Icons } from '@/components/default-icons';
import AuthLayout from '@/components/layout/auth-layout';
import Layout from '@/components/layout/Layout';
import Seo from '@/components/Seo';

import { CustomSidebarNavItem } from '@/types';
import { Device } from '@/types/device';

export default function DevicePage({
  repo,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const navitem: CustomSidebarNavItem[] = [];
  const sidebarNavItem: CustomSidebarNavItem = {
    category: repo ? 'List Devices' : 'Error getting devices',
    catdesc: 'manage your devices here, click the device to start',
    items: [],
  };
  let count;

  if (!repo) {
    count = { trueCount: 0, falseCount: 0 };
  } else {
    count = repo.reduce(
      (
        accumulator: { trueCount: number; falseCount: number },
        item: { IsActive: boolean }
      ) => {
        if (item.IsActive === true) {
          accumulator.trueCount++;
        } else if (item.IsActive === false) {
          accumulator.falseCount++;
        }
        return accumulator;
      },
      { trueCount: 0, falseCount: 0 }
    );

    repo.map((item: Device) => {
      sidebarNavItem.items.push({
        title: item.DeviceName,
        href: `/device/${item.DeviceID}`,
        icon: 'options',
      });
    });

    navitem.push(sidebarNavItem);
  }

  return (
    <Layout>
      <Seo />

      <AuthLayout
        navitem={navitem}
        mainClassName='mx-0 mt-6 flex w-full flex-1 flex-col items-center justify-center overflow-hidden'
      >
        <div className='flex flex-row gap-8'>
          <StatisticsCard
            variant='primary'
            icon={Icons['arrowRight']}
            label='Total Number of Device'
            value={repo.length}
          />
          <StatisticsCard
            variant='success'
            icon={Icons['arrowRight']}
            label='Total Active Device'
            value={count.trueCount}
          />
          <StatisticsCard
            variant='danger'
            icon={Icons['arrowRight']}
            label='Total Inactive Device'
            value={count.falseCount}
          />
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
