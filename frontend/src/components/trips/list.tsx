import React from "react";
import { Option, useMany, useSelect } from "@pankod/refine-core";
import {
  useDataGrid,
  DataGrid,
  GridColumns,
  List,
  Stack,
  EditButton,
  DeleteButton,
  GridValueFormatterParams,
} from "@pankod/refine-mui";

import { ITrip, ITruck } from "src/interfaces";

export const TripList: React.FC = () => {
  const { dataGridProps } = useDataGrid<ITrip>();

  const {
    options,
    queryResult: { isLoading, data },
  } = useSelect<ITruck>({
    resource: "truck",
    hasPagination: false,
  });

  const columns = React.useMemo<GridColumns<ITrip>>(
    () => [
      {
        field: "tripId",
        headerName: "ID",
        type: "string",
        width: 50,
      },
      {
        field: "tripName",
        headerName: "Name",
        flex: 1,
      },
      {
        field: "tripDescription",
        headerName: "Description",
        flex: 1,
      },
      {
        field: "tripStartAddress",
        headerName: "Start address",
        flex: 1,
      },
      {
        field: "tripEndAddress",
        headerName: "End address",
        flex: 1,
      },
      {
        field: "truckId",
        headerName: "Truck in Use",
        type: "singleSelect",
        headerAlign: "left",
        align: "left",
        minWidth: 250,
        flex: 0.5,
        valueOptions: options,
        valueFormatter: (params: GridValueFormatterParams<Option>) => {
          return params.value;
        },
        renderCell: function render({ row }) {
          if (isLoading) {
            return "Loading...";
          }
          const truck = data?.data.find((item) => {
            return item.truckId === row.truckId;
          });
          return truck?.truckName;
        },
      },
      {
        field: "actions",
        type: "actions",
        headerName: "Actions",
        renderCell: function render({ row }) {
          return (
            <Stack direction="row" spacing={1}>
              <EditButton size="small" hideText recordItemId={row.tripId} />
              <DeleteButton size="small" hideText recordItemId={row.tripId} />
            </Stack>
          );
        },
        align: "center",
        headerAlign: "center",
        minWidth: 80,
      },
    ],
    [data, isLoading]
  );

  return (
    <List>
      <DataGrid
        {...dataGridProps}
        columns={columns}
        autoHeight
        getRowId={(row: ITrip) => String(row.tripId)}
      />
    </List>
  );
};
