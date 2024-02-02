import React from "react";
import { TextField, Grid, InputAdornment, MenuItem } from "@mui/material";

const countries = [
  {
    value: "91",
    label: "+91",
  },
  {
    value: "92",
    label: "+92",
  },
  {
    value: "9528",
    label: "+9528",
  },
  {
    value: "1",
    label: "+1",
  },
];

const NewPhoneInputField = ({
  name,
  handleChange,
  handleSelectChange,
  label,
  type,
  value,
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
      InputProps={{
        startAdornment: (
          <InputAdornment position="start">
            <TextField
              select
              defaultValue="+91"
              onChange={handleSelectChange}
              variant="standard"
              InputProps={{
                disableUnderline: true,
              }}
            >
              {countries.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </TextField>
          </InputAdornment>
        ),
      }}
      {...props}
    />
  </Grid>
);

export default NewPhoneInputField;
