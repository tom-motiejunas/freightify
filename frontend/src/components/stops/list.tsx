import React from "react";
import { useSelect } from "@pankod/refine-core";
import {
  useDataGrid,
  DataGrid,
  GridColumns,
  List,
  Stack,
  EditButton,
  DeleteButton,
} from "@pankod/refine-mui";

import { IStop } from "src/interfaces";

export const StopList: React.FC = () => {
  const { dataGridProps } = useDataGrid<IStop>();

  const {
    options,
    queryResult: { isLoading },
  } = useSelect<IStop>({
    resource: "stop",
    hasPagination: false,
  });

  const columns = React.useMemo<GridColumns<IStop>>(
    () => [
      {
        field: "stopId",
        headerName: "ID",
        type: "string",
        width: 50,
      },
      {
        field: "stopName",
        headerName: "Name",
        minWidth: 400,
        flex: 1,
      },
      {
        field: "stopDescription",
        headerName: "Description",
        minWidth: 250,
        flex: 1,
      },
      {
        field: "stopAddress",
        headerName: "Model",
        minWidth: 250,
        flex: 1,
      },
      {
        field: "actions",
        type: "actions",
        headerName: "Actions",
        renderCell: function render({ row }) {
          return (
            <Stack direction="row" spacing={1}>
              <EditButton size="small" hideText recordItemId={row.stopId} />
              <DeleteButton size="small" hideText recordItemId={row.stopId} />
            </Stack>
          );
        },
        align: "center",
        headerAlign: "center",
        minWidth: 80,
      },
    ],
    [options, isLoading]
  );

  return (
    <List>
      <DataGrid
        {...dataGridProps}
        columns={columns}
        autoHeight
        getRowId={(row: IStop) => String(row.stopId)}
      />
    </List>
  );
};
