import React from "react";
import { Typography, TextField, Grid } from "@mui/material";

const NewInputFieldStructure = ({
  name,
  handleChange,
  label,
  type,
  value,
  sx,
  variant,
  ...props
}) => (
  <>
    <Grid item xs={6} sx={{ display: "flex" }}>
      <Typography variant="subtitle2" sx={{ alignSelf: "center" }}>
        {label}
      </Typography>
    </Grid>
    <Grid item xs={6}>
      <TextField
        name={name}
        onChange={handleChange}
        variant={variant ? variant : "standard"}
        fullWidth
        size="small"
        sx={sx}
        {...props}
      />
    </Grid>
  </>
);

export default NewInputFieldStructure;
