import React from "react";
import { Typography, TextField, Grid, Box, Autocomplete } from "@mui/material";
import colors from "styles/theme/colors";

const top100Films = [{ label: "Mumbai" }];

const NewAutoCompleteInputStructure = ({
  name,
  handleChange,
  label,
  type,
  value,
  sx,
  variant,
  isEdit,
  options
}) => (
  <>
    <Grid item xs={12} sm={6}>
      <Box>
        <Typography
          variant={variant}
          sx={{ alignSelf: "center", flex: 1, color: colors.GRAY }}
        >
          {label}
        </Typography>
      </Box>

      <Autocomplete
        disablePortal
        id="combo-box-demo"
        options={options || top100Films}
        value={value || []}
        fullWidth
        onChange={handleChange}
        renderInput={(params) => (
          <TextField {...params} value={params.value} size="small" fullWidth />
        )}
      />
    </Grid>
  </>
);

export default NewAutoCompleteInputStructure;
