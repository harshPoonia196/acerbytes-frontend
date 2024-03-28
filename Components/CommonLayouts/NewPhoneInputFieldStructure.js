import React, { useState, useLayoutEffect } from "react";
import {
  Typography,
  TextField,
  Grid,
  InputAdornment,
  MenuItem,
  Box,
} from "@mui/material";

import colors from "styles/theme/colors";
import { countries } from "utills/Constants";

function NewPhoneInputFieldStructure({
  name1,
  name2,
  handleChange,
  countryCodeOptions,
  handleSelect,
  label,
  type,
  value1,
  value2,
  sx,
  isEdit,
  isRequired,
  variant,
  disabled,
  error,
  ...props
}) {
  const [countryCode, setCountryCode] = useState([]);
  useLayoutEffect(() => {
    setCountryCode(countries);
  }, []);

  const handleInputChange = (event) => {
    const inputValue = event.target.value;

    // Limit the length to 10 digits
    const limitedValue = inputValue.slice(0, 10);

    // Update the input value
    event.target.value = limitedValue;

    // Handle the input change if needed
    console.log(limitedValue);
    handleChange(event);
  };

  return (
    <Grid item xs={12} sm={6}>
      <Box>
        <Typography
          variant="subtitle2"
          sx={{ alignSelf: "center", color: colors.GRAY }}
        >
          {label} {isRequired && <span style={{ color: colors.ERROR }}>*</span>}
        </Typography>
      </Box>
      {isEdit ? (
        <TextField
          name={name2}
          value={value2}
          type="number"
          onChange={handleInputChange}
          variant={variant ? variant : "standard"}
          fullWidth
          size="small"
          error={error && error}
          disabled={disabled}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <TextField
                  select
                  name={name1}
                  value={value1}
                  onChange={handleSelect}
                  defaultValue="+91"
                  variant="standard"
                  size="small"
                  InputProps={{
                    disableUnderline: true,
                  }}
                  disabled={disabled}
                >
                  {(countryCodeOptions || countryCode).map((option) => {
                    if (option.label) {
                      return (
                        <MenuItem key={option.value} value={option.value}>
                          {option.label}
                        </MenuItem>
                      )
                    } else {
                      return (
                        <MenuItem key={option} value={option}>
                          +{option}
                        </MenuItem>
                      )
                    }
                  })}
                </TextField>
              </InputAdornment>
            ),
          }}
          {...props}
        />
      ) : (
        <Typography variant="subtitle2" sx={{ alignSelf: "center" }}>
          Value
        </Typography>
      )}
    </Grid>
  );
}

export default NewPhoneInputFieldStructure;
