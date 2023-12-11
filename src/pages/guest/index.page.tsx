import { ColumnDef } from '@tanstack/react-table';
import cookie from 'cookie';
import type { GetServerSideProps } from 'next';
import { useState } from 'react';
import React from 'react';

// import { useState } from 'react';
// import { useEffect } from 'react';
import {
  providePaginatedOptions,
  provideServerRequestOptions,
} from '@/lib/api';
import logger from '@/lib/logger';
import { buildPaginatedTableURL } from '@/lib/table';
import useServerTable from '@/hooks/useServerTable';

// import logger from '@/lib/logger';
// import StatisticsCard from '@/components/cards/StatisticsCard';
// import { DashboardShell } from '@/components/dashboard-shell';
// import { Icons } from '@/components/default-icons';
import AuthLayout from '@/components/layout/auth-layout';
import Layout from '@/components/layout/Layout';
import Seo from '@/components/Seo';
import ShowImageTable from '@/components/showimageattable';
import PopupFilter, { PopupFilterProps } from '@/components/table/PopupFilter';
import ServerTable from '@/components/table/ServerTable';

import { dashboardConfig } from '@/config/dashboard';

import { PaginatedApiResponse } from '@/types/api';
// import { CustomSidebarNavItem } from '@/types';
import { Device } from '@/types/device';
import { Log } from '@/types/log';

type VisitorFilter = {
  company: string[];
};

export default function GuestPage() {
  const [queryData, setQueryData] = useState<PaginatedApiResponse<Log>>();
  // eslint-disable-next-line unused-imports/no-unused-vars
  const [filteredData, setFiltredData] = useState<Log[] | null>(null);

  //#region  //*=========== Table Definition ===========
  const { tableState, setTableState } = useServerTable<Log>();
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [pageSize, setPageSize] = useState<number>(10);

  // logger(filteredData);

  /**
   * Behavior:
   * - If no size set, text won't truncate and will take as much space as the content needs
   *      creating an overflow if needed
   * - If size is set, it will be truncated to the pixel specified
   */
  const columns: ColumnDef<Log>[] = [
    {
      accessorKey: 'LogImage',
      header: '',
      // To set size, add size in pixel
      size: 100,
      cell: (props) => (
        <ShowImageTable
          path={`http://192.168.10.31:5000/file/image${props.cell?.row?.original?.LogImage.replace(
            '/App/Files/Image/',
            '/'
          )}`}
        />
      ),
    },
    // {
    //   accessorKey: "AccuracyLog",
    //   header: "Accuracy Log",
    // },
    {
      accessorKey: 'DeviceName',
      header: 'Device Name',
    },
    {
      accessorKey: 'PersonName',
      header: 'Staff Name',
    },
    {
      accessorKey: 'LogImage',
      header: 'Log Image',
      cell: (props) => (
        <ShowImageTable
          path={`http://192.168.10.31:5000/file/image${props.cell?.row?.original?.LogImage.replace(
            '/App/Files/Image/',
            '/'
          )}`}
        />
      ),
    },
    {
      accessorKey: 'LogMessage',
      header: 'Log Message',
    },
    {
      accessorKey: 'LogTimeStamp',
      header: 'Timestamp',
      size: 250,
    },
    // {
    //   id: "actions",
    //   header: "Action",
    //   cell: (props) => (
    //     <IconButton
    //       onClick={() => {
    //         console.log("clicked, ", props.cell.row.original);
    //       }}
    //       variant="outline"
    //       icon={FiEye}
    //     />
    //   ),
    // },
  ];
  //#endregion  //*======== Table Definition ===========

  //#region  //*=========== Fetch Data ===========

  const [filterQuery, setFilterQuery] = React.useState<VisitorFilter>({
    company: [],
  });

  const filterOption: PopupFilterProps<VisitorFilter>['filterOption'] =
    React.useMemo(
      () => [
        {
          id: 'company',
          name: 'Company',
          options: [
            { id: 'visi', name: 'Visi' },
            { id: 'gbu', name: 'Graha' },
            { id: 'ram', name: 'Rembaka' },
          ],
        },
      ],
      []
    );

  React.useEffect(() => {
    async function fetchApiData() {
      const url = await providePaginatedOptions({
        path: '/access_log',
        tableState,
      });

      if (!url) {
        return;
      }

      const response = await fetch(url); // Replace with your API URL
      if (!response.ok) {
        // throw new Error("Network response was not ok");
        return;
      }
      const test = await response.json();

      setQueryData(test);
    }

    if (
      tableState.pagination.pageIndex != currentPage ||
      tableState.pagination.pageSize != pageSize
    ) {
      setCurrentPage(tableState.pagination.pageIndex);
      setPageSize(tableState.pagination.pageSize);
      fetchApiData();
    }

    logger(
      `tablestatepageindex: ${tableState.pagination.pageIndex}, tablestatepagesize: ${tableState.pagination.pageSize}, currentpage: ${currentPage}, pagesize: ${pageSize}`
    );
  }, [tableState, currentPage, pageSize]);

  const url = buildPaginatedTableURL({
    baseUrl: '/users',
    tableState,
    additionalParam: {
      country: filterQuery.company,
    },
  });

  logger(url);

  return (
    <Layout>
      <Seo />

      <AuthLayout
        navitem={dashboardConfig.sidebarNav}
        mainClassName='mx-0 mt-6 flex w-full flex-1 flex-col items-center justify-center overflow-hidden'
      >
        <ServerTable
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          //@ts-ignore
          columns={columns}
          header={
            <PopupFilter
              filterOption={filterOption}
              setFilterQuery={setFilterQuery}
            />
          }
          data={filteredData ? filteredData : queryData?.serialized_items ?? []}
          totalPage={queryData?.total_page}
          tableState={tableState}
          setTableState={setTableState}
          className='z-10 mx-8 mt-4 w-full xl:max-h-[82vh] 2xl:max-h-[85vh]'
          withFilter={true}
        />
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
