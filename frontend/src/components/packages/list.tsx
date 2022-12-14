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

import { IPackage } from "src/interfaces";

export const PackageList: React.FC = () => {
  const { dataGridProps } = useDataGrid<IPackage>();

  const {
    options,
    queryResult: { isLoading },
  } = useSelect<IPackage>({
    resource: "package",
    hasPagination: false,
  });

  const columns = React.useMemo<GridColumns<IPackage>>(
    () => [
      {
        field: "packageId",
        headerName: "ID",
        type: "string",
        width: 50,
      },
      {
        field: "packageName",
        headerName: "Name",
        flex: 1,
      },
      {
        field: "packageDescription",
        headerName: "Description",
        flex: 1,
      },
      {
        field: "packageWeight",
        headerName: "Weight",
        flex: 1,
      },
      {
        field: "packageVolume",
        headerName: "Volume",
        flex: 1,
      },

      {
        field: "actions",
        type: "actions",
        headerName: "Actions",
        renderCell: function render({ row }) {
          return (
            <Stack direction="row" spacing={1}>
              <EditButton size="small" hideText recordItemId={row.packageId} />
              <DeleteButton
                size="small"
                hideText
                recordItemId={row.packageId}
              />
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
        getRowId={(row: IPackage) => String(row.packageId)}
      />
    </List>
  );
};
