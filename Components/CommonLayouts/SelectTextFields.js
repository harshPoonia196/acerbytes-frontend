import React from "react";
import { Grid, TextField, MenuItem } from "@mui/material";

function SelectTextFields({
  value,
  label,
  handleChange,
  name,
  list,
  error,
  sx,
}) {
  return (
    <Grid item xs={12} sm={6}>
      <TextField
        select
        name={name}
        label={label}
        value={value && value}
        onChange={handleChange}
        error={error && error}
        fullWidth
        size="small"
        sx={{
          "& .MuiInputLabel-root": {
            maxWidth: "calc(100% - 36px)",
          },
          ...sx,
        }}
      >
        {list ? (
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
      </TextField>
    </Grid>
  );
}

export default SelectTextFields;
