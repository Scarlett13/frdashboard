import {
  ColumnDef,
  getCoreRowModel,
  PaginationState,
  SortingState,
  useReactTable,
} from "@tanstack/react-table";
import clsx from "clsx";
import * as React from "react";
import { FiList } from "react-icons/fi";

import clsxm from "@/libs/clsxm";

import PaginationControl from "@/components/new-forms-components/table/pagination-control";
import TBody from "@/components/new-forms-components/table/t-body";
import THead from "@/components/new-forms-components/table/t-head";
import TOption from "@/components/new-forms-components/table/t-option";

import { PaginatedApiResponse } from "@/type/api-type";
import Filter from "./table-filter";

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
} & React.ComponentPropsWithoutRef<"div">;

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

  return (
    <div className={clsxm("flex flex-col", className)} {...rest}>
      {/* <pre>{JSON.stringify({ isLoading }, null, 2)}</pre> */}
      <div
        className={clsx(
          "flex flex-col items-stretch gap-3 sm:flex-row",
          withFilter ? "sm:justify-between mx-3" : "sm:justify-end"
        )}
      >
        {withFilter && <Filter table={table} />}
        <div className="flex items-center gap-3">
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
      <div className="-my-2 -mx-4 mt-2 sm:-mx-6 lg:-mx-8">
        <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
          <div className="shadow ring-1 ring-black ring-opacity-5 md:rounded-lg">
            <table className="min-w-full divide-y divide-gray-300">
              <THead table={table} omitSort={omitSort} className="bg-red-500" />
              <TBody table={table} isLoading={isLoading} />
            </table>
          </div>
        </div>
      </div>

      <PaginationControl
        table={table}
        data={data}
        className="mt-4 bottom-0 sticky"
      />
    </div>
  );
}
