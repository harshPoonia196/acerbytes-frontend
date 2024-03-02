import React from "react";
import { Typography, TextField, Grid, Box, Autocomplete } from "@mui/material";
import colors from "styles/theme/colors";

const NewAutoCompleteInputStructure = ({
  handleChange,
  label,
  value,
  sx,
  variant,
  isEdit,
  options,
  error,
  isRequired,
  list,
  xs,
  sm, md
}) => (
  <>
    <Grid item xs={xs ? xs : 12} sm={sm ? sm : 6} md={md ? md : 6}>
      <Box>
        <Typography
          variant='subtitle2'
          sx={{ alignSelf: "center", flex: 1, color: colors.GRAY }}
        >
          {label} {isRequired && <span style={{ color: colors.ERROR }}>*</span>}
        </Typography>
      </Box>

      <Autocomplete
        disablePortal
        error={error}
        id="combo-box-demo"
        // Adding the below option creates issue in property form
        // getOptionLabel={(option) => option.label || ""}
        value={value}
        options={list || options || []}
        fullWidth
        onChange={handleChange}
        renderInput={(params, index) => {
          return <TextField key={index} error={error} value={params.value} {...params} size="small" fullWidth />
        }}
      />
    </Grid>
  </>
);

export default NewAutoCompleteInputStructure;
