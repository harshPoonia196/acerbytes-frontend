import React from "react";
import {
  TextField,
  Grid,
  InputAdornment,
  MenuItem,
  Box,
  Typography,
} from "@mui/material";
import colors from "styles/theme/colors";

const countries = [
  {
    value: "₹INR",
    label: "₹",
  },
  {
    value: "USD",
    label: "$",
  },
];

const NewCurrencyInputField = ({
  name1,
  name2,
  handleChange,
  handleSelect,
  label,
  type,
  value,
  variant,
  isEdit,
  halfSm,
  ...props
}) => (
  <Grid item xs={12} sm={6}>
    <Box>
      <Typography
        variant="subtitle2"
        sx={{ alignSelf: "center", flex: 1, color: colors.GRAY }}
      >
        {label}
      </Typography>
    </Box>
    {
      isEdit ?
        <TextField
          name={name2}
          onChange={handleChange}
          variant={variant ? variant : "standard"}
          fullWidth
          type="number"
          size="small"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <TextField
                  select
                  name={name1}
                  defaultValue=""
                  variant="standard"
                  onChange={handleSelect}
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
        /> : <Typography variant="subtitle1">Value</Typography>
    }
  </Grid>
);

export default NewCurrencyInputField;
