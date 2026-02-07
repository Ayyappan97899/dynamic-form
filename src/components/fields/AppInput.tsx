import { TextField } from "@mui/material";
import type { FC, ChangeEvent } from "react";

interface AppInputProps {
  name: string;
  label: string;
  value: string | number;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
  required?: boolean;
  error?: boolean;
  helperText?: string;
  size?: "small" | "medium";
}

const AppInput: FC<AppInputProps> = ({
  name,
  label,
  value,
  onChange,
  required = false,
  error = false,
  helperText,
  size = "medium",
}) => {
  return (
    <TextField
      id={name}
      name={name}
      label={label}
      value={value}
      onChange={onChange}
      required={required}
      error={error}
      helperText={helperText}
      fullWidth
      variant="outlined"
      size={size}
    />
  );
};

export default AppInput;
