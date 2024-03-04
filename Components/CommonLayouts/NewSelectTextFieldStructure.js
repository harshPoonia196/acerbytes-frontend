import React from "react";
import { Grid, Typography, TextField, MenuItem, Box } from "@mui/material";
import colors from "styles/theme/colors";
import Tooltip from '@mui/material/Tooltip';
import InputAdornment from '@mui/material/InputAdornment';
import InfoIcon from '@mui/icons-material/Info';
import { menuMaxHeight } from "utills/Constants";

function NewSelectTextFieldStructure({
  value,
  label,
  handleChange,
  name,
  list,
  error,
  isEdit,
  full,
  variant,
  isRequired,
  sx,
  showInfo = false,
  infoText = "Info",
  helperText = ""
}) {
  return (
    <Grid item xs={12} sm={full ? 12 : 6}>
      <Box sx={{ display: 'flex' }}>
        <Typography
          variant="subtitle2"
          sx={{ alignSelf: "center", color: colors.GRAY }}
        >
          {label} {isRequired && <span style={{ color: colors.ERROR }}>*</span>}
        </Typography>
        {showInfo && <span><Tooltip title={infoText}>
          <InfoIcon sx={{ fontSize: '1rem', cursor: "pointer", ml: 1, color: colors.GRAY }} />
        </Tooltip></span>}
      </Box>
      {isEdit ? (
        <TextField
          select
          name={name}
          variant={variant ? variant : "outlined"}
          value={value && value}
          onChange={handleChange}
          error={error && error}
          defaultValue=""
          fullWidth
          size="small"
          sx={{
            "& .MuiInputLabel-root": {
              maxWidth: "calc(100% - 36px)",
            },
            ...sx,
          }}
          helperText={helperText}
          SelectProps={{
            MenuProps: {
              PaperProps: {
                style: {
                  maxHeight: menuMaxHeight,
                },
              },
            },
          }}
        >
          {list ? (
            list?.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))
          ) : (
            <MenuItem key="No data" value="No data" disabled>
              No data
            </MenuItem>
          )}
        </TextField>
      ) : (
        <Typography variant="subtitle1">Value</Typography>
      )
      }
    </Grid >
  );
}

export default NewSelectTextFieldStructure;
