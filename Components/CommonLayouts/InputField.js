import React from "react";
import { TextField, InputAdornment, Grid } from "@mui/material";
import PaymentsIcon from "@mui/icons-material/Payments";
import { formatPoints } from "utills/CommonFunction";

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
    let newValue = e.target.value;

    if (isAmount || isPoint) {
      newValue = newValue.replace(/[^0-9.]/g, "");

      if (!isNaN(parseFloat(newValue)) || newValue === "") {
        let data = { target: { name: "", value: "" } };
        data.target.name = e.target.name;
        data.target.value = formatPoints(newValue);
        handleChange(data);
      }
    } else {
      handleChange(e);
    }
  };

  return (
    <Grid item xs={12} sm={halfSm ? 6 : 12}>
      <TextField
        type={type === "number" ? "text" : type}
        name={name}
        value={value}
        onChange={handleFormatting}
        label={label}
        variant={variant || "standard"}
        fullWidth
        size="small"
        sx={sx}
        error={error}
        InputLabelProps={{ shrink: (isAmount || isPoint || value) && true }}
        InputProps={{
          startAdornment:
            (isAmount && <InputAdornment position="start">₹</InputAdornment>) ||
            (isPoint && (
              <InputAdornment position="start">
                <PaymentsIcon fontSize="small" />
              </InputAdornment>
            )),
          inputMode: type === "number" ? "numeric" : undefined,
        }}
        {...props}
      />
    </Grid>
  );
};

export default InputField;
