import React from "react";
import { TextField, Grid } from "@mui/material";
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
  ...props
}) => {
  const handleFormatting=(e) => {
    if(isAmount) {
      let data={target:{name:'',value:''}};
      data.target.name = e.target.name
      data.target.value = formatPoints(e.target.value)
      console.log(e.target.value,data.target.value)
      console.log(data)
      handleChange(data)
      console.log(value)
    }else{
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
      {...props}
    />
  </Grid>
);
}
export default InputField;
