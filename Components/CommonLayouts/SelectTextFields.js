import React from "react";
import { Grid, TextField, MenuItem } from "@mui/material";
import { menuMaxHeight } from "utills/Constants";

function SelectTextFields({
  value,
  label,
  handleChange,
  name,
  list,
  error,
  variant,
  sx,
}) {
  return (
    <TextField
      select
      name={name}
      label={label}
      value={value && value}
      onChange={handleChange}
      error={error && error}
      defaultValue=""
      variant={variant && variant}
      fullWidth
      size="small"
      sx={{
        "& .MuiInputLabel-root": {
          maxWidth: "calc(100% - 36px)",
        },
        ...sx,
      }}
      SelectProps={{
        MenuProps: {
          PaperProps: {
            style: {
              maxHeight: menuMaxHeight,
            },
          },
        },
      }}
    >
      {
        list ? (
          list?.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))
        ) : (
          <MenuItem key="No data" value="No data" disabled>
            No data
          </MenuItem>
        )}
    </TextField >
  );
}

export default SelectTextFields;
