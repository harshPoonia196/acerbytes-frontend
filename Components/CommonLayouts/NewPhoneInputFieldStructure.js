import React from "react";
import {
  Typography,
  TextField,
  Grid,
  InputAdornment,
  MenuItem,
} from "@mui/material";

const countries = [
  {
    value: "+91",
    label: "+91",
  },
  {
    value: "+92",
    label: "+92",
  },
  {
    value: "+9528",
    label: "+9528",
  },
  {
    value: "+1",
    label: "+1",
  },
];

const NewPhoneInputFieldStructure = ({
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
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <TextField
                select
                defaultValue="+91"
                variant={variant ? variant : "standard"}
                size="small"
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
  </>
);

export default NewPhoneInputFieldStructure;
