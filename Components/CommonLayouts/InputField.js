import React from "react";
import { TextField, InputAdornment, Grid } from "@mui/material";
import { formatPoints } from "utills/CommonFunction";
import SavingsIcon from '@mui/icons-material/Savings';

const InputField = ({
  name,
  handleChange,
  label,
  type,
  value,
  sx,
  variant,
  halfSm,
  error,
  isAmount,
  isPoint,
  ...props
}) => {
  const handleFormatting = (e) => {
    if (isAmount || isPoint) {
      if (!isNaN(parseFloat(e.target.value)) || e.target.value === '') {
        let data = { target: { name: '', value: '' } };
        data.target.name = e.target.name
        data.target.value = formatPoints(e.target.value)
        handleChange(data)
      }
    } else {
      handleChange(e)
    }
  }

  return (
    <Grid item xs={12} sm={halfSm ? 6 : 12}>
      <TextField
        type={type}
        name={name}
        value={value}
        onChange={handleFormatting}
        label={label}
        variant={variant ? variant : "standard"}
        fullWidth
        size="small"
        sx={sx}
        error={error}
        InputLabelProps={{ shrink: (isAmount || value) && true }}
        InputProps={{
          startAdornment: isAmount && <InputAdornment position="start">₹</InputAdornment> || isPoint && <InputAdornment position="start"><SavingsIcon fontSize="small"/></InputAdornment>
        }}
        {...props}
      />
    </Grid>
  );
}
export default InputField;
