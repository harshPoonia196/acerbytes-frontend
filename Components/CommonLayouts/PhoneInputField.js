"use client";

import { useLayoutEffect, useState } from "react";
import { Grid, InputAdornment, MenuItem, Select } from "@mui/material";
import { styled } from "@mui/material/styles";
import TextField from "@mui/material/TextField";
import { makeStyles } from "@mui/styles";

const ModifiedTextField = styled(TextField)(({ theme }) => ({
  "& .MuiOutlinedInput-root": {
    paddingLeft: 0,
  },
}));

const useStyles = makeStyles(() => ({
  noBorder: {
    border: "none",
  },
  nosBorder: {
    "& .MuiOutlinedInput-notchedOutline": {
      border: 0,
    },
  },
}));

function PhoneInputField({
  label,
  name1,
  name2,
  handleSelect,
  handleInput,
  value1,
  value2,
  dValue1,
  dValue2,
  error,
  error1,
  disabled,
  isMobile,
  autoFocus,
  halfSm,
}) {
  const [countryCode, setCountryCode] = useState([]);
  const classes = useStyles();
  // #ptwon# remove line from label
  return (
    <Grid item xs={12} sm={halfSm ? 6 : 12}>
      <ModifiedTextField
        type="number"
        label={label}
        fullWidth
        name={name2}
        onChange={handleInput}
        value={value2}
        defaultValue={dValue2 && dValue2}
        size="small"
        autoFocus={autoFocus && autoFocus}
        disabled={disabled && disabled}
        required={isMobile && isMobile}
        error={error && error}
        inputProps={{
          maxLength: 2,
        }}
        onWheel={(e) => e.target.blur()}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <Select
                variant="outlined"
                className={classes.nosBorder}
                name={name1}
                label={"Code"}
                displayEmpty
                disabled={disabled && disabled}
                defaultValue={dValue1 ? dValue1 : ""}
                // value={value1}
                sx={{
                  border: "none",
                  width: "auto",
                  minWidth: "5rem",
                }}
                error={error1 && error1}
                size="small"
                onChange={handleSelect}
                InputProps={{
                  classes: { notchedOutline: classes.nosBorder },
                }}
              >
                <MenuItem disabled value="">
                  Code
                </MenuItem>
                {countryCode?.map((code, index) => {
                  return (
                    <MenuItem key={index} value={code.value}>
                      {code.value}
                    </MenuItem>
                  );
                })}
              </Select>
            </InputAdornment>
          ),
        }}
      />
    </Grid>
  );
}

export default PhoneInputField;
