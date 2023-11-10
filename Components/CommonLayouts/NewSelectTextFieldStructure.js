import React from "react";
import { Grid, Typography, TextField, MenuItem } from "@mui/material";

function NewSelectTextFieldStructure({
  value,
  label,
  handleChange,
  name,
  list,
  error,
  sx,
}) {
  return (
    <>
      <Grid item xs={6} sx={{ display: "flex" }}>
        <Typography variant="subtitle2" sx={{ alignSelf: "center" }}>
          {label}
        </Typography>
      </Grid>
      <Grid item xs={6}>
        <TextField
          select
          name={name}
          value={value && value}
          onChange={handleChange}
          error={error && error}
          defaultValue=""
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
    </>
  );
}

export default NewSelectTextFieldStructure;
