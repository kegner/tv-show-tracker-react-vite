import { FieldErrors, RegisterOptions, UseFormRegister } from "react-hook-form";
import { Show } from "../../types/types";
import { TextField, TextFieldProps } from "@mui/material";
import { getThemeColor } from "../../themes/theme";

export default function CustomTextField({
  label,
  register,
  propName,
  required,
  errors,
  ...rest
}: {
  label: string;
  register: UseFormRegister<Show>;
  propName: keyof Show;
  required?: boolean;
  errors?: FieldErrors<Show>;
} & TextFieldProps) {
  const params: RegisterOptions<Show, keyof Show> = {
    required,
    valueAsNumber: rest.type === "number",
  };

  return (
    <TextField
      label={label}
      variant="outlined"
      {...register(propName, params)}
      helperText={errors?.[propName] ? "This field is required" : ""}
      slotProps={{
        formHelperText: {
          sx: {
            color: (theme) => getThemeColor(theme, "error"),
          },
        },
        inputLabel: {
          disableAnimation: true,
        },
      }}
      {...rest}
    />
  );
}
