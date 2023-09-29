import {
  useQuery,
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";
import { ColumnDef } from "@tanstack/react-table";
import * as React from "react";
import { FiEye } from "react-icons/fi";

import { buildPaginatedTableURL } from "@/libs/table";
// import useRenderCount from "@/hooks/useRenderCount";
import useServerTable from "@/hooks/useServerTable";

// import { User } from "@/pages/api/mock/users/route";
import { PaginatedApiResponse } from "@/type/api-type";
import IconButton from "@/components/new-forms-components/icon-button";
import PopupFilter, {
  PopupFilterProps,
} from "@/components/new-forms-components/table/popup-filter";
import Typography from "@/components/new-forms-components/typography";
import ServerTable from "@/components/new-forms-components/table/server-table";
import { User } from "@/type/user";

type UserFilter = {
  country: string[];
};

export default function TablePage() {
  // const renderCount = useRenderCount();
  const [queryData, setQueryData] =
    React.useState<PaginatedApiResponse<User>>();

  //#region  //*=========== Table Definition ===========
  const { tableState, setTableState } = useServerTable<User>();

  /**
   * Behavior:
   * - If no size set, text won't truncate and will take as much space as the content needs
   *      creating an overflow if needed
   * - If size is set, it will be truncated to the pixel specified
   */
  const columns: ColumnDef<User>[] = [
    {
      accessorKey: "name",
      header: "Role",
      // To set size, add size in pixel
      size: 200,
    },
    {
      accessorKey: "email",
      header: "Email",
    },
    {
      accessorKey: "country",
      header: "Country",
    },
    {
      id: "actions",
      header: "Action",
      cell: () => <IconButton variant="outline" icon={FiEye} />,
    },
  ];
  //#endregion  //*======== Table Definition ===========

  //#region  //*=========== Fetch Data ===========
  const [filterQuery, setFilterQuery] = React.useState<UserFilter>({
    country: [],
  });

  const url = buildPaginatedTableURL({
    baseUrl: "/api/mock/users",
    tableState,
  });

  const filterOption: PopupFilterProps<UserFilter>["filterOption"] =
    React.useMemo(
      () => [
        {
          id: "country",
          name: "Country",
          options: [
            { id: "Indonesia", name: "Indonesia" },
            { id: "Malaysia", name: "Malaysia" },
            { id: "Singapore", name: "Singapore" },
          ],
        },
      ],
      []
    );

  React.useEffect(() => {
    async function fetchApiData() {
      const response = await fetch(url); // Replace with your API URL
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const test = await response.json();

      setQueryData(test);

      console.log(test);
    }

    if (tableState.pagination.pageIndex >= 0) {
      fetchApiData();
    }
  }, [tableState.pagination.pageIndex, url]);

  //#endregion  //*======== Fetch Data ===========

  return (
    <main className="bg-white">
      <section>
        <div className="layout min-h-screen py-20">
          <Typography as="h1" variant="h1">
            Table
          </Typography>

          <Typography as="h2" variant="h2" className="mt-4">
            Server Table
          </Typography>
          <Typography variant="b2">
            Table state such as filter, sort, and pagination is managed on the
            server.
          </Typography>
          <pre>{JSON.stringify({ tableState, url, filterQuery }, null, 2)}</pre>

          <ServerTable
            //@ts-ignore
            columns={columns}
            data={queryData?.serialized_items ?? []}
            totalPage={queryData?.total_page}
            header={
              <PopupFilter
                filterOption={filterOption}
                setFilterQuery={setFilterQuery}
              />
            }
            // isLoading={isLoading}
            tableState={tableState}
            setTableState={setTableState}
            className="mt-8"
            withFilter
          />
        </div>
      </section>
    </main>
  );
}
