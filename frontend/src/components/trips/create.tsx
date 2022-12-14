import { HttpError } from "@pankod/refine-core";
import { Create, Box, TextField } from "@pankod/refine-mui";
import { useForm } from "@pankod/refine-react-hook-form";

import { ITrip } from "src/interfaces";

export const TripCreate: React.FC = () => {
  const {
    saveButtonProps,
    register,
    formState: { errors },
  } = useForm<ITrip, HttpError, ITrip>();

  return (
    <Create saveButtonProps={saveButtonProps}>
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
    </Create>
  );
};
