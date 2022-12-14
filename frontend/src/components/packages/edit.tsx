import { HttpError } from "@pankod/refine-core";
import { Edit, Box, TextField } from "@pankod/refine-mui";
import { useForm } from "@pankod/refine-react-hook-form";

import { IPackage } from "src/interfaces";

export const PackageEdit: React.FC = () => {
  const {
    saveButtonProps,
    register,
    formState: { errors },
  } = useForm<IPackage, HttpError, IPackage>();

  return (
    <Edit saveButtonProps={saveButtonProps}>
      <Box
        component="form"
        sx={{ display: "flex", flexDirection: "column" }}
        autoComplete="off"
      >
        <TextField
          {...register("packageName", {
            required: "This field is required",
          })}
          error={!!errors.packageName}
          helperText={errors.packageName?.message}
          margin="normal"
          fullWidth
          label="Name"
          name="packageName"
          autoFocus
        />
        <TextField
          {...register("packageDescription", {
            required: "This field is required",
          })}
          error={!!errors.packageDescription}
          helperText={errors.packageDescription?.message}
          margin="normal"
          fullWidth
          label="Description"
          name="packageDescription"
          multiline
          rows={4}
          autoFocus
        />
        <TextField
          {...register("packageWeight", {
            required: "This field is required",
          })}
          error={!!errors.packageWeight}
          helperText={errors.packageWeight?.message}
          margin="normal"
          fullWidth
          label="Weight"
          name="packageWeight"
          autoFocus
        />
        <TextField
          {...register("packageVolume", {
            required: "This field is required",
          })}
          error={!!errors.packageVolume}
          helperText={errors.packageVolume?.message}
          margin="normal"
          label="Volume"
          name="packageVolume"
        />
      </Box>
    </Edit>
  );
};
