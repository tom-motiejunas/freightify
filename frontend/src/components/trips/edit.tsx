import { HttpError, useSelect } from "@pankod/refine-core";
import { Edit, Box, TextField, Autocomplete } from "@pankod/refine-mui";
import { Controller, useForm } from "@pankod/refine-react-hook-form";

import { IPackage, IStop, ITrip, ITruck } from "src/interfaces";

export const TripEdit: React.FC = () => {
  const {
    refineCore: { queryResult },
    control,
    saveButtonProps,
    register,
    formState: { errors },
  } = useForm<
    ITrip,
    HttpError,
    ITrip & { truck: ITruck; stop: IStop; package: IPackage }
  >();

  const { queryResult: trucksQueryResult } = useSelect<ITruck>({
    resource: "truck",
    hasPagination: false,
  });

  const { queryResult: stopsQueryResult } = useSelect<IStop>({
    resource: "stop",
    hasPagination: false,
  });

  const { queryResult: packageQueryResult } = useSelect<IPackage>({
    resource: "package",
    hasPagination: false,
  });

  return (
    <Edit saveButtonProps={saveButtonProps}>
      <Box
        component="form"
        sx={{ display: "flex", flexDirection: "column" }}
        autoComplete="off"
      >
        <TextField
          {...register("tripName", {
            required: "This field is required",
          })}
          error={!!errors.tripName}
          helperText={errors.tripName?.message}
          margin="normal"
          fullWidth
          label="Name"
          name="tripName"
          autoFocus
        />
        {/* TODO add many stops, one truck input, many packages */}
        <Controller
          control={control}
          name="truckId"
          defaultValue={null as any}
          render={({ field }) => (
            <Autocomplete
              options={
                trucksQueryResult?.data?.data?.map((el) => el.truckName) || [""]
              }
              {...field}
              getOptionLabel={(option) => option}
              onChange={(_, value) => {
                field.onChange(
                  trucksQueryResult?.data?.data?.find(
                    (el) => el.truckName === value
                  )?.truckId
                );
              }}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Truck"
                  margin="normal"
                  variant="outlined"
                  error={!!errors.truck}
                  helperText={errors.truck?.message}
                />
              )}
            />
          )}
        />
        <Controller
          control={control}
          name="stopId"
          defaultValue={null as any}
          render={({ field }) => (
            <Autocomplete
              options={
                stopsQueryResult.data?.data?.map((el) => el.stopName) || [""]
              }
              {...field}
              getOptionLabel={(option) => option}
              onChange={(_, value) => {
                field.onChange(
                  stopsQueryResult.data?.data?.find(
                    (el) => el.stopName === value
                  )?.stopId
                );
              }}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Stop"
                  margin="normal"
                  variant="outlined"
                  error={!!errors.stop}
                  helperText={errors.stop?.message}
                />
              )}
            />
          )}
        />
        <Controller
          control={control}
          name="packageId"
          defaultValue={null as any}
          render={({ field }) => (
            <Autocomplete
              options={
                packageQueryResult.data?.data?.map((el) => el.packageName) || [
                  "",
                ]
              }
              {...field}
              getOptionLabel={(option) => option}
              onChange={(_, value) => {
                field.onChange(
                  packageQueryResult.data?.data?.find(
                    (el) => el.packageName === value
                  )?.packageId
                );
              }}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Package"
                  margin="normal"
                  variant="outlined"
                  error={!!errors.stop}
                  helperText={errors.stop?.message}
                />
              )}
            />
          )}
        />
        <TextField
          {...register("tripDescription", {
            required: "This field is required",
          })}
          error={!!errors.tripDescription}
          helperText={errors.tripDescription?.message}
          margin="normal"
          fullWidth
          label="Description"
          name="tripDescription"
          multiline
          rows={4}
          autoFocus
        />
        <TextField
          {...register("tripStartAddress", {
            required: "This field is required",
          })}
          error={!!errors.tripStartAddress}
          helperText={errors.tripStartAddress?.message}
          margin="normal"
          label="Start address"
          name="tripStartAddress"
        />
        <TextField
          {...register("tripEndAddress", {
            required: "This field is required",
          })}
          error={!!errors.tripEndAddress}
          helperText={errors.tripEndAddress?.message}
          margin="normal"
          label="End address"
          name="tripEndAddress"
        />
      </Box>
    </Edit>
  );
};
