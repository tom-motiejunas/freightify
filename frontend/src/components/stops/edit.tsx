import { HttpError } from "@pankod/refine-core";
import { Edit, Box, TextField } from "@pankod/refine-mui";
import { useForm } from "@pankod/refine-react-hook-form";

import { IStop } from "src/interfaces";

export const StopEdit: React.FC = () => {
  const {
    saveButtonProps,
    register,
    formState: { errors },
  } = useForm<IStop, HttpError, IStop>();

  return (
    <Edit saveButtonProps={saveButtonProps}>
      <Box
        component="form"
        sx={{ display: "flex", flexDirection: "column" }}
        autoComplete="off"
      >
        <TextField
          {...register("stopName", {
            required: "This field is required",
          })}
          error={!!errors.stopName}
          helperText={errors.stopName?.message}
          margin="normal"
          fullWidth
          label="Name"
          name="stopName"
          autoFocus
        />
        <TextField
          {...register("stopDescription", {
            required: "This field is required",
          })}
          error={!!errors.stopDescription}
          helperText={errors.stopDescription?.message}
          margin="normal"
          fullWidth
          label="Description"
          name="stopDescription"
          multiline
          rows={4}
          autoFocus
        />
        <TextField
          {...register("stopAddress", {
            required: "This field is required",
          })}
          error={!!errors.stopAddress}
          helperText={errors.stopAddress?.message}
          margin="normal"
          label="Truck Load Capacity"
          name="stopAddress"
        />
      </Box>
    </Edit>
  );
};
