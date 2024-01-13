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

function NewPhoneInputFieldStructure({
  name1,
  name2,
  handleChange,
  handleSelect,
  label,
  type,
  value1,
  value2,
  sx,
  isEdit,
  variant,
  ...props
}) {

  const [countryCode, setCountryCode] = useState([])
  useLayoutEffect(() => {
    setCountryCode(countries);
  }, [])

  return (
    <Grid item xs={12} sm={6}>
      <Box>
        <Typography
          variant="subtitle2"
          sx={{ alignSelf: "center", color: colors.GRAY }}
        >
          {label}
        </Typography>
      </Box>
      {isEdit ? (
        <TextField
          name={name2}
          value={value2}
          type="number"
          onChange={handleChange}
          variant={variant ? variant : "standard"}
          fullWidth
          size="small"
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
                >
                  {countryCode.map((option) => (
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
      ) : (
        <Typography variant="subtitle2" sx={{ alignSelf: "center" }}>
          Value
        </Typography>
      )}
    </Grid>
  );
}

export default NewPhoneInputFieldStructure;
