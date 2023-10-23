import { ColumnDef } from '@tanstack/react-table';
import { useEffect, useState } from 'react';
import React from 'react';

import { providePaginatedOptions } from '@/lib/api';
import logger from '@/lib/logger';
import useServerTable from '@/hooks/useServerTable';

// import Breadcrumb from '@/components/Breadcrumb';
// import { Icons } from '@/components/default-icons';
import AuthLayout from '@/components/layout/auth-layout';
import Layout from '@/components/layout/Layout';
import Seo from '@/components/Seo';
import ShowImageTable from '@/components/showimageattable';
import ServerTable from '@/components/table/ServerTable';

import { PaginatedApiResponse } from '@/types/api';
import { Log } from '@/types/log';

export default function LogPage() {
  // logger(accessToken);

  const [queryData, setQueryData] = useState<PaginatedApiResponse<Log>>();
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
      accessorKey: 'Id',
      header: 'Id',
      // To set size, add size in pixel
      size: 100,
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
      accessorKey: 'StaffName',
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

  useEffect(() => {
    if (tableState.globalFilter) {
      const filteredArray: Log[] = [];

      queryData?.serialized_items.forEach((item) => {
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

  return (
    <Layout>
      <Seo templateTitle='Log Access' />

      <AuthLayout navitem={null}>
        <div className='container mx-auto max-h-screen w-screen max-w-full'>
          <div className='min-w-screen flex max-h-screen flex-row items-start justify-center'>
            <ServerTable
              // eslint-disable-next-line @typescript-eslint/ban-ts-comment
              //@ts-ignore
              columns={columns}
              data={
                filteredData ? filteredData : queryData?.serialized_items ?? []
              }
              totalPage={queryData?.total_page}
              tableState={tableState}
              setTableState={setTableState}
              className='z-10 mx-8 mt-4 w-full xl:max-h-[82vh] 2xl:max-h-[85vh]'
              withFilter={true}
            />
          </div>
          <div className='py-4' />
        </div>
      </AuthLayout>
    </Layout>
  );
}
