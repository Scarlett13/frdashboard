import {
  ColumnDef,
  getCoreRowModel,
  PaginationState,
  SortingState,
  useReactTable,
} from '@tanstack/react-table';
import clsx from 'clsx';
// import fs from 'fs';
import * as React from 'react';
import toast from 'react-hot-toast';
import { FiList } from 'react-icons/fi';

import clsxm from '@/lib/clsxm';

// import logger from '@/lib/logger';
// import logger from '@/lib/logger';
import Filter from '@/components/table/Filter';
import PaginationControl from '@/components/table/PaginationControl';
import TBody from '@/components/table/TBody';
import THead from '@/components/table/THead';
import TOption from '@/components/table/TOption';

import { formatDateToString, isDateTheSame } from '@/utils/date-utils';

import Button from '../buttons/Button';

// import { PaginatedApiResponse } from '@/types/api';

export type ServerTableState = {
  globalFilter: string;
  pagination: PaginationState;
  sorting: SortingState;
};

type SetServerTableState = {
  setGlobalFilter: React.Dispatch<React.SetStateAction<string>>;
  setPagination: React.Dispatch<React.SetStateAction<PaginationState>>;
  setSorting: React.Dispatch<React.SetStateAction<SortingState>>;
};

type ServerTableProps<T extends object> = {
  columns: ColumnDef<T>[];
  data: T[];
  header?: React.ReactNode;
  isLoading: boolean;
  totalPage: number | undefined;
  tableState: ServerTableState;
  setTableState: SetServerTableState;
  omitSort?: boolean;
  withFilter?: boolean;
  withEntries?: boolean;
  startDate?: Date | null;
  endDate?: Date | null;
  setStartDate?: React.Dispatch<React.SetStateAction<Date | null>>;
  setEndDate?: React.Dispatch<React.SetStateAction<Date | null>>;
} & React.ComponentPropsWithoutRef<'div'>;

export default function ServerTable<T extends object>({
  className,
  columns,
  data,
  header: Header,
  isLoading,
  totalPage,
  tableState,
  setTableState,
  omitSort = false,
  withFilter = false,
  startDate,
  endDate,
  setStartDate,
  setEndDate,
  // withEntries = true,
  ...rest
}: ServerTableProps<T>) {
  const table = useReactTable({
    data,
    columns,
    pageCount: totalPage || undefined,
    state: {
      ...tableState,
    },
    defaultColumn: {
      minSize: 0,
      size: 0,
    },
    onGlobalFilterChange: setTableState.setGlobalFilter,
    onPaginationChange: setTableState.setPagination,
    onSortingChange: setTableState.setSorting,
    getCoreRowModel: getCoreRowModel(),
    manualPagination: true,
    manualSorting: true,
  });

  async function downloadAbsensi() {
    if (!startDate || !endDate) {
      return toast.error(
        'Silahkan set Start Date dan End Date terlebih dahulu!'
      );
    }

    // const testdate = isDateTheSame(startDate, endDate);
    if (!isDateTheSame(startDate, endDate)) {
      return toast.error(
        'Start Date dan End Date tidak boleh di hari yang berbeda!'
      );
    }

    const parsedDate = formatDateToString(startDate, 'dd-MM-yyyy', false);

    const gg = await fetch('/api/downloadfile', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        path: `/attendance/${parsedDate}`,
        method: 'get',
      }),
    });

    const fileBlob = await gg.blob();

    // this works and prompts for download
    const link = document.createElement('a'); // once we have the file buffer BLOB from the post request we simply need to send a GET request to retrieve the file data
    link.href = window.URL.createObjectURL(fileBlob);
    link.download = `Absensi Visi - ${parsedDate}.xlsx`;
    link.click();
    link.remove();
  }

  return (
    <div className={clsxm('flex flex-col', className)} {...rest}>
      {/* <pre>{JSON.stringify({ isLoading }, null, 2)}</pre> */}
      <div
        className={clsx(
          'flex flex-col items-stretch gap-3 sm:flex-row',
          withFilter ? 'sm:justify-between' : 'sm:justify-end'
        )}
      >
        {withFilter && (
          <>
            <Filter
              table={table}
              startDate={startDate || null}
              endDate={endDate || null}
              setStartDate={setStartDate || null}
              setEndDate={setEndDate || null}
            />
            <Button onClick={downloadAbsensi}>Download Absensi</Button>
          </>
        )}

        <div className='flex items-center gap-3'>
          {Header}
          <TOption
            icon={<FiList />}
            value={table.getState().pagination.pageSize}
            onChange={(e) => {
              table.setPageSize(Number(e.target.value));
            }}
          >
            {[5, 10, 25, 100].map((page) => (
              <option key={page} value={page}>
                {page} Entries
              </option>
            ))}
          </TOption>
        </div>
      </div>
      <div className='-my-2 -mx-4 mt-2 overflow-x-auto sm:-mx-6 lg:-mx-8'>
        <div className='inline-block min-w-full py-2 align-middle md:px-6 lg:px-8'>
          <div className='overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg'>
            <table className='min-w-full divide-y divide-gray-300'>
              <THead table={table} omitSort={omitSort} />
              <TBody table={table} isLoading={isLoading} />
            </table>
          </div>
        </div>
      </div>

      <PaginationControl table={table} data={data} className='mt-4' />
    </div>
  );
}
