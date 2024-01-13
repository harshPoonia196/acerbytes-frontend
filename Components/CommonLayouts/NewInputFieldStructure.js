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
  error,
  isFull, defaultValue,
  ...props
}) => (
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
      {isEdit === undefined ? <TextField
        name={name}
        onChange={handleChange}
        variant={variant ? variant : "standard"}
        fullWidth
        size="small"
        defaultValue={defaultValue}
        sx={sx}
        {...props}
      /> : isEdit === true ? (
        <TextField
          error={error}
          name={name}
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

export default NewInputFieldStructure;
