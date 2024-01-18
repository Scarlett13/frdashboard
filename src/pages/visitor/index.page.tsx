import { ColumnDef } from '@tanstack/react-table';
import cookie from 'cookie';
import type { GetServerSideProps, InferGetServerSidePropsType } from 'next';
import { useEffect, useState } from 'react';
import React from 'react';
import { useSWRConfig } from 'swr';

import { provideServerRequestOptions } from '@/lib/api';
// import logger from '@/lib/logger';
import { buildPaginatedTableURL } from '@/lib/table';
import { useTable } from '@/hooks/use-table';
import useServerTable from '@/hooks/useServerTable';

import AuthLayout from '@/components/layout/auth-layout';
import Layout from '@/components/layout/Layout';
import Seo from '@/components/Seo';
import ShowImageTable from '@/components/showimageattable';
import PopupFilter, { PopupFilterProps } from '@/components/table/PopupFilter';
import ServerTable from '@/components/table/ServerTable';

import { dashboardConfig } from '@/config/dashboard';
import {
  formatDateToString,
  serverTimestampToLocalTime,
} from '@/utils/date-utils';

import { Device } from '@/types/device';
import { Log } from '@/types/log';

type VisitorFilter = {
  PersonType: string[];
  Device: string[];
};

export default function VisitorPage({
  repo,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  // const [queryData, setQueryData] = useState<PaginatedApiResponse<Log>>();
  const [filteredData, setFiltredData] = useState<Log[] | null>(null);

  //#region  //*=========== Table Definition ===========
  const { tableState, setTableState } = useServerTable<Log>();
  // const [currentPage, setCurrentPage] = useState<number>(1);
  // const [pageSize, setPageSize] = useState<number>(10);

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
    {
      header: 'Time In',
      cell: (props) => {
        const localtime = serverTimestampToLocalTime(
          props.cell?.row?.original.LogTimeStamp
        );
        return <p>{localtime}</p>;
      },
    },
    {
      header: 'Time Out',
      cell: (props) => {
        const localtime = serverTimestampToLocalTime(
          props.cell?.row?.original.LogTimeStamp
        );
        return <p>{localtime}</p>;
      },
    },
    {
      header: 'Type',
      cell: () => {
        return <p>Employee</p>;
      },
    },
    {
      accessorKey: 'PersonName',
      header: 'Staff Name',
    },
    {
      accessorKey: 'DeviceName',
      header: 'Gate Entrance',
    },
    {
      accessorKey: 'LogMessage',
      header: 'Appointment',
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
    PersonType: [],
    Device: [],
  });

  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const deviceFilterOptions: any = [];

  repo.map((device: Device) => {
    deviceFilterOptions.push({ id: device.id, name: device.DeviceName });
  });

  const filterOption: PopupFilterProps<VisitorFilter>['filterOption'] =
    React.useMemo(
      () => [
        {
          id: 'PersonType',
          name: 'Person Type',
          options: [
            { id: 'guest', name: 'Guest' },
            { id: 'employee', name: 'Employee' },
          ],
        },
        {
          id: 'Device',
          name: 'Device',
          options: deviceFilterOptions,
        },
      ],
      // eslint-disable-next-line react-hooks/exhaustive-deps
      []
    );

  const url = buildPaginatedTableURL({
    baseUrl: '/access_log',
    tableState,
    additionalParam: {
      Device: filterQuery.Device,
      PersonType: filterQuery.PersonType,
      TimeStart: formatDateToString(startDate, 'dd-MM-yyyy HH:mm', true),
      TimeEnd: formatDateToString(endDate, 'dd-MM-yyyy HH:mm', true),
    },
  })
    .replaceAll('%20', ' ')
    .replaceAll('%3A', ':');

  const { data } = useTable(url);
  const { mutate } = useSWRConfig();

  useEffect(() => {
    if (url) {
      mutate('/api/middleware');
    }
  }, [mutate, url]);

  useEffect(() => {
    if (tableState.globalFilter) {
      const filteredArray: Log[] = [];

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      data?.body?.serialized_items.forEach((item: any) => {
        let found = false; // Flag to track if the search keyword is found in any key
        // Iterate through the keys of each object
        Object.keys(item).forEach((key) => {
          if (
            item[key as keyof typeof item] &&
            item[key as keyof typeof item]
              .toString()
              .toLowerCase()
              .includes(tableState.globalFilter.toLowerCase())
          ) {
            found = true;
          }
        });

        if (found) {
          filteredArray.push(item);
        }
      });

      setFiltredData(filteredArray);
    } else {
      setFiltredData(null);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tableState.globalFilter]);

  // logger(url);

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
          data={filteredData || data?.body?.serialized_items || []}
          totalPage={data?.body?.total_page}
          tableState={tableState}
          setTableState={setTableState}
          className='z-10 mx-8 mt-4 w-full xl:max-h-[82vh] 2xl:max-h-[85vh]'
          withFilter={true}
          startDate={startDate}
          endDate={endDate}
          setStartDate={setStartDate}
          setEndDate={setEndDate}
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
