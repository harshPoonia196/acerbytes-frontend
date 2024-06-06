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
import InfoIcon from '@mui/icons-material/Info';

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
  unitValue,
  units,
  isRequired,
  showInfo = false,
  infoText = "Info",
  helperText = "",
  ...props
}) => {

  let unitsArr = units || unit

  return (
    <Grid item xs={12} sm={6}>
      <Box sx={{ display: 'flex' }}>
        <Typography
          variant="subtitle2"
          sx={{ alignSelf: "center", flex: 1, color: colors.GRAY }}
        >
          {label} {isRequired && <span style={{ color: colors.ERROR }}>*</span>}
        </Typography>
        {showInfo && <span><Tooltip title={infoText}>
          <InfoIcon sx={{ fontSize: '1rem', cursor: "pointer", ml: 1, color: colors.GRAY }} />
        </Tooltip></span>}
      </Box>
      {
        isEdit ?
          <TextField
            name={name}
            onChange={(e) => handleChange(e, "textField")}
            variant={variant ? variant : "standard"}
            fullWidth
            type={type}
            value={value}
            size="small"
            InputProps={{
              min:"0",
              startAdornment: (
                <InputAdornment position="start">
                  <TextField
                    select
                    onChange={(e) => handleChange(e, "unit")}
                    defaultValue="Acres"
                    value={unitValue || ''}
                    variant="standard"
                    InputProps={{ min:"0",
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
    </Grid >
  );
}

export default NewUnitAreaInputField;
