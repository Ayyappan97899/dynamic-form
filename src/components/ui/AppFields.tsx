import type { FC, ChangeEvent } from "react";
import { Stack, useMediaQuery, useTheme } from "@mui/material";
import AppInput from "../fields/AppInput";
import type { Field } from "../../types";

interface AppFieldsProps {
  fields: Field[];
  values: Record<string, string | number>;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
  errors?: Record<string, string>;
  size?: "small" | "medium";
}

const AppFields: FC<AppFieldsProps> = ({
  fields,
  values,
  onChange,
  errors = {},
  size = "medium",
}) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const renderField = (field: Field) => {
    const val = values[field.name] ?? "";
    const errMsg = errors[field.name];

    return (
      <AppInput
        key={field.name}
        name={field.name}
        label={field.label}
        value={val}
        onChange={onChange}
        required={Boolean(field.required)}
        error={Boolean(errMsg)}
        helperText={errMsg}
        size={isMobile ? "small" : size}
      />
    );
  };

  return (
    <Stack spacing={{ xs: 1.5, sm: 2 }}>
      {fields.map((field) => renderField(field))}
    </Stack>
  );
};

export default AppFields;
