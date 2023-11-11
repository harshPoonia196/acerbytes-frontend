import React from "react";
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
  name,
  handleChange,
  label,
  type,
  value,
  sx,
  isEdit,
  variant,
  ...props
}) {
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
                  variant="standard"
                  size="small"
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
      ) : (
        <Typography variant="subtitle2" sx={{ alignSelf: "center" }}>
          Value
        </Typography>
      )}
    </Grid>
  );
}

export default NewPhoneInputFieldStructure;
