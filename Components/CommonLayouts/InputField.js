import React from "react";
import { TextField, Grid } from "@mui/material";

const InputField = ({
  name,
  handleChange,
  label,
  type,
  value,
  sx,
  variant,
  halfSm,
  ...props
}) => (
  <Grid item xs={12} sm={halfSm ? 6 : 12}>
    <TextField
      name={name}
      onChange={handleChange}
      label={label}
      variant={variant ? variant : "standard"}
      fullWidth
      size="small"
      sx={sx}
      {...props}
    />
  </Grid>
);

export default InputField;
