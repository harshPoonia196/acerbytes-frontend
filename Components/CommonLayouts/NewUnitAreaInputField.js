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

const unit = [
  {
    value: "Acres",
    label: "Acres",
  },
];

const price = [
  {
    value: "SQFT",
    label: "Per Sq ft",
  },
];

const NewUnitAreaInputField = ({
  name,
  handleChange,
  label,
  type,
  value,
  variant,
  isEdit,
  halfSm,
  isPrice,
  units,
  ...props
}) => {

  let unitsArr = units || unit

  return (
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
            name={name}
            onChange={handleChange}
            variant={variant ? variant : "standard"}
            fullWidth
            value={value}
            size="small"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <TextField
                    select
                    defaultValue=""
                    variant="standard"
                    InputProps={{
                      disableUnderline: true,
                    }}
                  >
                    {isPrice ? price.map((option) => (
                      <MenuItem key={option.value} value={option.value}>
                        {option.label}
                      </MenuItem>
                    )) : unitsArr.map((option) => (
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
}

export default NewUnitAreaInputField;
