import { TextField } from "@mui/material";

import { useController, useFormContext } from "react-hook-form";

export function InputHook({
  name,
  rules = null,
  defaultValue = "",
  helperText = "",
  multiline,
  limitMulti = 0,
  type = "text",
  ...rest
}) {
  const { control } = useFormContext();

  const {
    field: { ref, ...inputProps },
    fieldState: { invalid, error },
  } = useController({
    name,
    control,
    rules,
    defaultValue,
  });

  return (
    <TextField
      type={type}
      inputRef={ref}
      {...inputProps}
      {...rest}
      multiline={multiline}
      error={invalid}
      helperText={
        error
          ? error.message
          : multiline && limitMulti > 0
          ? `${inputProps.value.length}/${limitMulti} caracters`
          : helperText
      }
    />
  );
}