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

import { ITruck } from "src/interfaces";

export const TruckList: React.FC = () => {
  const { dataGridProps } = useDataGrid<ITruck>();

  const {
    options,
    queryResult: { isLoading },
  } = useSelect<ITruck>({
    resource: "truck",
    hasPagination: false,
  });

  const columns = React.useMemo<GridColumns<ITruck>>(
    () => [
      {
        field: "truckId",
        headerName: "ID",
        type: "string",
        width: 50,
      },
      {
        field: "truckName",
        headerName: "Name",
        minWidth: 400,
        flex: 1,
      },
      {
        field: "truckModel",
        headerName: "Model",
        minWidth: 250,
        flex: 1,
      },
      {
        field: "truckDescription",
        headerName: "Description",
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
              <EditButton size="small" hideText recordItemId={row.truckId} />
              <DeleteButton size="small" hideText recordItemId={row.truckId} />
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
        getRowId={(row: ITruck) => String(row.truckId)}
      />
    </List>
  );
};
