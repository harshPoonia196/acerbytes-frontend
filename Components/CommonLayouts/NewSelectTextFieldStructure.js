import React from "react";
import { Grid, Typography, TextField, MenuItem, Box } from "@mui/material";
import colors from "styles/theme/colors";

function NewSelectTextFieldStructure({
  value,
  label,
  handleChange,
  name,
  list,
  error,
  isEdit,
  sx,
}) {
  return (
    <Grid item xs={12} sm={6}>
      <Box>
        <Typography
          variant="subtitle2"
          sx={{ alignSelf: "center", color: colors.GRAY }}
        >
          {label}
        </Typography>
      </Box>
      {isEdit ? (
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
      ) : (
        <Typography variant="subtitle1">Value</Typography>
      )}
    </Grid>
  );
}

export default NewSelectTextFieldStructure;
