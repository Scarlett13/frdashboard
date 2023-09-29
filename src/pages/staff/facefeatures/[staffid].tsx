import { Staff } from "@/type/staff";
import { useEffect, useState } from "react";
import { providePaginatedOptions, provideRequestOptions } from "@/libs/api";
import UnstyledLink from "@/components/new-forms-components/unstyled-links";
import { useRouter } from "next/router";
import useServerTable from "@/hooks/useServerTable";
import { Log } from "@/type/log";
import { PaginatedApiResponse } from "@/type/api-type";
import { ColumnDef } from "@tanstack/react-table";
import React from "react";
import Typography from "@/components/new-forms-components/typography";
import ShowImageTable from "@/components/new-forms-components/showimageattable";
import ServerTable from "@/components/new-forms-components/table/server-table";
import { useAuth } from "@/contexts/auth-context";
import ButtonAddFaceFeatures from "@/components/modals/modal-add-face-features";
import Layout from "@/components/layouts/layout";

export default function StaffDetail() {
  const router = useRouter();
  const { staffid } = router.query;
  const [staff, setStaff] = useState<Staff | null>(null);

  const { imagelog } = router.query;

  const [queryData, setQueryData] = useState<PaginatedApiResponse<Log>>();
  const [filteredData, setFiltredData] = useState<Log[] | null>(null);

  const { token, authLoading } = useAuth();

  useEffect(() => {
    if (authLoading === undefined) {
      return;
    }
    if (!authLoading && !token) {
      router.push("/");
    }
  }, [token, authLoading]);

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
      id: "log_image",
      accessorKey: "LogImage",
      header: "Log Image",
      cell: (props) => (
        <ShowImageTable
          path={`http://192.168.10.31:5000/file/image${props.cell?.row?.original?.LogImage.replace(
            "/App/Files/Image/",
            "/"
          )}`}
        />
      ),
    },
    {
      accessorKey: "LogTimeStamp",
      header: "Timestamp",
    },
    {
      id: "actions",
      header: "Action",
      cell: (props) => (
        <ButtonAddFaceFeatures
          path={`/staff/${staffid}`}
          staffname={staff?.StaffName as string}
          imagepath={props.cell?.row?.original?.LogImage.replace(
            "/App/Files/Image",
            ""
          )}
        />
      ),
    },
  ];
  //#endregion  //*======== Table Definition ===========

  //#region  //*=========== Fetch Data ===========
  React.useEffect(() => {
    async function fetchApiData() {
      const url = await providePaginatedOptions({
        path: "/access_log",
        tableState,
      });

      if (!url) {
        return;
      }

      const response = await fetch(url); // Replace with your API URL
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const test = await response.json();

      // test.serialized_items = test.serialized_items.filter(
      //   (item: Log) => item.LogMessage !== "Success"
      // );

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

  async function getStaff(
    url: string,
    method: string,
    params?: string,
    body?: string
  ) {
    const request = await provideRequestOptions({ path: url, method });

    if (!request) {
      return;
    }

    try {
      fetch(request)
        .then((res) => {
          if (!res.ok) {
            setStaff({ id: -99 } as Staff);
            throw new Error(`Fetch error: ${res.status} - ${res.statusText}`);
          }
          return res.json();
        })
        .then((data) => {
          // Handle the successful response here
          // You can set the state or perform other actions with the data
          setStaff(data);
          console.log(data);
        })
        .catch((error) => {
          setStaff({ id: -99 } as Staff);
          // Handle the error here
          console.error(error);
        });
    } catch (error) {
      // Handle any synchronous errors that occur before the fetch
      console.error(error);
    }
  }

  // useEffect(() => {
  //   if (!staff || staff.id < 1) {
  //     router.push("/staff");
  //   }
  // }, [router, staff]);

  useEffect(() => {
    getStaff(`/staff/${staffid}`, "GET");
  }, [staffid]);

  return (
    <Layout showSideBar={false}>
      <div className="ms-9 flex flex-col gap-4">
        <UnstyledLink href="/staff" className="text-lg py-4">
          {"<- Back to list staff"}
        </UnstyledLink>
      </div>
      <div className="p-6">
        <div className="grid grid-cols-1 gap-4 w-full justify-center h-full text-gray-900">
          <Typography variant="j2">
            Add Face Features to {staff?.StaffName}
          </Typography>
          {imagelog && (
            <ButtonAddFaceFeatures
              path={`/staff/${staffid}`}
              staffname={staff?.StaffName as string}
              imagepath={`${imagelog as string}`}
            />
          )}
          <ServerTable
            //@ts-ignore
            columns={columns}
            data={
              filteredData ? filteredData : queryData?.serialized_items ?? []
            }
            withEntries={false}
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
    </Layout>
  );
}
