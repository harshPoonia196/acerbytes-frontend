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
}) => (
  <>
    <Grid item xs={12} sm={6}>
      <Box>
        <Typography
          variant="subtitle2"
          sx={{ alignSelf: "center", flex: 1, color: colors.GRAY }}
        >
          {label}
        </Typography>
      </Box>

      <Autocomplete
        disablePortal
        id="combo-box-demo"
        options={top100Films}
        fullWidth
        renderInput={(params) => (
          <TextField {...params} size="small" fullWidth />
        )}
      />
    </Grid>
  </>
);

export default NewAutoCompleteInputStructure;
