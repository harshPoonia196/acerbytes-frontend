import React from "react";
import { Typography, ToggleButton, ToggleButtonGroup, Grid } from "@mui/material";
import colors from "styles/theme/colors";

const NewToggleButtonStructure = ({
  children, label, value, handleChange, isEdit, toggleStyle
}) => (
  <Grid item xs={12} sm={isEdit ? 12 : 6}>
    <Typography
      variant="subtitle2"
      sx={{ alignSelf: "center", color: colors.GRAY }}
    >
      {label}
    </Typography>
    {isEdit ? <ToggleButtonGroup
      color="primary"
      value={value}
      exclusive
      fullWidth
      onChange={handleChange}
      aria-label="Platform"
      sx={toggleStyle}
    >
      {children}
    </ToggleButtonGroup> : <Typography variant="subtitle1">Value</Typography>}

  </Grid>
);

export default NewToggleButtonStructure;
