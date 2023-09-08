import { Log } from "@/type/log";
import { useEffect, useState } from "react";
import { providePaginatedOptions, provideRequestOptions } from "@/libs/api";
import useServerTable from "@/hooks/useServerTable";
import React from "react";
import { PaginatedApiResponse } from "@/type/api-type";
import { ColumnDef } from "@tanstack/react-table";
import IconButton from "./new-forms-components/icon-button";
import { FiEye } from "react-icons/fi";
import ServerTable from "./new-forms-components/table/server-table";
import Typography from "./new-forms-components/typography";

function TableLogAccess() {
  const [queryData, setQueryData] = useState<PaginatedApiResponse<Log>>();
  const [filteredData, setFiltredData] = useState<Log[] | null>(null);

  //#region  //*=========== Table Definition ===========
  const { tableState, setTableState } = useServerTable<Log>();
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [pageSize, setPageSize] = useState<number>(10);

  /**
   * Behavior:
   * - If no size set, text won't truncate and will take as much space as the content needs
   *      creating an overflow if needed
   * - If size is set, it will be truncated to the pixel specified
   */
  const columns: ColumnDef<Log>[] = [
    {
      accessorKey: "Id",
      header: "Id",
      // To set size, add size in pixel
      size: 100,
    },
    // {
    //   accessorKey: "AccuracyLog",
    //   header: "Accuracy Log",
    // },
    {
      accessorKey: "DeviceName",
      header: "Device Name",
    },
    {
      accessorKey: "StaffName",
      header: "Staff Name",
    },
    {
      accessorKey: "LogImage",
      header: "Log Image",
      size: 200,
    },
    {
      accessorKey: "LogMessage",
      header: "Log Message",
    },
    {
      accessorKey: "LogTimeStamp",
      header: "Timestamp",
      size: 250,
    },
    {
      id: "actions",
      header: "Action",
      cell: (props) => (
        <IconButton
          onClick={() => {
            console.log("clicked, ", props.cell.row.original);
          }}
          variant="outline"
          icon={FiEye}
        />
      ),
    },
  ];
  //#endregion  //*======== Table Definition ===========

  //#region  //*=========== Fetch Data ===========
  React.useEffect(() => {
    async function fetchApiData() {
      const url = providePaginatedOptions({ path: "/access_log", tableState });

      if (!url) {
        return;
      }

      const response = await fetch(url); // Replace with your API URL
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const test = await response.json();

      setQueryData(test);

      console.log(test.serialized_items);
    }

    if (
      tableState.pagination.pageIndex != currentPage ||
      tableState.pagination.pageSize != pageSize
    ) {
      setCurrentPage(tableState.pagination.pageIndex);
      setPageSize(tableState.pagination.pageSize);
      fetchApiData();
    }
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

  //#endregion  //*======== Fetch Data ===========
  return (
    <div className="grid grid-cols-1 gap-4 w-full justify-center h-full text-gray-900">
      <h1 className="text-2xl font-bold py-4 ms-8">Log</h1>
      <div className="overflow-auto h-[45rem] mt-1 text-gray-900">
        <ServerTable
          //@ts-ignore
          columns={columns}
          data={filteredData ? filteredData : queryData?.serialized_items ?? []}
          totalPage={queryData?.total_page}
          // header={
          //   <PopupFilter
          //     filterOption={filterOption}
          //     setFilterQuery={setFilterQuery}
          //   />
          // }
          // isLoading={isLoading}
          tableState={tableState}
          setTableState={setTableState}
          className="mt-8"
          withFilter={true}
        />
      </div>
    </div>
  );
}

export { TableLogAccess };
