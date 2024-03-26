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
import { currencies } from "utills/Constants";

const NewCurrencyInputField = ({
  name1,
  name2,
  handleChange,
  handleSelect,
  currentOptions,
  label,
  type,
  value1,
  value2,
  variant,
  isEdit,
  halfSm,
  ...props
}) => {
  const changeHandler = (event) => {
    const newValue = event.target.value;
    // Allow only letters, spaces, and common punctuation
    let validValue = newValue.replace(/\D/g, "");
    // Update the input value with the validated string
    const updatedEvent = {
      ...event,
      target: {
        ...event.target,
        value: validValue,
      },
    };
    handleChange(updatedEvent);
  };
 
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
      {isEdit ? (
        <TextField
          name={name2}
          // onChange={handleChange}
          onChange={changeHandler}
          variant={variant ? variant : "standard"}
          fullWidth
          value={value2}
          // type="number"
          size="small"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <TextField
                  select
                  name={name1}
                  defaultValue="₹INR"
                  variant="standard"
                  value={value1}
                  onChange={handleSelect}
                  InputProps={{
                    disableUnderline: true,
                  }}
                  
                >
                  {(currentOptions || currencies).map((option) => {
                    if (option.label) {
                      return (
                        <MenuItem key={option.value} value={option.value}>
                          {option.label}
                        </MenuItem>
                      )
                    } else {
                      return (
                        <MenuItem key={option} value={option}>
                          {option}
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
        <Typography variant="subtitle1">Value</Typography>
      )}
    </Grid>
  );
};

export default NewCurrencyInputField;
