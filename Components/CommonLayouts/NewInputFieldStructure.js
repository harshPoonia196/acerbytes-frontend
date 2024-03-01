import React from "react";
import { Typography, TextField, Grid, Box } from "@mui/material";
import colors from "styles/theme/colors";

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
  isFull, defaultValue,
  ...props
}) => {
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
        {isEdit === undefined ? <TextField
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
        /> : isEdit === true ? (
          <TextField
            error={error && error}
            name={name}
            value={value}
            disabled={disabled}
            onChange={handleChange}
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
}

export default NewInputFieldStructure;
