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
  error,
  ...props
}) => (
  <Grid item xs={12} sm={halfSm ? 6 : 12}>
    <TextField
    type={type}
      name={name}
      value={value}
      onChange={handleChange}
      label={label}
      variant={variant ? variant : "standard"}
      fullWidth
      size="small"
      sx={sx}
      error={error}
      {...props}
    />
  </Grid>
);

export default InputField;
