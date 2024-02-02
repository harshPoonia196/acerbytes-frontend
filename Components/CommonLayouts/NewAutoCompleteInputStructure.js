import React from "react";
import { Typography, TextField, Grid, Box, Autocomplete } from "@mui/material";
import colors from "styles/theme/colors";

const top100Films = [{ label: "Mumbai" }];

const NewAutoCompleteInputStructure = ({
  handleChange,
  label,
  value,
  options,
  list
}) => (
  <>
    <Grid item xs={12} sm={6}>
      <Box>
        <Typography
          variant='subtitle2'
          sx={{ alignSelf: "center", flex: 1, color: colors.GRAY }}
        >
          {label}
        </Typography>
      </Box>

      <Autocomplete
        disablePortal
        id="combo-box-demo"
        getOptionLabel={(option) => option.label || ""}
        value={value || null}
        options={list}
        fullWidth
        onChange={handleChange}
        renderInput={(params, index) => (
          <TextField key={index} {...params} value={params.value} size="small" fullWidth />
        )}
      />
    </Grid>
  </>
);

export default NewAutoCompleteInputStructure;
