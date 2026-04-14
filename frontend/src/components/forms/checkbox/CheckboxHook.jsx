import { Checkbox, FormControlLabel } from "@mui/material";

import { useController, useFormContext } from "react-hook-form";

export function CheckBoxHook({
  name,
  label,
  labelPlacement = "end",
  defaultValue = false,
  rules = null,
  ...rest
}) {
  const { control } = useFormContext();

  const {
    field: { ref, onChange, value, ...inputProps },
    fieldState: { invalid },
  } = useController({
    name,
    control,
    defaultValue: defaultValue,
    rules,
  });

  if (label) {
    return (
      <FormControlLabel
        control={
          <Checkbox
            {...inputProps}
            {...rest}
            checked={value}
            onChange={(e) => {
              onChange(e.target.checked);
            }}
            slotProps={{
              input: { ref }
            }}
          />
        }
        label={label}
        sx={{ color: invalid ? "error.main" : "text.primary" }}
        labelPlacement={labelPlacement}
      />
    );
  }

  return (
    <Checkbox
      {...inputProps}
      {...rest}
      onChange={(e) => {
        onChange(e.target.checked);
      }}
      inputRef={ref}
    />
  );
}