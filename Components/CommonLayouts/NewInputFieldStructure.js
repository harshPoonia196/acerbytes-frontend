import React from "react";
import { Typography, TextField, Grid, Box } from "@mui/material";
import colors from "styles/theme/colors";

const filterKeys = [
  "firstName",
  "lastName",
  "company",
  "city",
  "pinCode",
  "reraNumber",
];

const NewInputFieldStructure = ({
  name,
  handleChange,
  label,
  type,
  value,
  sx,
  variant,
  isEdit,
  disabled = false,
  error,
  isFull,
  defaultValue,
  ...props
}) => {
  const changeHandler = (event) => {
    if (filterKeys.includes(event.target.name)) {
      const newValue = event.target.value;
      // Allow only letters, spaces, and common punctuation
      let validValue = "";
      if (event.target.name == "pinCode") {
        validValue = newValue.replace(/\D/g, "");
      } else if (event.target.name == "reraNumber") {
        validValue = newValue.replace(/[^a-zA-Z0-9]/g, "");
      } else {
        validValue = newValue.replace(/\d/g, "");
      }
      // Update the input value with the validated string
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
    <>
      <Grid item xs={12} sm={isFull ? 12 : 6}>
        <Box>
          <Typography
            variant="subtitle2"
            sx={{ alignSelf: "center", flex: 1, color: colors.GRAY }}
          >
            {label}
          </Typography>
        </Box>
        {isEdit === undefined ? (
          <TextField
            name={name}
            onChange={handleChange}
            disabled={disabled}
            variant={variant ? variant : "standard"}
            fullWidth
            value={value}
            size="small"
            defaultValue={defaultValue}
            sx={sx}
            error={error && error}
            {...props}
          />
        ) : isEdit === true ? (
          <TextField
            error={error && error}
            name={name}
            value={value}
            disabled={disabled}
            onChange={changeHandler}
            variant={variant ? variant : "standard"}
            fullWidth
            size="small"
            defaultValue={defaultValue}
            sx={sx}
            {...props}
          />
        ) : (
          <Typography variant="subtitle1">Value</Typography>
        )}
      </Grid>
    </>
  );
};

export default NewInputFieldStructure;
