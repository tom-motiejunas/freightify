import { HttpError } from "@pankod/refine-core";
import { Create, Box, TextField } from "@pankod/refine-mui";
import { useForm } from "@pankod/refine-react-hook-form";

import { ITruck } from "src/interfaces";

export const TruckCreate: React.FC = () => {
  const {
    saveButtonProps,
    register,
    formState: { errors },
  } = useForm<ITruck, HttpError, ITruck>();

  return (
    <Create saveButtonProps={saveButtonProps}>
      <Box
        component="form"
        sx={{ display: "flex", flexDirection: "column" }}
        autoComplete="off"
      >
        <TextField
          {...register("truckName", {
            required: "This field is required",
          })}
          error={!!errors.truckName}
          helperText={errors.truckName?.message}
          margin="normal"
          fullWidth
          label="Name"
          name="truckName"
          autoFocus
        />
        <TextField
          {...register("truckModel", {
            required: "This field is required",
          })}
          error={!!errors.truckModel}
          helperText={errors.truckModel?.message}
          margin="normal"
          fullWidth
          label="Truck model"
          name="truckModel"
          autoFocus
        />
        <TextField
          {...register("truckDescription", {
            required: "This field is required",
          })}
          error={!!errors.truckDescription}
          helperText={errors.truckDescription?.message}
          margin="normal"
          fullWidth
          label="Description"
          name="truckDescription"
          multiline
          rows={4}
          autoFocus
        />
        <TextField
          {...register("truckLoadCapacity", {
            required: "This field is required",
          })}
          error={!!errors.truckLoadCapacity}
          helperText={errors.truckLoadCapacity?.message}
          margin="normal"
          label="Truck Load Capacity"
          name="truckLoadCapacity"
        />
      </Box>
    </Create>
  );
};
