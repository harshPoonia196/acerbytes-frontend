import React from "react";
import { TextField, Grid, InputAdornment, MenuItem } from "@mui/material";
import { countries } from "utills/Constants";

const filterKeys = ["phone"];

const NewPhoneInputField = ({
  name,
  handleChange,
  handleSelectChange,
  label,
  type,
  value,
  variant,
  halfSm,
  optionValue,
  ...props
}) => {
  const changeHandler = (event) => {
    if (filterKeys.includes(event.target.name)) {
      const newValue = event.target.value;
      const validValue = newValue.replace(/\D/g, "").slice(0, 10);
      const updatedEvent = {
        ...event,
        target: {
          ...event.target,
          value: validValue,
        },
      };
      handleChange(updatedEvent);
    } else {
      handleChange(event);
    }
  };

  return (
    <Grid item xs={12} sm={halfSm ? 6 : 12}>
      <TextField
        name={name}
        onChange={changeHandler}
        label={label}
        variant={variant ? variant : "standard"}
        fullWidth
        size="small"
        value={value}
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
                value={optionValue}
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
};

export default NewPhoneInputField;
