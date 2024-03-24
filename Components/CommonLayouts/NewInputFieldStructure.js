import React from "react";
import { Typography, TextField, Grid, Box } from "@mui/material";
import colors from "styles/theme/colors";
import { number } from "joi";

const filterKeys = ["firstName", "lastName", "company", "city", "pinCode"];

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
  isRequired,
  error,
  id,
  isFull,
  maxlength,
  defaultValue,
  isMultiline = false,
  ...props
}) => {
  const changeHandler = (event) => {
    if (filterKeys.includes(event.target.name)) {
      const newValue = event.target.value;
      // Allow only letters, spaces, and common punctuation
      let validValue = "";
      if (event.target.name == "pinCode") {
        validValue = newValue.replace(/\D/g, "");
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
      if (label == "Pincode") {
        const numericValue = event.target.value.replace(/[^0-9]/g, '');

        // Example: Limit to 6 characters
        const truncatedValue = numericValue.slice(0, 6)
        handleChange(truncatedValue);
      }
      else {
        handleChange(event);
      }


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
            {label} {isRequired && <span style={{ color: colors.ERROR }}>*</span>}
          </Typography>
        </Box>
        {isEdit === undefined ? (
          <TextField
            name={name}
            onChange={handleChange}
            disabled={disabled}
            id={name}
            variant={variant ? variant : "standard"}
            fullWidth
            value={value}
            type={type}
           inputProps={
            
            name==="minFloors" ? {
        
            min:"1"}
            :{
              min:"0"
            }
           
           }
            size="small"
            defaultValue={defaultValue}
            sx={sx}
            multiline={isMultiline}
            error={error && error}
            {...props}
          />
        ) : isEdit === true ? (
          <TextField
            error={error && error}
            name={name}
            value={value}
            disabled={disabled}
            type={type}
            id={name}
            inputProps={
            
              name==="minFloors" ? {
          
              min:"1"}
              :{
                min:"0"
              }
             
             }
            onChange={changeHandler}
            variant={variant ? variant : "standard"}
            fullWidth
            size="small"
            multiline={isMultiline}
            defaultValue={defaultValue}
            sx={sx}
            {...props}
          />
        ) : (
          <Typography variant="subtitle1">{value}</Typography>
        )}
      </Grid>
    </>
  );
};

export default NewInputFieldStructure;
