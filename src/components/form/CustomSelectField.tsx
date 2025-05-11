import {
  FormControl,
  FormHelperText,
  InputLabel,
  MenuItem,
  Select,
  SelectProps,
} from "@mui/material";
import { useId } from "react";
import { FieldErrors, UseFormRegister } from "react-hook-form";
import { Show } from "../../types/types";

type SelectOption = {
  label: string;
  value: string;
};

export default function CustomSelectField({
  label,
  options,
  register,
  propName,
  required,
  errors,
  ...rest
}: {
  label: string;
  options: SelectOption[];
  register: UseFormRegister<Show>;
  propName: keyof Show;
  required?: boolean;
  errors?: FieldErrors<Show>;
} & SelectProps) {
  const labelId = useId();

  return (
    <FormControl fullWidth>
      <InputLabel id={labelId}>{label}</InputLabel>
      <Select
        label={label}
        labelId={labelId}
        {...register(propName, { required })}
        {...rest}
      >
        {options.map((option) => {
          return (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          );
        })}
      </Select>
      <FormHelperText>
        {errors?.title ? "This field is required" : ""}
      </FormHelperText>
    </FormControl>
  );
}
